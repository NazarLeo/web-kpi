"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { StationSummary } from "@/types";
import { getAirQualityLevel, getAirQualityColor } from "@/lib/airQualityUtils";

interface StationMapProps {
  stations: StationSummary[];
  selectedStationId: string | null;
  onStationSelect: (stationId: string | null) => void;
}

/**
 * Створює кастомний маркер з кольором, що відповідає рівню AQI
 */
function createMarkerIcon(aqi: number | undefined, isSelected: boolean): L.DivIcon {
  const level = aqi ? getAirQualityLevel(aqi) : null;
  const color = level ? getAirQualityColor(level) : "#999";
  const size = isSelected ? 40 : 28;
  const border = isSelected ? "3px solid #1d4ed8" : "2px solid white";
  const shadow = isSelected
    ? "0 0 0 4px rgba(29, 78, 216, 0.3), 0 2px 8px rgba(0,0,0,0.3)"
    : "0 2px 6px rgba(0,0,0,0.3)";

  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border: ${border};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: ${isSelected ? "14px" : "11px"};
      box-shadow: ${shadow};
      transition: all 0.2s;
      cursor: pointer;
    ">${aqi ?? "?"}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 4],
  });
}

export default function StationMap({
  stations,
  selectedStationId,
  onStationSelect,
}: StationMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  // Ініціалізація карти
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [48.9, 31.2], // Центр України
      zoom: 6,
      minZoom: 5,
      maxZoom: 18,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Оновлення маркерів
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Видаляємо старі маркери
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    const typeLabels: Record<string, string> = {
      urban: "Міська",
      suburban: "Приміська",
      rural: "Сільська",
      industrial: "Промислова",
      traffic: "Транспортна",
      background: "Фонова",
    };

    const statusLabels: Record<string, string> = {
      active: "Активна",
      inactive: "Неактивна",
      maintenance: "Обслуговування",
      error: "Помилка",
    };

    stations.forEach((station) => {
      const isSelected = station.id === selectedStationId;
      const icon = createMarkerIcon(station.currentAQI, isSelected);

      const marker = L.marker(
        [station.coordinates.latitude, station.coordinates.longitude],
        { icon, zIndexOffset: isSelected ? 1000 : 0 }
      );

      const level = station.currentAQI ? getAirQualityLevel(station.currentAQI) : null;
      const color = level ? getAirQualityColor(level) : "#999";

      marker.bindPopup(`
        <div style="min-width: 200px; font-family: -apple-system, sans-serif;">
          <h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">${station.name}</h3>
          <p style="margin: 0 0 4px; color: #666; font-size: 13px;">${station.city}</p>
          <div style="display: flex; align-items: center; gap: 8px; margin: 10px 0;">
            <span style="
              display: inline-block;
              padding: 4px 12px;
              background: ${color};
              color: white;
              border-radius: 12px;
              font-weight: 600;
              font-size: 14px;
            ">AQI: ${station.currentAQI ?? "N/A"}</span>
          </div>
          <div style="font-size: 12px; color: #888;">
            <p style="margin: 2px 0;">Тип: ${typeLabels[station.type] ?? station.type}</p>
            <p style="margin: 2px 0;">Статус: ${statusLabels[station.status] ?? station.status}</p>
          </div>
        </div>
      `);

      marker.on("click", () => {
        onStationSelect(station.id);
      });

      marker.addTo(map);
      markersRef.current.set(station.id, marker);
    });
  }, [stations, selectedStationId, onStationSelect]);

  // Перемістити карту до обраної станції
  useEffect(() => {
    if (!selectedStationId || !mapRef.current) return;
    const station = stations.find((s) => s.id === selectedStationId);
    if (station) {
      mapRef.current.flyTo(
        [station.coordinates.latitude, station.coordinates.longitude],
        10,
        { duration: 1 }
      );
    }
  }, [selectedStationId, stations]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", minHeight: "400px", borderRadius: "12px" }}
    />
  );
}
