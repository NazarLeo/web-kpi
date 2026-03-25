import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Сторінку не знайдено | Екологічний моніторинг",
};

export default function NotFound() {
  return (
    <div className="error-page">
      <div className="error-page-code">404</div>
      <h1 className="error-page-title">Сторінку не знайдено</h1>
      <p className="error-page-message">
        Сторінка, яку ви шукаєте, не існує або була переміщена.
      </p>
      <Link href="/" className="error-page-link">
        Повернутися на головну
      </Link>
    </div>
  );
}
