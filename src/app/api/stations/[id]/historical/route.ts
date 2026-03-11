import { NextRequest, NextResponse } from "next/server";
import {
  ApiResponse,
  GetHistoricalDataResponse,
  TimeInterval,
  ErrorCode,
} from "@/types";
import { mockStations, generateTimeSeries } from "@/lib/mockData";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/stations/[id]/historical
 * Отримати історичні дані вимірювань
 * 
 * Query params:
 * - startDate: string (ISO 8601) - початкова дата
 * - endDate: string (ISO 8601) - кінцева дата
 * - interval: TimeInterval - інтервал агрегації (hourly, daily, weekly, monthly)
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<GetHistoricalDataResponse>>> {
  try {
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;

    // Валідація параметрів
    const startDateStr = searchParams.get("startDate");
    const endDateStr = searchParams.get("endDate");
    const interval = (searchParams.get("interval") || "hourly") as TimeInterval;

    if (!startDateStr || !endDateStr) {
      const errorResponse: ApiResponse<GetHistoricalDataResponse> = {
        success: false,
        error: {
          code: ErrorCode.VALIDATION_ERROR,
          message: "Параметри startDate та endDate є обов'язковими",
          timestamp: new Date().toISOString(),
          validationErrors: [
            { field: "startDate", message: "Поле є обов'язковим" },
            { field: "endDate", message: "Поле є обов'язковим" },
          ],
        },
      };

      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Перевірка існування станції
    const station = mockStations.find((s) => s.id === id);
    
    if (!station) {
      const errorResponse: ApiResponse<GetHistoricalDataResponse> = {
        success: false,
        error: {
          code: ErrorCode.STATION_NOT_FOUND,
          message: `Станцію з ID "${id}" не знайдено`,
          timestamp: new Date().toISOString(),
        },
      };

      return NextResponse.json(errorResponse, { status: 404 });
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // Валідація дат
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      const errorResponse: ApiResponse<GetHistoricalDataResponse> = {
        success: false,
        error: {
          code: ErrorCode.VALIDATION_ERROR,
          message: "Невірний формат дат",
          timestamp: new Date().toISOString(),
        },
      };

      return NextResponse.json(errorResponse, { status: 400 });
    }

    if (startDate >= endDate) {
      const errorResponse: ApiResponse<GetHistoricalDataResponse> = {
        success: false,
        error: {
          code: ErrorCode.INVALID_DATE_RANGE,
          message: "Початкова дата повинна бути раніше кінцевої",
          timestamp: new Date().toISOString(),
        },
      };

      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Генеруємо часові ряди
    const measurements = generateTimeSeries(id, startDate, endDate, interval);
    
    const validMeasurements = measurements.filter((m) => m.isValid);

    const response: ApiResponse<GetHistoricalDataResponse> = {
      success: true,
      data: {
        stationId: id,
        startDate: startDateStr,
        endDate: endDateStr,
        interval,
        measurements,
        totalCount: measurements.length,
        validCount: validMeasurements.length,
      },
      metadata: {
        timestamp: new Date().toISOString(),
        version: "1.0",
      },
    };

    return NextResponse.json(response, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    const errorResponse: ApiResponse<GetHistoricalDataResponse> = {
      success: false,
      error: {
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: "Виникла помилка при отриманні історичних даних",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
