import { notFound } from "next/navigation";
import { VideoCard } from "@/components/video-card";
import { formatDate, getRelatedVideos, getVideoById } from "@/lib/videos";

type VideoPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function VideoDetailPage({ params }: VideoPageProps) {
  const { id } = await params;
  const video = await getVideoById(id);

  if (!video) {
    notFound();
  }

  const relatedVideos = (await getRelatedVideos(video)).slice(0, 3);

  return (
    <main className="detail-layout">
      <section className="surface">
        <iframe
          className="video-frame"
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />

        <div style={{ marginTop: 18 }} className="video-meta">
          <span>{video.categoryLabel}</span>
          <span>•</span>
          <span>{formatDate(video.publishedAt)}</span>
          <span>•</span>
          <span>{video.duration}</span>
          <span>•</span>
          <span>{video.views}</span>
        </div>

        <h1 style={{ marginBottom: 10 }}>{video.title}</h1>
        <p className="prose">{video.summary}</p>

        <div style={{ marginTop: 18 }}>
          <div className="section-head">
            <div>
              <h2>キーワード</h2>
            </div>
          </div>
          <div className="inline-tags">
            {video.keywords.map((keyword) => (
              <span key={keyword} className="tag">
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div className="section-head">
            <div>
              <h2>関連リンク</h2>
            </div>
          </div>
          <ul className="list">
            <li>
              <a href={video.channelUrl} target="_blank" rel="noreferrer">
                {video.channelName}
              </a>
            </li>
            {video.resources.map((resource) => (
              <li key={resource.href}>
                <a href={resource.href} target="_blank" rel="noreferrer">
                  {resource.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <aside className="surface">
        <div className="section-head">
          <div>
            <h2>関連動画</h2>
            <p>同カテゴリと近いキーワードの動画を表示しています。</p>
          </div>
        </div>
        <div className="grid-cards">
          {relatedVideos.length > 0 ? (
            relatedVideos.map((related) => <VideoCard key={related.id} video={related} />)
          ) : (
            <div className="empty-state">関連動画はまだありません。</div>
          )}
        </div>
      </aside>
    </main>
  );
}
