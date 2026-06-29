"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const lessonItems = [
  {
    key: "algorithm",
    label: "알고리즘",
    basePath: "/lesson/algorithm",
    children: [
      { label: "욕심쟁이", href: "/lesson/algorithm/greedy" },
      { label: "DP", href: "/lesson/algorithm/dp" },
      { label: "이분 탐색", href: "/lesson/algorithm/binary-search" },
      { label: "DFS", href: "/lesson/algorithm/dfs" },
      { label: "BFS", href: "/lesson/algorithm/bfs" },
      { label: "정렬", href: "/lesson/algorithm/sorting" },
      { label: "재귀", href: "/lesson/algorithm/recursion" },
      { label: "투 포인터", href: "/lesson/algorithm/two-pointers" },
      { label: "스택 / 큐", href: "/lesson/algorithm/stack-queue" },
      { label: "해시", href: "/lesson/algorithm/hash" },
    ],
  },
  {
    key: "ml",
    label: "머신러닝",
    basePath: "/lesson/titanic",
    children: [
      { label: "타이타닉", href: "/lesson/titanic" },
    ],
  },
  {
    key: "crawling",
    label: "크롤링",
    basePath: "/lesson/crawling",
    children: [
      { label: "네이버 뉴스", href: "/lesson/crawling/naver-news" },
      { label: "게시판 목록", href: "/lesson/crawling/board" },
      { label: "게시판 글쓰기", href: "/lesson/crawling/board/write" },
    ],
  },
];

const linkCls =
  "block py-[3px] text-[11px] leading-tight transition-colors hover:text-neutral-900 dark:hover:text-neutral-100";

