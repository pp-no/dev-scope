import Link from "next/link";
import { type Video, formatDate } from "@/lib/videos";

export function VideoCard({ video }: { video: Video }) {
  return (
    <article className="video-card">
      {/* サムネイルはカードの第一印象を決めるので、最上部に大きく配置する。 */}
      <div
        className="video-preview"
        aria-hidden="true"
        style={
          video.thumbnailUrl
            ? {
                // サムネイルを背景画像として敷くことで、カードの縦横比を崩さずに表示する。
                backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.22), rgba(15, 23, 42, 0.2)), url(${video.thumbnailUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      />
      <div className="video-meta">
        {/* メタ情報は読み飛ばしやすい順に並べて、比較しやすくする。 */}
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
        {/* タグは4つに絞って、カードの高さが伸びすぎないようにする。 */}
        {video.keywords.slice(0, 4).map((keyword) => (
          <span key={keyword} className="tag">
            {keyword}
          </span>
        ))}
      </div>
      <div className="stats-row">
        {/* チャンネル名と視聴数は、判断材料として最後にまとめる。 */}
        <span>{video.channelName}</span>
        <span>{video.views}</span>
      </div>
      {/* 詳細ページはサムネイルではなく、明示的なボタンで遷移させる。 */}
      <Link href={`/videos/${video.id}`} className="button button-secondary" aria-label={`${video.title} を開く`}>
        詳細を見る
      </Link>
    </article>
  );
}
