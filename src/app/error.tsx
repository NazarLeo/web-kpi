"use client";

import { useEffect } from "react";
import { logError } from "@/lib/logger";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logError("Unhandled application error", error, {
      digest: error.digest,
    });
  }, [error]);

  return (
    <div className="error-page">
      <div className="error-page-code">500</div>
      <h1 className="error-page-title">Внутрішня помилка сервера</h1>
      <p className="error-page-message">
        {error.message || "Виникла неочікувана помилка. Спробуйте ще раз."}
      </p>
      <button className="error-page-link" onClick={reset}>
        Спробувати знову
      </button>
    </div>
  );
}
