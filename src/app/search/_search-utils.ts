/** 検索ページで共有する URL パラメータの型 */
export type SearchParams = {
  /** 検索キーワード */
  q?: string;
  /** カテゴリ識別子（例: "frontend", "ai"） */
  category?: string;
  /** 投稿期間フィルター："day" | "week" | "month" */
  published?: string;
  /** 動画の長さフィルター："short" | "medium" | "long" */
  duration?: string;
};

/** 投稿期間フィルターの選択肢 */
export const publishedOptions = [
  { value: "day", label: "24時間以内" },
  { value: "week", label: "1週間以内" },
  { value: "month", label: "1ヶ月以内" },
] as const;

/** 動画の長さフィルターの選択肢 */
export const durationOptions = [
  { value: "short", label: "〜 10分" },
  { value: "medium", label: "10 — 30分" },
  { value: "long", label: "30分〜" },
] as const;

/**
 * 現在の検索パラメータに部分的な変更を加えた検索 URL を生成する
 * @param current - 現在の検索パラメータ（変更しない項目はそのまま引き継がれる）
 * @param patch - 上書きしたいパラメータ（空文字列を指定するとそのパラメータを除去する）
 * @returns `/search` または `/search?q=...` 形式の URL 文字列
 */
export function buildUrl(current: SearchParams, patch: Partial<SearchParams>): string {
  const next = { ...current, ...patch };
  const p = new URLSearchParams();
  if (next.q) p.set("q", next.q);
  if (next.category) p.set("category", next.category);
  if (next.published) p.set("published", next.published);
  if (next.duration) p.set("duration", next.duration);
  const qs = p.toString();
  return `/search${qs ? `?${qs}` : ""}`;
}
