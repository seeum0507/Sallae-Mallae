const BASE_URL = "http://localhost:3001/api";

function getToken(): string | null {
  return localStorage.getItem("token");
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// 상품
export async function fetchProducts(query = "", category = "all") {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (category !== "all") params.set("category", category);
  const res = await fetch(`${BASE_URL}/products?${params}`);
  return res.json();
}

export async function fetchProduct(id: string) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
}

// 찜 상태 조회
export async function fetchLikeStatus(
  productId: string
): Promise<{ liked: boolean }> {
  const token = getToken();
  if (!token) return { liked: false };
  const res = await fetch(`${BASE_URL}/products/${productId}/like`, {
    headers: authHeaders(),
  });
  if (!res.ok) return { liked: false };
  return res.json();
}

// 찜 토글
export async function toggleLike(
  productId: string
): Promise<{ liked: boolean }> {
  const res = await fetch(`${BASE_URL}/products/${productId}/like`, {
    method: "POST",
    headers: { ...authHeaders() },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "찜 실패");
  return data;
}

// 리뷰
export async function fetchReviews(productId: string, sort = "helpful") {
  const res = await fetch(
    `${BASE_URL}/reviews/product/${productId}?sort=${sort}`
  );
  return res.json();
}

export async function postReview(data: {
  productId: string;
  rating: number;
  content: string;
  images?: string[];
}) {
  const res = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "리뷰 등록 실패");
  return result;
}

export async function likeReview(reviewId: string) {
  const res = await fetch(`${BASE_URL}/reviews/${reviewId}/helpful`, {
    method: "PATCH",
  });
  return res.json();
}

// 이미지 업로드 (리뷰용)
export async function uploadImages(files: File[]): Promise<string[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));
  const res = await fetch("http://localhost:3001/api/upload", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "이미지 업로드 실패");
  return data.urls;
}

// 인증
export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "로그인 실패");
  return data;
}

export async function signup(
  nickname: string,
  email: string,
  password: string
) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nickname, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "회원가입 실패");
  return data;
}

export async function fetchMe() {
  const res = await fetch(`${BASE_URL}/auth/me`, { headers: authHeaders() });
  if (!res.ok) return null;
  return res.json();
}

export async function analyzeProduct(productId: string) {
  const res = await fetch(`${BASE_URL}/ai/analyze/${productId}`, {
    method: "POST",
  });
  return res.json();
}
