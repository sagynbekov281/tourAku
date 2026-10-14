import { useEffect, useState } from 'react';

/** Надпись со спиннером. Через 3 секунды меняется на «сервер просыпается». */
export function LoadingNotice({ text, slowText }: { text: string; slowText: string }) {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setSlow(true), 3000);
    return () => clearTimeout(id);
  }, []);

  return (
    <div role="status" aria-live="polite" className="flex items-center gap-3 mb-6 text-sm text-slate-500">
      <span className="w-4 h-4 shrink-0 rounded-full border-2 border-[#16A34A] border-t-transparent animate-spin" />
      {slow ? slowText : text}
    </div>
  );
}

/** Серая мигающая карточка-заглушка, чтобы не путать её с настоящим туром. */
export function CardSkeleton({ photoHeight = 'h-44' }: { photoHeight?: string }) {
  return (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden animate-pulse" aria-hidden="true">
      <div className={`${photoHeight} bg-slate-200`} />
      <div className="p-5 space-y-3">
        <div className="h-3 w-1/3 bg-slate-200 rounded" />
        <div className="h-5 w-3/4 bg-slate-200 rounded" />
        <div className="h-3 w-full bg-slate-100 rounded" />
        <div className="h-3 w-5/6 bg-slate-100 rounded" />
        <div className="h-8 w-1/2 bg-slate-100 rounded-full mt-2" />
      </div>
    </div>
  );
}

/** Если сервер так и не ответил. */
export function ErrorNotice({ text, buttonText }: { text: string; buttonText: string }) {
  return (
    <div className="text-center py-12">
      <p className="text-slate-500 text-sm mb-4">{text}</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="px-5 py-2 rounded-full text-sm font-medium bg-[#16A34A] text-white hover:bg-[#15803D] transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );
}