/**
 * Тестові дані для демонстрації функціоналу
 * Mock data для моніторингових станцій та якості повітря
 */

import {
  MonitoringStation,
  StationSummary,
  StationType,
  StationStatus,
  PollutantType,
  AirQualityLevel,
  AirQualityData,
  Measurement,
  TimeInterval,
} from "@/types";

/**
 * Генерує випадкове число в діапазоні
 */
function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Генерує реалістичні значення AQI на основі рівня
 */
function generateAQI(level: AirQualityLevel): number {
  const ranges: Record<AirQualityLevel, [number, number]> = {
    [AirQualityLevel.GOOD]: [0, 50],
    [AirQualityLevel.MODERATE]: [51, 100],
    [AirQualityLevel.UNHEALTHY_SENSITIVE]: [101, 150],
    [AirQualityLevel.UNHEALTHY]: [151, 200],
    [AirQualityLevel.VERY_UNHEALTHY]: [201, 300],
    [AirQualityLevel.HAZARDOUS]: [301, 500],
  };
  
  const [min, max] = ranges[level];
  return Math.round(randomInRange(min, max));
}

/**
 * Повні дані моніторингових станцій
 */
export const mockStations: MonitoringStation[] = [
  {
    id: "station-kyiv-center",
    name: "Київ - Центр",
    type: StationType.URBAN,
    status: StationStatus.ACTIVE,
    coordinates: {
      latitude: 50.4501,
      longitude: 30.5234,
      altitude: 179,
    },
    address: {
      country: "Україна",
      city: "Київ",
      district: "Шевченківський",
      street: "вул. Хрещатик, 1",
      postalCode: "01001",
    },
    description: "Центральна станція моніторингу в історичному центрі міста",
    installationDate: "2020-03-15T00:00:00Z",
    lastMaintenance: "2026-02-20T10:30:00Z",
    pollutantsMonitored: ["PM2.5", "PM10", "NO2", "O3", "CO", "SO2"],
    dataUpdateInterval: 15,
    metadata: {
      operator: "Київський екологічний центр",
      equipment: "Thermo Scientific",
    },
  },
  {
    id: "station-kyiv-obolon",
    name: "Київ - Оболонь",
    type: StationType.SUBURBAN,
    status: StationStatus.ACTIVE,
    coordinates: {
      latitude: 50.5167,
      longitude: 30.4980,
      altitude: 150,
    },
    address: {
      country: "Україна",
      city: "Київ",
      district: "Оболонський",
      street: "просп. Героїв Сталінграда, 12",
      postalCode: "04210",
    },
    description: "Станція моніторингу в житловому районі на півночі міста",
    installationDate: "2021-06-10T00:00:00Z",
    lastMaintenance: "2026-03-05T14:15:00Z",
    pollutantsMonitored: ["PM2.5", "PM10", "NO2", "O3"],
    dataUpdateInterval: 20,
  },
  {
    id: "station-kyiv-industrial",
    name: "Київ - Промзона",
    type: StationType.INDUSTRIAL,
    status: StationStatus.ACTIVE,
    coordinates: {
      latitude: 50.4119,
      longitude: 30.6339,
      altitude: 160,
    },
    address: {
      country: "Україна",
      city: "Київ",
      district: "Дарницький",
      street: "вул. Колекторна, 45",
      postalCode: "02660",
    },
    description: "Моніторинг промислової зони на лівому березі Дніпра",
    installationDate: "2019-11-20T00:00:00Z",
    lastMaintenance: "2026-02-28T09:00:00Z",
    pollutantsMonitored: ["PM2.5", "PM10", "NO2", "SO2", "CO", "O3", "NH3"],
    dataUpdateInterval: 10,
  },
  {
    id: "station-lviv-center",
    name: "Львів - Центр",
    type: StationType.URBAN,
    status: StationStatus.ACTIVE,
    coordinates: {
      latitude: 49.8397,
      longitude: 24.0297,
      altitude: 296,
    },
    address: {
      country: "Україна",
      city: "Львів",
      district: "Галицький",
      street: "площа Ринок, 1",
      postalCode: "79000",
    },
    description: "Центральна станція у старому місті Львова",
    installationDate: "2020-09-01T00:00:00Z",
    lastMaintenance: "2026-03-01T11:00:00Z",
    pollutantsMonitored: ["PM2.5", "PM10", "NO2", "O3", "CO"],
    dataUpdateInterval: 15,
  },
  {
    id: "station-odesa-port",
    name: "Одеса - Порт",
    type: StationType.TRAFFIC,
    status: StationStatus.ACTIVE,
    coordinates: {
      latitude: 46.4825,
      longitude: 30.7233,
      altitude: 40,
    },
    address: {
      country: "Україна",
      city: "Одеса",
      district: "Приморський",
      street: "Морський вокзал",
      postalCode: "65000",
    },
    description: "Моніторинг забруднення в портовій зоні",
    installationDate: "2021-04-15T00:00:00Z",
    lastMaintenance: "2026-02-15T13:30:00Z",
    pollutantsMonitored: ["PM2.5", "PM10", "NO2", "SO2", "O3"],
    dataUpdateInterval: 20,
  },
  {
    id: "station-kharkiv-residential",
    name: "Харків - Салтівка",
    type: StationType.SUBURBAN,
    status: StationStatus.ACTIVE,
    coordinates: {
      latitude: 50.0297,
      longitude: 36.2089,
      altitude: 150,
    },
    address: {
      country: "Україна",
      city: "Харків",
      district: "Салтівський",
      street: "просп. Тракторобудівників, 100",
      postalCode: "61000",
    },
    description: "Житловий район на півночі Харкова",
    installationDate: "2020-10-10T00:00:00Z",
    lastMaintenance: "2026-03-10T10:00:00Z",
    pollutantsMonitored: ["PM2.5", "PM10", "NO2", "O3"],
    dataUpdateInterval: 15,
  },
  {
    id: "station-carpathians-background",
    name: "Карпати - Фонова",
    type: StationType.BACKGROUND,
    status: StationStatus.MAINTENANCE,
    coordinates: {
      latitude: 48.6208,
      longitude: 24.2989,
      altitude: 850,
    },
    address: {
      country: "Україна",
      city: "Яремче",
      district: "Івано-Франківська область",
      street: "Національний парк",
    },
    description: "Фонова станція в гірській місцевості для еталонних вимірювань",
    installationDate: "2019-05-20T00:00:00Z",
    lastMaintenance: "2026-03-08T08:00:00Z",
    pollutantsMonitored: ["PM2.5", "PM10", "O3"],
    dataUpdateInterval: 30,
  },
];

