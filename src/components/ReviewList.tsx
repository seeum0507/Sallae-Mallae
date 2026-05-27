import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ThumbsUp, MessageCircle, MoreHorizontal } from "lucide-react";
import { Product } from "../data/products";
import { likeReview } from "../api";

interface ReviewListProps {
  product: Product;
}

export function ReviewList({ product }: ReviewListProps) {
  // 리뷰별 helpful 카운트 상태 (초기값: 각 리뷰의 helpful)
  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({});
  // 이미 누른 리뷰 ID 집합
  const [likedSet, setLikedSet] = useState<Set<string>>(new Set());

  if (!product.reviews || product.reviews.length === 0) return null;

  const handleHelpful = async (reviewId: string, currentHelpful: number) => {
    // 이미 누른 경우 무시
    if (likedSet.has(reviewId)) return;

    // 낙관적 업데이트: 먼저 UI 반영
    const prevCount = helpfulMap[reviewId] ?? currentHelpful;
    setHelpfulMap((prev) => ({ ...prev, [reviewId]: prevCount + 1 }));
    setLikedSet((prev) => new Set(prev).add(reviewId));

    try {
      await likeReview(reviewId);
    } catch (err) {
      // 실패 시 롤백
      console.error("도움이 돼요 실패:", err);
      setHelpfulMap((prev) => ({ ...prev, [reviewId]: prevCount }));
      setLikedSet((prev) => {
        const next = new Set(prev);
        next.delete(reviewId);
        return next;
      });
    }
  };

  return (
    <section className="py-8 border-t border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-gray-900">전체 리뷰</h3>
        <select className="bg-transparent border-none text-sm font-medium text-gray-600 focus:ring-0 cursor-pointer outline-none">
          <option>도움순</option>
          <option>최신순</option>
          <option>별점 높은순</option>
          <option>별점 낮은순</option>
        </select>
      </div>

      <div className="space-y-6">
        {product.reviews.map((review) => {
          const currentHelpful = helpfulMap[review.id] ?? review.helpful;
          const isLiked = likedSet.has(review.id);

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

              {/* 리뷰 이미지 */}
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
                <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>댓글 {review.replies}</span>
                </button>
              </div>
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
