import type { Metadata } from "next";
import MonitoringClient from "@/components/MonitoringClient";

export const metadata: Metadata = {
  title: "Моніторинг | Екологічний моніторинг",
  description: "Інтерактивна карта та графіки якості повітря",
};

export default function MonitoringPage() {
  return <MonitoringClient />;
}
