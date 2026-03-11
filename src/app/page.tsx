import Link from "next/link";
import { mockStationsSummary, getOverallStatistics } from "@/lib/mockData";
import { getAirQualityLevel, getAirQualityColor, getAirQualityDescription } from "@/lib/airQualityUtils";
import type { StationSummary } from "@/types";

export const revalidate = 300;

function StatsCard({ title, value, description }: { 
  title: string; 
  value: number | string;
  description?: string;
}) {
  return (
    <div className="card">
      <p className="card-subtitle">{title}</p>
      <p className="card-value">{value}</p>
      {description && <p className="card-description">{description}</p>}
    </div>
  );
}

function StationCard({ station }: { station: StationSummary }) {
  const aqi = station.currentAQI || 0;
  const level = station.currentAQI ? getAirQualityLevel(station.currentAQI) : null;
  const color = level ? getAirQualityColor(level) : "#999";
  const description = level ? getAirQualityDescription(level) : "Дані недоступні";

  return (
    <Link href={`/stations/${station.id}`} className="station-card">
      <div className="station-card-header">
        <div className="station-card-info">
          <h3>{station.name}</h3>
          <p>{station.city}</p>
        </div>
        {station.currentAQI && (
          <div className="station-card-aqi" style={{ backgroundColor: color }}>
            {aqi}
          </div>
        )}
      </div>
      {station.currentAQI && (
        <p className="station-card-description">{description}</p>
      )}
    </Link>
  );
}

export default async function Home() {
  const stations = mockStationsSummary;
  const stats = getOverallStatistics();
  const qualityDistribution = stats.quality_distribution;
  const distributionEntries = Object.entries(qualityDistribution).sort((a, b) => {
    const order = ["good", "moderate", "unhealthy_sensitive", "unhealthy", "very_unhealthy", "hazardous"];
    return order.indexOf(a[0]) - order.indexOf(b[0]);
  });

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Екологічний моніторинг</h1>
          <p className="hero-subtitle">
            Актуальні дані про якість повітря в містах України
          </p>
          <div className="hero-buttons">
            <Link href="/stations" className="btn btn-primary">Всі станції</Link>
            <Link href="/about" className="btn btn-secondary">Про проєкт</Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">Статистика</h2>
        <div className="grid grid-4">
          <StatsCard title="Всього станцій" value={stats.total_stations} />
          <StatsCard title="Активні" value={stats.active_stations} />
          <StatsCard title="Середній AQI" value={stats.average_aqi.toFixed(0)} />
          <StatsCard 
            title="Оновлено" 
            value={new Date().toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })} 
          />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Якість повітря</h2>
          <div className="grid grid-6">
            {distributionEntries.map(([level, count]) => {
              const labels: Record<string, string> = {
                good: "Добра",
                moderate: "Помірна",
                unhealthy_sensitive: "Чутливі",
                unhealthy: "Нездорова",
                very_unhealthy: "Дуже нездорова",
                hazardous: "Небезпечна",
              };
              
              const bgColors: Record<string, string> = {
                good: "#86efac",
                moderate: "#fde047",
                unhealthy_sensitive: "#fdba74",
                unhealthy: "#fca5a5",
                very_unhealthy: "#d8b4fe",
                hazardous: "#7f1d1d",
              };
              
              const textColors: Record<string, string> = {
                good: "#166534",
                moderate: "#713f12",
                unhealthy_sensitive: "#9a3412",
                unhealthy: "#991b1b",
                very_unhealthy: "#6b21a8",
                hazardous: "#ffffff",
              };

              return (
                <div 
                  key={level} 
                  className="quality-badge"
                  style={{ 
                    backgroundColor: bgColors[level],
                    color: textColors[level]
                  }}
                >
                  <p className="quality-badge-value">{count}</p>
                  <p className="quality-badge-label">{labels[level]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Станції</h2>
          <Link href="/stations" className="link">Всі →</Link>
        </div>
        <div className="grid grid-3">
          {stations.slice(0, 6).map((station) => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      </section>
    </div>
  );
}

