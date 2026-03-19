import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Permanent_Marker } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const permanentMarker = Permanent_Marker({
  variable: "--font-permanent-marker",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FutureSprint | St Aloysius Hackathon",
  description: "Join developers, designers, and innovators for a weekend of creation, competition, and fun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* FontAwesome for Icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${permanentMarker.variable} antialiased selection:bg-brand-red selection:text-white w-full overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}