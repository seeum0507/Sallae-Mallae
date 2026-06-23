import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Star, Send, ImagePlus, X } from "lucide-react";
import { postReview, uploadImages } from "../api";
import { useAuth } from "../context/AuthContext";

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted?: () => void; // 추가: 제출 후 부모에게 알림
}

export function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
  const { isLoggedIn } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = 5 - selectedFiles.length;
    if (remaining <= 0) return;
    const newFiles = files.slice(0, remaining);
    setSelectedFiles((prev) => [...prev, ...newFiles]);
    const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!rating || !content.trim()) return;
    setError("");
    setSubmitting(true);
    try {
      let imageUrls: string[] = [];
      if (selectedFiles.length > 0) {
        imageUrls = await uploadImages(selectedFiles);
      }
      await postReview({ productId, rating, content, images: imageUrls });
      setSubmitted(true);
      setRating(0);
      setContent("");
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
      setSelectedFiles([]);
      setPreviewUrls([]);

      // 부모 컴포넌트에 제출 완료 알림 (상품 데이터 새로고침용)
      onReviewSubmitted?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <section className="py-8 border-t border-gray-100">
        <div className="bg-gray-50 rounded-3xl p-8 text-center border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            리뷰를 작성하려면 로그인이 필요해요
          </h3>
          <p className="text-gray-500 text-sm mb-5">
            로그인 후 소중한 경험을 공유해주세요!
          </p>
          <Link
            to="/login"
            className="inline-block bg-mint-500 hover:bg-mint-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            로그인하기
          </Link>
        </div>
      </section>
    );
  }

  if (submitted) {
    return (
      <section className="py-8 border-t border-gray-100">
        <div className="bg-mint-50 rounded-3xl p-8 text-center border border-mint-100">
          <div className="text-4xl mb-3">🎉</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            리뷰가 등록됐어요!
          </h3>
          <p className="text-gray-500 text-sm mb-1">소중한 리뷰 감사합니다.</p>
          <p className="text-xs text-mint-600 mb-4">
            ✨ AI가 리뷰를 분석 중이에요. 잠시 후 분석 결과가 업데이트됩니다.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-mint-600 font-medium text-sm hover:underline"
          >
            리뷰 더 작성하기
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 border-t border-gray-100">
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.03)] border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          리뷰를 작성해보세요
        </h3>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}

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

        <div className="relative mb-4">
          <textarea
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 min-h-[120px] text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mint-500/20 focus:border-mint-500 transition-colors resize-none"
            placeholder="이 제품에 대한 솔직한 후기를 남겨주세요!"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="mb-6">
          {selectedFiles.length < 5 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-mint-600 transition-colors border border-dashed border-gray-300 hover:border-mint-400 hover:bg-mint-50 px-4 py-2.5 rounded-xl w-fit"
            >
              <ImagePlus className="w-4 h-4" />
              <span>
                사진 추가{" "}
                <span className="text-gray-400 font-normal">
                  ({selectedFiles.length}/5, 선택사항)
                </span>
              </span>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageSelect}
          />
          {previewUrls.length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {previewUrls.map((url, i) => (
                <div
                  key={i}
                  className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 group"
                >
                  <img
                    src={url}
                    alt={`첨부 이미지 ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full w-5 h-5 flex items-center justify-center transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!rating || !content.trim() || submitting}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all ${
              rating > 0 && content.trim() && !submitting
                ? "bg-mint-500 hover:bg-mint-600 shadow-md shadow-mint-500/20"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <span>{submitting ? "등록 중..." : "리뷰 등록하기"}</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
