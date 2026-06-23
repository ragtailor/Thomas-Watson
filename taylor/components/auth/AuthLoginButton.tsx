"use client";

import { useState } from "react";

import { AuthModal } from "@/components/auth/AuthModal";
import { cn } from "@/lib/utils";

type AuthLoginButtonProps = {
  className?: string;
};

export function AuthLoginButton({ className }: AuthLoginButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 sm:px-4 sm:text-sm",
          className,
        )}
      >
        로그인
      </button>
      <AuthModal open={open} onOpenChange={setOpen} />
    </>
  );
}
