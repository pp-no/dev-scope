import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "DevScope", template: "%s — DevScope" },
  description: "AI・フロントエンド・インフラなど、Webエンジニアが今見るべき技術動画をカテゴリ別に整理して届けるプラットフォーム。",
  openGraph: {
    title: "DevScope",
    description: "AI・フロントエンド・インフラなど、Webエンジニアが今見るべき技術動画をカテゴリ別に整理して届けるプラットフォーム。",
    siteName: "DevScope",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "DevScope",
    description: "Webエンジニア向け技術動画プラットフォーム。",
  },
};

function BrandMark() {
  return (
    <span className="brand-mark">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="#67E8F9" strokeWidth="1.4" opacity="0.55" />
        <circle cx="8" cy="8" r="3" stroke="#67E8F9" strokeWidth="1.4" />
        <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2" stroke="#67E8F9" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="8" cy="8" r="1" fill="#67E8F9" />
      </svg>
    </span>
  );
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ja">
      <body className={inter.variable}>
        <header className="topbar">
          <div className="topbar__inner">
            <Link href="/" className="topbar__logo">
              <BrandMark />
              <span className="brand-word">Dev<span className="accent">Scope</span></span>
            </Link>

            <nav className="nav" aria-label="メインナビゲーション">
              <Link href="/" className="nav__item">ホーム</Link>
              <Link href="/search" className="nav__item">検索</Link>
              <Link href="/search?category=frontend" className="nav__item">カテゴリー</Link>
            </nav>

            <Link href="/search" className="topbar__search" aria-label="動画を検索">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 19a8 8 0 1 1 5.3-2L21 21" />
              </svg>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                動画を検索…
              </span>
              <span className="kbd">⌘ K</span>
            </Link>

          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
