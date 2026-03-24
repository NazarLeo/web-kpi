"use client";

import { useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  TimeSeriesChart,
  StationComparisonChart,
  PollutionPieChart,
} from "@/components/Charts";
import {
  mockStationsSummary,
  mockStations,
  generateAirQualityData,
  generateTimeSeries,
} from "@/lib/mockData";
import {
  getAirQualityLevel,
  getAirQualityColor,
  getAirQualityDescription,
} from "@/lib/airQualityUtils";
import { TimeInterval } from "@/types";

// Динамічний імпорт карти — Leaflet не працює з SSR
const StationMap = dynamic(() => import("@/components/StationMap"), {
  ssr: false,
  loading: () => (
    <div className="map-loading">
      <p>Завантаження карти...</p>
    </div>
  ),
});

export default function MonitoringClient() {
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleStationSelect = useCallback((stationId: string | null) => {
    setSelectedStationId(stationId);
  }, []);

  // Фільтрація станцій
  const filteredStations = useMemo(() => {
    let stations = mockStationsSummary;
    if (filterType !== "all") {
      stations = stations.filter((s) => s.type === filterType);
    }
    if (filterStatus !== "all") {
      stations = stations.filter((s) => s.status === filterStatus);
    }
    return stations;
  }, [filterType, filterStatus]);

  // Дані обраної станції
  const selectedStation = selectedStationId
    ? mockStations.find((s) => s.id === selectedStationId)
    : null;

  const selectedSummary = selectedStationId
    ? mockStationsSummary.find((s) => s.id === selectedStationId)
    : null;

  // Генерація даних для графіків обраної станції
  const stationChartData = useMemo(() => {
    if (!selectedStationId) return null;

    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const measurements = generateTimeSeries(
      selectedStationId,
      dayAgo,
      now,
      TimeInterval.HOURLY
    );

    const currentAirQuality = generateAirQualityData(selectedStationId);

    return { measurements, currentAirQuality };
  }, [selectedStationId]);

  // Дані для порівняння станцій (bar chart)
  const comparisonData = useMemo(() => {
    return mockStationsSummary
      .filter((s) => s.currentAQI !== undefined)
      .map((s) => {
        const level = getAirQualityLevel(s.currentAQI!);
        return {
          name: s.name.replace(" - ", "\n"),
          aqi: s.currentAQI!,
          color: getAirQualityColor(level),
        };
      });
  }, []);

  const typeLabels: Record<string, string> = {
    urban: "Міська",
    suburban: "Приміська",
    rural: "Сільська",
    industrial: "Промислова",
    traffic: "Транспортна",
    background: "Фонова",
  };

  return (
    <div className="monitoring-page">
      <div className="container">
        {/* Заголовок та фільтри */}
        <div className="monitoring-header">
          <h1 className="monitoring-title">Моніторинг якості повітря</h1>
          <p className="monitoring-subtitle">
            Інтерактивна карта та графіки станцій моніторингу
          </p>
          <div className="monitoring-filters">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="monitoring-select"
            >
              <option value="all">Всі типи</option>
              <option value="urban">Міська</option>
              <option value="suburban">Приміська</option>
              <option value="industrial">Промислова</option>
              <option value="traffic">Транспортна</option>
              <option value="background">Фонова</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="monitoring-select"
            >
              <option value="all">Всі статуси</option>
              <option value="active">Активна</option>
              <option value="maintenance">Обслуговування</option>
              <option value="inactive">Неактивна</option>
            </select>
            {selectedStationId && (
              <button
                onClick={() => handleStationSelect(null)}
                className="btn-reset"
              >
                ✕ Скинути вибір
              </button>
            )}
          </div>
        </div>

        {/* Карта та інфо */}
        <div className="monitoring-layout">
          <div className="monitoring-map-section">
            <div className="map-wrapper">
              <StationMap
                stations={filteredStations}
                selectedStationId={selectedStationId}
                onStationSelect={handleStationSelect}
              />
            </div>

            {/* Список станцій під картою */}
            <div className="stations-list">
              {filteredStations.map((station) => {
                const isSelected = station.id === selectedStationId;
                const level = station.currentAQI
                  ? getAirQualityLevel(station.currentAQI)
                  : null;
                const color = level ? getAirQualityColor(level) : "#999";

                return (
                  <button
                    key={station.id}
                    className={`station-list-item ${isSelected ? "station-list-item--active" : ""}`}
                    onClick={() =>
                      handleStationSelect(isSelected ? null : station.id)
                    }
                  >
                    <span
                      className="station-list-indicator"
                      style={{ backgroundColor: color }}
                    >
                      {station.currentAQI ?? "?"}
                    </span>
                    <span className="station-list-name">{station.name}</span>
                    <span className="station-list-city">{station.city}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Панель графіків */}
          <div className="monitoring-charts-section">
            {selectedStation && stationChartData ? (
              <>
                {/* Деталі станції */}
                <div className="station-detail-card">
                  <div className="station-detail-header">
                    <div>
                      <h2 className="station-detail-name">
                        {selectedStation.name}
                      </h2>
                      <p className="station-detail-city">
                        {selectedStation.address.city} &middot;{" "}
                        {typeLabels[selectedStation.type] ?? selectedStation.type}
                      </p>
                    </div>
                    {selectedSummary?.currentAQI && (
                      <div
                        className="station-detail-aqi"
                        style={{
                          backgroundColor: getAirQualityColor(
                            getAirQualityLevel(selectedSummary.currentAQI)
                          ),
                        }}
                      >
                        <span className="station-detail-aqi-value">
                          {selectedSummary.currentAQI}
                        </span>
                        <span className="station-detail-aqi-label">AQI</span>
                      </div>
                    )}
                  </div>
                  {selectedSummary?.currentAQI && (
                    <p className="station-detail-description">
                      {getAirQualityDescription(
                        getAirQualityLevel(selectedSummary.currentAQI)
                      )}
                    </p>
                  )}
                </div>

                {/* Графіки */}
                <TimeSeriesChart
                  measurements={stationChartData.measurements}
                  title="Зміна показників за 24 години"
                />

                <PollutionPieChart
                  pollutants={stationChartData.currentAirQuality.pollutants.map(
                    (p) => ({ type: p.type, value: p.value })
                  )}
                  title="Структура забруднення"
                />
              </>
            ) : (
              <div className="charts-placeholder">
                <div className="charts-placeholder-icon">📊</div>
                <h3>Оберіть станцію</h3>
                <p>
                  Натисніть на маркер на карті або оберіть станцію зі списку для
                  перегляду графіків
                </p>
              </div>
            )}

            {/* Порівняння станцій — завжди видиме */}
            <StationComparisonChart
              stationsData={comparisonData}
              title="Порівняння станцій за AQI"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
