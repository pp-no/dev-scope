export function SearchBar({
  defaultValue,
  action = "/search",
}: {
  defaultValue?: string;
  action?: string;
}) {
  return (
    <>
      {/* GET 送信にすることで、検索結果を URL で共有しやすくする。 */}
      <form action={action} method="get" className="search-bar">
        <input
          className="search-input"
          type="search"
          name="q"
          placeholder="例: Next.js, AIコーディング, Docker"
          defaultValue={defaultValue}
          aria-label="動画検索"
        />
        <button type="submit" className="button button-primary">
          検索する
        </button>
      </form>
    </>
  );
}
