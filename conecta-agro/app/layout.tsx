import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conecta Agro | Inteligência Hídrica & Agricultura de Precisão",
  description: "Irrigação inteligente para um futuro mais sustentável.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-screen w-full bg-slate-950 text-slate-100 antialiased m-0 p-0">
        {children}
      </body>
    </html>
  );
}
