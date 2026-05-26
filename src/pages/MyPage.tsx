import React from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Settings, LogOut } from "lucide-react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
export function MyPage() {
  // Mock liked products
  const likedProducts = products.slice(0, 3);
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-24 h-24 bg-mint-100 rounded-full flex items-center justify-center text-mint-600 text-3xl font-bold flex-shrink-0">
          민
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium mb-2">
            일반 회원
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            자취 3년차 민지
          </h1>
          <p className="text-gray-500 text-sm mb-4">hello@example.com</p>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-mint-600 transition-colors bg-gray-50 hover:bg-mint-50 px-4 py-2 rounded-xl">
              <Settings className="w-4 h-4" />
              설정
            </button>
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors bg-gray-50 hover:bg-red-50 px-4 py-2 rounded-xl"
            >
              <LogOut className="w-4 h-4" />
              로그아웃
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-8 md:border-l border-gray-100 md:pl-8 pt-6 md:pt-0 w-full md:w-auto justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">12</div>
            <div className="text-sm text-gray-500 flex items-center gap-1 justify-center">
              <Heart className="w-4 h-4" /> 찜한 상품
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">5</div>
            <div className="text-sm text-gray-500 flex items-center gap-1 justify-center">
              <MessageCircle className="w-4 h-4" /> 내 리뷰
            </div>
          </div>
        </div>
      </div>

      {/* Liked Products Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Heart className="w-5 h-5 text-mint-500 fill-mint-100" />
            내가 찜한 상품
          </h2>
          <button className="text-sm font-medium text-gray-500 hover:text-mint-600">
            전체보기
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {likedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* My Reviews Section (Mock) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-mint-500 fill-mint-100" />
            내가 쓴 리뷰
          </h2>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto text-gray-200 mb-3" />
            <p>아직 작성한 리뷰가 없습니다.</p>
            <p className="text-sm mt-1">구매하신 상품의 리뷰를 남겨보세요!</p>
          </div>
        </div>
      </section>
    </div>
  );
}
