/**
 * Коди помилок API
 */
export enum ErrorCode {
  // Клієнтські помилки (4xx)
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
  
  // Серверні помилки (5xx)
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
  DATABASE_ERROR = "DATABASE_ERROR",
  
  // Бізнес-логіка помилки
  STATION_NOT_FOUND = "STATION_NOT_FOUND",
  NO_DATA_AVAILABLE = "NO_DATA_AVAILABLE",
  INVALID_DATE_RANGE = "INVALID_DATE_RANGE",
  INVALID_STATION_ID = "INVALID_STATION_ID",
}

/**
 * Помилка валідації
 */
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

/**
 * Структура помилки API
 */
export interface ApiError {
  code: ErrorCode;
  message: string;
  details?: string;
  validationErrors?: ValidationError[];
  timestamp: string;
  path?: string;
}

/**
 * Базова структура відповіді API
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  metadata?: ResponseMetadata;
}

/**
 * Метадані відповіді
 */
export interface ResponseMetadata {
  timestamp: string;
  requestId?: string;
  version?: string;
}

/**
 * Пагінація
 */
export interface Pagination {
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Пагінована відповідь
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination;
}

/**
 * Параметри пагінації для запиту
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Фільтр для даних
 */
export interface DataFilter {
  field: string;
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "in" | "like";
  value: string | number | boolean | (string | number)[];
}

/**
 * Параметри запиту з фільтрами
 */
export interface FilterableRequest extends PaginationParams {
  filters?: DataFilter[];
  search?: string;
}

/**
 * Загальна статистика системи
 */
export interface OverallStatisticsResponse {
  total_stations: number;
  active_stations: number;
  average_aqi: number;
  quality_distribution: {
    good: number;
    moderate: number;
    unhealthy_sensitive: number;
    unhealthy: number;
    very_unhealthy: number;
    hazardous: number;
  };
}

