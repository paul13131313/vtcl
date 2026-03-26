import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VTCL — Vertical Magazine No.1 沖永良部",
  description:
    "写真・文章・動画がシームレスに一体化する縦スクロール型Webマガジン。第1号は鹿児島県沖永良部島。",
  openGraph: {
    title: "VTCL — Vertical Magazine No.1 沖永良部",
    description:
      "写真・文章・動画がシームレスに一体化する縦スクロール型Webマガジン。",
    images: [{ url: "https://og-api-self.vercel.app/api/og?title=VTCL&category=Travel", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Imbue:opsz,wght@10..100,100..900&family=Zen+Kaku+Gothic+New:wght@500&family=Zen+Kaku+Gothic+Antique:wght@300;400;500&family=Balthazar&family=Amatica+SC:wght@400;700&family=Barlow+Semi+Condensed:wght@400&family=Shippori+Mincho:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={notoSansJP.className}>{children}</body>
    </html>
  );
}
