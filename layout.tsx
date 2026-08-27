import type { Metadata, Viewport } from "next";
import { Noto_Sans_Sinhala, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AiAssistant from "./components/AiAssistant";

const sinhalaFont = Noto_Sans_Sinhala({
  subsets: ["sinhala", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-sinhala",
});

const jakartaFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "සුමිත් සර්ගේ ශිෂ්‍යත්ව පෙරහුරුව | 5 ශ්‍රේණිය AI App",
  description: "5 ශ්‍රේණිය ශිෂ්‍යත්ව විභාගයට සූදානම් වීමට දෛනික MCQ ප්‍රශ්නාවලිය හා AI ගුරු සහයක",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ශිෂ්‍යත්ව App",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#4F46E5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="si" className={`${sinhalaFont.variable} ${jakartaFont.variable} dark`}>
      <body className="min-h-screen flex flex-col items-center justify-center p-0 sm:p-4 text-slate-100 antialiased selection:bg-indigo-600 selection:text-white bg-[#030712]">
        
        {/* NATIVE APP CANVAS (Centered on Desktop, Full Screen on Mobile) */}
        <div className="w-full max-w-[440px] h-screen sm:h-[890px] bg-slate-900/90 backdrop-blur-2xl sm:rounded-[46px] sm:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] sm:border sm:border-white/10 sm:ring-8 sm:ring-slate-800/80 relative overflow-hidden flex flex-col">
          {children}
          <AiAssistant />
        </div>

      </body>
    </html>
  );
}
