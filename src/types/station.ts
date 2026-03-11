/**
 * Типи моніторингових станцій
 */
export enum StationType {
  URBAN = "urban",                  // Міська
  SUBURBAN = "suburban",            // Приміська
  RURAL = "rural",                  // Сільська
  INDUSTRIAL = "industrial",        // Промислова
  TRAFFIC = "traffic",              // Транспортна (біля дорозі)
  BACKGROUND = "background",        // Фонова
}

/**
 * Статус станції
 */
export enum StationStatus {
  ACTIVE = "active",                // Активна
  INACTIVE = "inactive",            // Неактивна
  MAINTENANCE = "maintenance",      // Обслуговування
  ERROR = "error",                  // Помилка
}

/**
 * Географічні координати
 */
export interface Coordinates {
  latitude: number;  // Широта
  longitude: number; // Довгота
  altitude?: number; // Висота над рівнем моря (метри)
}

/**
 * Адреса станції
 */
export interface StationAddress {
  country: string;
  city: string;
  district?: string;
  street?: string;
  postalCode?: string;
}

/**
 * Інформація про моніторингову станцію
 */
export interface MonitoringStation {
  id: string;
  name: string;
  type: StationType;
  status: StationStatus;
  coordinates: Coordinates;
  address: StationAddress;
  description?: string;
  installationDate?: string; // ISO 8601 format
  lastMaintenance?: string;  // ISO 8601 format
  pollutantsMonitored: string[]; // Array of PollutantType
  dataUpdateInterval?: number; // Інтервал оновлення даних (хвилини)
  metadata?: Record<string, unknown>; // Додаткові метадані
}

/**
 * Коротка інформація про станцію (для списків)
 */
export interface StationSummary {
  id: string;
  name: string;
  type: StationType;
  status: StationStatus;
  coordinates: Coordinates;
  city: string;
  currentAQI?: number;
}
