import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Mail, Lock } from "lucide-react";
import { login as loginApi } from "../api";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginApi(email, password);
      login(data.token, data.user);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.03)] border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-mint-100 p-3 rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-mint-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            살래말래? 로그인
          </h1>
          <p className="text-gray-500 text-sm">
            나에게 딱 맞는 자취템을 찾아보세요
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-mint-500/20 focus:border-mint-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm mt-2 ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-mint-500 hover:bg-mint-600 shadow-mint-500/20"
            }`}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            아직 계정이 없으신가요?{" "}
            <Link
              to="/signup"
              className="font-bold text-mint-600 hover:text-mint-700"
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
