import React, { useEffect, useState } from "react";
import { MessageSquareQuote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../data/products";
interface KeywordFilterProps {
  product: Product;
}
export function KeywordFilter({ product }: KeywordFilterProps) {
  const [activeKeyword, setActiveKeyword] = useState(
    product.keywords[0]?.id || ""
  );
  useEffect(() => {
    if (product.keywords.length > 0) {
      setActiveKeyword(product.keywords[0].id);
    }
  }, [product]);
  if (!product.keywords || product.keywords.length === 0) return null;
  const activeKeywordData =
    product.keywords.find((k) => k.id === activeKeyword) || product.keywords[0];
  return (
    <section className="py-8">
      <div className="mb-4 flex items-center gap-2">
        <h3 className="text-lg font-bold text-gray-900">AI가 뽑은 키워드</h3>
        <span className="text-sm text-gray-500">키워드를 눌러보세요</span>
      </div>

      {/* Hashtag Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {product.keywords.map((kw) => {
          const isActive = activeKeyword === kw.id;
          return (
            <button
              key={kw.id}
              onClick={() => setActiveKeyword(kw.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                ${
                  isActive
                    ? "bg-mint-500 text-white border-mint-500 shadow-md shadow-mint-500/20"
                    : "bg-white text-gray-600 border-gray-200 hover:border-mint-300 hover:bg-mint-50 hover:text-mint-600"
                }
              `}
            >
              #{kw.label}{" "}
              <span
                className={`ml-1 text-xs ${
                  isActive ? "text-mint-100" : "text-gray-400"
                }`}
              >
                ({kw.count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Extracted Sentences */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeKeyword}
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -10,
          }}
          transition={{
            duration: 0.2,
          }}
          className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-4">
            <MessageSquareQuote className="w-5 h-5 text-mint-500" />
            <span className="text-sm font-bold text-gray-700">
              AI가 추출한{" "}
              <span className="text-mint-600">#{activeKeywordData.label}</span>{" "}
              관련 문장
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {activeKeywordData.sentences.map((sentence, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-sm text-gray-600 leading-relaxed relative"
              >
                <div className="absolute top-3 left-3 text-gray-200 text-2xl font-serif leading-none">
                  "
                </div>
                <p className="relative z-10 pl-4">{sentence}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
