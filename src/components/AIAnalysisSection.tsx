import React from "react";
import { Sparkles, ThumbsUp, ThumbsDown, CheckCircle2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Product } from "../data/products";
const COLORS = ["#10B981", "#FB923C"]; // mint-500, softOrange-400
interface AIAnalysisSectionProps {
  product: Product;
}
export function AIAnalysisSection({ product }: AIAnalysisSectionProps) {
  const data = [
    {
      name: "긍정",
      value: product.aiSentiment.positive,
    },
    {
      name: "부정",
      value: product.aiSentiment.negative,
    },
  ];
  return (
    <section className="py-6">
      <div className="bg-mint-50 rounded-[2rem] p-8 md:p-10 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col items-center mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 shadow-sm border border-white">
            <Sparkles className="w-4 h-4 text-mint-600" />
            <span className="text-sm font-bold text-mint-700">
              AI 리뷰 분석 결과
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            AI가 {product.reviewCount.toLocaleString()}개 리뷰를 분석했어요
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
          {/* Left: Donut Chart */}
          <div className="flex flex-col items-center justify-center bg-white/40 rounded-3xl p-6 backdrop-blur-sm border border-white/50">
            <div className="relative w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={8}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Center Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-bold text-gray-900 tracking-tighter">
                  {product.aiSentiment.positive}
                  <span className="text-2xl">%</span>
                </span>
                <span className="text-sm font-medium text-mint-600 mt-1">
                  긍정적
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-6 bg-white px-5 py-2.5 rounded-full shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-mint-500" />
                <span className="text-sm font-medium text-gray-700">
                  긍정 {product.aiSentiment.positive}%
                </span>
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-softOrange-400" />
                <span className="text-sm font-medium text-gray-700">
                  부정 {product.aiSentiment.negative}%
                </span>
              </div>
            </div>
          </div>

          {/* Right: 3-Line Summary */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-mint-100 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-mint-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">AI의 3줄 요약</h3>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 bg-mint-50 p-1.5 rounded-lg text-mint-600 flex-shrink-0">
                  <ThumbsUp className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-bold text-gray-900 block mb-0.5">
                    장점
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.aiSummary.pros}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 bg-orange-50 p-1.5 rounded-lg text-softOrange-500 flex-shrink-0">
                  <ThumbsDown className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-bold text-gray-900 block mb-0.5">
                    단점
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.aiSummary.cons}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-start gap-3 bg-mint-50/50 p-4 rounded-2xl border border-mint-100/50">
                  <div className="mt-0.5 text-mint-500 flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-mint-700 block mb-0.5">
                      결론
                    </span>
                    <p className="text-gray-900 font-bold text-base leading-relaxed">
                      {product.aiSummary.conclusion}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
