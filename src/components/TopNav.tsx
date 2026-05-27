import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Sparkles, Search, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function TopNav() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const { isLoggedIn, user, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/search");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 flex-shrink-0 cursor-pointer group"
        >
          <div className="bg-mint-100 p-1.5 rounded-lg group-hover:bg-mint-200 transition-colors">
            <Sparkles className="w-5 h-5 text-mint-500" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 hidden sm:block">
            살래말래?
          </span>
        </Link>

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

        <nav className="flex items-center gap-4 flex-shrink-0">
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

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                to="/mypage"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-mint-600 transition-colors px-3 py-1.5 rounded-full hover:bg-mint-50"
              >
                <div className="w-7 h-7 bg-mint-100 rounded-full flex items-center justify-center text-mint-600 text-xs font-bold">
                  {user?.nickname.charAt(0)}
                </div>
                <span className="hidden sm:block">{user?.nickname}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                title="로그아웃"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-mint-600 transition-colors px-3 py-1.5 rounded-full hover:bg-mint-50"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="text-sm font-bold text-white bg-mint-500 hover:bg-mint-600 transition-colors px-4 py-1.5 rounded-full"
              >
                회원가입
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
