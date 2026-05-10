import { Post } from "@/types";

export const DUMMY_POSTS: Post[] = [
  {
    id: "1",
    title: "Valorant 5 Kill Ace Clutch!",
    thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    author: { id: "u1", name: "Ari", avatarUrl: "" },
    tags: ["종합게임"],
    createdAt: "2025-12-24T22:30:00Z",
    comments: [
      { id: "c1", user: { id: "u2", name: "Miku", avatarUrl: "" }, content: "ㄹㅇ 미쳤다 ㅋㅋㅋ", createdAt: "2025-12-24T22:35:00Z" },
      { id: "c2", user: { id: "u3", name: "Haru", avatarUrl: "" }, content: "에이스 축하해!!", createdAt: "2025-12-24T22:40:00Z" },
    ],
    reactions: [
      { emoji: "🔥", count: 5, userReacted: false },
      { emoji: "👍", count: 3, userReacted: true },
      { emoji: "🎉", count: 2, userReacted: false },
    ],
  },
  {
    id: "2",
    title: "마인크래프트 서버 첫 날",
    thumbnailUrl: "https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?w=800&q=80",
    author: { id: "u2", name: "Miku", avatarUrl: "" },
    tags: ["종합게임"],
    createdAt: "2025-11-15T18:00:00Z",
    comments: [
      { id: "c3", user: { id: "u1", name: "Ari", avatarUrl: "" }, content: "집 짓기 같이 했던 날~", createdAt: "2025-11-15T18:10:00Z" },
    ],
    reactions: [
      { emoji: "❤️", count: 4, userReacted: true },
      { emoji: "😂", count: 1, userReacted: false },
    ],
  },
  {
    id: "3",
    title: "오버워치 팀킬 순간",
    thumbnailUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
    videoUrl: "https://example.com/overwatch-clip.mp4",
    author: { id: "u3", name: "Haru", avatarUrl: "" },
    tags: ["종합게임"],
    createdAt: "2026-01-05T21:15:00Z",
    comments: [],
    reactions: [
      { emoji: "🔥", count: 8, userReacted: false },
      { emoji: "👀", count: 2, userReacted: false },
    ],
  },
  {
    id: "4",
    title: "리그 오브 레전드 프로모션 승급!",
    thumbnailUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
    author: { id: "u1", name: "Ari", avatarUrl: "" },
    tags: ["LOL"],
    createdAt: "2026-02-14T02:45:00Z",
    comments: [
      { id: "c4", user: { id: "u2", name: "Miku", avatarUrl: "" }, content: "다이아 축하!!! 🎉", createdAt: "2026-02-14T02:50:00Z" },
      { id: "c5", user: { id: "u3", name: "Haru", avatarUrl: "" }, content: "언제 나도 좀 데려가줘 ㅜㅜ", createdAt: "2026-02-14T02:55:00Z" },
    ],
    reactions: [
      { emoji: "🎉", count: 6, userReacted: true },
      { emoji: "👍", count: 4, userReacted: false },
    ],
  },
  {
    id: "5",
    title: "스타크래프트 1:1 승리",
    thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    author: { id: "u2", name: "Miku", avatarUrl: "" },
    tags: ["스타크래프트"],
    createdAt: "2026-03-01T16:20:00Z",
    comments: [
      { id: "c6", user: { id: "u1", name: "Ari", avatarUrl: "" }, content: "셔틀 컨트롤 지렸다", createdAt: "2026-03-01T16:25:00Z" },
    ],
    reactions: [
      { emoji: "🔥", count: 3, userReacted: false },
      { emoji: "❤️", count: 5, userReacted: true },
    ],
  },
  {
    id: "6",
    title: "메이플스토리 보스 레이드",
    thumbnailUrl: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80",
    author: { id: "u3", name: "Haru", avatarUrl: "" },
    tags: ["메이플스토리"],
    createdAt: "2026-04-10T03:00:00Z",
    comments: [
      { id: "c7", user: { id: "u1", name: "Ari", avatarUrl: "" }, content: "데미지 실화냐", createdAt: "2026-04-10T03:05:00Z" },
      { id: "c8", user: { id: "u2", name: "Miku", avatarUrl: "" }, content: "ㄹㅇ 개쎔", createdAt: "2026-04-10T03:10:00Z" },
    ],
    reactions: [
      { emoji: "😂", count: 7, userReacted: true },
      { emoji: "❤️", count: 3, userReacted: false },
    ],
  },
];

export const ALL_TAGS = ["LOL", "메이플스토리", "스타크래프트", "종합게임"];
