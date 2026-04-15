import type { Metadata } from "next";
import { Lora } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { AutoTheme } from "@/components/auto-theme";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gospel Excel",
  description: "Software engineer building things that matter.",
};

const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('theme');
      if (t === 'dark') { document.documentElement.classList.add('dark'); return; }
      if (t === 'light') return;
      var dark;
      var raw = localStorage.getItem('coords');
      if (raw) {
        var c = JSON.parse(raw);
        if (Date.now() - c.at < 7 * 24 * 60 * 60 * 1000) {
          var now = new Date();
          var rad = Math.PI / 180;
          var yearStart = Date.UTC(now.getUTCFullYear(), 0, 0);
          var dayOfYear = Math.floor((now.getTime() - yearStart) / 86400000);
          var decl = -23.44 * rad * Math.cos((2 * Math.PI / 365) * (dayOfYear + 10));
          var cosH = -Math.tan(c.lat * rad) * Math.tan(decl);
          if (cosH >= -1 && cosH <= 1) {
            var H = Math.acos(cosH) / rad;
            var solarNoonUTC = 12 - c.lng / 15;
            var midnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
            var sunrise = midnight + (solarNoonUTC - H / 15) * 3600000;
            var sunset = midnight + (solarNoonUTC + H / 15) * 3600000;
            dark = now.getTime() < sunrise || now.getTime() >= sunset;
          }
        }
      }
      if (dark === undefined) {
        var h = new Date().getHours();
        dark = h < 7 || h >= 19;
      }
      if (dark) document.documentElement.classList.add('dark');
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${lora.variable} ${geistMono.variable} antialiased`}
      >
        <AutoTheme />
        {children}
      </body>
    </html>
  );
}
