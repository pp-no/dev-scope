import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getRelatedVideos, getVideoById } from "@/lib/videos";

type VideoPageProps = {
  params: Promise<{ id: string }>;
};

const categoryBg: Record<string, string> = {
  frontend: "linear-gradient(135deg, #0B1B33, #1E3A8A)",
  backend:  "linear-gradient(135deg, #0A2018, #065F46)",
  ai:       "linear-gradient(135deg, #1A0F2E, #5B21B6)",
  infra:    "linear-gradient(135deg, #2A1A05, #92400E)",
  tooling:  "linear-gradient(135deg, #04222B, #155E75)",
  career:   "linear-gradient(135deg, #2A0A12, #9F1239)",
};

export default async function VideoDetailPage({ params }: VideoPageProps) {
  const { id } = await params;
  const video = await getVideoById(id);

  if (!video) {
    notFound();
  }

  const relatedVideos = (await getRelatedVideos(video)).slice(0, 6);
  const channelInitial = video.channelName.charAt(0).toUpperCase();

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
      {/* Breadcrumb */}
      <nav
        style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "18px 0 0",
          fontSize: 12, color: "var(--text-tertiary)",
        }}
        aria-label="パンくず"
      >
        <Link href="/" style={{ color: "var(--text-tertiary)" }}>ホーム</Link>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
        <Link
          href={`/search?category=${video.category}`}
          className={`cat-tag cat-tag--${video.category}`}
          style={{ textDecoration: "none" }}
        >
          {video.categoryLabel}
        </Link>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
        <span style={{ color: "var(--text-secondary)" }}>動画</span>
      </nav>

      {/* Main grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: 32,
          padding: "20px 0 80px",
        }}
      >
        {/* ============= MAIN ============= */}
        <main>
          {/* Video player */}
          <div
            style={{
              position: "relative",
              aspectRatio: "16/9",
              borderRadius: "var(--r-xl)",
              overflow: "hidden",
              border: "1px solid var(--border-default)",
              background: "#000",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <iframe
              style={{ width: "100%", height: "100%", border: 0, display: "block" }}
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Tags */}
          <div className="row" style={{ gap: 6, marginTop: 18, flexWrap: "wrap" }}>
            <span className={`cat-tag cat-tag--${video.category}`}>{video.categoryLabel}</span>
            {video.keywords.slice(0, 4).map((kw) => (
              <span key={kw} className="chip-sm">{kw}</span>
            ))}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              margin: "14px 0 12px",
              lineHeight: 1.3,
            }}
          >
            {video.title}
          </h1>

          {/* Meta row */}
          <div
            className="row"
            style={{ justifyContent: "space-between", alignItems: "center", marginBottom: 22, flexWrap: "wrap", gap: 12 }}
          >
            <div className="row" style={{ gap: 12 }}>
              <a
                href={video.channelUrl}
                target="_blank"
                rel="noreferrer"
                className="ch-av"
                style={{
                  width: 44, height: 44, fontSize: 16,
                  background: "linear-gradient(135deg, var(--blue), var(--purple))",
                  border: "1px solid var(--border-strong)",
                }}
              >
                {channelInitial}
              </a>
              <div className="col" style={{ gap: 2 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{video.channelName}</div>
                <div style={{ color: "var(--text-tertiary)", fontSize: 12 }}>技術情報チャンネル</div>
              </div>
              <a
                href={video.channelUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn--sm"
                style={{ marginLeft: 6 }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                フォロー
              </a>
            </div>
            <div className="row" style={{ gap: 8 }}>
              <button className="btn btn--sm btn--ghost">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 10v11h10l4-9V10h-7l1-4-2-3-6 7zM7 10H3v11h4" />
                </svg>
                いいね
              </button>
              <button className="btn btn--sm btn--ghost">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h12v18l-6-4-6 4z" />
                </svg>
                保存
              </button>
              <button className="btn btn--sm btn--ghost">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 6l-4-3-4 3M12 3v12M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
                </svg>
                シェア
              </button>
            </div>
          </div>

          {/* Stats strip */}
          <div
            className="card"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", marginBottom: 22 }}
          >
            {[
              {
                label: "再生数",
                value: video.views,
                icon: (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                ),
              },
              {
                label: "投稿日",
                value: formatDate(video.publishedAt),
                icon: (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                  </svg>
                ),
              },
              {
                label: "動画の長さ",
                value: video.duration || "—",
                icon: (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ),
              },
              {
                label: "カテゴリー",
                value: video.categoryLabel,
                icon: (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l1.8 4.4L18 9l-4.2 1.6L12 15l-1.8-4.4L6 9l4.2-1.6z" />
                  </svg>
                ),
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "14px 18px",
                  borderRight: i < 3 ? "1px solid var(--border-subtle)" : "none",
                }}
              >
                <div className="row" style={{ gap: 6, color: "var(--text-tertiary)", fontSize: 11.5 }}>
                  {s.icon}
                  {s.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 16,
                    fontWeight: 600,
                    marginTop: 4,
                    letterSpacing: "-0.005em",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* AI Summary */}
          <div
            className="card card--padded"
            style={{
              marginBottom: 22,
              background: "linear-gradient(180deg, rgba(167,139,250,0.05), transparent)",
              borderColor: "rgba(167,139,250,0.18)",
            }}
          >
            <div className="row" style={{ gap: 8, marginBottom: 10 }}>
              <svg
                width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="var(--purple-2)" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M12 3l1.8 4.4L18 9l-4.2 1.6L12 15l-1.8-4.4L6 9l4.2-1.6zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" />
              </svg>
              <span className="label-mono" style={{ color: "var(--purple-2)" }}>AI 要約</span>
            </div>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.75, color: "var(--text-secondary)" }}>
              {video.summary}
            </p>
          </div>

          {/* Description */}
          <div className="card card--padded" style={{ marginBottom: 22 }}>
            <div className="label-mono" style={{ marginBottom: 10 }}>DESCRIPTION</div>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.75, color: "var(--text-secondary)" }}>
              {video.description}
            </p>
          </div>

          {/* Official docs / Resources */}
          {video.resources.length > 0 && (
            <div className="card card--padded">
              <div className="row" style={{ justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div className="label-mono">関連する公式ドキュメント</div>
                <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>キュレーション済み</span>
              </div>
              <div className="col" style={{ gap: 8 }}>
                {video.resources.map((r) => (
                  <a
                    key={r.href}
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                    className="row"
                    style={{
                      gap: 12,
                      padding: "10px 12px",
                      borderRadius: "var(--r-sm)",
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-canvas)",
                    }}
                  >
                    <span
                      className="ch-av"
                      style={{
                        width: 28, height: 28, fontSize: 11,
                        background: "linear-gradient(135deg, var(--blue), var(--purple))",
                        border: "1px solid var(--border-strong)",
                      }}
                    >
                      {r.label.charAt(0)}
                    </span>
                    <div className="col" style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>
                        {r.label}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>
                        {new URL(r.href).hostname}
                      </div>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: "var(--text-muted)" }}>
                      <path d="M14 5h5v5M19 5l-9 9M11 5H5v14h14v-6" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* ============= ASIDE: RELATED ============= */}
        <aside>
          <div style={{ position: "sticky", top: 80 }}>
            <div className="row" style={{ justifyContent: "space-between", marginBottom: 14 }}>
              <div className="label-mono">RELATED · 関連動画</div>
              <Link href={`/search?category=${video.category}`} className="section__more" style={{ fontSize: 12 }}>
                もっと見る
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className="col" style={{ gap: 4 }}>
              {relatedVideos.length > 0 ? (
                relatedVideos.map((rv) => (
                  <Link key={rv.id} href={`/videos/${rv.id}`} className="related-row">
                    <div className="related-row__thumb">
                      {rv.thumbnailUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={rv.thumbnailUrl} alt={rv.title} loading="lazy" />
                      ) : (
                        <div
                          style={{
                            position: "absolute", inset: 0,
                            background: categoryBg[rv.category] ?? categoryBg.frontend,
                          }}
                        />
                      )}
                    </div>
                    <div className="col" style={{ gap: 6, minWidth: 0 }}>
                      <div className="row" style={{ gap: 6 }}>
                        <span className={`cat-tag cat-tag--${rv.category}`} style={{ fontSize: 10.5 }}>
                          {rv.categoryLabel}
                        </span>
                      </div>
                      <div className="related-row__title">{rv.title}</div>
                      <div className="related-row__meta row" style={{ gap: 6 }}>
                        <span>{rv.channelName}</span>
                        {rv.views && (
                          <>
                            <span style={{ width: 2, height: 2, background: "var(--text-muted)", borderRadius: 999 }} />
                            <span style={{ fontFamily: "var(--font-mono)" }}>{rv.views}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="empty-state" style={{ padding: "24px 16px", fontSize: 12 }}>
                  関連動画はまだありません。
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
