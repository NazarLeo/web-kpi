import type { Metadata } from "next";
import Link from "next/link";
import { mockStationsSummary } from "@/lib/mockData";
import { getAirQualityLevel, getAirQualityColor, getAirQualityDescription } from "@/lib/airQualityUtils";
import type { StationSummary } from "@/types";

export const metadata: Metadata = {
  title: "Станції моніторингу | Екологічний моніторинг",
  description: "Повний список станцій моніторингу якості повітря в Україні",
};

export const revalidate = 180;

function StationCard({ station }: { station: StationSummary }) {
  const level = station.currentAQI ? getAirQualityLevel(station.currentAQI) : null;
  const color = level ? getAirQualityColor(level) : "#999";
  const description = level ? getAirQualityDescription(level) : "Дані недоступні";

  const statusLabels: Record<string, string> = {
    active: "Активна",
    inactive: "Неактивна",
    maintenance: "Обслуговування",
    error: "Помилка",
  };

  const typeLabels: Record<string, string> = {
    urban: "Міська",
    suburban: "Приміська",
    rural: "Сільська",
    industrial: "Промислова",
    traffic: "Транспортна",
    background: "Фонова",
  };

  const statusStyles: Record<string, { backgroundColor: string; color: string }> = {
    active: { backgroundColor: "#d1fae5", color: "#065f46" },
    maintenance: { backgroundColor: "#fef3c7", color: "#78350f" },
    inactive: { backgroundColor: "#f3f4f6", color: "#374151" },
    error: { backgroundColor: "#fee2e2", color: "#991b1b" },
  };

  return (
    <Link href={`/stations/${station.id}`} className="station-card">
      <div className="station-card-header">
        <div className="station-card-info">
          <h3>{station.name}</h3>
          <p>{station.city}</p>
        </div>
        {station.currentAQI && (
          <div className="station-card-aqi" style={{ backgroundColor: color }}>
            {station.currentAQI}
          </div>
        )}
      </div>

      {station.currentAQI && (
        <div style={{ 
          marginBottom: "1rem", 
          padding: "0.75rem", 
          backgroundColor: "var(--background)", 
          borderRadius: "0.5rem" 
        }}>
          <p className="station-card-description">{description}</p>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem", fontSize: "0.875rem" }}>
        <div>
          <p style={{ opacity: 0.6, marginBottom: "0.25rem" }}>Тип</p>
          <p style={{ fontWeight: 500 }}>{typeLabels[station.type]}</p>
        </div>
        <div>
          <p style={{ opacity: 0.6, marginBottom: "0.25rem" }}>Статус</p>
          <span style={{
            display: "inline-block",
            padding: "0.25rem 0.5rem",
            borderRadius: "0.25rem",
            fontSize: "0.75rem",
            fontWeight: 500,
            ...statusStyles[station.status]
          }}>
            {statusLabels[station.status]}
          </span>
        </div>
      </div>

      <div style={{ 
        marginTop: "1rem", 
        paddingTop: "1rem", 
        borderTop: "1px solid var(--border)", 
        fontSize: "0.75rem",
        opacity: 0.5
      }}>
        📍 {station.coordinates.latitude.toFixed(4)}, {station.coordinates.longitude.toFixed(4)}
      </div>
    </Link>
  );
}

export default async function StationsPage() {
  const stations = mockStationsSummary;
  const stationsByCity = stations.reduce((acc, station) => {
    if (!acc[station.city]) {
      acc[station.city] = [];
    }
    acc[station.city].push(station);
    return acc;
  }, {} as Record<string, StationSummary[]>);

  const cities = Object.keys(stationsByCity).sort();

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="container section">
        <div style={{ marginBottom: "3rem" }}>
          <h1 className="hero-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Станції моніторингу
          </h1>
          <p style={{ fontSize: "1.125rem", opacity: 0.7 }}>
            Всього станцій: <span style={{ fontWeight: 600 }}>{stations.length}</span>
          </p>
        </div>

        <div style={{ marginBottom: "3rem" }} className="grid grid-4">
          <div className="card">
            <p className="card-subtitle">Міські</p>
            <p className="card-value">{stations.filter(s => s.type === "urban").length}</p>
          </div>
          <div className="card">
            <p className="card-subtitle">Приміські</p>
            <p className="card-value">{stations.filter(s => s.type === "suburban").length}</p>
          </div>
          <div className="card">
            <p className="card-subtitle">Промислові</p>
            <p className="card-value">{stations.filter(s => s.type === "industrial").length}</p>
          </div>
          <div className="card">
            <p className="card-subtitle">Активні</p>
            <p className="card-value" style={{ color: "#10b981" }}>
              {stations.filter(s => s.status === "active").length}
            </p>
          </div>
        </div>

        {cities.map((city) => (
          <section key={city} style={{ marginBottom: "2.5rem" }}>
            <h2 className="section-title">{city}</h2>
            <div className="grid grid-3">
              {stationsByCity[city].map((station) => (
                <StationCard key={station.id} station={station} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
