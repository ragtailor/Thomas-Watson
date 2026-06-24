import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

async function ensureTable() {
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
  await sql`
    CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts (created_at DESC)
  `;
}

export async function GET() {
  await ensureTable();
  const rows = await sql`
    SELECT id, title, author, content, file_url AS "fileUrl", file_name AS "fileName",
           TO_CHAR(created_at AT TIME ZONE 'Asia/Seoul', 'YYYY-MM-DD') AS "createdAt"
    FROM posts
    ORDER BY created_at DESC
  `;
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const { title, author, content, fileUrl, fileName } = await req.json();
  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "제목과 내용을 입력해주세요." }, { status: 400 });
  }
  await ensureTable();
  const [row] = await sql`
    INSERT INTO posts (title, author, content, file_url, file_name)
    VALUES (
      ${title.trim()},
      ${author?.trim() || null},
      ${content.trim()},
      ${fileUrl ?? null},
      ${fileName ?? null}
    )
    RETURNING id, title, author, content, file_url AS "fileUrl", file_name AS "fileName",
              TO_CHAR(created_at AT TIME ZONE 'Asia/Seoul', 'YYYY-MM-DD') AS "createdAt"
  `;
  return NextResponse.json(row, { status: 201 });
}
