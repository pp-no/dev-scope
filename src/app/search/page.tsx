import Link from "next/link";
import { VideoCard } from "@/components/video-card";
import { categories, searchVideos } from "@/lib/videos";

type SearchPageProps = {
  searchParams?: Promise<{ q?: string; category?: string }>;
};

const relatedKeywords = [
  "App Router", "Server Actions", "RSC", "TypeScript", "Tailwind", "Docker", "Vercel",
];

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = (await searchParams) ?? {};
  const query = params.q ?? "";
  const category = params.category ?? "";
  const results = await searchVideos({ query, category });

  const activeCategory = categories.find((c) => c.value === category);

  return (
    <div className="search-layout">
      {/* ============= SIDEBAR ============= */}
      <aside className="sidebar">
        <div className="sidebar__group">
          <div className="sidebar__group-label">カテゴリー</div>
          <Link
            href={query ? `/search?q=${encodeURIComponent(query)}` : "/search"}
            className={`sidebar__item ${!category ? "is-active" : ""}`}
          >
            <span className="cat-dot" style={{ background: "var(--text-primary)" }} />
            すべて
          </Link>
          {categories.map((c) => {
            const catColors: Record<string, string> = {
              frontend: "var(--c-frontend)",
              backend:  "var(--c-backend)",
              ai:       "var(--c-ai)",
              infra:    "var(--c-infra)",
              tooling:  "var(--c-tools)",
              career:   "var(--c-career)",
            };
            return (
              <Link
                key={c.value}
                href={`/search?category=${c.value}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                className={`sidebar__item ${category === c.value ? "is-active" : ""}`}
              >
                <span className="cat-dot" style={{ background: catColors[c.value] }} />
                {c.label}
              </Link>
            );
          })}
        </div>

        <div className="sidebar__group">
          <div className="sidebar__group-label">投稿期間</div>
          <div className="sidebar__item">24時間以内</div>
          <div className="sidebar__item is-active">1週間以内</div>
          <div className="sidebar__item">1ヶ月以内</div>
          <div className="sidebar__item">すべて</div>
        </div>

        <div className="sidebar__group">
          <div className="sidebar__group-label">動画の長さ</div>
          <div className="sidebar__item">〜 10分</div>
          <div className="sidebar__item">10 — 30分</div>
          <div className="sidebar__item">30分〜</div>
        </div>

        <div className="sidebar__group">
          <div className="sidebar__group-label">関連キーワード</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "4px 4px" }}>
            {relatedKeywords.map((k) => (
              <Link
                key={k}
                href={`/search?q=${encodeURIComponent(k)}`}
                className="chip-sm"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 9h14M5 15h14M10 4l-3 16M17 4l-3 16" />
                </svg>
                {k}
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* ============= MAIN RESULTS ============= */}
      <main style={{ padding: "24px 28px 60px" }}>
        {/* Header */}
        <div style={{ marginBottom: 6 }}>
          <div className="label-mono">SEARCH RESULTS</div>
        </div>

        <h1
          style={{
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            margin: "6px 0 4px",
          }}
        >
          {query ? (
            <>
              「<span style={{ color: "var(--cyan-2)" }}>{query}</span>」の検索結果
            </>
          ) : activeCategory ? (
            <>
              <span style={{ color: activeCategory ? "var(--text-primary)" : undefined }}>
                {activeCategory.label}
              </span>
              の動画
            </>
          ) : (
            "技術動画を探す"
          )}
        </h1>

        <div
          className="row"
          style={{ color: "var(--text-tertiary)", fontSize: 13, gap: 10, marginBottom: 22 }}
        >
          <span className="mono">{results.length} 件</span>
          {query && (
            <>
              <span style={{ width: 3, height: 3, background: "var(--text-muted)", borderRadius: 999 }} />
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l1.8 4.4L18 9l-4.2 1.6L12 15l-1.8-4.4L6 9l4.2-1.6zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" />
                </svg>
                AI が関連動画を要約中
              </span>
            </>
          )}
        </div>

        {/* AI Summary Card */}
        {query && results.length > 0 && (
          <div
            className="card card--padded"
            style={{
              marginBottom: 24,
              background: "linear-gradient(180deg, rgba(34,211,238,0.04), transparent)",
              borderColor: "rgba(34,211,238,0.18)",
            }}
          >
            <div className="row" style={{ gap: 8, marginBottom: 8 }}>
              <svg
                width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="var(--cyan-2)" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M12 3l1.8 4.4L18 9l-4.2 1.6L12 15l-1.8-4.4L6 9l4.2-1.6zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" />
              </svg>
              <span className="label-mono" style={{ color: "var(--cyan-2)" }}>AI SUMMARY</span>
              <span className="kbd" style={{ marginLeft: "auto" }}>Beta</span>
            </div>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.7, color: "var(--text-secondary)" }}>
              「{query}」に関連する動画が{" "}
              <span style={{ color: "var(--text-primary)" }}>{results.length} 件</span>{" "}
              見つかりました。最新の技術トレンドや実践的な解説動画を中心に整理しています。
            </p>
          </div>
        )}

        {/* Toolbar */}
        <div
          className="row"
          style={{ justifyContent: "space-between", marginBottom: 18 }}
        >
          <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
            {(query || category) && (
              <Link
                href="/search"
                className="chip"
                style={{ borderColor: "var(--border-strong)", color: "var(--text-primary)", fontSize: 12 }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16l-6 8v6l-4-2v-4z" />
                </svg>
                フィルターをクリア
              </Link>
            )}
            {query && (
              <span className="chip" style={{ fontSize: 12 }}>
                {query} ×
              </span>
            )}
            {category && (
              <span className="chip" style={{ fontSize: 12 }}>
                {activeCategory?.label} ×
              </span>
            )}
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn btn--sm btn--ghost">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M6 12h12M9 18h6" />
              </svg>
              関連度の高い順
            </button>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: 18,
              }}
            >
              {results.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button className="btn btn--sm btn--ghost" disabled style={{ opacity: 0.4 }}>← 前</button>
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`btn btn--sm ${n === 1 ? "" : "btn--ghost"}`}
                  style={{
                    minWidth: 34,
                    justifyContent: "center",
                    padding: 0,
                    fontFamily: "var(--font-mono)",
                    ...(n === 1
                      ? { background: "var(--bg-overlay)", borderColor: "var(--border-strong)" }
                      : {}),
                  }}
                >
                  {n}
                </button>
              ))}
              <span style={{ padding: "0 8px", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>
                …
              </span>
              <button className="btn btn--sm btn--ghost">次 →</button>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 12px", color: "var(--text-muted)" }}>
              <path d="M11 19a8 8 0 1 1 5.3-2L21 21" />
            </svg>
            <p style={{ margin: 0 }}>条件に一致する動画が見つかりませんでした。</p>
            <p style={{ margin: "8px 0 0", fontSize: 12, color: "var(--text-muted)" }}>
              別のキーワードで試すか、カテゴリーを切り替えてください。
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
