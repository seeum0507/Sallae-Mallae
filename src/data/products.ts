export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  categoryKey: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  recommendCount: number;
  thumbnail: string;
  aiSentiment: { positive: number; negative: number };
  aiSummary: { pros: string; cons: string; conclusion: string };
  keywords: { id: string; label: string; count: number; sentences: string[] }[];
  photoReviews: { id: number; url: string; rating: number; likes: number }[];
  reviews: {
    id: string;
    author: string;
    initial: string;
    avatarColor: string;
    date: string;
    rating: number;
    content: string;
    helpful: number;
    replies: number;
    hasPhoto?: boolean;
    images?: string[];
  }[];
}

export const categories = [
  { key: "all", label: "전체" },
  { key: "rice-cooker", label: "밥솥" },
  { key: "washing-machine", label: "세탁기" },
  { key: "vacuum", label: "청소기" },
  { key: "microwave", label: "전자레인지" },
  { key: "air-fryer", label: "에어프라이어" },
  { key: "humidifier", label: "가습기" },
  { key: "toaster", label: "토스터" },
  { key: "coffee", label: "커피머신" },
];
