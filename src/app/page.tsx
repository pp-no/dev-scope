import Link from "next/link";
import { CategoryGrid } from "@/components/category-grid";
import { VideoCard } from "@/components/video-card";
import { getHomeVideos, popularKeywords } from "@/lib/videos";

const periodOptions = [
  { value: "day", label: "24h" },
  { value: "week", label: "7日" },
  { value: "month", label: "30日" },
] as const;

const periodTrendingLabel: Record<string, string> = {
  day: "TRENDING · 24H",
  week: "TRENDING · 7D",
  month: "TRENDING · 30D",
};

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ period?: string }>;
}) {
  const { period = "day" } = (await searchParams) ?? {};
  const videos = await getHomeVideos(period);
  const trending = videos.slice(0, 4);
  const latest = videos.slice(4);

  return (
    <main>
      {/* ============= HERO ============= */}
      <section
        style={{
          padding: "56px 28px 36px",
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        <div className="ambient-layer" />
        <div className="grid-layer" />

        {/* Beta label */}
        <div className="row" style={{ gap: 8, marginBottom: 18, position: "relative" }}>
          <span className="label-mono">
            <span className="pulse-dot" />
            AI時代のエンジニア向け技術情報プラットフォーム
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: "clamp(2.4rem, 4.5vw, 3.5rem)",
            lineHeight: 1.07,
            letterSpacing: "-0.025em",
            fontWeight: 600,
            margin: "0 0 18px",
            maxWidth: 860,
            position: "relative",
          }}
        >
          技術の流速に、
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #67E8F9 0%, #A78BFA 60%, #60A5FA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            整理された視界
          </span>
          を。
        </h1>

        <p
          style={{
            fontSize: 15,
            color: "var(--text-secondary)",
            lineHeight: 1.65,
            margin: "0 0 28px",
            maxWidth: 580,
            position: "relative",
          }}
        >
          AI、フロントエンド、インフラ。情報が溢れる時代に「いま見るべき技術動画」だけを、カテゴリーで整理して届けます。
        </p>

        {/* Hero search */}
        <form
          action="/search"
          method="get"
          className="hero-search-wrap"
          style={{ position: "relative" }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0, color: "var(--text-tertiary)" }}
          >
            <path d="M11 19a8 8 0 1 1 5.3-2L21 21" />
          </svg>
          <input
            type="search"
            name="q"
            placeholder="例: Next.js キャッシュ、Claude エージェント、Kubernetes"
            aria-label="動画検索"
          />
          <span className="kbd">⌘ K</span>
          <button type="submit" className="btn btn--primary">
            検索
          </button>
        </form>

        {/* Popular keywords */}
        <div
          className="row"
          style={{ gap: 8, marginTop: 22, flexWrap: "wrap", maxWidth: 780, position: "relative" }}
        >
          <span className="label-mono" style={{ marginRight: 2 }}>
            人気のキーワード
          </span>
          {popularKeywords.map((k) => (
            <Link key={k} href={`/search?q=${encodeURIComponent(k)}`} className="chip">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 9h14M5 15h14M10 4l-3 16M17 4l-3 16" />
              </svg>
              {k}
            </Link>
          ))}
        </div>

        {/* Stat strip */}
        <div className="stat-strip" style={{ marginTop: 36, maxWidth: 1080, position: "relative" }}>
          <div className="stat-strip__cell">
            <div className="stat-strip__label">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 18l9 5 9-5" />
              </svg>
              カテゴリー
            </div>
            <div className="stat-strip__value">06</div>
          </div>
          <div className="stat-strip__cell">
            <div className="stat-strip__label">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
              インデックス済み動画
            </div>
            <div className="stat-strip__value">
              18,420 <span className="stat-strip__delta">+312 today</span>
            </div>
          </div>
          <div className="stat-strip__cell">
            <div className="stat-strip__label">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3s4 4 4 8a4 4 0 1 1-8 0c0-1 1-2 1-2s-1-3 3-6z" />
              </svg>
              トレンドの更新
            </div>
            <div className="stat-strip__value">5 min</div>
          </div>
          <div className="stat-strip__cell">
            <div className="stat-strip__label">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM3 12h18M12 3a14 14 0 0 1 0 18A14 14 0 0 1 12 3z" />
              </svg>
              キュレーション
            </div>
            <div className="stat-strip__value">人 + AI</div>
          </div>
        </div>
      </section>

      {/* ============= CATEGORIES ============= */}
      <section
        className="page-section"
        style={{ padding: "28px 28px 8px", maxWidth: 1280, margin: "0 auto" }}
      >
        <div className="section__head">
          <div>
            <div className="label-mono">CATEGORIES</div>
            <h2 className="section__title" style={{ marginTop: 6 }}>
              カテゴリーから探す
            </h2>
          </div>
          <Link href="/search" className="section__more">
            すべて表示
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
        <CategoryGrid />
      </section>

      {/* ============= TRENDING ============= */}
      {trending.length > 0 && (
        <section
          className="page-section"
          style={{ padding: "40px 28px 8px", maxWidth: 1280, margin: "0 auto" }}
        >
          <div className="section__head">
            <div>
              <div className="label-mono">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3s4 4 4 8a4 4 0 1 1-8 0c0-1 1-2 1-2s-1-3 3-6z" />
                </svg>
                {periodTrendingLabel[period] ?? "TRENDING · 24H"}
              </div>
              <h2 className="section__title" style={{ marginTop: 6 }}>
                いま注目されている動画
              </h2>
              <p className="section__sub">再生数・ブックマークが急上昇したもの</p>
            </div>
            <div className="row" style={{ gap: 10 }}>
              <div className="segctl">
                {periodOptions.map(({ value, label }) => (
                  <Link
                    key={value}
                    href={`/?period=${value}`}
                    className={`segctl__btn ${period === value ? "is-active" : ""}`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <Link href="/search" className="section__more">
                すべて表示
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            {trending.map((v, i) => (
              <VideoCard key={v.id} video={v} rank={i + 1} />
            ))}
          </div>
        </section>
      )}

      {/* ============= LATEST ============= */}
      {latest.length > 0 && (
        <section
          className="page-section"
          style={{ padding: "40px 28px 80px", maxWidth: 1280, margin: "0 auto" }}
        >
          <div className="section__head">
            <div>
              <div className="label-mono">LATEST</div>
              <h2 className="section__title" style={{ marginTop: 6 }}>
                最新の動画
              </h2>
            </div>
            <div className="row" style={{ gap: 8 }}>
              <button className="btn btn--ghost btn--sm">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18M6 12h12M9 18h6" />
                </svg>
                並び替え: 新着順
              </button>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            {latest.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}

      {/* ============= EMPTY STATE ============= */}
      {videos.length === 0 && (
        <section
          className="page-section"
          style={{ padding: "40px 28px 80px", maxWidth: 1280, margin: "0 auto" }}
        >
          <div className="empty-state">
            <p style={{ margin: 0 }}>
              動画が見つかりませんでした。
              <br />
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                YOUTUBE_API_KEY を設定すると実際の技術動画が表示されます。
              </span>
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
