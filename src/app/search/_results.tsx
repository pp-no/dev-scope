import Link from "next/link";
import { VideoCard } from "@/components/video-card";
import { categories, searchVideos } from "@/lib/videos";
import { buildUrl, durationOptions, publishedOptions, type SearchParams } from "./_search-utils";

/** SearchResults コンポーネントへ渡す Props */
type Props = {
  /** 検索キーワード */
  query: string;
  /** カテゴリ識別子 */
  category: string;
  /** 投稿期間フィルター："day" | "week" | "month" | "" */
  published: string;
  /** 動画の長さフィルター："short" | "medium" | "long" | "" */
  duration: string;
  /** 現在の検索パラメータ（フィルター chip の buildUrl に使用） */
  current: SearchParams;
};

/**
 * 検索結果エリアを表示する非同期 Server Component
 * YouTube API（または fallback）でデータを取得してからレンダリングされる
 * page.tsx 側で Suspense でラップされており、取得中は ResultsSkeleton が表示される
 */
export async function SearchResults({ query, category, published, duration, current }: Props) {
  const results = await searchVideos({ query, category, published, duration });
  const activeCategory = categories.find((c) => c.value === category);
  /** 何らかのフィルターが適用されているかどうか */
  const hasFilters = query || category || published || duration;

  return (
    <main style={{ padding: "24px 28px 60px" }}>
      {/* ヘッダー */}
      <div style={{ marginBottom: 6 }}>
        <div className="label-mono">SEARCH RESULTS</div>
      </div>

      {/* 検索状態に応じたタイトル */}
      <h1
        style={{
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          margin: "6px 0 4px",
        }}
      >
        {query && activeCategory ? (
          <>
            「<span style={{ color: "var(--cyan-2)" }}>{query}</span>」の検索結果 —{" "}
            {activeCategory.label}
          </>
        ) : query ? (
          <>
            「<span style={{ color: "var(--cyan-2)" }}>{query}</span>」の検索結果
          </>
        ) : activeCategory ? (
          <>{activeCategory.label}の検索結果</>
        ) : (
          "技術動画の検索結果"
        )}
      </h1>

      {/* 件数 */}
      <div
        className="row"
        style={{ color: "var(--text-tertiary)", fontSize: 13, gap: 10, marginBottom: 22 }}
      >
        <span className="mono">{results.length} 件</span>
      </div>

      {/* ツールバー: 適用中フィルターの chip + 並び替え */}
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 18 }}>
        <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
          {/* 全フィルタークリアボタン */}
          {hasFilters && (
            <Link
              href="/search"
              className="chip"
              style={{
                borderColor: "var(--border-strong)",
                color: "var(--text-primary)",
                fontSize: 12,
              }}
            >
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
                <path d="M4 5h16l-6 8v6l-4-2v-4z" />
              </svg>
              フィルターをクリア
            </Link>
          )}
          {/* 各フィルターの chip（×クリックで個別解除） */}
          {query && (
            <Link href={buildUrl(current, { q: "" })} className="chip" style={{ fontSize: 12 }}>
              {query} ×
            </Link>
          )}
          {category && (
            <Link
              href={buildUrl(current, { category: "" })}
              className="chip"
              style={{ fontSize: 12 }}
            >
              {activeCategory?.label} ×
            </Link>
          )}
          {published && (
            <Link
              href={buildUrl(current, { published: "" })}
              className="chip"
              style={{ fontSize: 12 }}
            >
              {publishedOptions.find((o) => o.value === published)?.label} ×
            </Link>
          )}
          {duration && (
            <Link
              href={buildUrl(current, { duration: "" })}
              className="chip"
              style={{ fontSize: 12 }}
            >
              {durationOptions.find((o) => o.value === duration)?.label} ×
            </Link>
          )}
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn--sm btn--ghost">
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
            関連度の高い順
          </button>
        </div>
      </div>

      {/* 検索結果グリッド or 空状態 */}
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

          {/* ページネーション（現在は UI のみ・機能未実装） */}
          <div className="pagination">
            <button className="btn btn--sm btn--ghost" disabled style={{ opacity: 0.4 }}>
              ← 前
            </button>
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
            <span
              style={{
                padding: "0 8px",
                color: "var(--text-tertiary)",
                fontFamily: "var(--font-mono)",
              }}
            >
              …
            </span>
            <button className="btn btn--sm btn--ghost">次 →</button>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ margin: "0 auto 12px", color: "var(--text-muted)" }}
          >
            <path d="M11 19a8 8 0 1 1 5.3-2L21 21" />
          </svg>
          <p style={{ margin: 0 }}>条件に一致する動画が見つかりませんでした。</p>
          <p style={{ margin: "8px 0 0", fontSize: 12, color: "var(--text-muted)" }}>
            別のキーワードで試すか、カテゴリーを切り替えてください。
          </p>
        </div>
      )}
    </main>
  );
}