export function LessonSectionNav({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initial: Record<string, boolean> = {};
    lessonItems.forEach(({ key, basePath }) => {
      if (pathname.startsWith(basePath)) initial[key] = true;
    });
    setOpen(initial);
  }, [pathname]);

  return (
    <div>
      <p className="mb-1.5 text-[9px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
        수업용
      </p>

      {lessonItems.map(({ key, label, basePath, children }) => (
        <div key={key}>
          <button
            type="button"
            onClick={() => setOpen((v) => ({ ...v, [key]: !v[key] }))}
            className="flex w-full items-center justify-between py-[3px] text-left text-[11px] text-neutral-900 transition-opacity hover:opacity-60 dark:text-neutral-100"
          >
            {label}
            {open[key] ? (
              <ChevronUp className="h-3 w-3 shrink-0" />
            ) : (
              <ChevronDown className="h-3 w-3 shrink-0" />
            )}
          </button>

          {open[key] && (
            <ul className="mb-1 ml-1 border-l border-neutral-200 dark:border-gray-700">
              {children.map(({ label: cl, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    className={`${linkCls} pl-2 ${
                      pathname === href || pathname.startsWith(href + "/")
                        ? "font-medium text-neutral-900 dark:text-neutral-100"
                        : "text-neutral-500 dark:text-neutral-400"
                    }`}
                  >
                    {cl}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <Link
        href="/lesson/samsung"
        onClick={onNavigate}
        className={`${linkCls} ${
          pathname.startsWith("/lesson/samsung")
            ? "text-neutral-900 dark:text-neutral-100"
            : "text-neutral-700 dark:text-neutral-400"
        }`}
      >
        삼성전자 분석
      </Link>

      <MailCompose />
    </div>
  );
}

function MailCompose() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [guideOpen, setGuideOpen] = useState(false);

  async function handleSend() {
    if (!message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setMessage("");
      setTimeout(() => { setStatus("idle"); setOpen(false); }, 2000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <>
      <div className="mt-3 border-t border-neutral-200 pt-3 dark:border-gray-700">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between py-[3px] text-left text-[11px] text-neutral-900 transition-opacity hover:opacity-60 dark:text-neutral-100"
        >
          메일쓰기
          {open ? (
            <ChevronUp className="h-3 w-3 shrink-0" />
          ) : (
            <ChevronDown className="h-3 w-3 shrink-0" />
          )}
        </button>

        {open && (
          <div className="mt-1.5 flex flex-col gap-1.5">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="안부인사를 보내줘"
              rows={3}
              className="w-full resize-none rounded border border-neutral-200 bg-white px-2 py-1.5 text-[11px] text-neutral-900 placeholder-neutral-400 focus:outline-none dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-neutral-100 dark:placeholder-neutral-600"
            />
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setGuideOpen(true)}
                className="rounded border border-neutral-300 px-1.5 py-0.5 text-[9px] tracking-[0.08em] text-neutral-500 transition-colors hover:border-sky-400 hover:text-sky-600 dark:border-gray-600 dark:text-neutral-500 dark:hover:border-sky-500 dark:hover:text-sky-400"
              >
                가이드
              </button>
              <button
                type="button"
                onClick={handleSend}
                disabled={status === "sending" || !message.trim()}
                className="text-[10px] uppercase tracking-[0.12em] text-neutral-700 transition-opacity hover:opacity-50 disabled:opacity-30 dark:text-neutral-400"
              >
                {status === "idle" && "발송"}
                {status === "sending" && "발송 중..."}
                {status === "done" && "완료"}
                {status === "error" && "실패"}
              </button>
            </div>
          </div>
        )}
      </div>

      {guideOpen && <GuidePanel onClose={() => setGuideOpen(false)} />}
    </>
  );
}

function GuidePanel({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="자동 보고서 시스템 가이드"
        className="fixed right-0 top-0 z-50 flex h-full w-[min(92vw,640px)] flex-col bg-white shadow-2xl dark:bg-[#0f0f0f]"
      >
        {/* 헤더 */}
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-neutral-100 px-5 dark:border-gray-800">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-900 dark:text-neutral-100">
            자동 보고서 시스템 가이드
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
            aria-label="닫기"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 본문 */}
        <div className="overflow-y-auto px-5 py-6 text-[12px] leading-relaxed text-neutral-700 dark:text-neutral-300">

          {/* 목표 */}
          <Section title="목표">
            <p>Next.js 대시보드에서 명령어를 입력하면 <strong>NotebookLM + n8n + Obsidian</strong>을 이용해 자동으로 보고서를 생성하고 이메일로 전송하는 워크플로우를 구현합니다.</p>
          </Section>

          {/* 핵심 제약 */}
          <Section title="⚠️ NotebookLM API 현실">
            <p className="mb-2">NotebookLM은 <strong>공식 API가 없습니다.</strong> 대신 아래 두 가지 방식 중 하나를 선택합니다.</p>
            <table className="w-full border-collapse text-[11px]">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-gray-700">
                  <th className="py-1 text-left font-medium text-neutral-900 dark:text-neutral-100">방식</th>
                  <th className="py-1 text-left font-medium text-neutral-900 dark:text-neutral-100">현실성</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-100 dark:border-gray-800">
                  <td className="py-1 pr-2">NotebookLM 직접 연동 (Playwright)</td>
                  <td className="py-1 text-red-500">불안정</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2">Gemini API + Google Drive</td>
                  <td className="py-1 text-sky-600 dark:text-sky-400">✅ 추천</td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* 아키텍처 */}
          <Section title="추천 아키텍처">
            <Flow steps={[
              "Google Drive 폴더/파일명 입력 (Next.js)",
              "n8n Webhook 수신",
              "Google Drive 파일 읽기",
              "Gemini API → 보고서 생성",
              "Obsidian .md 저장 + 이메일 전송",
            ]} />
          </Section>

          {/* 구현 스택 */}
          <Section title="구현 스택 상세">
            <StackItem label="① Next.js 대시보드">
              <ul className="mt-1 space-y-0.5 pl-3">
                <li>· 폴더명 + 파일명 텍스트 입력</li>
                <li>· 보고서 타입 선택</li>
                <li>· "생성" 버튼 → n8n webhook POST 호출</li>
              </ul>
            </StackItem>
            <StackItem label="② n8n 워크플로우">
              <Code>{`Webhook → Drive 파일 읽기 → 프롬프트 구성\n→ Gemini API → 결과 파싱\n→ Obsidian 저장 + Gmail 전송`}</Code>
            </StackItem>
            <StackItem label="③ Gemini API">
              <Code>{`// 시스템 프롬프트에 회사 맥락 주입\n{\n  "system": "RAG Tailor 보고서 작성 어시스턴트",\n  "contents": [{\n    "role": "user",\n    "parts": [{ "text": "문서 내용..." }]\n  }]\n}`}</Code>
            </StackItem>
            <StackItem label="④ Obsidian 저장">
              <ul className="mt-1 space-y-0.5 pl-3">
                <li>· n8n Write Binary File 노드 → vault 경로 저장</li>
                <li>· 또는 Obsidian Local REST API 플러그인</li>
              </ul>
            </StackItem>
          </Section>

          {/* 연락처 연동 */}
          <Section title="연락처 연동 — Gmail 주소록">
            <p className="mb-2">"박부장님에게 보내줘" 입력 시 Gmail 주소록(Google People API)에서 이메일 자동 조회합니다.</p>
            <StackItem label="Next.js API Route — 이름 추출">
              <Code>{`// "박부장님에게 보내줘" → "박부장"\nconst match = command.match(/(.+?)(?:님|씨)?에게\\s*보내/)\nconst recipientName = match?.[1]`}</Code>
            </StackItem>
            <StackItem label="n8n — Google People API 조회">
              <Code>{`// HTTP Request 노드\n// GET people.googleapis.com/v1/people:searchContacts\n// query: {{ $json.recipientName }}\n// readMask: names,emailAddresses\n\n// 이메일 추출\n{{ $json.connections[0].emailAddresses[0].value }}`}</Code>
            </StackItem>
          </Section>

          {/* Google OAuth */}
          <Section title="Google OAuth 통합">
            <p>Gmail + Google Drive + Google People API 모두 <strong>하나의 Google OAuth2</strong> 크리덴셜로 처리합니다. n8n에서 Google 노드 설정 시 한 번만 인증하면 됩니다.</p>
          </Section>

          {/* 구현 순서 */}
          <Section title="구현 순서">
            <ol className="space-y-1 pl-3">
              {[
                "n8n 실행 (Docker) + Google OAuth2 크리덴셜 등록",
                "Google Drive 폴더 구성 + 파일 업로드",
                "n8n 워크플로우 구성 (Drive 읽기 → Gemini → Gmail)",
                "Next.js UI — 폴더/파일 입력 + 수신자 명령어 입력",
                "테스트: '박부장님에게 보내줘' 입력 → 이메일 수신 확인",
              ].map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="shrink-0 font-medium text-sky-600 dark:text-sky-400">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Section>

        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-900 dark:text-neutral-100">
        {title}
      </h3>
      {children}
    </div>
  );
}

function StackItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <p className="font-medium text-neutral-800 dark:text-neutral-200">{label}</p>
      {children}
    </div>
  );
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="space-y-1">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sky-100 text-[9px] font-bold text-sky-700 dark:bg-sky-900/40 dark:text-sky-400">
            {i + 1}
          </span>
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="mt-1 overflow-x-auto rounded bg-neutral-100 px-2.5 py-2 text-[10px] leading-relaxed text-neutral-800 dark:bg-[#1a1a1a] dark:text-neutral-300">
      {children}
    </pre>
  );
}

export function LeftSidebar() {
  const pathname = usePathname();
  const isLesson = pathname.startsWith("/lesson");

  if (!isLesson) return null;

  return (
    <aside className="hidden h-full w-40 shrink-0 overflow-y-auto border-r border-neutral-100 bg-neutral-50 px-4 py-6 dark:border-gray-800 dark:bg-[#111111] md:block">
      <LessonSectionNav />
    </aside>
  );
}
