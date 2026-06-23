import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  ThumbsUp,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { Product } from "../data/products";
import { likeReview, fetchReviews, fetchComments, postComment } from "../api";
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

interface ReviewListProps {
  product: Product;
  onRefresh?: () => void;
}

export function ReviewList({ product, onRefresh }: ReviewListProps) {
  const { isLoggedIn } = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);
  const [sort, setSort] = useState("helpful");
  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({});
  const [likedSet, setLikedSet] = useState<Set<string>>(new Set());
  const [openCommentId, setOpenCommentId] = useState<string | null>(null);
  const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>({});
  const [commentInput, setCommentInput] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    fetchReviews(product.id, sort).then((data) => setReviews(data));
  }, [sort, product.id, product]);

  // ✅ 리뷰 로드 시 likedByMe 기반으로 likedSet 초기화
  useEffect(() => {
    const liked = new Set(
      reviews.filter((r: any) => r.likedByMe).map((r: any) => r.id)
    );
    setLikedSet(liked);
  }, [reviews]);

  if (!reviews || reviews.length === 0) return null;

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

  return (
    <section className="py-8 border-t border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-gray-900">전체 리뷰</h3>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-transparent border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 focus:ring-0 cursor-pointer outline-none"
        >
          <option value="helpful">도움순</option>
          <option value="latest">최신순</option>
          <option value="rating_high">별점 높은순</option>
          <option value="rating_low">별점 낮은순</option>
        </select>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => {
          const currentHelpful = helpfulMap[review.id] ?? review.helpful;
          const isLiked = likedSet.has(review.id);
          const isCommentOpen = openCommentId === review.id;
          const comments = commentsMap[review.id] || [];

          return (
            <div
              key={review.id}
              className="pb-6 border-b border-gray-100 last:border-0 last:pb-0"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${review.avatarColor}`}
                  >
                    {review.initial}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {review.author}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex text-mint-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < review.rating
                                ? "fill-current"
                                : "text-gray-200 fill-current"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                {review.content}
              </p>

              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-4 flex-wrap">
                  {review.images.map((url: string, idx: number) => (
                    <div
                      key={idx}
                      className="w-20 h-20 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0"
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
                  className={`flex items-center gap-1.5 text-xs font-medium transition-colors border rounded-full px-3 py-1.5 ${
                    isLiked
                      ? "text-mint-600 border-mint-300 bg-mint-50 cursor-default"
                      : "text-gray-500 border-gray-200 hover:text-mint-600 hover:border-mint-200 hover:bg-mint-50 cursor-pointer"
                  }`}
                >
                  <ThumbsUp
                    className={`w-3.5 h-3.5 ${isLiked ? "fill-mint-200" : ""}`}
                  />
                  <span>도움돼요 {currentHelpful}</span>
                </button>

                <button
                  onClick={() => handleToggleComments(review.id)}
                  className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                    isCommentOpen
                      ? "text-mint-600"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
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
                                {new Date(comment.createdAt).toLocaleDateString(
                                  "ko-KR"
                                )}
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
                        className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-mint-500/20 focus:border-mint-500"
                      />
                      <button
                        onClick={() => handlePostComment(review.id)}
                        disabled={!commentInput.trim() || commentLoading}
                        className={`p-2 rounded-xl transition-colors ${
                          commentInput.trim() && !commentLoading
                            ? "bg-mint-500 hover:bg-mint-600 text-white"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="block text-center text-xs text-mint-600 font-medium hover:underline py-1"
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

      <div className="mt-8 text-center">
        <Link
          to={`/product/${product.id}/reviews`}
          className="inline-block px-6 py-3 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          리뷰 더보기
        </Link>
      </div>
    </section>
  );
}
