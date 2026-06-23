import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  ThumbsUp,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import {
  fetchProduct,
  fetchReviews,
  likeReview,
  fetchComments,
  postComment,
} from "../api";
import { useAuth } from "../context/AuthContext";

interface Comment {
  id: number;
  reviewId: string;
  author: string;
  initial: string;
  avatarColor: string;
  content: string;
  createdAt: string;
}

export function AllReviewsPage() {
  const { id } = useParams<{ id: string }>();
  const { isLoggedIn } = useAuth();
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [sort, setSort] = useState("helpful");
  const [loading, setLoading] = useState(true);

  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({});
  const [likedSet, setLikedSet] = useState<Set<string>>(new Set());
  const [openCommentId, setOpenCommentId] = useState<string | null>(null);
  const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>({});
  const [commentInput, setCommentInput] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchProduct(id).then((data) => setProduct(data));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchReviews(id, sort)
      .then((data) => setReviews(data))
      .finally(() => setLoading(false));
  }, [id, sort]);

  // ✅ 리뷰 로드 시 likedByMe 기반으로 likedSet 초기화
  useEffect(() => {
    const liked = new Set(
      reviews.filter((r: any) => r.likedByMe).map((r: any) => r.id)
    );
    setLikedSet(liked);
  }, [reviews]);

  const handleHelpful = async (reviewId: string, currentHelpful: number) => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (likedSet.has(reviewId)) return;
    const prevCount = helpfulMap[reviewId] ?? currentHelpful;
    setHelpfulMap((prev) => ({ ...prev, [reviewId]: prevCount + 1 }));
    setLikedSet((prev) => new Set(prev).add(reviewId));
    try {
      await likeReview(reviewId);
    } catch (err) {
      setHelpfulMap((prev) => ({ ...prev, [reviewId]: prevCount }));
      setLikedSet((prev) => {
        const next = new Set(prev);
        next.delete(reviewId);
        return next;
      });
    }
  };

  const handleToggleComments = async (reviewId: string) => {
    if (openCommentId === reviewId) {
      setOpenCommentId(null);
      return;
    }
    setOpenCommentId(reviewId);
    if (!commentsMap[reviewId]) {
      const data = await fetchComments(reviewId);
      setCommentsMap((prev) => ({ ...prev, [reviewId]: data }));
    }
  };

  const handlePostComment = async (reviewId: string) => {
    if (!commentInput.trim() || commentLoading) return;
    setCommentLoading(true);
    try {
      const newComment = await postComment(reviewId, commentInput);
      setCommentsMap((prev) => ({
        ...prev,
        [reviewId]: [...(prev[reviewId] || []), newComment],
      }));
      setCommentInput("");
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId ? { ...r, replies: r.replies + 1 } : r
        )
      );
    } catch (err: any) {
      alert(err.message);
    } finally {
      setCommentLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          상품을 찾을 수 없습니다.
        </h2>
        <Link to="/" className="text-mint-600 hover:underline">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      <div className="mb-8 border-b border-gray-100 pb-6">
        <Link
          to={`/product/${product.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>상품 상세로 돌아가기</span>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">전체 리뷰</h1>
            <p className="text-gray-500">{product.name}</p>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-mint-500/20 focus:border-mint-500 cursor-pointer"
          >
            <option value="helpful">도움순</option>
            <option value="latest">최신순</option>
            <option value="rating_high">별점 높은순</option>
            <option value="rating_low">별점 낮은순</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="space-y-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="pb-8 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-24" />
                  <div className="h-3 bg-gray-100 rounded animate-pulse w-32" />
                </div>
              </div>
              <div className="h-16 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {reviews.map((review) => {
            const currentHelpful = helpfulMap[review.id] ?? review.helpful;
            const isLiked = likedSet.has(review.id);
            const isCommentOpen = openCommentId === review.id;
            const comments = commentsMap[review.id] || [];

            return (
              <div
                key={review.id}
                className="pb-8 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base ${review.avatarColor}`}
                    >
                      {review.initial}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {review.author}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex text-mint-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-current"
                                  : "text-gray-200 fill-current"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-gray-700 text-base leading-relaxed mb-5">
                  {review.content}
                </p>

                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 mb-5 flex-wrap">
                    {review.images.map((url: string, idx: number) => (
                      <div
                        key={idx}
                        className="w-24 h-24 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0"
                      >
                        <img
                          src={url}
                          alt={`리뷰 이미지 ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleHelpful(review.id, review.helpful)}
                    disabled={isLiked}
                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors border rounded-full px-4 py-2 ${
                      isLiked
                        ? "text-mint-600 border-mint-300 bg-mint-50 cursor-default"
                        : "text-gray-500 border-gray-200 hover:text-mint-600 hover:border-mint-200 hover:bg-mint-50 cursor-pointer"
                    }`}
                  >
                    <ThumbsUp
                      className={`w-4 h-4 ${isLiked ? "fill-mint-200" : ""}`}
                    />
                    <span>도움돼요 {currentHelpful}</span>
                  </button>

                  <button
                    onClick={() => handleToggleComments(review.id)}
                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                      isCommentOpen
                        ? "text-mint-600"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>댓글 {review.replies}</span>
                  </button>
                </div>

                {isCommentOpen && (
                  <div className="mt-4 bg-gray-50 rounded-2xl p-4">
                    {comments.length > 0 ? (
                      <div className="space-y-3 mb-4">
                        {comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="flex items-start gap-2.5"
                          >
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${comment.avatarColor}`}
                            >
                              {comment.initial}
                            </div>
                            <div className="flex-1 bg-white rounded-xl px-3 py-2 border border-gray-100">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-xs font-bold text-gray-900">
                                  {comment.author}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {new Date(
                                    comment.createdAt
                                  ).toLocaleDateString("ko-KR")}
                                </span>
                              </div>
                              <p className="text-xs text-gray-700 leading-relaxed">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 mb-4 text-center py-2">
                        첫 댓글을 남겨보세요!
                      </p>
                    )}

                    {isLoggedIn ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handlePostComment(review.id);
                            }
                          }}
                          placeholder="댓글을 입력하세요..."
                          className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-mint-500/20 focus:border-mint-500"
                        />
                        <button
                          onClick={() => handlePostComment(review.id)}
                          disabled={!commentInput.trim() || commentLoading}
                          className={`p-2.5 rounded-xl transition-colors ${
                            commentInput.trim() && !commentLoading
                              ? "bg-mint-500 hover:bg-mint-600 text-white"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <Link
                        to="/login"
                        className="block text-center text-sm text-mint-600 font-medium hover:underline py-1"
                      >
                        로그인 후 댓글을 남길 수 있어요
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
