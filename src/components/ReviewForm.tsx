import React, { useState } from "react";
import { Star, Camera, Send } from "lucide-react";
export function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState("");
  return (
    <section className="py-8 border-t border-gray-100">
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.03)] border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          리뷰를 작성해보세요
        </h3>

        {/* Star Rating Input */}
        <div className="flex flex-col items-center justify-center mb-8">
          <span className="text-sm font-medium text-gray-500 mb-3">
            상품은 어떠셨나요?
          </span>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none transition-transform hover:scale-110"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`w-10 h-10 transition-colors duration-200 ${
                    star <= (hoverRating || rating)
                      ? "fill-mint-400 text-mint-400"
                      : "fill-gray-100 text-gray-200"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="h-4 mt-2">
            <span className="text-sm font-bold text-mint-600">
              {rating === 5
                ? "최고예요!"
                : rating === 4
                ? "좋아요"
                : rating === 3
                ? "보통이에요"
                : rating === 2
                ? "별로예요"
                : rating === 1
                ? "최악이에요"
                : ""}
            </span>
          </div>
        </div>

        {/* Text Input */}
        <div className="relative mb-4">
          <textarea
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 min-h-[120px] text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mint-500/20 focus:border-mint-500 transition-colors resize-none"
            placeholder="이 제품에 대한 솔직한 후기를 남겨주세요. 자취생들에게 큰 도움이 됩니다!"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Camera className="w-5 h-5" />
            <span>사진 첨부</span>
          </button>

          <button
            type="button"
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all ${
              rating > 0 && content.length > 0
                ? "bg-mint-500 hover:bg-mint-600 shadow-md shadow-mint-500/20"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <span>리뷰 등록하기</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
