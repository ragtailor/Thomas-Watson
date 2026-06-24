"use client";

import { useEffect, useState } from "react";

interface WalterInfo {
  id: number;
  name: string;
  memo: string;
}

export default function PassengerListPage() {
  const [walter, setWalter] = useState<WalterInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/titanic/walter/myself`)
      .then((res) => {
        if (!res.ok) throw new Error("API 호출에 실패했습니다.");
        return res.json() as Promise<WalterInfo>;
      })
      .then(setWalter)
      .catch((err) => setError(err instanceof Error ? err.message : "오류 발생"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">
        Lesson · Titanic
      </p>
      <h1 className="mt-2 text-sm font-medium uppercase tracking-[0.12em] text-neutral-900">
        2. 탑승자 목록
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600">
        데이터베이스에 저장된 타이타닉 탑승자 목록입니다. 페이지당 50명씩 표시됩니다.
      </p>

      <div className="mt-8">
        {loading && (
          <p className="text-sm text-neutral-500">불러오는 중...</p>
        )}

        {error && (
          <p className="rounded-sm bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>
        )}

        {walter && !loading && (
          <div className="rounded-sm border border-neutral-200 p-4 text-sm text-neutral-700">
            <p><span className="font-medium text-neutral-500">ID:</span> {walter.id}</p>
            <p className="mt-1"><span className="font-medium text-neutral-500">이름:</span> {walter.name}</p>
            <p className="mt-1"><span className="font-medium text-neutral-500">메모:</span> {walter.memo}</p>
          </div>
        )}
      </div>
    </>
  );
}
