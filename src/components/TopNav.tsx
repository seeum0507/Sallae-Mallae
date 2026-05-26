import React, { useState, Component } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Sparkles, Search, User } from "lucide-react";
export function TopNav() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/search");
    }
  };
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 flex-shrink-0 cursor-pointer group"
        >
          <div className="bg-mint-100 p-1.5 rounded-lg group-hover:bg-mint-200 transition-colors">
            <Sparkles className="w-5 h-5 text-mint-500" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 hidden sm:block">
            자취꿀템 AI
          </span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md relative">
          <button
            type="submit"
            className="absolute inset-y-0 left-0 pl-3 flex items-center"
          >
            <Search className="h-4 w-4 text-gray-400 hover:text-mint-500 transition-colors" />
          </button>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-mint-500/20 focus:border-mint-500 transition-colors sm:text-sm"
            placeholder="자취템 검색하기... (예: 밥솥, 세탁기)"
          />
        </form>

        {/* Right Nav */}
        <nav className="flex items-center gap-6 flex-shrink-0">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link
              to="/search?category=washing-machine"
              className="hover:text-mint-600 transition-colors"
            >
              가전
            </Link>
            <Link
              to="/search?category=all"
              className="hover:text-mint-600 transition-colors"
            >
              가구
            </Link>
            <Link
              to="/search?category=all"
              className="hover:text-mint-600 transition-colors"
            >
              생활용품
            </Link>
          </div>
          <Link
            to="/mypage"
            className="p-2 text-gray-400 hover:text-mint-600 transition-colors rounded-full hover:bg-mint-50"
          >
            <User className="w-5 h-5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
