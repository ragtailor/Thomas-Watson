"use client";

import { FileSpreadsheet } from "lucide-react";

export function TitanicCsvUpload() {
  return (
    <div className="w-full max-w-lg">
      <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10">
        <FileSpreadsheet
          className="h-12 w-12 text-slate-400"
          strokeWidth={1.25}
          aria-hidden
        />
        <p className="text-center text-sm font-medium text-slate-700">
          <span className="font-semibold text-slate-900">titanic.csv</span>
        </p>
      </div>
    </div>
  );
}
