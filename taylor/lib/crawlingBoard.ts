export interface BoardPost {
  id: number;
  title: string;
  author: string;
  content: string;
  createdAt: string;
}

const STORAGE_KEY = "crawling-board-posts";

export const seedPosts: BoardPost[] = [
  {
    id: 3,
    title: "네이버 뉴스 크롤링 결과 공유",
    author: "관리자",
    content: "네이버 뉴스 크롤링 결과를 게시판에 정리해 공유합니다. 카테고리별로 분류해서 올려주세요.",
    createdAt: "2026-06-10",
  },
  {
    id: 2,
    title: "크롤링 주기 설정 관련 문의",
    author: "수강생A",
    content: "뉴스 크롤링을 몇 시간 주기로 실행하는 게 적당할까요? 의견 남겨주세요.",
    createdAt: "2026-06-09",
  },
  {
    id: 1,
    title: "게시판 기능 안내",
    author: "관리자",
    content: "이 게시판은 크롤링 실습 과정에서 수집한 내용을 정리하고 공유하기 위한 공간입니다.",
    createdAt: "2026-06-08",
  },
];

function getStoredPosts(): BoardPost[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BoardPost[]) : [];
  } catch {
    return [];
  }
}

export function getAllPosts(): BoardPost[] {
  return [...getStoredPosts(), ...seedPosts].sort((a, b) => b.id - a.id);
}

export function addPost(post: Omit<BoardPost, "id" | "createdAt">): BoardPost {
  const stored = getStoredPosts();
  const nextId = Math.max(0, ...seedPosts.map((p) => p.id), ...stored.map((p) => p.id)) + 1;
  const newPost: BoardPost = {
    ...post,
    id: nextId,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([newPost, ...stored]));
  return newPost;
}
