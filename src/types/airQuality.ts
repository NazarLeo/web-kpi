/**
 * Типи забруднювачів повітря
 */
export enum PollutantType {
  PM25 = "PM2.5",      // Дрібні тверді частинки
  PM10 = "PM10",       // Тверді частинки
  NO2 = "NO2",         // Діоксид азоту
  SO2 = "SO2",         // Діоксид сірки
  CO = "CO",           // Чадний газ
  O3 = "O3",           // Озон
  NH3 = "NH3",         // Аміак
}

/**
 * Рівні якості повітря за індексом AQI
 */
export enum AirQualityLevel {
  GOOD = "good",                    // Добра (0-50)
  MODERATE = "moderate",            // Помірна (51-100)
  UNHEALTHY_SENSITIVE = "unhealthy_sensitive", // Нездорова для чутливих груп (101-150)
  UNHEALTHY = "unhealthy",          // Нездорова (151-200)
  VERY_UNHEALTHY = "very_unhealthy", // Дуже нездорова (201-300)
  HAZARDOUS = "hazardous",          // Небезпечна (301+)
}

/**
 * Концентрація забруднювача
 */
export interface PollutantConcentration {
  type: PollutantType;
  value: number;
  unit: string; // наприклад, "µg/m³", "ppm"
  aqi?: number; // Air Quality Index для цього забруднювача
}

/**
 * Дані про якість повітря
 */
export interface AirQualityData {
  timestamp: string; // ISO 8601 format
  overallAQI: number; // Загальний індекс якості повітря
  level: AirQualityLevel;
  dominantPollutant?: PollutantType; // Основний забруднювач
  pollutants: PollutantConcentration[];
  temperature?: number; // °C
  humidity?: number; // %
  pressure?: number; // hPa
  windSpeed?: number; // m/s
  windDirection?: number; // градуси (0-360)
}

/**
 * Статистика якості повітря
 */
export interface AirQualityStats {
  pollutantType: PollutantType;
  min: number;
  max: number;
  avg: number;
  median: number;
  stdDev?: number;
}
