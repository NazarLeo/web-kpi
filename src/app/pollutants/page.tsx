/**
 * Статична сторінка "Довідник забруднювачів"
 * Static Site Generation (SSG)
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Довідник забруднювачів | Екологічний моніторинг",
  description: "Детальна інформація про забруднювачі повітря",
};

// Force static generation
export const dynamic = "force-static";

/**
 * Компонент картки забруднювача
 */
function PollutantInfo({
  name,
  symbol,
  description,
  color,
}: {
  name: string;
  symbol: string;
  description: string;
  color: string;
}) {
  return (
    <div className="pollutant-card">
      <div className="pollutant-card-header" style={{ backgroundColor: color }}>
        <h2>{name}</h2>
        <p>{symbol}</p>
      </div>
      
      <div className="pollutant-card-body">
        <p>{description}</p>
      </div>
    </div>
  );
}

/**
 * Головна сторінка довідника
 */
export default function PollutantsPage() {
  const pollutants = [
    {
      name: "Тверді частинки PM2.5",
      symbol: "PM2.5",
      description: "Дрібнодисперсні тверді частинки діаметром до 2.5 мікрометрів. Здатні проникати глибоко в легені.",
      color: "#9333ea",
    },
    {
      name: "Тверді частинки PM10",
      symbol: "PM10",
      description: "Тверді частинки діаметром до 10 мікрометрів. Включають пил, сажу, дим.",
      color: "#f59e0b",
    },
    {
      name: "Діоксид азоту",
      symbol: "NO₂",
      description: "Газ бурого кольору з різким запахом. Утворюється при високотемпературних процесах згоряння.",
      color: "#f97316",
    },
    {
      name: "Діоксид сірки",
      symbol: "SO₂",
      description: "Безбарвний газ з різким запахом сірника. Основний компонент кислотних дощів.",
      color: "#eab308",
    },
    {
      name: "Озон приземний",
      symbol: "O₃",
      description: "Газ з характерним запахом. Утворюється в результаті фотохімічних реакцій під дією сонячного світла.",
      color: "#06b6d4",
    },
    {
      name: "Монооксид вуглецю",
      symbol: "CO",
      description: "Безбарвний отруйний газ без запаху. Утворюється при неповному згорянні вуглецевмісних речовин.",
      color: "#6b7280",
    },
  ];

  return (
    <div className="container" style={{ maxWidth: "75rem", margin: "0 auto", padding: "2rem 1rem" }}>
      <header style={{ marginBottom: "3rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Довідник забруднювачів повітря
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#666", maxWidth: "48rem", margin: "0 auto" }}>
          Інформація про основні забруднювачі атмосферного повітря
        </p>
      </header>

      <section style={{ marginBottom: "3rem" }}>
        <div className="grid grid-2" style={{ gap: "2rem" }}>
          {pollutants.map((pollutant) => (
            <PollutantInfo key={pollutant.symbol} {...pollutant} />
          ))}
        </div>
      </section>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Link href="/" className="btn btn-secondary">
          ← Головна
        </Link>
        <Link href="/about" className="btn btn-primary">
          Про проєкт
        </Link>
      </div>
    </div>
  );
}
