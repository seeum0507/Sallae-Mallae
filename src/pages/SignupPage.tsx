import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Mail, Lock, User } from "lucide-react";
export function SignupPage() {
  const navigate = useNavigate();
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup - redirect to login
    navigate("/login");
  };
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.03)] border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-mint-100 p-3 rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-mint-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">회원가입</h1>
          <p className="text-gray-500 text-sm">
            자취꿀템 AI의 멤버가 되어보세요
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이름 (닉네임)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-mint-500/20 focus:border-mint-500 transition-colors"
                placeholder="자취 3년차 민지"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-mint-500/20 focus:border-mint-500 transition-colors"
                placeholder="hello@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-mint-500/20 focus:border-mint-500 transition-colors"
                placeholder="8자 이상 입력해주세요"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-mint-500 hover:bg-mint-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm shadow-mint-500/20 mt-6"
          >
            가입하기
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link
              to="/login"
              className="font-bold text-mint-600 hover:text-mint-700"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
