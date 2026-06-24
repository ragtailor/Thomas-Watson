import Link from "next/link";

type NavItem = { label: string; href: string };

export function PageNav({ prev, next }: { prev?: NavItem; next?: NavItem }) {
  return (
    <div className="mt-16 flex items-start justify-between border-t border-neutral-100 pt-8 dark:border-gray-800">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col gap-1 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <span className="text-[10px] uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
            이전
          </span>
          ← {prev.label}
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end gap-1 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <span className="text-[10px] uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
            다음
          </span>
          {next.label} →
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
