import type { Metadata } from "next";
import "./globals.css";

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
      </body>
    </html>
  );
}
