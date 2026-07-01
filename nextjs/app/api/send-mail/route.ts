import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { to, message } = await req.json();

  if (!message?.trim()) {
    return NextResponse.json({ error: "메시지를 입력해주세요." }, { status: 400 });
  }

  const webhookUrl = process.env.N8N_MAIL_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "웹훅 URL이 설정되지 않았습니다." }, { status: 500 });
  }

  const n8nRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, message }),
  });

  if (!n8nRes.ok) {
    return NextResponse.json({ error: "메일 발송에 실패했습니다." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
