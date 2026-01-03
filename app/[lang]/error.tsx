// v1/app/[lang]/error.tsx
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 px-4">
      <h2 className="text-2xl font-light uppercase tracking-widest mb-6">
        Etwas ist schiefgelaufen
      </h2>
      <button
        onClick={() => reset()}
        className="px-8 py-3 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black uppercase tracking-widest text-xs"
      >
        Erneut versuchen
      </button>
    </div>
  );
}
