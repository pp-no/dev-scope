import { Suspense } from "react";
import Link from "next/link";
import { categories } from "@/lib/videos";
import { SearchResults } from "./_results";
import { buildUrl, durationOptions, publishedOptions, type SearchParams } from "./_search-utils";

type SearchPageProps = {
  searchParams?: Promise<SearchParams>;
};

/**
 * サイドバーの関連キーワードリスト
 * クリックすると `/search?q=<キーワード>` に遷移する
 */
const relatedKeywords = [
  "App Router",
  "Server Actions",
  "RSC",
  "TypeScript",
  "Tailwind",
  "Docker",
  "Vercel",
];

/**
 * 検索結果取得中に表示するカードスケルトン
 * Suspense の fallback として使用し、サイドバーはそのまま表示し続ける
 */
function ResultsSkeleton() {
  return (
    <main style={{ padding: "24px 28px 60px" }}>
      <div className="skeleton" style={{ width: 100, height: 11, marginBottom: 14 }} />
      <div className="skeleton" style={{ width: 240, height: 24, marginBottom: 10 }} />
      <div className="skeleton" style={{ width: 60, height: 11, marginBottom: 28 }} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 18,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
            }}
          >
            <div className="skeleton" style={{ height: 140, borderRadius: 0 }} />
            <div
              style={{
                padding: "14px 14px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div className="skeleton" style={{ height: 11, width: "50%" }} />
              <div className="skeleton" style={{ height: 14, width: "90%" }} />
              <div className="skeleton" style={{ height: 14, width: "75%" }} />
              <div className="skeleton" style={{ height: 11, width: "60%", marginTop: 4 }} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

/**
 * 検索ページ（Server Component）
 * searchParams を解析してサイドバーを即時レンダリングし、
 * 結果エリアは Suspense でラップして非同期に SearchResults を表示する
 * → サイドバーは常に表示されたまま、カードだけがスケルトン → 結果に差し替わる
 */
export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Next.js 15: searchParams は Promise なので await が必要
  const params = (await searchParams) ?? {};
  const query = params.q ?? "";
  const category = params.category ?? "";
  const published = params.published ?? "";
  const duration = params.duration ?? "";
  /** buildUrl に渡す現在のパラメータセット */
  const current: SearchParams = { q: query, category, published, duration };

  return (
    <div className="search-layout">
      {/* ============= サイドバー ============= */}
      <aside className="sidebar">
        {/* カテゴリーフィルター */}
        <div className="sidebar__group">
          <div className="sidebar__group-label">カテゴリー</div>
          <Link
            href={buildUrl(current, { category: "" })}
            className={`sidebar__item ${!category ? "is-active" : ""}`}
          >
            <span className="cat-dot" style={{ background: "var(--text-primary)" }} />
            すべて
          </Link>
          {categories.map((c) => {
            /** カテゴリ識別子 → CSS カスタムプロパティ のマッピング */
            const catColors: Record<string, string> = {
              frontend: "var(--c-frontend)",
              backend: "var(--c-backend)",
              ai: "var(--c-ai)",
              infra: "var(--c-infra)",
              tooling: "var(--c-tools)",
              career: "var(--c-career)",
            };
            return (
              <Link
                key={c.value}
                // 選択済みのカテゴリを再クリックするとフィルター解除
                href={buildUrl(current, { category: category === c.value ? "" : c.value })}
                className={`sidebar__item ${category === c.value ? "is-active" : ""}`}
              >
                <span className="cat-dot" style={{ background: catColors[c.value] }} />
                {c.label}
              </Link>
            );
          })}
        </div>

        {/* 投稿期間フィルター */}
        <div className="sidebar__group">
          <div className="sidebar__group-label">投稿期間</div>
          <Link
            href={buildUrl(current, { published: "" })}
            className={`sidebar__item ${!published ? "is-active" : ""}`}
          >
            すべて
          </Link>
          {publishedOptions.map(({ value, label }) => (
            <Link
              key={value}
              href={buildUrl(current, { published: published === value ? "" : value })}
              className={`sidebar__item ${published === value ? "is-active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* 動画の長さフィルター */}
        <div className="sidebar__group">
          <div className="sidebar__group-label">動画の長さ</div>
          {durationOptions.map(({ value, label }) => (
            <Link
              key={value}
              href={buildUrl(current, { duration: duration === value ? "" : value })}
              className={`sidebar__item ${duration === value ? "is-active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* 関連キーワード */}
        <div className="sidebar__group">
          <div className="sidebar__group-label">関連キーワード</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "4px 4px" }}>
            {relatedKeywords.map((k) => (
              <Link key={k} href={`/search?q=${encodeURIComponent(k)}`} className="chip-sm">
                <svg
                  width="10"
                  height="10"
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
        </div>
      </aside>

      {/* ============= 検索結果（非同期） ============= */}
      {/* Suspense により、データ取得中はカードスケルトンを表示してサイドバーをブロックしない */}
      <Suspense fallback={<ResultsSkeleton />}>
        <SearchResults
          query={query}
          category={category}
          published={published}
          duration={duration}
          current={current}
        />
      </Suspense>
    </div>
  );
}
