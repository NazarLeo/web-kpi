import { NextResponse } from "next/server";
import { ApiResponse, ErrorCode, OverallStatisticsResponse } from "@/types";
import { getOverallStatistics } from "@/lib/mockData";

/**
 * GET /api/statistics
 * Отримати загальну статистику по всіх станціях
 */
export async function GET(): Promise<NextResponse<ApiResponse<OverallStatisticsResponse>>> {
  try {
    const statistics = getOverallStatistics();

    const response: ApiResponse<OverallStatisticsResponse> = {
      success: true,
      data: statistics,
      metadata: {
        timestamp: new Date().toISOString(),
        version: "1.0",
      },
    };

    return NextResponse.json(response, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=180, stale-while-revalidate=360',
      },
    });
  } catch (error) {
    const errorResponse: ApiResponse<OverallStatisticsResponse> = {
      success: false,
      error: {
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: "Виникла помилка при обчисленні статистики",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
