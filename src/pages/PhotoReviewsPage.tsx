import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Heart } from "lucide-react";
import { getProductById } from "../data/products";
export function PhotoReviewsPage() {
  const { id } = useParams<{
    id: string;
  }>();
  const product = getProductById(id || "");
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
  // Duplicate photos to simulate a larger gallery for the "more" page
  const allPhotos = [
    ...product.photoReviews,
    ...product.photoReviews.map((p) => ({
      ...p,
      id: p.id + 100,
    })),
  ];
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      <div className="mb-8">
        <Link
          to={`/product/${product.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>상품 상세로 돌아가기</span>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          포토 리뷰 모아보기
        </h1>
        <p className="text-gray-500">{product.name}의 모든 사진 리뷰입니다.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allPhotos.map((photo, idx) => (
          <div
            key={`${photo.id}-${idx}`}
            className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer bg-gray-100"
          >
            <img
              src={photo.url}
              alt="User review"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-mint-400 text-mint-400" />
                  <span className="text-sm font-bold">{photo.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 fill-white" />
                  <span className="text-sm font-medium">{photo.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
