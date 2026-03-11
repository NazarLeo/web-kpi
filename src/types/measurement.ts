import { AirQualityData } from "./airQuality";
import { PollutantType } from "./airQuality";

/**
 * Інтервал агрегації даних
 */
export enum TimeInterval {
  HOURLY = "hourly",
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

/**
 * Одне вимірювання в часовому ряду
 */
export interface Measurement {
  timestamp: string; // ISO 8601 format
  stationId: string;
  data: AirQualityData;
  isValid: boolean; // Чи валідне вимірювання
  qualityFlags?: string[]; // Прапорці якості даних
}

/**
 * Часовий ряд вимірювань
 */
export interface TimeSeries {
  stationId: string;
  startDate: string; // ISO 8601 format
  endDate: string;   // ISO 8601 format
  interval: TimeInterval;
  measurements: Measurement[];
  totalCount: number;
  validCount: number;
}

/**
 * Агреговані дані за період
 */
export interface AggregatedData {
  stationId: string;
  pollutantType: PollutantType;
  interval: TimeInterval;
  startDate: string;
  endDate: string;
  min: number;
  max: number;
  avg: number;
  median?: number;
  dataPoints: Array<{
    timestamp: string;
    value: number;
    aqi?: number;
  }>;
}

/**
 * Параметри запиту часового ряду
 */
export interface TimeSeriesQuery {
  stationId?: string | string[];
  pollutantType?: PollutantType | PollutantType[];
  startDate: string;
  endDate: string;
  interval?: TimeInterval;
  includeInvalid?: boolean;
  limit?: number;
  offset?: number;
}

/**
 * Порівняння даних між станціями
 */
export interface StationComparison {
  stations: Array<{
    stationId: string;
    stationName: string;
    data: AggregatedData;
  }>;
  pollutantType: PollutantType;
  period: {
    startDate: string;
    endDate: string;
  };
}
