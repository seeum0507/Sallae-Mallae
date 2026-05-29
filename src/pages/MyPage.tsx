import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Settings, LogOut, Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { fetchMe, fetchProducts } from "../api";
import { ProductCard } from "../components/ProductCard";
import { Product } from "../data/products";

interface MyReview {
  id: string;
  productId: string;
  productName: string;
  productThumbnail: string;
  rating: number;
  content: string;
  date: string;
  helpful: number;
}

export function MyPage() {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [myReviews, setMyReviews] = useState<MyReview[]>([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    Promise.all([
      fetchMe().then(async (data) => {
        if (!data) return;
        setReviewCount(data.reviewCount || 0);
        setMyReviews(data.myReviews || []);

        // 찜한 상품 ID로 상품 목록 불러오기
        if (data.likedProductIds && data.likedProductIds.length > 0) {
          const allProducts = await fetchProducts();
          const liked = allProducts.filter((p: Product) =>
            data.likedProductIds.includes(p.id)
          );
          setLikedProducts(liked);
        } else {
          setLikedProducts([]);
        }
      }),
    ]).finally(() => setLoading(false));
  }, [isLoggedIn]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      {/* 프로필 카드 */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-24 h-24 bg-mint-100 rounded-full flex items-center justify-center text-mint-600 text-3xl font-bold flex-shrink-0">
          {user.nickname.charAt(0)}
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium mb-2">
            일반 회원
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {user.nickname}
          </h1>
          <p className="text-gray-500 text-sm mb-4">{user.email}</p>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-mint-600 transition-colors bg-gray-50 hover:bg-mint-50 px-4 py-2 rounded-xl">
              <Settings className="w-4 h-4" />
              설정
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors bg-gray-50 hover:bg-red-50 px-4 py-2 rounded-xl"
            >
              <LogOut className="w-4 h-4" />
              로그아웃
            </button>
          </div>
        </div>
        <div className="flex gap-8 md:border-l border-gray-100 md:pl-8 pt-6 md:pt-0 w-full md:w-auto justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {likedProducts.length}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1 justify-center">
              <Heart className="w-4 h-4" /> 찜한 상품
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {reviewCount}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1 justify-center">
              <MessageCircle className="w-4 h-4" /> 내 리뷰
            </div>
          </div>
        </div>
      </div>

      {/* 찜한 상품 섹션 */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-400 fill-red-400" />
            찜한 상품
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-2xl aspect-square animate-pulse"
              />
            ))}
          </div>
        ) : likedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {likedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center py-12">
            <Heart className="w-12 h-12 mx-auto text-gray-200 mb-3" />
            <p className="text-gray-500">아직 찜한 상품이 없습니다.</p>
            <p className="text-sm text-gray-400 mt-1">
              상품 상세 페이지에서 하트를 눌러보세요!
            </p>
            <Link
              to="/search"
              className="inline-block mt-4 text-mint-600 font-medium text-sm hover:underline"
            >
              상품 둘러보기
            </Link>
          </div>
        )}
      </section>

      {/* 내가 쓴 리뷰 섹션 */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
          <MessageCircle className="w-5 h-5 text-mint-500" />
          내가 쓴 리뷰
        </h2>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-2xl h-24 animate-pulse"
              />
            ))}
          </div>
        ) : myReviews.length > 0 ? (
          <div className="space-y-4">
            {myReviews.map((review) => (
              <Link
                key={review.id}
                to={`/product/${review.productId}`}
                className="block bg-white rounded-2xl border border-gray-100 p-5 hover:border-mint-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  {/* 상품 썸네일 */}
                  {review.productThumbnail &&
                  review.productThumbnail !== "svg-washing-machine" ? (
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                      <img
                        src={review.productThumbnail}
                        alt={review.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-mint-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🫧</span>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    {/* 상품명 */}
                    <div className="text-xs text-gray-400 mb-1 truncate">
                      {review.productName}
                    </div>
                    {/* 별점 + 날짜 */}
                    <div className="flex items-center gap-2 mb-1.5">
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
                    {/* 리뷰 내용 */}
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {review.content}
                    </p>
                    {/* 도움돼요 수 */}
                    <div className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                      <span>👍 도움돼요 {review.helpful}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center py-12">
            <MessageCircle className="w-12 h-12 mx-auto text-gray-200 mb-3" />
            <p className="text-gray-500">아직 작성한 리뷰가 없습니다.</p>
            <p className="text-sm text-gray-400 mt-1">
              상품 상세 페이지에서 리뷰를 남겨보세요!
            </p>
            <Link
              to="/search"
              className="inline-block mt-4 text-mint-600 font-medium text-sm hover:underline"
            >
              상품 둘러보기
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
