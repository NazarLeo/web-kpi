"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Measurement } from "@/types";

const POLLUTANT_COLORS: Record<string, string> = {
  "PM2.5": "#9333ea",
  "PM10": "#f59e0b",
  "NO2": "#f97316",
  "SO2": "#eab308",
  "CO": "#6b7280",
  "O3": "#06b6d4",
  "NH3": "#10b981",
};

/**
 * Лінійний графік — зміна показників у часі
 */
export function TimeSeriesChart({
  measurements,
  title,
}: {
  measurements: Measurement[];
  title?: string;
}) {
  const data = measurements.slice(-24).map((m) => {
    const entry: Record<string, string | number> = {
      time: new Date(m.timestamp).toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    m.data.pollutants.forEach((p) => {
      entry[p.type] = p.value;
    });
    return entry;
  });

  const pollutantTypes = measurements[0]?.data.pollutants.map((p) => p.type) ?? [];

  return (
    <div className="chart-container">
      {title && <h3 className="chart-title">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#888" />
          <YAxis tick={{ fontSize: 12 }} stroke="#888" />
          <Tooltip
            contentStyle={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 13,
            }}
          />
          <Legend />
          {pollutantTypes.map((type) => (
            <Line
              key={type}
              type="monotone"
              dataKey={type}
              stroke={POLLUTANT_COLORS[type] || "#888"}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Стовпчикова діаграма — порівняння станцій за середнім AQI
 */
export function StationComparisonChart({
  stationsData,
  title,
}: {
  stationsData: { name: string; aqi: number; color: string }[];
  title?: string;
}) {
  return (
    <div className="chart-container">
      {title && <h3 className="chart-title">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={stationsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#888" />
          <YAxis tick={{ fontSize: 12 }} stroke="#888" />
          <Tooltip
            contentStyle={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 13,
            }}
          />
          <Bar dataKey="aqi" name="AQI" radius={[6, 6, 0, 0]}>
            {stationsData.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Кругова діаграма — структура забруднення
 */
export function PollutionPieChart({
  pollutants,
  title,
}: {
  pollutants: { type: string; value: number }[];
  title?: string;
}) {
  const data = pollutants.map((p) => ({
    name: p.type,
    value: Math.round(p.value * 10) / 10,
  }));

  return (
    <div className="chart-container">
      {title && <h3 className="chart-title">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, idx) => (
              <Cell
                key={idx}
                fill={POLLUTANT_COLORS[entry.name] || "#888"}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 13,
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
