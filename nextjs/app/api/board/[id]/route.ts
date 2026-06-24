import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const [row] = await sql`
    SELECT id, title, COALESCE(author, '익명') AS author, content,
           file_url AS "fileUrl", file_name AS "fileName",
           TO_CHAR(created_at AT TIME ZONE 'Asia/Seoul', 'YYYY-MM-DD HH24:MI') AS "createdAt"
    FROM posts
    WHERE id = ${Number(id)}
  `;
  if (!row) {
    return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
  }
  return NextResponse.json(row);
}
