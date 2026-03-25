// Google Analytics 4 Measurement ID — replace with real ID before production
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX";

// Send a page view hit to GA4
export function pageview(url: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
}

// --- Custom event helpers ---

export function trackStationView(stationId: string, stationName: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "station_view", {
    station_id: stationId,
    station_name: stationName,
  });
}

export function trackMapInteraction(action: "click" | "zoom", detail?: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "map_interaction", {
    action,
    detail: detail ?? "",
  });
}

export function trackChartView(chartType: "timeseries" | "comparison" | "pie") {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "chart_view", { chart_type: chartType });
}

export function trackFilterApply(filterName: string, value: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "filter_apply", {
    filter_name: filterName,
    filter_value: value,
  });
}

export function trackDataExport(format: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "data_export", { format });
}

// Extend Window to include gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
