import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fetchProduct } from "../api";

function PhotoCardLarge({ photo }: { photo: any }) {
  const [index, setIndex] = useState(0);
  const urls: string[] = photo.urls || [];
  const hasMultiple = urls.length > 1;

  const goPrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + urls.length) % urls.length);
  };

  const goNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % urls.length);
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm group">
      {/* 사진 */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        <img
          src={urls[index]}
          alt="User review"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-mint-400 text-mint-400" />
          <span className="text-sm font-bold text-white">{photo.rating}</span>
        </div>
        {photo.likes > 0 && (
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-white text-white" />
            <span className="text-sm font-bold text-white">{photo.likes}</span>
          </div>
        )}

        {hasMultiple && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
              <span className="text-xs font-medium text-white">
                {index + 1}/{urls.length}
              </span>
            </div>
          </>
        )}
      </div>

      {/* 작성자/내용 */}
      {photo.content ? (
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                photo.avatarColor || "bg-gray-100 text-gray-600"
              }`}
            >
              {photo.initial}
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">
                {photo.author}
              </div>
              <div className="text-xs text-gray-400">{photo.date}</div>
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {photo.content}
          </p>
        </div>
      ) : (
        <div className="px-5 py-3 border-t border-gray-50">
          <span className="text-xs text-gray-400">포토 리뷰</span>
        </div>
      )}
    </div>
  );
}

export function PhotoReviewsPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    fetchProduct(id).then((data) => setProduct(data));
  }, [id]);

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
        <p className="text-gray-500">
          {product.name}의 모든 사진 리뷰입니다. ({product.photoReviews.length}
          개)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {product.photoReviews.map((photo: any) => (
          <PhotoCardLarge key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
}
