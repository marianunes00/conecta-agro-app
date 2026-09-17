import type { Metadata, Viewport } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Conecta Agro | Tecnologia que cultiva o amanhã",
  description:
    "Conectando pessoas, tecnologia e o campo para uma agricultura mais eficiente, sustentável e produtiva.",
  icons: {
    icon: "/conecta-agro-logo.png",
  },
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
    <html lang="pt-BR" className={`h-full ${poppins.variable} ${montserrat.variable}`}>
      <body className="min-h-screen w-full font-sans bg-[#F4F7F2] text-brand-escuro antialiased m-0 p-0 selection:bg-brand-cinza selection:text-brand-institucional">
        {children}
      </body>
    </html>
  );
}

