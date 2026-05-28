import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  ThumbsUp,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";
import { fetchProduct, fetchReviews } from "../api";

export function AllReviewsPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [sort, setSort] = useState("helpful");
  const [loading, setLoading] = useState(true);

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
          {reviews.map((review) => (
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
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-mint-600 transition-colors border border-gray-200 rounded-full px-4 py-2 hover:border-mint-200 hover:bg-mint-50">
                  <ThumbsUp className="w-4 h-4" />
                  <span>도움돼요 {review.helpful}</span>
                </button>
                <button className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>댓글 {review.replies}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
