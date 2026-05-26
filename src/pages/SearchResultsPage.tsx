import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search } from "lucide-react";
import { searchProducts, categories } from "../data/products";
import { ProductCard } from "../components/ProductCard";
export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const categoryKey = searchParams.get("category") || "all";
  const results = searchProducts(query, categoryKey);
  const handleCategoryClick = (key: string) => {
    if (key === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", key);
    }
    setSearchParams(searchParams);
  };
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {query ? (
            <span>
              <span className="text-mint-600">'{query}'</span> 검색 결과
            </span>
          ) : (
            <span>전체 상품</span>
          )}
        </h1>
        <p className="text-gray-500">
          총 {results.length}개의 상품이 있습니다.
        </p>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-100">
        {categories.map((cat) => {
          const isActive = categoryKey === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => handleCategoryClick(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "bg-mint-500 text-white shadow-sm"
                  : "bg-gray-50 text-gray-600 hover:bg-mint-50 hover:text-mint-600"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
            <Search className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            검색 결과가 없습니다
          </h3>
          <p className="text-gray-500 mb-6">
            다른 검색어나 카테고리를 선택해보세요.
          </p>
          <Link
            to="/search"
            className="text-mint-600 font-medium hover:underline"
          >
            전체 상품 보기
          </Link>
        </div>
      )}
    </div>
  );
}
