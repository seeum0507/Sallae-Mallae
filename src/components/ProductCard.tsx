import React from "react";
import { Link } from "react-router-dom";
import { Star, Sparkles } from "lucide-react";
import { Product } from "../data/products";
interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
        {/* Thumbnail */}
        <div className="aspect-square bg-gray-50 relative overflow-hidden">
          {product.thumbnail === "svg-washing-machine" ? (
            <div className="w-full h-full flex items-center justify-center p-6">
              <svg
                viewBox="0 0 240 280"
                className="w-full h-full max-w-[180px] transition-transform duration-500 group-hover:scale-105"
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
                <rect
                  x="44"
                  y="46"
                  width="30"
                  height="8"
                  rx="2"
                  fill="#10B981"
                />
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
            </div>
          ) : (
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {/* AI Badge */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3 text-mint-500" />
            <span className="text-xs font-bold text-mint-700">
              긍정 {product.aiSentiment.positive}%
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
          <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-mint-600 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            <Star className="w-3.5 h-3.5 fill-mint-400 text-mint-400" />
            <span className="text-sm font-bold text-gray-900">
              {product.rating}
            </span>
            <span className="text-xs text-gray-400">
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>

          <div className="mt-auto">
            <div className="flex items-end gap-1.5">
              <span className="text-lg font-bold text-gray-900">
                ₩{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through mb-0.5">
                  ₩{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
