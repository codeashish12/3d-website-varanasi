import type { Metadata } from "next";
<<<<<<< HEAD
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "THE ETERNAL VARANASI | Where Time Stops And The Soul Awakens",
  description: "Experience the spiritual capital of India. Explore ancient ghats, majestic temples, aarti rituals, and a luxury travel journey through Varanasi.",
  keywords: ["Varanasi Tourism", "Kashi Vishwanath", "Ganga Aarti", "Assi Ghat", "Luxury Varanasi Travel", "Brijrama Palace"],
  authors: [{ name: "The Eternal Varanasi" }],
=======
import { Cinzel, Montserrat } from "next/font/google";
import "./globals.css";
import DiyaCursor from "@/components/DiyaCursor";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mystic Varanasi | Ancient Spirituality Meets Futuristic Luxury",
  description: "Experience the soul of India. Discover the timeless beauty, sacred ghats, temples, hidden gems, local food, and luxury travel utilities of Varanasi, the world's oldest living city.",
  keywords: ["Varanasi Tourism", "Kashi Vishwanath", "Ganga Aarti", "Luxury Varanasi Travel", "Mystic Varanasi", "Assi Ghat", "Manikarnika", "Luxury Travel Planner"],
  authors: [{ name: "Mystic Varanasi Team" }],
  openGraph: {
    title: "Mystic Varanasi | Ancient Spirituality Meets Futuristic Luxury",
    description: "Discover Varanasi like never before. Experience Ganga Aarti, sacred ghats, historical temples, and plan your luxury itinerary.",
    type: "website",
    locale: "en_US",
  },
>>>>>>> ec82f9ac2e3c4bf13acc00866314c61be1d44b7f
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
<<<<<<< HEAD
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
=======
      className={`${cinzel.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-deep-black text-foreground relative overflow-x-hidden selection:bg-sacred-gold selection:text-deep-black">
        <DiyaCursor />
        {children}
>>>>>>> ec82f9ac2e3c4bf13acc00866314c61be1d44b7f
      </body>
    </html>
  );
}
<<<<<<< HEAD

=======
>>>>>>> ec82f9ac2e3c4bf13acc00866314c61be1d44b7f
