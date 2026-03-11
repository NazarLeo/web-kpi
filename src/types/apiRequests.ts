import { MonitoringStation, StationSummary, StationType, StationStatus } from "./station";
import { AirQualityData } from "./airQuality";
import { TimeSeries, TimeSeriesQuery, AggregatedData } from "./measurement";
import { PaginationParams, FilterableRequest } from "./api";

/**
 * Запит списку станцій
 */
export interface GetStationsRequest extends FilterableRequest {
  type?: StationType;
  status?: StationStatus;
  city?: string;
  bounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

/**
 * Відповідь зі списком станцій
 */
export type GetStationsResponse = StationSummary[];

/**
 * Запит деталей станції
 */
export interface GetStationRequest {
  id: string;
}

/**
 * Відповідь з деталями станції
 */
export type GetStationResponse = MonitoringStation;

/**
 * Запит поточних даних якості повітря
 */
export interface GetCurrentAirQualityRequest {
  stationId: string;
}

/**
 * Відповідь з поточними даними якості повітря
 */
export interface GetCurrentAirQualityResponse {
  stationId: string;
  stationName: string;
  data: AirQualityData;
  lastUpdate: string;
}

/**
 * Запит історичних даних
 */
export interface GetHistoricalDataRequest extends TimeSeriesQuery, PaginationParams {
  // Комбінує параметри з TimeSeriesQuery та пагінації
}

/**
 * Відповідь з історичними даними
 */
export type GetHistoricalDataResponse = TimeSeries;

/**
 * Запит агрегованих даних
 */
export interface GetAggregatedDataRequest {
  stationId: string | string[];
  pollutantType?: string;
  startDate: string;
  endDate: string;
  interval: "hourly" | "daily" | "weekly" | "monthly";
}

/**
 * Відповідь з агрегованими даними
 */
export type GetAggregatedDataResponse = AggregatedData | AggregatedData[];

/**
 * Запит порівняння станцій
 */
export interface CompareStationsRequest {
  stationIds: string[];
  pollutantType: string;
  startDate: string;
  endDate: string;
}

/**
 * Відповідь з порівнянням станцій
 */
export interface CompareStationsResponse {
  stations: Array<{
    stationId: string;
    stationName: string;
    averageAQI: number;
    data: AggregatedData;
  }>;
  period: {
    startDate: string;
    endDate: string;
  };
}

/**
 * Запит статистики
 */
export interface GetStatisticsRequest {
  stationId?: string;
  pollutantType?: string;
  startDate: string;
  endDate: string;
}

/**
 * Відповідь зі статистикою
 */
export interface GetStatisticsResponse {
  stationId?: string;
  pollutantType?: string;
  period: {
    startDate: string;
    endDate: string;
  };
  statistics: {
    min: number;
    max: number;
    avg: number;
    median: number;
    stdDev: number;
    percentile25: number;
    percentile75: number;
    percentile95: number;
  };
  distribution?: Array<{
    range: string;
    count: number;
    percentage: number;
  }>;
}

/**
 * Запит прогнозу якості повітря
 */
export interface GetForecastRequest {
  stationId: string;
  hours?: number; // За скільки годин вперед
}

/**
 * Відповідь з прогнозом
 */
export interface GetForecastResponse {
  stationId: string;
  generatedAt: string;
  forecast: Array<{
    timestamp: string;
    predictedAQI: number;
    confidence: number;
    pollutants?: Array<{
      type: string;
      value: number;
    }>;
  }>;
}

/**
 * Запит створення алерту
 */
export interface CreateAlertRequest {
  stationId: string;
  pollutantType?: string;
  threshold: number;
  condition: "above" | "below";
  notificationMethod: "email" | "sms" | "push";
  contactInfo: string;
}

/**
 * Відповідь створення алерту
 */
export interface CreateAlertResponse {
  alertId: string;
  status: "active" | "inactive";
  createdAt: string;
}
