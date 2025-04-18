import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/provider";
import ConsoleLogger from "@/components/ConsoleLogger";
import ErrorBoundary from '@/components/ErrorBoundary';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import SystemCheck from "@/components/SystemCheck";
import { Toaster } from "sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  adjustFontFallback: true
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  adjustFontFallback: true
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
};

export const metadata: Metadata = {
  title: {
    default: 'Alemdar Teknik',
    template: '%s | Alemdar Teknik'
  },
  description: 'Professional technical solutions and products',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
          <noscript>
            <meta httpEquiv="refresh" content="0;url=/unsupported.html" />
          </noscript>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ErrorBoundary>
          <ConsoleLogger />
          <SystemCheck />
          <Provider>
            {children}
          </Provider>
        </ErrorBoundary>
        <SpeedInsights />
        <Analytics />
        <Toaster theme='dark' richColors= {true}/>
      </body>
    </html>
  );
}
