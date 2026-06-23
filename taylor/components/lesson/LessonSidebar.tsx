"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const titanicHref = "/lesson/titanic";
const dataCollectionHref = "/lesson/titanic/data-collection";
const passengerListHref = "/lesson/titanic/passenger-list";
const captainSmithHref = "/lesson/titanic/captain-smith";

const crawlingHref = "/lesson/crawling";
const naverNewsHref = "/lesson/crawling/naver-news";
const boardListHref = "/lesson/crawling/board";
const boardWriteHref = "/lesson/crawling/board/write";
const boardDetailBase = "/lesson/crawling/board/";
const samsungHref = "/lesson/samsung";

const categoryLabelMap: Record<string, string> = {
  "rag-system": "RAG SYSTEM",
  architecture: "ARCHITECTURE",
  agent: "AGENT",
  tailor: "Tailor",
  mobile: "MOBILE",
  devops: "DEVOPS",
  nlp: "NLP",
};

const linkClass =
  "block py-2.5 text-sm tracking-[0.06em] text-neutral-600 transition-colors hover:text-neutral-900";

const subLinkClass =
  "block py-2 pl-3 text-sm tracking-[0.04em] text-neutral-500 transition-colors hover:text-neutral-900";

export function LessonSidebar() {
  const pathname = usePathname();
  const isTitanicSection = pathname.startsWith(titanicHref);
  const isCrawlingSection = pathname.startsWith(crawlingHref);
  const [titanicOpen, setTitanicOpen] = useState(isTitanicSection);
  const [crawlingOpen, setCrawlingOpen] = useState(isCrawlingSection);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (isTitanicSection) setTitanicOpen(true);
  }, [isTitanicSection]);

  useEffect(() => {
    if (isCrawlingSection) setCrawlingOpen(true);
  }, [isCrawlingSection]);

  const categorySlug = pathname.split("/")[2];
  const isLessonSection =
    !categorySlug || categorySlug === "titanic" || categorySlug === "crawling";
  const sidebarLabel = isLessonSection
    ? "수업용"
    : (categoryLabelMap[categorySlug] ?? "수업용");

  const isTitanicOverview = pathname === titanicHref;
  const isDataCollection = pathname === dataCollectionHref;
  const isPassengerList = pathname === passengerListHref;
  const isCaptainSmith = pathname === captainSmithHref;

  const isNaverNews = pathname === naverNewsHref;
  const isBoardList = pathname === boardListHref;
  const isBoardWrite = pathname === boardWriteHref;
  const isBoardDetail =
    pathname.startsWith(boardDetailBase) && !pathname.startsWith(boardWriteHref);
  const isSamsung = pathname.startsWith(samsungHref);
  const closeMobile = () => setMobileOpen(false);

  const lessonNavContent = (
    <nav aria-label="수업용 사이드 메뉴">
      <ul>
        <li>
          <div className="flex items-center justify-between gap-1">
            <Link
              href={titanicHref}
              onClick={closeMobile}
              className={
                isTitanicOverview
                  ? `${linkClass} font-medium text-neutral-900`
                  : linkClass
              }
              aria-current={isTitanicOverview ? "page" : undefined}
            >
              타이타닉
            </Link>
            <button
              type="button"
              onClick={() => setTitanicOpen((open) => !open)}
              className="flex h-8 w-8 shrink-0 items-center justify-center text-neutral-500 transition-colors hover:text-neutral-900"
              aria-expanded={titanicOpen}
              aria-controls="lesson-titanic-submenu"
              aria-label={titanicOpen ? "타이타닉 하위 메뉴 접기" : "타이타닉 하위 메뉴 펼치기"}
            >
              <ChevronRight
                className={`h-4 w-4 transition-transform duration-200 ${titanicOpen ? "rotate-90" : ""}`}
                aria-hidden
              />
            </button>
          </div>
          {titanicOpen && (
            <ul id="lesson-titanic-submenu" className="mt-0.5 border-l border-neutral-100">
              <li>
                <Link
                  href={dataCollectionHref}
                  onClick={closeMobile}
                  className={
                    isDataCollection
                      ? `${subLinkClass} font-medium text-neutral-900`
                      : subLinkClass
                  }
                  aria-current={isDataCollection ? "page" : undefined}
                >
                  1. 데이터 수집
                </Link>
              </li>
              <li>
                <Link
                  href={passengerListHref}
                  onClick={closeMobile}
                  className={
                    isPassengerList
                      ? `${subLinkClass} font-medium text-neutral-900`
                      : subLinkClass
                  }
                  aria-current={isPassengerList ? "page" : undefined}
                >
                  2. 탑승자 목록
                </Link>
              </li>
              <li>
                <Link
                  href={captainSmithHref}
                  onClick={closeMobile}
                  className={
                    isCaptainSmith
                      ? `${subLinkClass} font-medium text-neutral-900`
                      : subLinkClass
                  }
                  aria-current={isCaptainSmith ? "page" : undefined}
                >
                  3. 스미스 선장과 대화
                </Link>
              </li>

            </ul>
          )}
        </li>
        <hr></hr>
        <li>
          <div className="flex items-center justify-between gap-1">
            <Link
              href={naverNewsHref}
              onClick={closeMobile}
              className={
                isNaverNews
                  ? `${linkClass} font-medium text-neutral-900`
                  : linkClass
              }
              aria-current={isNaverNews ? "page" : undefined}
            >
              크롤링
            </Link>
            <button
              type="button"
              onClick={() => setCrawlingOpen((open) => !open)}
              className="flex h-8 w-8 shrink-0 items-center justify-center text-neutral-500 transition-colors hover:text-neutral-900"
              aria-expanded={crawlingOpen}
              aria-controls="lesson-crawling-submenu"
              aria-label={crawlingOpen ? "크롤링 하위 메뉴 접기" : "크롤링 하위 메뉴 펼치기"}
            >
              <ChevronRight
                className={`h-4 w-4 transition-transform duration-200 ${crawlingOpen ? "rotate-90" : ""}`}
                aria-hidden
              />
            </button>
          </div>
          {crawlingOpen && (
            <ul id="lesson-crawling-submenu" className="mt-0.5 border-l border-neutral-100">
              <li>
                <Link
                  href={naverNewsHref}
                  onClick={closeMobile}
                  className={
                    isNaverNews
                      ? `${subLinkClass} font-medium text-neutral-900`
                      : subLinkClass
                  }
                  aria-current={isNaverNews ? "page" : undefined}
                >
                  1. 네이버 뉴스
                </Link>
              </li>
              <li>
                <Link
                  href={boardListHref}
                  onClick={closeMobile}
                  className={
                    isBoardList
                      ? `${subLinkClass} font-medium text-neutral-900`
                      : subLinkClass
                  }
                  aria-current={isBoardList ? "page" : undefined}
                >
                  2. 게시판 목록
                </Link>
              </li>
              <li>
                <Link
                  href={boardWriteHref}
                  onClick={closeMobile}
                  className={
                    isBoardWrite
                      ? `${subLinkClass} font-medium text-neutral-900`
                      : subLinkClass
                  }
                  aria-current={isBoardWrite ? "page" : undefined}
                >
                  3. 게시판 글쓰기
                </Link>
              </li>
              <li>
                <span
                  className={
                    isBoardDetail
                      ? `${subLinkClass} font-medium text-neutral-900`
                      : `${subLinkClass} cursor-default`
                  }
                  aria-current={isBoardDetail ? "page" : undefined}
                >
                  4. 게시판 상세보기
                </span>
              </li>
            </ul>
          )}
        </li>
        <hr />
        <li>
          <Link
            href={samsungHref}
            onClick={closeMobile}
            className={
              isSamsung
                ? `${linkClass} font-medium text-neutral-900`
                : linkClass
            }
            aria-current={isSamsung ? "page" : undefined}
          >
            삼성전자 분석
          </Link>
        </li>
      </ul>
    </nav>
  );

  const categoryNavContent = (
    <p className="text-sm text-neutral-400">콘텐츠 준비 중입니다.</p>
  );

  const navContent = isLessonSection ? lessonNavContent : categoryNavContent;

  return (
    <div className="w-full md:w-52 shrink-0">
      {/* Mobile header */}
      <div className="flex items-center justify-between border-b border-neutral-100 bg-white px-6 py-4 md:hidden">
        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
          {sidebarLabel}
        </p>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:border-neutral-300 hover:text-neutral-900"
          aria-expanded={mobileOpen}
          aria-label="수업 메뉴 열기"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden border-r border-neutral-100 py-12 pl-6 pr-3 md:block">
        <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-neutral-400">
          {sidebarLabel}
        </p>
        {navContent}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            onClick={closeMobile}
            className="absolute inset-0 bg-black/40"
            aria-label="모바일 메뉴 닫기"
          />
          <div className="relative h-full w-[min(88vw,320px)] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-4">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-900">
                {sidebarLabel}
              </p>
              <button
                type="button"
                onClick={closeMobile}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-neutral-600 transition-colors hover:text-neutral-900"
                aria-label="메뉴 닫기"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="px-4 py-4">{navContent}</div>
          </div>
        </div>
      )}
    </div>
  );
}
