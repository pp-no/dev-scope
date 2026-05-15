import Link from "next/link";
import { type Video } from "@/lib/videos";

/** カテゴリ別のサムネイル背景グラデーション（サムネイル画像がない場合に使用） */
const categoryBg: Record<string, string> = {
  frontend: "linear-gradient(135deg, #0B1B33, #1E3A8A)",
  backend: "linear-gradient(135deg, #0A2018, #065F46)",
  ai: "linear-gradient(135deg, #1A0F2E, #5B21B6)",
  infra: "linear-gradient(135deg, #2A1A05, #92400E)",
  tooling: "linear-gradient(135deg, #04222B, #155E75)",
  career: "linear-gradient(135deg, #2A0A12, #9F1239)",
};

/**
 * チャンネル名の頭文字を大文字で返す（アバター表示用）
 * @param name - チャンネル名
 * @returns 1文字の大文字
 */
function channelInitial(name: string) {
  return name.charAt(0).toUpperCase();
}

/**
 * 動画情報を表示するカードコンポーネント
 * 一覧・トレンド・関連動画など複数の場所で共通使用する
 * @param video - 表示する動画データ
 * @param rank - トレンドランキング番号（指定した場合はサムネイル上に "#1" のように表示）
 */
export function VideoCard({ video, rank }: { video: Video; rank?: number }) {
  return (
    <Link href={`/videos/${video.id}`} className="video-card">
      {/* サムネイル */}
      <div className="video-card__thumb">
        {video.thumbnailUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={video.thumbnailUrl} alt={video.title} loading="lazy" />
        ) : (
          /* サムネイルなし: カテゴリカラーのグラデーションで代替 */
          <div
            className="video-card__thumb-bg"
            style={{
              background: categoryBg[video.category] ?? categoryBg.frontend,
            }}
          />
        )}
        {rank && <span className="video-card__rank">#{rank}</span>}
        {video.duration && <span className="video-card__duration">{video.duration}</span>}
      </div>

      {/* 本文 */}
      <div className="video-card__body">
        <div className="video-card__tags">
          <span className={`cat-tag cat-tag--${video.category}`}>{video.categoryLabel}</span>
        </div>

        <p className="video-card__title">{video.title}</p>

        <div className="video-card__meta">
          {/* チャンネルアバター（頭文字のみ） */}
          <span className="ch-av" style={{ width: 20, height: 20, fontSize: 9 }} aria-hidden="true">
            {channelInitial(video.channelName)}
          </span>
          <span className="video-card__channel">{video.channelName}</span>
          <span className="video-card__sep" />
          <span>
            {video.publishedAt
              ? new Intl.DateTimeFormat("ja-JP", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).format(new Date(video.publishedAt))
              : ""}
          </span>
        </div>

        {video.views && (
          <div className="video-card__stats">
            <span className="video-card__stat">
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
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              {video.views}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
