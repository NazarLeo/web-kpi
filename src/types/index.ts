/**
 * Центральний файл експорту всіх типів проєкту
 */

// Типи якості повітря
export type {
  PollutantConcentration,
  AirQualityData,
  AirQualityStats,
} from "./airQuality";

export { PollutantType, AirQualityLevel } from "./airQuality";

// Типи станцій моніторингу
export type {
  Coordinates,
  StationAddress,
  MonitoringStation,
  StationSummary,
} from "./station";

export { StationType, StationStatus } from "./station";

// Типи вимірювань та часових рядів
export type {
  Measurement,
  TimeSeries,
  AggregatedData,
  TimeSeriesQuery,
  StationComparison,
} from "./measurement";

export { TimeInterval } from "./measurement";

// Типи API
export type {
  ApiError,
  ValidationError,
  ApiResponse,
  ResponseMetadata,
  Pagination,
  PaginatedResponse,
  PaginationParams,
  DataFilter,
  FilterableRequest,
  OverallStatisticsResponse,
} from "./api";

export { ErrorCode } from "./api";

// Типи запитів та відповідей API
export type {
  GetStationsRequest,
  GetStationsResponse,
  GetStationRequest,
  GetStationResponse,
  GetCurrentAirQualityRequest,
  GetCurrentAirQualityResponse,
  GetHistoricalDataRequest,
  GetHistoricalDataResponse,
  GetAggregatedDataRequest,
  GetAggregatedDataResponse,
  CompareStationsRequest,
  CompareStationsResponse,
  GetStatisticsRequest,
  GetStatisticsResponse,
  GetForecastRequest,
  GetForecastResponse,
  CreateAlertRequest,
  CreateAlertResponse,
} from "./apiRequests";
