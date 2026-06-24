"use client";

import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

import { AuthLoginButton } from "@/components/auth/AuthLoginButton";
import { portfolioCategoryLinks } from "@/components/home/portfolio-data";

type MobileMenuProps = {
  onClose: () => void;
  shopOpen: boolean;
  onToggleShop: () => void;
  isLessonPage?: boolean;
  titanicOpen?: boolean;
  onToggleTitanic?: () => void;
  crawlingOpen?: boolean;
  onToggleCrawling?: () => void;
};

const secondaryLinks = [
  { href: "/", label: "교육개요" },
  { href: "/notice", label: "FAQ" },
  { href: "/lesson", label: "Lesson" },
] as const;

const titanicSubs = [
  { href: "/lesson/titanic/data-collection", label: "데이터 수집" },
  { href: "/lesson/titanic/passenger-list", label: "탑승자 목록" },
  { href: "/lesson/titanic/captain-smith", label: "스미스 선장과 대화" },
];

const crawlingSubs = [
  { href: "/lesson/crawling/naver-news", label: "네이버 뉴스" },
  { href: "/lesson/crawling/board", label: "게시판 목록" },
  { href: "/lesson/crawling/board/write", label: "게시판 글쓰기" },
];

export function MobileMenu({
  onClose,
  shopOpen,
  onToggleShop,
  isLessonPage,
  titanicOpen,
  onToggleTitanic,
  crawlingOpen,
  onToggleCrawling,
}: MobileMenuProps) {
  return (
    <div className="flex h-[calc(100dvh-3rem)] flex-col overflow-y-auto px-4 pb-8">
      {/* 카테고리 */}
      <nav className="border-b border-neutral-200 py-4" aria-label="모바일 주 메뉴">
        <button
          type="button"
          onClick={onToggleShop}
          className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold uppercase tracking-[0.12em] text-neutral-900"
        >
          교육과정
          {shopOpen ? (
            <ChevronUp className="h-4 w-4" aria-hidden />
          ) : (
            <ChevronDown className="h-4 w-4" aria-hidden />
          )}
        </button>

        {shopOpen && (
          <ul className="space-y-0 border-t border-neutral-100">
            {portfolioCategoryLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={onClose}
                  className="block py-3.5 text-sm uppercase tracking-[0.1em] text-neutral-700"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* 보조 링크 */}
      <ul className="divide-y divide-neutral-200">
        {secondaryLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onClose}
              className="flex items-center justify-between py-4 text-sm font-semibold uppercase tracking-[0.12em] text-neutral-900"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li className="py-4">
          <AuthLoginButton className="w-full justify-start rounded-none border-0 bg-transparent p-0 text-left text-sm font-semibold uppercase tracking-[0.12em] text-neutral-900 shadow-none hover:bg-transparent" />
        </li>
      </ul>

      {/* 수업용 아코디언 (레슨 페이지에서만) */}
      {isLessonPage && (
        <div className="border-t border-neutral-200 pt-4">
          <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            수업용
          </p>

          {/* 타이타닉 */}
          <button
            type="button"
            onClick={onToggleTitanic}
            className="flex w-full items-center justify-between py-3 text-sm font-semibold text-neutral-900"
          >
            타이타닉
            {titanicOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {titanicOpen && (
            <ul className="mb-2 ml-2 border-l border-neutral-200">
              {titanicSubs.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className="block py-2.5 pl-3 text-sm text-neutral-600"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* 크롤링 */}
          <button
            type="button"
            onClick={onToggleCrawling}
            className="flex w-full items-center justify-between py-3 text-sm font-semibold text-neutral-900"
          >
            크롤링
            {crawlingOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {crawlingOpen && (
            <ul className="mb-2 ml-2 border-l border-neutral-200">
              {crawlingSubs.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className="block py-2.5 pl-3 text-sm text-neutral-600"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* 삼성전자 분석 */}
          <Link
            href="/lesson/samsung"
            onClick={onClose}
            className="block py-3 text-sm font-semibold text-neutral-900"
          >
            삼성전자 분석
          </Link>
        </div>
      )}

      <div className="mt-auto border-t border-neutral-200 pt-6">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.1em] text-neutral-600">
          <span>문의: rex@ragwatson.com</span>
          <a
            href="mailto:rex@ragwatson.com"
            onClick={onClose}
            className="font-semibold text-neutral-900 underline underline-offset-2"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}
