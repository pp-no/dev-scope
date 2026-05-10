import Link from "next/link";
import { SearchBar } from "@/components/search-bar";
import { VideoCard } from "@/components/video-card";
import { categories, searchVideos } from "@/lib/videos";

type SearchPageProps = {
  searchParams?: Promise<{
    q?: string;
    category?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // URL パラメータを起点に検索条件を復元することで、共有しやすい検索にする。
  const params = (await searchParams) ?? {};
  const query = params.q ?? "";
  const category = params.category ?? "";
  const results = await searchVideos({ query, category });

  return (
    <main>
      <section className="surface">
        <div className="section-head">
          <div>
            <h1 style={{ margin: 0, fontSize: "1.8rem" }}>動画検索</h1>
            <p>キーワードとカテゴリで絞り込みます。</p>
          </div>
        </div>
        {/* GET フォームにしているので、検索条件が URL に残る。 */}
        <SearchBar defaultValue={query} />

        <div className="section" style={{ marginTop: 20 }}>
          <div className="pill-row">
            {/* まずはすべて戻せるように、カテゴリなしの状態を先頭に置く。 */}
            <Link href="/search" className={`pill ${!category ? "active" : ""}`}>
              すべて
            </Link>
            {categories.map((item) => (
              // 同じ検索語を維持したままカテゴリだけ切り替えられるようにする。
              <Link
                key={item.value}
                href={`/search?category=${item.value}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                className={`pill ${category === item.value ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h2>検索結果</h2>
            <p>{results.length} 件見つかりました。</p>
          </div>
        </div>

        {results.length > 0 ? (
          <div className="grid-cards columns-2">
            {/* 結果が多い前提なので、一覧はカード単位でざっと比較できる形にする。 */}
            {results.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            条件に一致する動画がありません。別のキーワードで試すか、カテゴリを切り替えてください。
          </div>
        )}
      </section>
    </main>
  );
}
