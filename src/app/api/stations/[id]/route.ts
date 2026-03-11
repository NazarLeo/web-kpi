import { NextRequest, NextResponse } from "next/server";
import {
  ApiResponse,
  GetStationResponse,
  ErrorCode,
} from "@/types";
import { mockStations } from "@/lib/mockData";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/stations/[id]
 * Отримати детальну інформацію про станцію
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<GetStationResponse>>> {
  try {
    const { id } = await params;

    // Знаходимо станцію за ID
    const station = mockStations.find((s) => s.id === id);

    if (!station) {
      const errorResponse: ApiResponse<GetStationResponse> = {
        success: false,
        error: {
          code: ErrorCode.STATION_NOT_FOUND,
          message: `Станцію з ID "${id}" не знайдено`,
          timestamp: new Date().toISOString(),
          path: request.nextUrl.pathname,
        },
      };

      return NextResponse.json(errorResponse, { status: 404 });
    }

    const response: ApiResponse<GetStationResponse> = {
      success: true,
      data: station,
      metadata: {
        timestamp: new Date().toISOString(),
        version: "1.0",
      },
    };

    return NextResponse.json(response, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
      },
    });
  } catch (error) {
    const errorResponse: ApiResponse<GetStationResponse> = {
      success: false,
      error: {
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: "Виникла помилка при отриманні даних станції",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
