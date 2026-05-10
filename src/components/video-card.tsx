import Link from "next/link";
import { type Video, formatDate } from "@/lib/videos";

export function VideoCard({ video }: { video: Video }) {
  return (
    <article className="video-card">
      <div
        className="video-preview"
        aria-hidden="true"
        style={
          video.thumbnailUrl
            ? {
                backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.22), rgba(15, 23, 42, 0.2)), url(${video.thumbnailUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      />
      <div className="video-meta">
        <span>{video.categoryLabel}</span>
        <span>•</span>
        <span>{formatDate(video.publishedAt)}</span>
        <span>•</span>
        <span>{video.duration}</span>
      </div>
      <div>
        <strong>{video.title}</strong>
        <p className="prose" style={{ marginTop: 8 }}>
          {video.summary}
        </p>
      </div>
      <div className="inline-tags">
        {video.keywords.slice(0, 4).map((keyword) => (
          <span key={keyword} className="tag">
            {keyword}
          </span>
        ))}
      </div>
      <div className="stats-row">
        <span>{video.channelName}</span>
        <span>{video.views}</span>
      </div>
      <Link href={`/videos/${video.id}`} className="button button-secondary" aria-label={`${video.title} を開く`}>
        詳細を見る
      </Link>
    </article>
  );
}
