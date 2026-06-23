import { CrawlingNewsBoard } from "@/components/lesson/CrawlingNewsBoard";

export default function CrawlingNaverNewsPage() {
  return (
    <>
      <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">
        Lesson · Crawling
      </p>
      <h1 className="mt-2 text-sm font-medium uppercase tracking-[0.12em] text-neutral-900">
        1. 네이버 뉴스
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600">
        네이버 뉴스 크롤링 결과를 카드 형태로 보여주는 화면입니다. 아래는 화면 구성을 위한
        더미 데이터이며, 실제 크롤링 결과로 교체될 예정입니다.
      </p>
      <CrawlingNewsBoard />
    </>
  );
}
