import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Product } from "../data/products";
import { fetchProduct, analyzeProduct } from "../api";
import { ProductHeader } from "../components/ProductHeader";
import { AIAnalysisSection } from "../components/AIAnalysisSection";
import { KeywordFilter } from "../components/KeywordFilter";
import { PhotoGallery } from "../components/PhotoGallery";
import { ReviewList } from "../components/ReviewList";
import { ReviewForm } from "../components/ReviewForm";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  // ✅ 상세 페이지 진입 시 자동 AI 분석이 돌고 있는지 보여주기 위한 상태
  const [analyzing, setAnalyzing] = useState(false);

  const loadProduct = useCallback(async () => {
    if (!id) return;
    try {
      const data = await fetchProduct(id);
      setProduct(data);
      return data;
    } catch (err) {
      console.error("상품 불러오기 실패:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    setLoading(true);
    loadProduct().then((data) => {
      // ✅ 핵심: 아직 AI 분석이 안 된 상품(aiAnalyzed === false)이고
      //    리뷰가 존재하면, 상세 페이지 진입과 동시에 분석을 트리거하고
      //    분석이 끝나면 상품 데이터를 다시 불러와서 화면에 반영
      if (data && !data.aiAnalyzed && data.reviewCount > 0 && id) {
        setAnalyzing(true);
        analyzeProduct(id)
          .then(() => loadProduct())
          .catch((err) => console.error("자동 AI 분석 실패:", err))
          .finally(() => setAnalyzing(false));
      }
    });
  }, [loadProduct, id]);

  // 리뷰 제출 후 3초 뒤 상품 데이터 새로고침 (AI 분석 시간 고려)
  const handleReviewSubmitted = useCallback(() => {
    setTimeout(() => {
      loadProduct();
    }, 3000);
  }, [loadProduct]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-10">
        <div className="flex flex-col md:flex-row gap-8 py-8">
          <div className="w-full md:w-[45%] bg-gray-100 rounded-3xl aspect-square animate-pulse" />
          <div className="w-full md:w-[55%] space-y-4">
            <div className="h-6 bg-gray-100 rounded animate-pulse w-1/3" />
            <div className="h-10 bg-gray-100 rounded animate-pulse w-3/4" />
            <div className="h-6 bg-gray-100 rounded animate-pulse w-1/4" />
            <div className="h-12 bg-gray-100 rounded animate-pulse w-1/2 mt-8" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          상품을 찾을 수 없습니다.
        </h2>
        <Link to="/" className="text-mint-600 hover:underline">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className="pt-6 pb-2">
        <Link
          to={-1 as any}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>뒤로 가기</span>
        </Link>
      </div>

      <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
        <ProductHeader product={product} />
      </motion.div>

      {/* ✅ 자동 분석이 진행되는 동안 보여줄 안내 배너 */}
      {analyzing && (
        <div className="bg-mint-50 border border-mint-100 rounded-2xl px-5 py-3 mb-4 text-sm text-mint-700 font-medium flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-mint-500 animate-pulse" />
          AI가 리뷰를 분석하고 있어요. 잠시만 기다려주세요...
        </div>
      )}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <AIAnalysisSection product={product} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <KeywordFilter product={product} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <PhotoGallery product={product} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <ReviewList product={product} onRefresh={loadProduct} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <ReviewForm
          productId={product.id}
          onReviewSubmitted={handleReviewSubmitted}
        />
      </motion.div>
    </div>
  );
}
