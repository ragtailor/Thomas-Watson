"use client";

import { useCallback, useEffect, useState } from "react";
import { ContactsUpload } from "@/components/lesson/ContactsUpload";

interface Contact {
  id: number;
  name: string;
  nickname: string;
  email: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sherlock-homes/mycroft/contacts`);
      if (!res.ok) throw new Error();
      setContacts(await res.json());
    } catch {
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8 flex items-start justify-between border-b border-neutral-100 pb-8 dark:border-gray-800">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500">
            Mail
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            주소록
          </h1>
        </div>
        <button
          type="button"
          onClick={() => setUploadOpen(true)}
          className="rounded bg-neutral-900 px-4 py-2 text-sm text-white transition-opacity hover:opacity-70 dark:bg-neutral-100 dark:text-neutral-900"
        >
          등록
        </button>
      </div>

      {/* 목록 */}
      {loading ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">불러오는 중…</p>
      ) : contacts.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            등록된 연락처가 없습니다.
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            우측 상단 등록 버튼으로 Google 주소록 CSV를 업로드하세요.
          </p>
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 dark:border-gray-800">
              <th className="pb-3 text-left text-[10px] uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500">이름</th>
              <th className="pb-3 text-left text-[10px] uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500">닉네임</th>
              <th className="pb-3 text-left text-[10px] uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500">이메일</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-b border-neutral-50 dark:border-gray-800/50">
                <td className="py-3 text-neutral-900 dark:text-neutral-100">{c.name}</td>
                <td className="py-3 text-neutral-500 dark:text-neutral-400">{c.nickname}</td>
                <td className="py-3 text-neutral-500 dark:text-neutral-400">{c.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 업로드 모달 */}
      {uploadOpen && (
        <ContactsUpload
          onClose={() => setUploadOpen(false)}
          onSuccess={fetchContacts}
        />
      )}
    </div>
  );
}
