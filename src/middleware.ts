import { NextRequest, NextResponse } from "next/server";

// Next.js Middleware runs in the Edge Runtime — pino is Node.js-only,
// so we use a lightweight structured JSON logger here.
function structuredLog(entry: {
  level: "info" | "warn" | "error";
  message: string;
  method: string;
  url: string;
  status?: number;
  durationMs?: number;
  userAgent?: string;
  ip?: string;
}) {
  const record = {
    timestamp: new Date().toISOString(),
    app: "eco-monitoring",
    ...entry,
  };
  if (entry.level === "error") {
    console.error(JSON.stringify(record));
  } else if (entry.level === "warn") {
    console.warn(JSON.stringify(record));
  } else {
    console.log(JSON.stringify(record));
  }
}

export function middleware(request: NextRequest) {
  const start = Date.now();
  const { method, nextUrl } = request;
  const url = nextUrl.pathname + (nextUrl.search || "");
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const response = NextResponse.next();

  const durationMs = Date.now() - start;
  const status = response.status;

  const level = status >= 500 ? "error" : status >= 400 ? "warn" : "info";

  structuredLog({
    level,
    message: `${method} ${url} → ${status}`,
    method,
    url,
    status,
    durationMs,
    userAgent,
    ip,
  });

  return response;
}

// Log only API and page routes (skip static assets)
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg|.*\\.jpg|.*\\.ico).*)",
  ],
};
