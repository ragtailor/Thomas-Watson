"use client";

import { useState } from "react";

export function ReportButton() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSend() {
    setStatus("sending");
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      if (!webhookUrl) throw new Error("N8N_WEBHOOK_URL 환경변수가 설정되지 않았습니다.");

      const res = await fetch(webhookUrl, { method: "POST" });
      if (!res.ok) throw new Error(`n8n 응답 오류: ${res.status}`);
      setStatus("done");
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  const label = {
    idle: "보고서 메일 발송",
    sending: "발송 중...",
    done: "발송 완료",
    error: "발송 실패",
  }[status];

  return (
    <button
      type="button"
      onClick={handleSend}
      disabled={status === "sending"}
      className="mt-4 text-[11px] uppercase tracking-[0.15em] text-neutral-900 transition-opacity hover:opacity-50 disabled:opacity-30 dark:text-neutral-100"
    >
      {label}
    </button>
  );
}
