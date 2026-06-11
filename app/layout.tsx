import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "polígono tech — Apresentação de Empreendimentos",
  description:
    "Aplicativos touch para incorporadoras apresentarem plantas, perspectivas, implantação, localização e tours virtuais em tablets, TVs e totens.",
  icons: {
    icon: "/imagens/logo-branca.png",
    apple: "/imagens/logo-branca.png",
  },
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
