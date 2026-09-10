import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conecta Agro",
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
    <html lang="pt-BR">
      <body className="min-h-screen">
        <div className="mx-auto min-h-screen max-w-md bg-white shadow-xl md:my-6 md:min-h-[calc(100vh-3rem)] md:rounded-3xl md:border md:border-agro-100">
          {children}
        </div>
      </body>
    </html>
  );
}
