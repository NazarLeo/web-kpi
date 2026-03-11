/**
 * Статична сторінка "Про проєкт"
 * Static Site Generation (SSG)
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Про проєкт | Екологічний моніторинг",
  description: "Інформація про систему екологічного моніторингу якості повітря",
};

// Force static generation
export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <div className="container" style={{ maxWidth: "56rem", margin: "0 auto", padding: "2rem 1rem" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Про проєкт
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#666" }}>
          Система моніторингу якості повітря в Україні
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <section className="card">
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Наша місія</h2>
          <p style={{ lineHeight: "1.6", color: "#555" }}>
            Забезпечити громадськість актуальною та достовірною інформацією про стан якості повітря 
            в містах України. Ми прагнемо підвищити екологічну свідомість населення та сприяти 
            прийняттю обґрунтованих рішень щодо захисту здоров'я.
          </p>
        </section>

        <section className="card">
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Про систему</h2>
          <p style={{ lineHeight: "1.6", color: "#555", marginBottom: "1rem" }}>
            Система екологічного моніторингу являє собою мережу автоматизованих станцій, 
            розміщених у різних регіонах України. Кожна станція обладнана сучасними 
            аналізаторами, які цілодобово вимірюють концентрації основних забруднювачів повітря.
          </p>
          
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.75rem", marginTop: "1.5rem" }}>Основні можливості:</h3>
          <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#555" }}>
            <li>Моніторинг у реальному часі - дані оновлюються щохвилини</li>
            <li>Розрахунок AQI - індекс якості повітря за міжнародним стандартом</li>
            <li>Історичні дані - доступ до архіву вимірювань</li>
            <li>Детальна аналітика - графіки та статистика за різними періодами</li>
          </ul>
        </section>

        <section className="card">
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Вимірювані показники</h2>
          <p style={{ lineHeight: "1.6", color: "#555", marginBottom: "1rem" }}>
            Наші станції відстежують концентрації наступних забруднювачів:
          </p>
          
          <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#555" }}>
            <li><strong>PM2.5 та PM10</strong> - тверді частинки (пил, сажа, дим)</li>
            <li><strong>NO₂ (Діоксид азоту)</strong> - основне джерело: автотранспорт</li>
            <li><strong>SO₂ (Діоксид сірки)</strong> - викиди промисловості та енергетики</li>
            <li><strong>O₃ (Озон)</strong> - утворюється під дією сонячного світла</li>
            <li><strong>CO (Монооксид вуглецю)</strong> - продукт неповного згоряння палива</li>
          </ul>

          <div style={{ marginTop: "1.5rem" }}>
            <Link href="/pollutants" className="btn btn-primary">
              Детальніше про забруднювачі →
            </Link>
          </div>
        </section>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <Link href="/" className="btn btn-secondary">
          ← Повернутися на головну
        </Link>
      </div>
    </div>
  );
}
