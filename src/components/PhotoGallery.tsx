import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "../data/products";

interface PhotoGalleryProps {
  product: Product;
}

// ✅ 한 사람(한 리뷰)의 사진 묶음을 카드 하나로 보여주고,
//    사진이 2개 이상이면 좌우 화살표로 넘길 수 있게 함
function PhotoCard({ photo }: { photo: any }) {
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
    <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
      {/* 사진 */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img
          src={urls[index]}
          alt="User review"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3 fill-mint-400 text-mint-400" />
          <span className="text-xs font-bold text-white">{photo.rating}</span>
        </div>

        {hasMultiple && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
              <span className="text-xs font-medium text-white">
                {index + 1}/{urls.length}
              </span>
            </div>
          </>
        )}
      </div>

      {/* 리뷰 글 (유저 업로드인 경우만) */}
      {photo.content && (
        <div className="p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                photo.avatarColor || "bg-gray-100 text-gray-600"
              }`}
            >
              {photo.initial}
            </div>
            <span className="text-xs font-medium text-gray-700">
              {photo.author}
            </span>
            <span className="text-xs text-gray-400 ml-auto">{photo.date}</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
            {photo.content}
          </p>
        </div>
      )}
    </div>
  );
}

export function PhotoGallery({ product }: PhotoGalleryProps) {
  if (!product.photoReviews || product.photoReviews.length === 0) return null;

  return (
    <section className="py-8 border-t border-gray-100">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            사용자 포토 리뷰
          </h3>
          <p className="text-sm text-gray-500">
            {product.photoReviews.length}명이 사진을 올렸어요
          </p>
        </div>
        <Link
          to={`/product/${product.id}/photos`}
          className="text-sm font-medium text-mint-600 hover:text-mint-700"
        >
          더보기 &gt;
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {product.photoReviews.map((photo: any) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </section>
  );
}
