import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { Sparkles, Search } from "lucide-react";
import { categories, Product } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { fetchProducts } from "../api";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error("상품 불러오기 실패:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const popularProducts = products.slice(0, 4);
  const aiRecommendedProducts = products
    .filter((p) => p.aiAnalyzed && p.aiSentiment.positive >= 90)
    .slice(0, 4);

  return (
    <div className="pb-24">
      <section className="bg-mint-50/50 pt-16 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full mb-6 shadow-sm border border-mint-100 text-mint-600 text-sm font-bold">
              <Sparkles className="w-4 h-4" />
              <span>AI가 분석해주는 진짜 자취템 리뷰</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
              실패 없는 자취 생활,
              <br />
              <span className="text-mint-500">살래말래? AI</span>와 함께
              시작하세요
            </h1>
            <p className="text-gray-600 mb-10 text-lg">
              수만 개의 리뷰를 AI가 요약 분석하여 나에게 딱 맞는 가전을
              추천해드려요.
            </p>

            <form
              onSubmit={handleSearch}
              className="relative max-w-2xl mx-auto shadow-lg shadow-mint-500/10 rounded-full"
            >
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-mint-500" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full pl-14 pr-32 py-5 border-2 border-white rounded-full text-lg bg-white placeholder-gray-400 focus:outline-none focus:border-mint-300 transition-colors"
                placeholder="어떤 자취템을 찾으시나요? (예: 미니 밥솥)"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-mint-500 hover:bg-mint-600 text-white font-bold px-6 rounded-full transition-colors"
              >
                검색
              </button>
            </form>

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {categories.slice(1, 6).map((cat) => (
                <Link
                  key={cat.key}
                  to={`/search?category=${cat.key}`}
                  className="bg-white border border-gray-200 hover:border-mint-300 hover:text-mint-600 px-4 py-2 rounded-full text-sm font-medium text-gray-600 transition-colors shadow-sm"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-20">
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                🔥 지금 뜨는 자취꿀템
              </h2>
              <p className="text-gray-500">
                자취생들이 가장 많이 찾는 인기 상품이에요
              </p>
            </div>
            <Link
              to="/search"
              className="text-sm font-medium text-mint-600 hover:text-mint-700"
            >
              전체보기 &gt;
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-2xl aspect-square animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {popularProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ✨ AI 만족도 90% 이상
              </h2>
              <p className="text-gray-500">
                리뷰 분석 결과 긍정 비율이 압도적인 상품들
              </p>
            </div>
            <Link
              to="/search"
              className="text-sm font-medium text-mint-600 hover:text-mint-700"
            >
              전체보기 &gt;
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-2xl aspect-square animate-pulse"
                />
              ))}
            </div>
          ) : aiRecommendedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {aiRecommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-mint-50/50 border border-mint-100 rounded-2xl py-12 px-6 text-center">
              <p className="text-gray-500">
                아직 AI 만족도 90% 이상인 상품이 없어요.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
