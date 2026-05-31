import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Product } from "../data/products";
import { fetchProduct } from "../api";
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

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProduct(id)
      .then((data) => setProduct(data))
      .catch((err) => console.error("상품 불러오기 실패:", err))
      .finally(() => setLoading(false));
  }, [id]);

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
        <ReviewList product={product} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <ReviewForm productId={product.id} />
      </motion.div>
    </div>
  );
}
