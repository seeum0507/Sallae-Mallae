import React, { useEffect, useState } from "react";
import { Star, ThumbsUp, Heart } from "lucide-react";
import { Product } from "../data/products";
import { toggleLike, fetchLikeStatus } from "../api";
import { useAuth } from "../context/AuthContext";

interface ProductHeaderProps {
  product: Product;
}

export function ProductHeader({ product }: ProductHeaderProps) {
  const { isLoggedIn } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setLiked(false);
      return;
    }
    fetchLikeStatus(product.id).then((d) => setLiked(d.liked));
  }, [product.id, isLoggedIn]);

  const handleLike = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }
    setLikeLoading(true);
    try {
      const result = await toggleLike(product.id);
      setLiked(result.liked);
    } catch (err) {
      console.error("찜 실패:", err);
    } finally {
      setLikeLoading(false);
    }
  };

  return (
    <section className="flex flex-col md:flex-row gap-8 py-8">
      {/* Left: Product Illustration */}
      <div className="w-full md:w-[45%] flex-shrink-0">
        <div className="bg-gray-50 rounded-3xl aspect-square flex items-center justify-center p-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-mint-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

          {product.thumbnail === "svg-washing-machine" ? (
            <svg
              viewBox="0 0 240 280"
              className="w-full h-full max-w-[280px] relative z-10 drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="20"
                y="20"
                width="200"
                height="240"
                rx="32"
                fill="#FFFFFF"
                stroke="#E5E7EB"
                strokeWidth="4"
              />
              <path
                d="M20 72C20 43.2812 43.2812 20 72 20H168C196.719 20 220 43.2812 220 72V80H20V72Z"
                fill="#F9FAFB"
                stroke="#E5E7EB"
                strokeWidth="4"
              />
              <circle cx="180" cy="50" r="8" fill="#D1D5DB" />
              <circle cx="150" cy="50" r="6" fill="#E5E7EB" />
              <circle cx="130" cy="50" r="6" fill="#E5E7EB" />
              <rect
                x="40"
                y="42"
                width="60"
                height="16"
                rx="4"
                fill="#10B981"
                fillOpacity="0.1"
              />
              <rect x="44" y="46" width="30" height="8" rx="2" fill="#10B981" />
              <circle
                cx="120"
                cy="160"
                r="70"
                fill="#F3F4F6"
                stroke="#E5E7EB"
                strokeWidth="4"
              />
              <circle cx="120" cy="160" r="54" fill="#ECFDF5" />
              <path
                d="M76 180C86 195 102 204 120 204C144.3 204 164 184.3 164 160C164 155 163 150 161 146C155 156 140 164 120 164C95 164 80 156 76 146C74 150 73 155 73 160C73 168 74 174 76 180Z"
                fill="#A7F3D0"
                fillOpacity="0.5"
              />
              <rect
                x="40"
                y="260"
                width="20"
                height="12"
                rx="4"
                fill="#D1D5DB"
              />
              <rect
                x="180"
                y="260"
                width="20"
                height="12"
                rx="4"
                fill="#D1D5DB"
              />
            </svg>
          ) : (
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl relative z-10 drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="w-full md:w-[55%] flex flex-col justify-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium w-fit mb-4">
          {product.category}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
          {product.name}
        </h1>
        <p className="text-gray-500 text-sm mb-6">브랜드: {product.brand}</p>

        {/* Ratings Row */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-100">
          <div className="flex items-center gap-1">
            <div className="flex text-mint-500">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i <= Math.floor(product.rating)
                      ? "fill-current"
                      : i - 0.5 <= product.rating
                      ? "fill-current opacity-50"
                      : "text-gray-200 fill-current"
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-gray-900 ml-1">
              {product.rating}
            </span>
            <span className="text-gray-500 text-sm ml-1">
              (리뷰 {product.reviewCount.toLocaleString()}개)
            </span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block"></div>
          <div className="flex items-center gap-1.5 text-mint-600 bg-mint-50 px-2.5 py-1 rounded-md text-sm font-medium">
            <ThumbsUp className="w-4 h-4" />
            <span>추천 {product.recommendCount.toLocaleString()}</span>
          </div>
        </div>

        {/* ✅ mt-auto 제거: 별점 줄 바로 아래에 가격이 위치하도록 함 */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">
              ₩{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-gray-400 line-through">
                ₩{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleLike}
            disabled={likeLoading}
            className={`flex-none p-4 border rounded-2xl transition-all duration-200 group ${
              liked
                ? "border-red-300 bg-red-50 text-red-500 hover:bg-red-100"
                : "border-gray-200 hover:border-mint-500 hover:bg-mint-50 text-gray-600 hover:text-mint-600"
            } ${likeLoading ? "opacity-60 cursor-not-allowed" : ""}`}
            title={liked ? "찜 취소" : "찜하기"}
          >
            <Heart
              className={`w-6 h-6 transition-all duration-200 ${
                liked
                  ? "fill-red-400 text-red-400"
                  : "group-hover:fill-mint-100"
              }`}
            />
          </button>
        </div>

        {/* 찜 상태 텍스트 */}
        {liked && (
          <p className="text-xs text-red-400 mt-2 text-right">
            ❤️ 찜한 상품이에요
          </p>
        )}
      </div>
    </section>
  );
}
