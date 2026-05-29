import type { Metadata } from "next";
import { Cormorant_Garamond, Caveat } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { AudioPlayer } from "@/components/audio-player";
import { MoonlightCursor } from '@/components/ui/moonlight-cursor';

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
});

const caveat = Caveat({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Between The Little Moments",
  description: "A digital memory box.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${caveat.variable} bg-[#020817] text-[#F4E9D8] antialiased`}>
        <MoonlightCursor />
        <SmoothScrollProvider>
          <AudioPlayer />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}