/**
 * Короткі дані станцій для списків
 */
// Фіксовані значення AQI — детерміновані, щоб уникнути hydration mismatch
const fixedAQI: Record<string, number | undefined> = {
  "station-kyiv-center": 78,
  "station-kyiv-obolon": 42,
  "station-kyiv-industrial": 132,
  "station-lviv-center": 65,
  "station-odesa-port": 95,
  "station-kharkiv-residential": 38,
  "station-carpathians-background": undefined,
};

export const mockStationsSummary: StationSummary[] = mockStations.map((station) => ({
  id: station.id,
  name: station.name,
  type: station.type,
  status: station.status,
  coordinates: station.coordinates,
  city: station.address.city,
  currentAQI: fixedAQI[station.id],
}));

/**
 * Генерує дані про якість повітря для станції
 */
export function generateAirQualityData(
  stationId: string,
  timestamp: Date = new Date()
): AirQualityData {
  const station = mockStations.find((s) => s.id === stationId);
  
  if (!station) {
    throw new Error(`Station ${stationId} not found`);
  }

  // Визначаємо рівень залежно від типу станції
  const levelByType: Record<StationType, AirQualityLevel[]> = {
    [StationType.URBAN]: [AirQualityLevel.MODERATE, AirQualityLevel.UNHEALTHY_SENSITIVE],
    [StationType.SUBURBAN]: [AirQualityLevel.GOOD, AirQualityLevel.MODERATE],
    [StationType.INDUSTRIAL]: [AirQualityLevel.UNHEALTHY_SENSITIVE, AirQualityLevel.UNHEALTHY],
    [StationType.TRAFFIC]: [AirQualityLevel.MODERATE, AirQualityLevel.UNHEALTHY_SENSITIVE],
    [StationType.BACKGROUND]: [AirQualityLevel.GOOD],
    [StationType.RURAL]: [AirQualityLevel.GOOD, AirQualityLevel.MODERATE],
  };

  const possibleLevels = levelByType[station.type];
  const level = possibleLevels[Math.floor(Math.random() * possibleLevels.length)];
  const overallAQI = generateAQI(level);

  // Генеруємо значення забруднювачів
  const pollutants = station.pollutantsMonitored.map((type) => {
    const pollutantType = type as PollutantType;
    
    // Реалістичні діапазони для кожного забруднювача
    const ranges: Record<PollutantType, [number, number, string]> = {
      [PollutantType.PM25]: [5, 85, "µg/m³"],
      [PollutantType.PM10]: [10, 150, "µg/m³"],
      [PollutantType.NO2]: [10, 120, "µg/m³"],
      [PollutantType.SO2]: [5, 80, "µg/m³"],
      [PollutantType.CO]: [0.1, 4.5, "mg/m³"],
      [PollutantType.O3]: [20, 180, "µg/m³"],
      [PollutantType.NH3]: [5, 50, "µg/m³"],
    };

    const [min, max, unit] = ranges[pollutantType];
    const value = randomInRange(min, max);
    
    return {
      type: pollutantType,
      value: Math.round(value * 10) / 10,
      unit,
      aqi: Math.round(randomInRange(overallAQI - 15, overallAQI + 15)),
    };
  });

  const dominantPollutant = pollutants.reduce((prev, current) =>
    (current.aqi || 0) > (prev.aqi || 0) ? current : prev
  ).type;

  return {
    timestamp: timestamp.toISOString(),
    overallAQI,
    level,
    dominantPollutant,
    pollutants,
    temperature: Math.round(randomInRange(-5, 28)),
    humidity: Math.round(randomInRange(30, 95)),
    pressure: Math.round(randomInRange(990, 1025)),
    windSpeed: Math.round(randomInRange(0, 15) * 10) / 10,
    windDirection: Math.round(randomInRange(0, 360)),
  };
}

