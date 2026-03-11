import { PollutantType, AirQualityLevel, AirQualityData } from "@/types";

/**
 * Розраховує рівень якості повітря на основі AQI
 */
export function getAirQualityLevel(aqi: number): AirQualityLevel {
  if (aqi <= 50) return AirQualityLevel.GOOD;
  if (aqi <= 100) return AirQualityLevel.MODERATE;
  if (aqi <= 150) return AirQualityLevel.UNHEALTHY_SENSITIVE;
  if (aqi <= 200) return AirQualityLevel.UNHEALTHY;
  if (aqi <= 300) return AirQualityLevel.VERY_UNHEALTHY;
  return AirQualityLevel.HAZARDOUS;
}

/**
 * Отримує колір для рівня якості повітря
 */
export function getAirQualityColor(level: AirQualityLevel): string {
  const colors: Record<AirQualityLevel, string> = {
    [AirQualityLevel.GOOD]: "#10b981",
    [AirQualityLevel.MODERATE]: "#f59e0b",
    [AirQualityLevel.UNHEALTHY_SENSITIVE]: "#f97316",
    [AirQualityLevel.UNHEALTHY]: "#ef4444",
    [AirQualityLevel.VERY_UNHEALTHY]: "#991b1b",
    [AirQualityLevel.HAZARDOUS]: "#7f1d1d",
  };
  
  return colors[level];
}

/**
 * Отримує текстовий опис рівня якості повітря
 */
export function getAirQualityDescription(level: AirQualityLevel): string {
  const descriptions: Record<AirQualityLevel, string> = {
    [AirQualityLevel.GOOD]: "Якість повітря задовільна, забруднення повітря становить незначний ризик",
    [AirQualityLevel.MODERATE]: "Якість повітря прийнятна, проте деякі забруднювачі можуть становити помірну загрозу",
    [AirQualityLevel.UNHEALTHY_SENSITIVE]: "Члени чутливих груп можуть відчувати вплив на здоров'я",
    [AirQualityLevel.UNHEALTHY]: "Кожен може почати відчувати вплив на здоров'я",
    [AirQualityLevel.VERY_UNHEALTHY]: "Попередження про здоров'я: кожен може відчувати серйозніші наслідки",
    [AirQualityLevel.HAZARDOUS]: "Надзвичайна ситуація: все населення більш імовірно постраждає",
  };
  
  return descriptions[level];
}

/**
 * Розраховує AQI для PM2.5
 */
export function calculatePM25AQI(concentration: number): number {
  const breakpoints = [
    { cLow: 0, cHigh: 12, aqiLow: 0, aqiHigh: 50 },
    { cLow: 12.1, cHigh: 35.4, aqiLow: 51, aqiHigh: 100 },
    { cLow: 35.5, cHigh: 55.4, aqiLow: 101, aqiHigh: 150 },
    { cLow: 55.5, cHigh: 150.4, aqiLow: 151, aqiHigh: 200 },
    { cLow: 150.5, cHigh: 250.4, aqiLow: 201, aqiHigh: 300 },
    { cLow: 250.5, cHigh: 500, aqiLow: 301, aqiHigh: 500 },
  ];

  for (const bp of breakpoints) {
    if (concentration >= bp.cLow && concentration <= bp.cHigh) {
      return Math.round(
        ((bp.aqiHigh - bp.aqiLow) / (bp.cHigh - bp.cLow)) *
          (concentration - bp.cLow) +
          bp.aqiLow
      );
    }
  }

  return 500; // Максимальний AQI
}

/**
 * Визначає домінантний забруднювач
 */
export function getDominantPollutant(data: AirQualityData): PollutantType | undefined {
  let maxAQI = 0;
  let dominant: PollutantType | undefined;

  data.pollutants.forEach((pollutant) => {
    if (pollutant.aqi && pollutant.aqi > maxAQI) {
      maxAQI = pollutant.aqi;
      dominant = pollutant.type;
    }
  });

  return dominant;
}

/**
 * Форматує дату для відображення
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Перевіряє валідність діапазону дат
 */
export function isValidDateRange(startDate: string, endDate: string): boolean {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return start < end && !isNaN(start.getTime()) && !isNaN(end.getTime());
}
