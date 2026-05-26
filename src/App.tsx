import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TopNav } from "./components/TopNav";
import { HomePage } from "./pages/HomePage";
import { SearchResultsPage } from "./pages/SearchResultsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { MyPage } from "./pages/MyPage";
import { AllReviewsPage } from "./pages/AllReviewsPage";
import { PhotoReviewsPage } from "./pages/PhotoReviewsPage";

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-white selection:bg-mint-200 selection:text-mint-900">
          <TopNav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/product/:id/reviews" element={<AllReviewsPage />} />
            <Route path="/product/:id/photos" element={<PhotoReviewsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
