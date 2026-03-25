import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Analytics from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Екологічний моніторинг",
  description: "Система моніторингу якості повітря та екологічних показників",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Analytics />
        <Header />
        <main style={{ minHeight: "100vh" }}>
          {children}
        </main>
        <footer style={{ 
          background: "#1f2937", 
          color: "white", 
          padding: "2rem 0", 
          marginTop: "3rem" 
        }}>
          <div className="container" style={{ textAlign: "center" }}>
            <p>&copy; 2026 Екологічний моніторинг. Навчальний проєкт КПІ.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