/**
 * Генерує часові ряди вимірювань
 */
export function generateTimeSeries(
  stationId: string,
  startDate: Date,
  endDate: Date,
  interval: TimeInterval = TimeInterval.HOURLY
): Measurement[] {
  const measurements: Measurement[] = [];
  
  const intervalMs: Record<TimeInterval, number> = {
    [TimeInterval.HOURLY]: 60 * 60 * 1000,
    [TimeInterval.DAILY]: 24 * 60 * 60 * 1000,
    [TimeInterval.WEEKLY]: 7 * 24 * 60 * 60 * 1000,
    [TimeInterval.MONTHLY]: 30 * 24 * 60 * 60 * 1000,
    [TimeInterval.YEARLY]: 365 * 24 * 60 * 60 * 1000,
  };

  const step = intervalMs[interval];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const data = generateAirQualityData(stationId, currentDate);
    
    measurements.push({
      timestamp: currentDate.toISOString(),
      stationId,
      data,
      isValid: Math.random() > 0.05, // 95% валідних даних
      qualityFlags: Math.random() > 0.9 ? ["calibration"] : undefined,
    });

    currentDate = new Date(currentDate.getTime() + step);
  }

  return measurements;
}

/**
 * Обчислює статистику для всіх станцій
 */
export function getOverallStatistics() {
  const activeStations = mockStationsSummary.filter(
    (s) => s.status === StationStatus.ACTIVE && s.currentAQI !== undefined
  );

  const aqiValues = activeStations
    .map((s) => s.currentAQI)
    .filter((aqi): aqi is number => aqi !== undefined);

  const avgAQI = aqiValues.length > 0
    ? Math.round(aqiValues.reduce((sum, aqi) => sum + aqi, 0) / aqiValues.length)
    : 0;

  // Розподіл за рівнями якості повітря
  const good = activeStations.filter((s) => (s.currentAQI || 0) <= 50).length;
  const moderate = activeStations.filter(
    (s) => (s.currentAQI || 0) > 50 && (s.currentAQI || 0) <= 100
  ).length;
  const unhealthy_sensitive = activeStations.filter(
    (s) => (s.currentAQI || 0) > 100 && (s.currentAQI || 0) <= 150
  ).length;
  const unhealthy = activeStations.filter(
    (s) => (s.currentAQI || 0) > 150 && (s.currentAQI || 0) <= 200
  ).length;
  const very_unhealthy = activeStations.filter(
    (s) => (s.currentAQI || 0) > 200 && (s.currentAQI || 0) <= 300
  ).length;
  const hazardous = activeStations.filter((s) => (s.currentAQI || 0) > 300).length;

  return {
    total_stations: mockStations.length,
    active_stations: activeStations.length,
    average_aqi: avgAQI,
    quality_distribution: {
      good,
      moderate,
      unhealthy_sensitive,
      unhealthy,
      very_unhealthy,
      hazardous,
    },
  };
}
