import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MahiOpsAI",
  description: "AI-powered DevOps Monitoring Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="antialiased">
        {children}
      </body>
    </html>
  );
}

