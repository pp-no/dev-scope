import Link from "next/link";
import { type Video } from "@/lib/videos";

const categoryBg: Record<string, string> = {
  frontend: "linear-gradient(135deg, #0B1B33, #1E3A8A)",
  backend:  "linear-gradient(135deg, #0A2018, #065F46)",
  ai:       "linear-gradient(135deg, #1A0F2E, #5B21B6)",
  infra:    "linear-gradient(135deg, #2A1A05, #92400E)",
  tooling:  "linear-gradient(135deg, #04222B, #155E75)",
  career:   "linear-gradient(135deg, #2A0A12, #9F1239)",
};

function channelInitial(name: string) {
  return name.charAt(0).toUpperCase();
}

export function VideoCard({ video, rank }: { video: Video; rank?: number }) {
  return (
    <Link href={`/videos/${video.id}`} className="video-card">
      {/* Thumbnail */}
      <div className="video-card__thumb">
        {video.thumbnailUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={video.thumbnailUrl} alt={video.title} loading="lazy" />
        ) : (
          <div
            className="video-card__thumb-bg"
            style={{ background: categoryBg[video.category] ?? categoryBg.frontend }}
          />
        )}
        {rank && <span className="video-card__rank">#{rank}</span>}
        {video.duration && <span className="video-card__duration">{video.duration}</span>}
      </div>

      {/* Body */}
      <div className="video-card__body">
        <div className="video-card__tags">
          <span className={`cat-tag cat-tag--${video.category}`}>{video.categoryLabel}</span>
        </div>

        <p className="video-card__title">{video.title}</p>

        <div className="video-card__meta">
          <span
            className="ch-av"
            style={{ width: 20, height: 20, fontSize: 9 }}
            aria-hidden="true"
          >
            {channelInitial(video.channelName)}
          </span>
          <span className="video-card__channel">{video.channelName}</span>
          <span className="video-card__sep" />
          <span>{video.publishedAt ? new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(video.publishedAt)) : ""}</span>
        </div>

        {video.views && (
          <div className="video-card__stats">
            <span className="video-card__stat">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
