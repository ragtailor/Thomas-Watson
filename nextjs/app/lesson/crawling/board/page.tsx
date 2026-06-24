import Link from "next/link";
import { PenLine } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { sql } from "@/lib/db";

interface BoardPost {
  id: number;
  title: string;
  author: string;
  content: string;
  createdAt: string;
}

async function getPosts(): Promise<BoardPost[]> {
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id         SERIAL PRIMARY KEY,
      title      VARCHAR(255) NOT NULL,
      author     VARCHAR(100),
      content    TEXT NOT NULL,
      file_url   TEXT,
      file_name  VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;
  return sql`
    SELECT id, title, COALESCE(author, '익명') AS author, content,
           TO_CHAR(created_at AT TIME ZONE 'Asia/Seoul', 'YYYY-MM-DD') AS "createdAt"
    FROM posts
    ORDER BY created_at DESC
  ` as unknown as Promise<BoardPost[]>;
}

export default async function CrawlingBoardPage() {
  const posts = await getPosts();

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500">
            Lesson · Crawling
          </p>
          <h1 className="mt-2 text-sm font-medium uppercase tracking-[0.12em] text-neutral-900 dark:text-neutral-100">
            2. 게시판 목록
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            크롤링한 뉴스를 정리하고 공유하는 게시판입니다.
          </p>
        </div>
        <Button asChild size="sm" className="shrink-0 rounded-none">
          <Link href="/lesson/crawling/board/write">
            <PenLine className="h-4 w-4" aria-hidden />
            글쓰기
          </Link>
        </Button>
      </div>

      <div className="mt-8">
        <Table>
          <TableHeader>
            <TableRow className="dark:border-gray-800">
              <TableHead className="w-16 text-center dark:text-neutral-400">번호</TableHead>
              <TableHead className="dark:text-neutral-400">제목</TableHead>
              <TableHead className="w-28 dark:text-neutral-400">작성자</TableHead>
              <TableHead className="w-28 dark:text-neutral-400">작성일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow className="dark:border-gray-800">
                <TableCell colSpan={4} className="py-10 text-center text-sm text-neutral-400 dark:text-neutral-500">
                  등록된 글이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id} className="dark:border-gray-800">
                  <TableCell className="text-center text-neutral-500 dark:text-neutral-400">{post.id}</TableCell>
                  <TableCell className="text-neutral-900 dark:text-neutral-100">
                    <Link href={`/lesson/crawling/board/${post.id}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-neutral-500 dark:text-neutral-400">{post.author}</TableCell>
                  <TableCell className="text-neutral-500 dark:text-neutral-400">{post.createdAt}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
