import React from "react";
import { Link } from "react-router-dom";
import { Star, Heart } from "lucide-react";
import { Product } from "../data/products";
interface PhotoGalleryProps {
  product: Product;
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
            {product.photoReviews.length * 42}명이 사진을 올렸어요
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
        {product.photoReviews.map((photo) => (
          <div
            key={photo.id}
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
    </section>
  );
}
