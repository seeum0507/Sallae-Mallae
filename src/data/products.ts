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

export const products: Product[] = [
  {
    id: "wm-001",
    name: "컴팩트 미니 세탁기 3.5kg",
    brand: "자취라이프",
    category: "가전 · 세탁기",
    categoryKey: "washing-machine",
    price: 189000,
    originalPrice: 249000,
    rating: 4.5,
    reviewCount: 1247,
    recommendCount: 892,
    thumbnail: "svg-washing-machine", // Special case for the existing SVG
    aiSentiment: { positive: 80, negative: 20 },
    aiSummary: {
      pros: "소음이 적고 세탁 성능이 좋아요.",
      cons: "이불 빨래는 어렵고 건조 기능이 없어요.",
      conclusion: "가성비 좋고 1인 가구 직장인에게 최고!",
    },
    keywords: [
      {
        id: "noise",
        label: "소음",
        count: 143,
        sentences: [
          "밤에 돌려도 옆집에 안 들릴 정도로 조용해요.",
          "탈수할 때 약간의 진동은 있지만 거슬리는 소음은 아닙니다.",
          "원룸이라 소음 걱정했는데 생각보다 훨씬 조용해서 만족합니다.",
        ],
      },
      {
        id: "design",
        label: "디자인",
        count: 89,
        sentences: [
          "화이트톤이라 인테리어를 해치지 않고 깔끔해요.",
          "동글동글한 디자인이 너무 귀엽습니다.",
        ],
      },
      {
        id: "power",
        label: "세탁력",
        count: 215,
        sentences: [
          "작은데도 때가 쏙쏙 잘 빠지네요.",
          "수건이랑 속옷 빨래용으로 샀는데 세탁력 기대 이상입니다.",
        ],
      },
      {
        id: "price",
        label: "가격",
        count: 176,
        sentences: [
          "이 가격에 이 정도 성능이면 거저네요.",
          "자취생 지갑 사정에 딱 맞는 착한 가격입니다.",
        ],
      },
      {
        id: "size",
        label: "크기",
        count: 302,
        sentences: [
          "원룸 화장실에 쏙 들어가는 아담한 사이즈예요.",
          "공간 차지를 많이 안 해서 너무 좋습니다.",
        ],
      },
    ],
    photoReviews: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&q=80",
        rating: 5,
        likes: 24,
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80",
        rating: 4,
        likes: 12,
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&q=80",
        rating: 5,
        likes: 56,
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1525904097878-c0af0c862d85?w=400&q=80",
        rating: 5,
        likes: 8,
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "자취 3년차 민지",
        initial: "민",
        avatarColor: "bg-blue-100 text-blue-600",
        date: "2023.10.15",
        rating: 5,
        content:
          "원룸에 살아서 큰 세탁기는 부담스러웠는데 사이즈가 딱이에요! 소음도 적어서 퇴근하고 밤에 돌려도 눈치 안 보입니다. 수건이랑 속옷 위주로 돌리는데 세탁력도 아주 만족스러워요. 가성비 최고입니다.",
        helpful: 124,
        replies: 3,
      },
      {
        id: "r2",
        author: "원룸러버",
        initial: "원",
        avatarColor: "bg-purple-100 text-purple-600",
        date: "2023.10.12",
        rating: 4,
        content:
          "디자인이 깔끔해서 화장실 구석에 둬도 예뻐요. 다만 용량이 작아서 이불 빨래는 코인세탁소 가야하는게 조금 아쉽네요. 그래도 혼자 사는 직장인한테는 이만한게 없는 것 같습니다.",
        helpful: 89,
        replies: 1,
      },
      {
        id: "r3",
        author: "깔끔쟁이",
        initial: "깔",
        avatarColor: "bg-mint-100 text-mint-600",
        date: "2023.10.08",
        rating: 5,
        content:
          "배송도 빠르고 설치도 간편했어요. 탈수할 때 약간 흔들림은 있지만 수평 잘 맞추면 괜찮습니다. 매일매일 조금씩 빨래하는 스타일이라 저한테는 완벽한 제품이네요.",
        helpful: 45,
        replies: 0,
      },
      {
        id: "r4",
        author: "프로자취러",
        initial: "프",
        avatarColor: "bg-orange-100 text-orange-600",
        date: "2023.10.01",
        rating: 4,
        content:
          "가격대비 훌륭합니다. 건조 기능이 없는건 아쉽지만 이 가격에 바라면 안되겠죠ㅎㅎ 자취 시작하는 친구한테도 추천했어요.",
        helpful: 32,
        replies: 0,
      },
    ],
  },
  {
    id: "rc-001",
    name: "1인용 미니 밥솥 1.5인분",
    brand: "쿠쿠",
    category: "가전 · 밥솥",
    categoryKey: "rice-cooker",
    price: 45000,
    originalPrice: 59000,
    rating: 4.8,
    reviewCount: 3421,
    recommendCount: 2105,
    thumbnail:
      "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=600&q=80",
    aiSentiment: { positive: 92, negative: 8 },
    aiSummary: {
      pros: "밥이 빨리 되고 보온 기능이 훌륭해요.",
      cons: "용량이 작아 손님 올 때는 부족해요.",
      conclusion: "혼자 밥 해먹는 자취생의 필수템!",
    },
    keywords: [
      {
        id: "taste",
        label: "밥맛",
        count: 450,
        sentences: [
          "햇반보다 훨씬 맛있어요.",
          "작은데도 밥이 찰지게 잘 됩니다.",
        ],
      },
      {
        id: "speed",
        label: "속도",
        count: 320,
        sentences: [
          "쾌속 취사하면 15분만에 밥이 완성돼요.",
          "퇴근하고 씻는 동안 밥이 다 돼서 너무 편합니다.",
        ],
      },
    ],
    photoReviews: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=400&q=80",
        rating: 5,
        likes: 45,
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "밥심으로산다",
        initial: "밥",
        avatarColor: "bg-yellow-100 text-yellow-600",
        date: "2023.11.02",
        rating: 5,
        content:
          "맨날 배달 시켜먹다가 식비 아끼려고 샀는데 대만족입니다. 딱 한두 끼 먹을 양만 할 수 있어서 밥이 남아서 버릴 일이 없어요.",
        helpful: 210,
        replies: 5,
      },
      {
        id: "r2",
        author: "자취초보",
        initial: "자",
        avatarColor: "bg-green-100 text-green-600",
        date: "2023.10.28",
        rating: 4,
        content:
          "디자인도 귀엽고 밥도 잘 됩니다. 다만 보온을 하루 이상 하면 밥이 좀 마르는 경향이 있어서 그때그때 해먹는게 좋아요.",
        helpful: 156,
        replies: 2,
      },
    ],
  },
  {
    id: "vc-001",
    name: "무선 핸디 청소기 초경량",
    brand: "샤오미",
    category: "가전 · 청소기",
    categoryKey: "vacuum",
    price: 39900,
    originalPrice: 45000,
    rating: 4.6,
    reviewCount: 2156,
    recommendCount: 1540,
    thumbnail:
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&q=80",
    aiSentiment: { positive: 85, negative: 15 },
    aiSummary: {
      pros: "가볍고 흡입력이 생각보다 강해요.",
      cons: "배터리 시간이 짧고 먼지통이 작아요.",
      conclusion: "원룸 머리카락 청소용으로 가성비 갑!",
    },
    keywords: [
      {
        id: "weight",
        label: "무게",
        count: 520,
        sentences: [
          "손목 안 아프고 너무 가벼워요.",
          "한 손으로 쓱쓱 밀기 딱 좋습니다.",
        ],
      },
      {
        id: "suction",
        label: "흡입력",
        count: 480,
        sentences: [
          "머리카락이랑 먼지 싹 빨아들입니다.",
          "작은데 힘이 좋네요.",
        ],
      },
    ],
    photoReviews: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&q=80",
        rating: 5,
        likes: 32,
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "머리숱부자",
        initial: "머",
        avatarColor: "bg-pink-100 text-pink-600",
        date: "2023.11.10",
        rating: 5,
        content:
          "방바닥에 굴러다니는 머리카락 치우는 용도로 샀는데 진짜 편해요. 돌돌이 쓰는 것보다 훨씬 빠르고 깔끔합니다.",
        helpful: 345,
        replies: 8,
      },
      {
        id: "r2",
        author: "깔끔남",
        initial: "깔",
        avatarColor: "bg-blue-100 text-blue-600",
        date: "2023.11.05",
        rating: 4,
        content:
          "원룸 청소하기엔 배터리가 충분한데, 투룸 이상이면 중간에 충전해야 할 수도 있어요. 그래도 가격 생각하면 훌륭합니다.",
        helpful: 120,
        replies: 1,
      },
    ],
  },
  {
    id: "mw-001",
    name: "플랫 전자레인지 20L",
    brand: "삼성전자",
    category: "가전 · 전자레인지",
    categoryKey: "microwave",
    price: 89000,
    originalPrice: 110000,
    rating: 4.9,
    reviewCount: 5432,
    recommendCount: 4200,
    thumbnail:
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&q=80",
    aiSentiment: { positive: 95, negative: 5 },
    aiSummary: {
      pros: "회전판이 없어서 청소가 편하고 큰 도시락도 들어가요.",
      cons: "버튼 터치감이 조금 뻑뻑해요.",
      conclusion: "편의점 도시락 자주 먹는다면 무조건 추천!",
    },
    keywords: [
      {
        id: "cleaning",
        label: "청소",
        count: 850,
        sentences: [
          "회전판 없어서 쓱 닦기만 하면 되니 너무 편해요.",
          "내부 청소가 진짜 신세계입니다.",
        ],
      },
      {
        id: "space",
        label: "공간",
        count: 720,
        sentences: [
          "편의점 큰 도시락도 안 걸리고 잘 돌아가요.",
          "내부가 넓어서 활용도가 높습니다.",
        ],
      },
    ],
    photoReviews: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&q=80",
        rating: 5,
        likes: 89,
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "편도매니아",
        initial: "편",
        avatarColor: "bg-orange-100 text-orange-600",
        date: "2023.11.15",
        rating: 5,
        content:
          "회전판 있는거 쓰다가 넘어왔는데 진짜 편합니다. 편의점 혜자도시락 같은거 넣어도 안 걸리고 잘 데워져요. 청소도 물티슈로 쓱 닦으면 끝입니다.",
        helpful: 560,
        replies: 12,
      },
      {
        id: "r2",
        author: "자취생A",
        initial: "자",
        avatarColor: "bg-gray-100 text-gray-600",
        date: "2023.11.12",
        rating: 5,
        content:
          "디자인도 깔끔하고 성능도 좋아요. 해동 기능도 잘 작동합니다. 자취방 필수템이에요.",
        helpful: 230,
        replies: 3,
      },
    ],
  },
  {
    id: "af-001",
    name: "올스텐 에어프라이어 3L",
    brand: "보토",
    category: "가전 · 에어프라이어",
    categoryKey: "air-fryer",
    price: 65000,
    originalPrice: 89000,
    rating: 4.7,
    reviewCount: 1890,
    recommendCount: 1200,
    thumbnail:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80",
    aiSentiment: { positive: 88, negative: 12 },
    aiSummary: {
      pros: "올스텐이라 환경호르몬 걱정 없고 세척이 편해요.",
      cons: "작동 시 소음이 약간 있는 편이에요.",
      conclusion: "냉동식품의 구원자, 자취생 삶의 질 수직 상승!",
    },
    keywords: [
      {
        id: "material",
        label: "소재",
        count: 620,
        sentences: [
          "올스텐이라 안심하고 씁니다.",
          "코팅 벗겨질 걱정 없어서 좋아요.",
        ],
      },
      {
        id: "taste",
        label: "맛",
        count: 580,
        sentences: [
          "냉동 치킨 돌려먹으면 파는 것 같아요.",
          "고구마 구워먹으면 꿀맛입니다.",
        ],
      },
    ],
    photoReviews: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80",
        rating: 5,
        likes: 67,
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "냉동인간",
        initial: "냉",
        avatarColor: "bg-blue-100 text-blue-600",
        date: "2023.11.18",
        rating: 5,
        content:
          "에어프라이어는 자취생한테 진짜 혁명입니다. 남은 치킨 데워먹을 때, 냉동 만두 구울 때 최고예요. 3L면 혼자 쓰기 딱 좋은 사이즈입니다.",
        helpful: 420,
        replies: 7,
      },
      {
        id: "r2",
        author: "건강챙기미",
        initial: "건",
        avatarColor: "bg-green-100 text-green-600",
        date: "2023.11.14",
        rating: 4,
        content:
          "코팅 벗겨지는게 찝찝해서 올스텐으로 샀는데 만족해요. 철수세미로 빡빡 닦아도 돼서 속이 다 시원합니다. 소음은 좀 있어요.",
        helpful: 280,
        replies: 4,
      },
    ],
  },
  {
    id: "hm-001",
    name: "무드등 미니 가습기",
    brand: "오아",
    category: "가전 · 가습기",
    categoryKey: "humidifier",
    price: 24900,
    originalPrice: 35000,
    rating: 4.4,
    reviewCount: 980,
    recommendCount: 650,
    thumbnail:
      "https://images.unsplash.com/photo-1632054010678-7f2e5a1a7355?w=600&q=80",
    aiSentiment: { positive: 75, negative: 25 },
    aiSummary: {
      pros: "디자인이 예쁘고 무드등 기능이 감성적이에요.",
      cons: "가습량이 적고 물통 청소가 약간 번거로워요.",
      conclusion: "침대 옆 협탁에 두기 좋은 감성템!",
    },
    keywords: [
      {
        id: "design",
        label: "디자인",
        count: 350,
        sentences: [
          "무드등 켜놓으면 방 분위기가 확 살아요.",
          "작고 귀여워서 인테리어 소품 같아요.",
        ],
      },
      {
        id: "moisture",
        label: "가습량",
        count: 280,
        sentences: [
          "원룸 전체를 커버하기엔 부족해요.",
          "침대 옆에 두고 자면 딱 좋습니다.",
        ],
      },
    ],
    photoReviews: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1632054010678-7f2e5a1a7355?w=400&q=80",
        rating: 4,
        likes: 23,
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "감성자취",
        initial: "감",
        avatarColor: "bg-purple-100 text-purple-600",
        date: "2023.11.20",
        rating: 5,
        content:
          "겨울이라 건조해서 샀는데 무드등 기능이 진짜 예뻐요. 자기 전에 켜놓으면 분위기 최고입니다. 가습량은 엄청 많진 않지만 머리맡에 두면 건조함은 덜해요.",
        helpful: 150,
        replies: 2,
      },
      {
        id: "r2",
        author: "비염환자",
        initial: "비",
        avatarColor: "bg-red-100 text-red-600",
        date: "2023.11.16",
        rating: 3,
        content:
          "가습량이 생각보다 약해서 아쉬워요. 방 전체 습도를 올리려면 더 큰 걸 사야할 것 같습니다. 디자인은 예뻐요.",
        helpful: 85,
        replies: 1,
      },
    ],
  },
  {
    id: "ts-001",
    name: "레트로 팝업 토스터기",
    brand: "스메그스타일",
    category: "가전 · 토스터",
    categoryKey: "toaster",
    price: 32000,
    originalPrice: 45000,
    rating: 4.6,
    reviewCount: 750,
    recommendCount: 520,
    thumbnail:
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&q=80",
    aiSentiment: { positive: 82, negative: 18 },
    aiSummary: {
      pros: "디자인이 레트로하고 예뻐서 주방이 화사해져요.",
      cons: "빵 부스러기 청소가 조금 귀찮아요.",
      conclusion: "아침 식사를 즐겁게 만들어주는 예쁜 토스터!",
    },
    keywords: [
      {
        id: "design",
        label: "디자인",
        count: 410,
        sentences: [
          "색감이 너무 예뻐서 주방 인테리어 포인트가 돼요.",
          "레트로한 감성이 마음에 쏙 듭니다.",
        ],
      },
      {
        id: "performance",
        label: "성능",
        count: 290,
        sentences: [
          "빵이 바삭하게 잘 구워져요.",
          "굽기 조절이 세밀해서 좋습니다.",
        ],
      },
    ],
    photoReviews: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400&q=80",
        rating: 5,
        likes: 41,
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "빵순이",
        initial: "빵",
        avatarColor: "bg-yellow-100 text-yellow-600",
        date: "2023.11.22",
        rating: 5,
        content:
          "아침마다 식빵 구워먹는데 너무 바삭하고 맛있게 잘 구워져요. 무엇보다 디자인이 예뻐서 볼 때마다 기분이 좋습니다.",
        helpful: 110,
        replies: 3,
      },
      {
        id: "r2",
        author: "귀차니즘",
        initial: "귀",
        avatarColor: "bg-gray-100 text-gray-600",
        date: "2023.11.19",
        rating: 4,
        content:
          "성능은 좋은데 아래 부스러기 받침대 빼서 청소하는게 은근 귀찮네요. 그래도 예뻐서 용서됩니다.",
        helpful: 65,
        replies: 0,
      },
    ],
  },
  {
    id: "cm-001",
    name: "캡슐 커피머신 미니",
    brand: "네스프레소",
    category: "가전 · 커피머신",
    categoryKey: "coffee",
    price: 129000,
    originalPrice: 159000,
    rating: 4.9,
    reviewCount: 4210,
    recommendCount: 3800,
    thumbnail:
      "https://images.unsplash.com/photo-1517701550927-30cfcbef5fac?w=600&q=80",
    aiSentiment: { positive: 96, negative: 4 },
    aiSummary: {
      pros: "크기가 작아 공간 차지를 안 하고 커피 맛이 훌륭해요.",
      cons: "캡슐 비용이 은근히 많이 들어요.",
      conclusion: "홈카페 로망 실현, 카페인 중독자 필수템!",
    },
    keywords: [
      {
        id: "taste",
        label: "커피맛",
        count: 1200,
        sentences: [
          "크레마가 장난 아니에요. 밖에서 사먹을 필요가 없습니다.",
          "다양한 캡슐 맛보는 재미가 쏠쏠해요.",
        ],
      },
      {
        id: "size",
        label: "크기",
        count: 980,
        sentences: [
          "정말 슬림해서 좁은 주방에도 쏙 들어갑니다.",
          "공간 활용도가 최고예요.",
        ],
      },
    ],
    photoReviews: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1517701550927-30cfcbef5fac?w=400&q=80",
        rating: 5,
        likes: 120,
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "홈카페마스터",
        initial: "홈",
        avatarColor: "bg-orange-100 text-orange-600",
        date: "2023.11.25",
        rating: 5,
        content:
          "매일 아침 커피 수혈하는데 카페 가는 돈 아끼려고 샀어요. 진작 살 걸 그랬습니다. 크레마도 풍부하고 너무 맛있어요. 좁은 자취방 주방에도 딱입니다.",
        helpful: 890,
        replies: 15,
      },
      {
        id: "r2",
        author: "통장텅텅",
        initial: "통",
        avatarColor: "bg-red-100 text-red-600",
        date: "2023.11.21",
        rating: 4,
        content:
          "기계값은 싼데 캡슐값이 은근 무시 못하네요ㅋㅋ 그래도 밖에서 사먹는 것보단 싸니까 위안 삼습니다. 성능은 완벽해요.",
        helpful: 450,
        replies: 8,
      },
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function searchProducts(query: string, categoryKey?: string): Product[] {
  let results = products;

  if (categoryKey && categoryKey !== "all") {
    results = results.filter((p) => p.categoryKey === categoryKey);
  }

  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    );
  }

  return results;
}
