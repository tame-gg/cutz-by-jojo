import type { Metadata } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/GrainOverlay";
import SplashScreen from "@/components/SplashScreen";
import ScrollProgress from "@/components/ScrollProgress";

const displayFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cutz by JoJo — Charlotte's Mobile Barber",
  description:
    "Jowxel 'JoJo' Valentine. Mobile barber in Charlotte, NC. Fresh fades, clean line-ups. He comes to you, or you pull up.",
  openGraph: {
    title: "Cutz by JoJo",
    description: "Charlotte's Mobile Barber. He Comes to You.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <SplashScreen />
        <GrainOverlay />
        <ScrollProgress />
        <div className="vignette" aria-hidden />
        {children}
      </body>
    </html>
  );
}
