/**
 * Динамічна сторінка для окремої станції
 * Server-Side Rendering з generateStaticParams
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockStationsSummary, generateAirQualityData } from "@/lib/mockData";
import { getAirQualityLevel, getAirQualityColor } from "@/lib/airQualityUtils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return mockStationsSummary.map((station) => ({
    id: station.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const station = mockStationsSummary.find((s) => s.id === id);
  
  if (!station) {
    return { title: "Станція не знайдена" };
  }

  return {
    title: `${station.name} | Екологічний моніторинг`,
    description: `Дані станції ${station.name}, ${station.city}`,
  };
}

export const revalidate = 120;

export default async function StationPage({ params }: PageProps) {
  const { id } = await params;
  const station = mockStationsSummary.find((s) => s.id === id);

  if (!station) {
    notFound();
  }

  const airQuality = generateAirQualityData(id);
  const aqi = airQuality.overallAQI;
  const level = getAirQualityLevel(aqi);
  const color = getAirQualityColor(level);

  return (
    <div className="container section">
      <Link href="/stations" style={{ fontSize: "0.875rem", color: "#666" }}>
        ← Назад до станцій
      </Link>

      <div className="card" style={{ marginTop: "1.5rem", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
          {station.name}
        </h1>
        <p style={{ fontSize: "1.125rem", color: "#666", marginBottom: "1.5rem" }}>
          {station.city}
        </p>

        <div style={{
          width: "6rem",
          height: "6rem",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: color,
          color: "white",
          margin: "0 auto"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{aqi}</div>
            <div style={{ fontSize: "0.75rem" }}>AQI</div>
          </div>
        </div>
      </div>

      <h2 className="section-title">Показники забруднювачів</h2>
      <div className="grid grid-3" style={{ gap: "1rem" }}>
        {airQuality.pollutants.map((p) => (
          <div key={p.type} className="card">
            <p style={{ fontSize: "0.875rem", opacity: 0.6 }}>{p.type}</p>
            <p style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0.5rem 0" }}>
              {p.value.toFixed(1)}
            </p>
            <p style={{ fontSize: "0.75rem", opacity: 0.6 }}>{p.unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
