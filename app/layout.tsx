import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import FacebookPixel from "@/components/FacebookPixel";
import ZohoSalesIQ from "@/components/ZohoSalesIQ";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "GhawdeX Portal - Employee Hub",
  description: "GhawdeX Engineering employee portal with company info, policies, and project management.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        {children}
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        <ZohoSalesIQ />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
