/**
 * 検索フォームコンポーネント
 * GET 送信を使うことで検索条件が URL に反映され、結果を共有しやすい
 * @param defaultValue - 初期表示するキーワード（検索結果ページで現在の q を引き継ぐ際に使用）
 * @param action - フォームの送信先パス（デフォルト: "/search"）
 */
export function SearchBar({
  defaultValue,
  action = "/search",
}: {
  defaultValue?: string;
  action?: string;
}) {
  return (
    <>
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
