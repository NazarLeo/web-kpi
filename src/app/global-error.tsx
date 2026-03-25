"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: "error",
        message: "Global unhandled error",
        app: "eco-monitoring",
        err: { message: error.message, digest: error.digest },
      })
    );
  }, [error]);

  return (
    <html lang="uk">
      <body>
        <div className="error-page">
          <div className="error-page-code">500</div>
          <h1 className="error-page-title">Критична помилка</h1>
          <p className="error-page-message">
            Виникла критична помилка додатку.
          </p>
          <button className="error-page-link" onClick={reset}>
            Перезапустити
          </button>
        </div>
      </body>
    </html>
  );
}
