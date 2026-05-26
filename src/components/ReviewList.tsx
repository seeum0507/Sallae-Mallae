import React from "react";
import { Link } from "react-router-dom";
import { Star, ThumbsUp, MessageCircle, MoreHorizontal } from "lucide-react";
import { Product } from "../data/products";
interface ReviewListProps {
  product: Product;
}
export function ReviewList({ product }: ReviewListProps) {
  if (!product.reviews || product.reviews.length === 0) return null;
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
        {product.reviews.map((review) => (
          <div
            key={review.id}
            className="pb-6 border-b border-gray-100 last:border-0 last:pb-0"
          >
            {/* Review Header */}
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
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Review Content */}
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {review.content}
            </p>

            {/* Review Actions */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-mint-600 transition-colors border border-gray-200 rounded-full px-3 py-1.5 hover:border-mint-200 hover:bg-mint-50">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>도움돼요 {review.helpful}</span>
              </button>
              <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>댓글 {review.replies}</span>
              </button>
            </div>
          </div>
        ))}
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
