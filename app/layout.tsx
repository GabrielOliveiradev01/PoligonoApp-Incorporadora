import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PoligonoApp — Experiências de venda para corretores e incorporadoras",
  description:
    "A plataforma que transforma empreendimentos em experiências de venda para corretores e incorporadoras. Plantas interativas, perspectivas, tour virtual e muito mais.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
