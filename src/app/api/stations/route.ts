import { NextRequest, NextResponse } from "next/server";
import { 
  ApiResponse, 
  GetStationsResponse,
  StationType,
  StationStatus,
  ErrorCode
} from "@/types";
import { mockStationsSummary } from "@/lib/mockData";
import { logInfo, logError } from "@/lib/logger";

/**
 * GET /api/stations
 * Отримати список всіх моніторингових станцій
 * 
 * Query params:
 * - type: StationType - фільтр за типом станції
 * - status: StationStatus - фільтр за статусом
 * - city: string - фільтр за містом
 * - page: number - номер сторінки (пагінація)
 * - pageSize: number - кількість елементів на сторінці
 */
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<GetStationsResponse>>> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type") as StationType | null;
    const status = searchParams.get("status") as StationStatus | null;
    const city = searchParams.get("city");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "50");

    // Фільтрація за параметрами
    let filteredStations = mockStationsSummary;

    if (type) {
      filteredStations = filteredStations.filter(s => s.type === type);
    }

    if (status) {
      filteredStations = filteredStations.filter(s => s.status === status);
    }

    if (city) {
      filteredStations = filteredStations.filter(s => 
        s.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    // Пагінація
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedStations = filteredStations.slice(startIndex, endIndex);

    // Формування відповіді
    const response: ApiResponse<GetStationsResponse> = {
      success: true,
      data: paginatedStations,
      metadata: {
        timestamp: new Date().toISOString(),
        version: "1.0",
      },
    };

    logInfo("GET /api/stations", { count: paginatedStations.length, page, type, status });
    return NextResponse.json(response, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    const errorResponse: ApiResponse<GetStationsResponse> = {
      success: false,
      error: {
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: "Виникла помилка при отриманні списку станцій",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
    };

    logError("GET /api/stations failed", error);
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
