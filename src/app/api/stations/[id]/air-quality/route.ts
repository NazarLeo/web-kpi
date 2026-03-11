import { NextRequest, NextResponse } from "next/server";
import {
  ApiResponse,
  GetCurrentAirQualityResponse,
  ErrorCode,
} from "@/types";
import { mockStations, generateAirQualityData } from "@/lib/mockData";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/stations/[id]/air-quality
 * Отримати поточні дані про якість повітря для станції
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<GetCurrentAirQualityResponse>>> {
  try {
    const { id } = await params;

    // Перевірка існування станції
    const station = mockStations.find((s) => s.id === id);
    
    if (!station) {
      const errorResponse: ApiResponse<GetCurrentAirQualityResponse> = {
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

    // Генеруємо реалістичні дані про якість повітря
    const airQualityData = generateAirQualityData(id);

    const response: ApiResponse<GetCurrentAirQualityResponse> = {
      success: true,
      data: {
        stationId: id,
        stationName: station.name,
        lastUpdate: airQualityData.timestamp,
        data: airQualityData,
      },
      metadata: {
        timestamp: new Date().toISOString(),
        version: "1.0",
      },
    };

    return NextResponse.json(response, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    const errorResponse: ApiResponse<GetCurrentAirQualityResponse> = {
      success: false,
      error: {
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: "Виникла помилка при отриманні даних про якість повітря",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
