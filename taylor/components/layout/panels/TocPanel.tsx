"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type TocSection = { label: string; href: string };

type Props = {
  sections: TocSection[];
  next?: { label: string; href: string };
};

export function TocPanel({ sections, next }: Props) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const scrollEl = document.getElementById("main-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { root: scrollEl ?? null, rootMargin: "-48px 0px -60% 0px", threshold: 0 }
    );

    sections.forEach(({ href }) => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div>
      <p className="mb-3 text-[9px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
        목차
      </p>
      <nav className="flex flex-col gap-0.5">
        {sections.map(({ label, href }) => {
          const id = href.replace("#", "");
          const isActive = activeId === id;
          return (
            <a
              key={href}
              href={href}
              className={`py-[3px] text-[11px] leading-tight transition-colors ${
                isActive
                  ? "font-medium text-neutral-900 dark:text-neutral-100"
                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              }`}
            >
              {label}
            </a>
          );
        })}
      </nav>

      {next && (
        <div className="mt-6 border-t border-neutral-100 pt-4 dark:border-gray-800">
          <p className="mb-1.5 text-[9px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
            다음 강의
          </p>
          <Link
            href={next.href}
            className="block text-[11px] text-neutral-700 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            {next.label} →
          </Link>
        </div>
      )}
    </div>
  );
}
