"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="text-6xl font-bold text-mint-300">500</p>
        <p className="mt-4 text-lg text-haze-300">Something went wrong · Algo salió mal</p>
        <div className="mt-8 flex justify-center gap-4">
          <button onClick={reset} className="rounded-md bg-mint-400 px-4 py-2 text-sm font-semibold text-ink-950 hover:bg-mint-300">
            Try again
          </button>
          <a href="/" className="rounded-md border border-mint-400/40 px-4 py-2 text-sm font-semibold text-mint-300 hover:border-mint-300">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}
