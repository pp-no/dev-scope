import Link from "next/link";
import { CategoryGrid } from "@/components/category-grid";
import { SearchBar } from "@/components/search-bar";
import { VideoCard } from "@/components/video-card";
import { getHomeVideos, popularKeywords } from "@/lib/videos";

export default async function HomePage() {
  const spotlightVideos = await getHomeVideos();
  const featuredVideo = spotlightVideos[0];

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Webエンジニア向け技術動画の整理・発見</span>
          <h1>見たい技術動画を、カテゴリで素早く見つける。</h1>
          <p>
            DevScope は、Next.js や React から AI 活用、インフラ、開発ツールまでを横断して、
            技術動画を探しやすくするためのアプリです。情報の洪水の中から、今見るべきものを絞り込みます。
          </p>
          <div className="hero-actions">
            <Link href="/search" className="button button-primary">
              動画を探す
            </Link>
            {featuredVideo ? (
              <Link href={`/videos/${featuredVideo.youtubeId}`} className="button button-secondary">
                注目動画を見る
              </Link>
            ) : (
              <span className="button button-secondary" aria-disabled="true">
                注目動画を読み込み中
              </span>
            )}
          </div>
        </div>

        <aside className="hero-spotlight">
          <div className="spotlight-card">
            <div className="spotlight-meta">
              <span>注目カテゴリ</span>
              <span>・</span>
              <span>{featuredVideo?.categoryLabel ?? "最新動画"}</span>
            </div>
            <h2 style={{ margin: "12px 0 8px" }}>{featuredVideo?.title ?? "YouTube API から最新の技術動画を取得します"}</h2>
            <p className="prose">
              {featuredVideo?.summary ??
                "YOUTUBE_API_KEY を設定すると、YouTube Data API v3 から注目動画を取得して表示します。"}
            </p>
          </div>

          <div className="kpi-grid">
            <div className="kpi">
              <strong>{spotlightVideos.length}</strong>
              <span>本の注目動画</span>
            </div>
            <div className="kpi">
              <strong>6</strong>
              <span>カテゴリ</span>
            </div>
            <div className="kpi">
              <strong>検索</strong>
              <span>キーワード・カテゴリ対応</span>
            </div>
            <div className="kpi">
              <strong>詳細</strong>
              <span>埋め込みと関連リンク</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="section surface">
        <div className="section-head">
          <div>
            <h2>動画検索</h2>
            <p>カテゴリやキーワードで絞り込めます。</p>
          </div>
        </div>
        <SearchBar />
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h2>カテゴリー一覧</h2>
            <p>目的別に技術動画を追いやすくします。</p>
          </div>
        </div>
        <CategoryGrid />
      </section>

      <section className="section surface">
        <div className="section-head">
          <div>
            <h2>人気キーワード</h2>
            <p>今追うべきテーマの入口です。</p>
          </div>
        </div>
        <div className="pill-row">
          {popularKeywords.map((keyword) => (
            <Link key={keyword} href={`/search?q=${encodeURIComponent(keyword)}`} className="pill">
              {keyword}
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h2>注目動画</h2>
            <p>API から取得した最新の技術動画を表示しています。</p>
          </div>
          <Link href="/search" className="nav-link">
            すべて見る
          </Link>
        </div>
        <div className="grid-cards columns-3">
          {spotlightVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>
    </main>
  );
}
