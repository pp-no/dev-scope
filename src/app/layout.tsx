import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevScope",
  description: "Webエンジニア向け技術動画をカテゴリ別に整理して探せるWebアプリ",
};

const navItems = [
  { href: "/", label: "ホーム" },
  { href: "/search", label: "検索" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className="page-shell">
          <header className="site-header">
            <Link href="/" className="brand">
              <span className="brand-mark">DS</span>
              <span>DevScope</span>
            </Link>
            <nav className="nav-links" aria-label="メインナビゲーション">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>
          {children}
          <footer className="footer">
            <p>
              DevScope は技術動画の整理と発見を目的にした試作版です。データは現在モックで、
              後続で YouTube Data API v3 連携へ差し替えできます。
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
