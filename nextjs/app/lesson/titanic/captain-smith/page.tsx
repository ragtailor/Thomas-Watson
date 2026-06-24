"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

type Message = { role: "user" | "assistant"; text: string };

const SYSTEM_INSTRUCTION = `당신은 타이타닉호의 선장 에드워드 존 스미스(Captain Edward John Smith)입니다.
1912년 4월 항해 중이며, 승객 및 승무원의 질문에 선장으로서 답변합니다.
- 품위 있고 침착한 어조를 유지합니다.
- 타이타닉과 당시 시대에 관한 역사적 사실을 바탕으로 답변합니다.
- 항상 한국어로 답변합니다.
- 답변은 간결하고 명확하게 합니다.`;


const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

export default function CaptainSmithPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const next: Message[] = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/titanic/smith/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, systemInstruction: SYSTEM_INSTRUCTION }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "오류가 발생했습니다.");
      setMessages([...next, { role: "assistant", text: data.text }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="mb-6 shrink-0">
        <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">
          Lesson · Titanic
        </p>
        <h1 className="mt-2 text-sm font-medium uppercase tracking-[0.12em] text-neutral-900">
          3. 스미스 선장과 대화
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600">
          타이타닉호의 선장 에드워드 스미스와 대화해보세요. 1912년 항해 당시의 이야기를 들을 수 있습니다.
        </p>
      </div>

      {/* Chat area */}
      <div className="flex min-h-0 flex-1 flex-col rounded-sm border border-neutral-200">
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center text-neutral-400">
              <span className="mb-3 text-5xl">⚓</span>
              <p className="text-sm">스미스 선장에게 질문을 입력하세요.</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-base">
                  🎩
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-sm px-3 py-2 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-base">
                🎩
              </div>
              <div className="flex items-center gap-1 rounded-sm bg-neutral-100 px-3 py-2">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:300ms]" />
              </div>
            </div>
          )}

          {error && (
            <p className="rounded-sm bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="shrink-0 border-t border-neutral-200 p-3">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="선장님께 질문하세요… (Enter로 전송, Shift+Enter로 줄바꿈)"
              rows={2}
              className="flex-1 resize-none rounded-sm border border-neutral-200 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="flex h-full shrink-0 items-center justify-center rounded-sm bg-neutral-900 px-3 text-white transition-colors hover:bg-neutral-700 disabled:bg-neutral-300"
              aria-label="전송"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
