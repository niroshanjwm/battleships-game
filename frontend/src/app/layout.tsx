import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Battleship Game | WireApps Assessment",
  description:
    "A 2-player turn-based Battleship game built with Next.js, Node.js, Express, Prisma, and PostgreSQL for the WireApps technical assessment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
