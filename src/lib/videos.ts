/** アプリで扱う動画カテゴリの識別子 */
export type VideoCategory = "frontend" | "backend" | "ai" | "infra" | "tooling" | "career";

/** YouTube 動画を表すアプリ内共通型。API レスポンスと fallback データの両方がこの型に正規化される */
export type Video = {
  id: string;
  youtubeId: string;
  title: string;
  /** 一覧カード用に 120 文字で切り詰めた説明文 */
  summary: string;
  /** 動画詳細ページ用のフル説明文 */
  description: string;
  category: VideoCategory;
  categoryLabel: string;
  channelName: string;
  channelUrl: string;
  channelId: string;
  /** ISO 8601 形式の投稿日時 */
  publishedAt: string;
  /** "mm:ss" または "h:mm:ss" 形式の動画長 */
  duration: string;
  /** "48K 回視聴" のような compact 表記 */
  views: string;
  keywords: string[];
  resources: { label: string; href: string }[];
  thumbnailUrl: string;
};

/** UI に表示するカテゴリ一覧。サイドバーや CategoryGrid で参照する */
export const categories: Array<{
  value: VideoCategory;
  label: string;
  description: string;
}> = [
  { value: "frontend", label: "フロントエンド", description: "React, Next.js, TypeScript" },
  { value: "backend", label: "バックエンド", description: "API, 認証, DB 設計" },
  { value: "ai", label: "AI活用", description: "Copilot, ChatGPT, 開発効率化" },
  { value: "infra", label: "インフラ", description: "Docker, Vercel, CI/CD" },
  { value: "tooling", label: "開発ツール", description: "GitHub, VS Code, ESLint" },
  { value: "career", label: "キャリア・学習", description: "個人開発, ポートフォリオ" },
];

/** ホームのキーワードチップに表示する人気検索語 */
export const popularKeywords = [
  "Next.js",
  "React Server Components",
  "TypeScript",
  "AIコーディング",
  "Docker",
  "Vercel",
];

/** カテゴリ別の YouTube 検索クエリ。category フィルター選択時に q に付加される */
export const categorySearchTerms: Record<VideoCategory, string> = {
  frontend: "Next.js React TypeScript UI",
  backend: "Node.js API 認証 データベース",
  ai: "AI コーディング ChatGPT Copilot",
  infra: "Docker Vercel CI/CD クラウド",
  tooling: "ESLint Prettier GitHub VS Code",
  career: "個人開発 ポートフォリオ エンジニア 学習",
};

/** カテゴリ別の関連トピック語。keywordsFromText でのキーワード抽出シードとして使う */
export const categoryTopics: Record<VideoCategory, string[]> = {
  frontend: ["Next.js", "React", "TypeScript", "UI"],
  backend: ["Node.js", "API", "認証", "DB"],
  ai: ["AIコーディング", "ChatGPT", "Copilot", "LLM"],
  infra: ["Docker", "Vercel", "CI/CD", "Cloud"],
  tooling: ["ESLint", "Prettier", "GitHub", "VS Code"],
  career: ["個人開発", "ポートフォリオ", "キャリア", "学習"],
};

/** カテゴリ別の参考リンク。動画詳細ページの関連リソース欄に表示する */
export const categoryResources: Record<VideoCategory, { label: string; href: string }[]> = {
  frontend: [
    { label: "Next.js Docs", href: "https://nextjs.org/docs" },
    { label: "React Docs", href: "https://react.dev" },
  ],
  backend: [{ label: "OWASP", href: "https://owasp.org" }],
  ai: [{ label: "OpenAI Docs", href: "https://platform.openai.com/docs" }],
  infra: [{ label: "Docker Docs", href: "https://docs.docker.com" }],
  tooling: [{ label: "ESLint", href: "https://eslint.org" }],
  career: [{ label: "GitHub", href: "https://github.com" }],
};

/** 開発環境や API 障害時でも画面を確認できるよう、固定の代替データを用意しておく */
const fallbackVideos: Video[] = [
  {
    id: "dQw4w9WgXcQ",
    youtubeId: "dQw4w9WgXcQ",
    title: "Next.js App Router の設計を見直す実践ポイント",
    summary:
      "ルーティング、サーバーコンポーネント、キャッシュ戦略を整理しながら、実務で破綻しにくい構成を学べる動画。",
    description:
      "ルーティング、サーバーコンポーネント、キャッシュ戦略を整理しながら、実務で破綻しにくい構成を学べる動画。",
    category: "frontend",
    categoryLabel: "フロントエンド",
    channelName: "Web Tech Lab",
    channelUrl: "https://youtube.com",
    channelId: "mock",
    publishedAt: "2026-04-18T00:00:00Z",
    duration: "22:14",
    views: "48K 回視聴",
    keywords: ["Next.js", "App Router", "RSC", "UI設計"],
    resources: categoryResources.frontend,
    thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  },
  {
    id: "fb001",
    youtubeId: "fb001",
    title: "Claude 3.7 で実装する自律型コーディングエージェント入門",
    summary:
      "Anthropic の Claude 3.7 を使って、コードを書き・実行し・自己修正する自律型エージェントを TypeScript でゼロから実装します。",
    description:
      "Anthropic の Claude 3.7 を使って、コードを書き・実行し・自己修正する自律型エージェントを TypeScript でゼロから実装します。Tool Use API の最小構成から並列ツール呼び出し、コスト最適化まで解説。",
    category: "ai",
    categoryLabel: "AI活用",
    channelName: "AI Box Lab",
    channelUrl: "https://youtube.com",
    channelId: "mock",
    publishedAt: "2026-05-01T00:00:00Z",
    duration: "31:02",
    views: "68K 回視聴",
    keywords: ["Claude", "Agents", "TypeScript", "Tool Use"],
    resources: categoryResources.ai,
    thumbnailUrl: "",
  },
  {
    id: "fb002",
    youtubeId: "fb002",
    title: "PostgreSQL 17 の新機能と移行のリアルな落とし穴",
    summary:
      "PostgreSQL 17 で追加された主要機能を実例とともに解説。実際の移行作業で遭遇したトラブルと対処法を紹介します。",
    description:
      "PostgreSQL 17 で追加された主要機能を実例とともに解説。実際の移行作業で遭遇したトラブルと対処法を紹介します。",
    category: "backend",
    categoryLabel: "バックエンド",
    channelName: "scaleup.dev",
    channelUrl: "https://youtube.com",
    channelId: "mock",
    publishedAt: "2026-04-28T00:00:00Z",
    duration: "18:44",
    views: "19K 回視聴",
    keywords: ["PostgreSQL", "Database", "Migration", "SQL"],
    resources: categoryResources.backend,
    thumbnailUrl: "",
  },
  {
    id: "fb003",
    youtubeId: "fb003",
    title: "Kubernetes をやめた話 — マネージドへの戻し方と判断基準",
    summary:
      "自己管理の Kubernetes から Cloud Run / ECS マネージドへ移行した実例。判断基準とコスト比較を詳しく解説。",
    description:
      "自己管理の Kubernetes から Cloud Run / ECS マネージドへ移行した実例。判断基準とコスト比較を詳しく解説。",
    category: "infra",
    categoryLabel: "インフラ",
    channelName: "CloudNative.jp",
    channelUrl: "https://youtube.com",
    channelId: "mock",
    publishedAt: "2026-04-22T00:00:00Z",
    duration: "22:55",
    views: "28K 回視聴",
    keywords: ["Kubernetes", "Docker", "Cloud Run", "インフラ"],
    resources: categoryResources.infra,
    thumbnailUrl: "",
  },
  {
    id: "fb004",
    youtubeId: "fb004",
    title: "GitHub Copilot Workspace を本番開発で 3 ヶ月使った正直レビュー",
    summary:
      "GitHub Copilot Workspace の実際の使用感、得意なこと・不得意なこと、チームへの導入方法をレビュー。",
    description:
      "GitHub Copilot Workspace の実際の使用感、得意なこと・不得意なこと、チームへの導入方法をレビュー。",
    category: "tooling",
    categoryLabel: "開発ツール",
    channelName: "Prototype Cast",
    channelUrl: "https://youtube.com",
    channelId: "mock",
    publishedAt: "2026-05-03T00:00:00Z",
    duration: "16:32",
    views: "54K 回視聴",
    keywords: ["GitHub Copilot", "AI開発", "開発効率", "レビュー"],
    resources: categoryResources.tooling,
    thumbnailUrl: "",
  },
  {
    id: "fb005",
    youtubeId: "fb005",
    title: "React Server Components を実戦投入する前に知るべき 5 つの罠",
    summary:
      "RSC の概念から実際のプロジェクト導入まで。ハマりやすいポイントと回避策を 5 つに絞って解説します。",
    description:
      "RSC の概念から実際のプロジェクト導入まで。ハマりやすいポイントと回避策を 5 つに絞って解説します。",
    category: "frontend",
    categoryLabel: "フロントエンド",
    channelName: "React Conf JP",
    channelUrl: "https://youtube.com",
    channelId: "mock",
    publishedAt: "2026-04-15T00:00:00Z",
    duration: "27:11",
    views: "33K 回視聴",
    keywords: ["React", "RSC", "Next.js", "Server Components"],
    resources: categoryResources.frontend,
    thumbnailUrl: "",
  },
  {
    id: "fb006",
    youtubeId: "fb006",
    title: "Tailwind v4 と CSS @layer の設計を実プロジェクトで考える",
    summary:
      "Tailwind CSS v4 の新機能と CSS @layer を組み合わせた設計パターンを実プロジェクトで検証。",
    description:
      "Tailwind CSS v4 の新機能と CSS @layer を組み合わせた設計パターンを実プロジェクトで検証。",
    category: "frontend",
    categoryLabel: "フロントエンド",
    channelName: "Frame Engineering",
    channelUrl: "https://youtube.com",
    channelId: "mock",
    publishedAt: "2026-05-04T00:00:00Z",
    duration: "21:00",
    views: "11K 回視聴",
    keywords: ["Tailwind CSS", "CSS", "Design System", "UI"],
    resources: categoryResources.frontend,
    thumbnailUrl: "",
  },
  {
    id: "fb007",
    youtubeId: "fb007",
    title: "AI 時代に生き残るエンジニアのスキルセットを再考する",
    summary:
      "生成 AI の台頭で変化するエンジニアリングの役割。これからのキャリアで求められるスキルを体系的に整理。",
    description:
      "生成 AI の台頭で変化するエンジニアリングの役割。これからのキャリアで求められるスキルを体系的に整理。",
    category: "career",
    categoryLabel: "キャリア・学習",
    channelName: "Career // Stack",
    channelUrl: "https://youtube.com",
    channelId: "mock",
    publishedAt: "2026-04-10T00:00:00Z",
    duration: "28:36",
    views: "38K 回視聴",
    keywords: ["キャリア", "AI", "スキル", "エンジニア"],
    resources: categoryResources.career,
    thumbnailUrl: "",
  },
];

// YouTube API のレスポンスはそのままだと画面側で扱いづらいため、
// アプリ内で共通に使う最小限の Video 型へ正規化する。
type YouTubeSearchResponse = {
  items: Array<{
    id: { kind: string; videoId?: string };
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      channelTitle: string;
      thumbnails?: {
        default?: { url: string };
        medium?: { url: string };
        high?: { url: string };
      };
    };
  }>;
};

type YouTubeVideosResponse = {
  items: Array<{
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      channelTitle: string;
      title: string;
      description: string;
      thumbnails?: {
        default?: { url: string };
        medium?: { url: string };
        high?: { url: string };
      };
    };
    contentDetails?: {
      duration?: string;
    };
    statistics?: {
      viewCount?: string;
    };
  }>;
};

/**
 * ISO 8601 の日付文字列を "YYYY/MM/DD" 形式に変換する
 * @param value - ISO 8601 形式の日付文字列
 */
export function formatDate(value: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

/** 環境変数から YouTube API キーを取得する */
function getApiKey() {
  return process.env.YOUTUBE_API_KEY?.trim();
}

/**
 * API キーが設定されているかを確認する
 * true なら実 API、false なら fallbackVideos を使う
 */
function hasApiKey() {
  return Boolean(getApiKey());
}

/**
 * YouTube Data API v3 のエンドポイント URL を組み立てる
 * @param path - API パス（"search"、"videos" など）
 * @param params - クエリパラメータ。値が undefined または空文字のキーは除外される
 */
function buildYouTubeUrl(path: string, params: Record<string, string | number | undefined>) {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${path}`);
  const apiKey = getApiKey();

  if (apiKey) {
    url.searchParams.set("key", apiKey);
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url;
}

/**
 * YouTube API にリクエストを送り、JSON レスポンスを返す
 * next.revalidate: 300 により 5 分間のサーバーサイドキャッシュが有効
 * @param path - API パス（"search"、"videos" など）
 * @param params - クエリパラメータのオブジェクト
 */
async function fetchYouTube<T>(path: string, params: Record<string, string | number | undefined>) {
  const response = await fetch(buildYouTubeUrl(path, params), {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`YouTube API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

/**
 * YouTube サムネイルオブジェクトから最適解像度の URL を選ぶ
 * high → medium → default の優先順で取得する
 */
function pickThumbnailUrl(
  thumbnails?: YouTubeSearchResponse["items"][number]["snippet"]["thumbnails"]
) {
  return thumbnails?.high?.url ?? thumbnails?.medium?.url ?? thumbnails?.default?.url ?? "";
}

/**
 * YouTube の ISO 8601 動画長（"PT1H2M3S"）を "h:mm:ss" / "mm:ss" 形式に変換する
 * @param duration - ISO 8601 形式の動画長文字列
 */
function formatDuration(duration?: string) {
  if (!duration) {
    return "";
  }

  const matches = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!matches) {
    return duration;
  }

  const hours = Number.parseInt(matches[1] ?? "0", 10);
  const minutes = Number.parseInt(matches[2] ?? "0", 10);
  const seconds = Number.parseInt(matches[3] ?? "0", 10);

  return [hours, minutes, seconds]
    .filter((part, index) => part > 0 || index > 0)
    .map((part, index) => (index > 0 ? String(part).padStart(2, "0") : String(part)))
    .join(":");
}

/**
 * 視聴回数の数値文字列を "48K 回視聴" のような compact 表記に変換する
 * @param viewCount - 視聴回数の数値文字列（YouTube API の statistics.viewCount）
 */
function formatViewCount(viewCount?: string) {
  if (!viewCount) {
    return "視聴回数非公開";
  }

  const numeric = Number.parseInt(viewCount, 10);
  if (Number.isNaN(numeric)) {
    return `${viewCount} 回視聴`;
  }

  return `${new Intl.NumberFormat("ja-JP", { notation: "compact" }).format(numeric)} 回視聴`;
}

/**
 * 動画説明文を 120 文字で切り詰める（一覧カード用）
 * @param description - 動画の説明文
 */
function truncateSummary(description: string) {
  const normalized = description.replace(/\s+/g, " ").trim();
  if (normalized.length <= 120) {
    return normalized;
  }

  return `${normalized.slice(0, 120)}…`;
}

/**
 * タイトル・説明文・カテゴリトピックからキーワードを最大 6 件抽出する
 * @param title - 動画タイトル
 * @param description - 動画説明文
 * @param category - 動画カテゴリ（categoryTopics のシードとして使う）
 */
function keywordsFromText(title: string, description: string, category: VideoCategory) {
  const pool = [
    ...categoryTopics[category],
    ...title.split(/[\s、。/・-]+/),
    ...description.split(/[\s、。/・-]+/),
  ]
    .map((value) => value.trim())
    .filter(Boolean);

  return Array.from(new Set(pool)).slice(0, 6);
}

/**
 * YouTube API レスポンスのアイテムをアプリ共通の Video 型に変換する
 * search.list と videos.list でレスポンス形式が異なるため、ここで統一する
 * @param item - search.list または videos.list の 1 件分のアイテム
 * @param category - 分類済みのカテゴリ
 */
function mapApiItemToVideo(
  item: YouTubeSearchResponse["items"][number] | YouTubeVideosResponse["items"][number],
  category: VideoCategory
): Video {
  const snippet = item.snippet;
  const thumbnailUrl = pickThumbnailUrl(snippet.thumbnails);
  const title = snippet.title;
  const description = snippet.description || title;
  const youtubeId = typeof item.id === "string" ? item.id : (item.id.videoId ?? "");

  return {
    id: youtubeId,
    youtubeId,
    title,
    summary: truncateSummary(description),
    description,
    category,
    categoryLabel: categories.find((entry) => entry.value === category)?.label ?? "技術動画",
    channelName: snippet.channelTitle,
    channelUrl: `https://www.youtube.com/channel/${snippet.channelId}`,
    channelId: snippet.channelId,
    publishedAt: snippet.publishedAt,
    duration: "contentDetails" in item ? formatDuration(item.contentDetails?.duration) : "",
    views: "statistics" in item ? formatViewCount(item.statistics?.viewCount) : "視聴回数非公開",
    keywords: keywordsFromText(title, description, category),
    resources: categoryResources[category],
    thumbnailUrl,
  };
}

/**
 * 投稿期間の識別子を YouTube API の publishedAfter 用 ISO 日付文字列に変換する
 * @param published - "day"（24時間）| "week"（7日）| "month"（30日）
 * @returns ISO 8601 形式の日時文字列。未知の値の場合は undefined
 */
function resolvePublishedAfter(published: string): string | undefined {
  const now = new Date();
  if (published === "day") return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
  if (published === "week") return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  if (published === "month")
    return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
  return undefined;
}

/**
 * "mm:ss" / "h:mm:ss" 形式の動画長文字列を秒数に変換する（フォールバックフィルター用）
 * @param duration - "mm:ss" または "h:mm:ss" 形式の文字列
 */
function parseDurationSeconds(duration: string): number {
  const parts = duration.split(":").map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
}

/**
 * YouTube Data API で動画を検索する（2 段階フェッチ）
 * 1. search.list で videoId 一覧を取得
 * 2. videos.list で再生時間・視聴回数などの詳細を補完
 * @param query - 検索クエリ文字列
 * @param maxResults - 最大取得件数（デフォルト 12）
 * @param categoryHint - 結果に付与するカテゴリ（省略時は guessCategory で推定）
 * @param publishedAfter - この日時以降に公開された動画に絞る ISO 8601 文字列
 * @param videoDuration - 動画長フィルター："short"（4分未満）| "medium"（4〜20分）| "long"（20分超）
 */
async function searchYouTubeVideos(
  query: string,
  maxResults = 12,
  categoryHint?: VideoCategory,
  publishedAfter?: string,
  videoDuration?: "short" | "medium" | "long"
) {
  const searchResponse = await fetchYouTube<YouTubeSearchResponse>("search", {
    part: "snippet",
    type: "video",
    q: query,
    maxResults,
    order: "relevance",
    safeSearch: "moderate",
    relevanceLanguage: "ja",
    regionCode: "JP",
    publishedAfter,
    videoDuration,
  });

  const videoIds = searchResponse.items
    .map((item) => item.id.videoId)
    .filter((value): value is string => Boolean(value));

  if (videoIds.length === 0) {
    return [];
  }

  const videosResponse = await fetchYouTube<YouTubeVideosResponse>("videos", {
    part: "snippet,contentDetails,statistics",
    id: videoIds.join(","),
  });

  const videosById = new Map(videosResponse.items.map((item) => [item.id, item]));

  return videoIds
    .map((videoId) => videosById.get(videoId))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((item) =>
      mapApiItemToVideo(
        item,
        categoryHint ?? guessCategory(item.snippet.title, item.snippet.description)
      )
    );
}

/**
 * 動画配列から youtubeId が重複する要素を除去する
 * @param videos - 重複を含む可能性がある動画配列
 */
function dedupeVideos(videos: Video[]) {
  return Array.from(new Map(videos.map((video) => [video.youtubeId, video])).values());
}

/**
 * ホーム画面のトレンド動画を取得する
 * API キーが未設定の場合は fallbackVideos を返す（fallback は日付固定のため期間フィルター非対応）
 * @param published - 投稿期間フィルター："day" | "week" | "month"（省略時は全期間）
 */
export async function getHomeVideos(published?: string) {
  if (!hasApiKey()) {
    return fallbackVideos;
  }

  const publishedAfter = published ? resolvePublishedAfter(published) : undefined;
  try {
    const videos = await searchYouTubeVideos(
      "Webエンジニア 技術 動画",
      12,
      undefined,
      publishedAfter
    );
    return videos.length > 0 ? videos : fallbackVideos;
  } catch (error) {
    console.error("Failed to load home videos from YouTube API", error);
    return fallbackVideos;
  }
}

/**
 * 検索条件を指定して動画を取得する
 * API キーが未設定の場合は filterFallbackVideos でフォールバックデータを絞り込む
 * @param params.query - 検索キーワード
 * @param params.category - カテゴリ識別子
 * @param params.published - 投稿期間フィルター："day" | "week" | "month"
 * @param params.duration - 動画長フィルター："short" | "medium" | "long"
 */
export async function searchVideos(params: {
  query?: string;
  category?: string;
  published?: string;
  duration?: string;
}) {
  if (!hasApiKey()) {
    return filterFallbackVideos(params);
  }

  const normalizedQuery = params.query?.trim() ?? "";
  const normalizedCategory = categories.find((item) => item.value === params.category)?.value;
  // カテゴリが指定されている場合、カテゴリ固有の検索語を q に付加して精度を上げる
  const categoryQuery = normalizedCategory ? categorySearchTerms[normalizedCategory] : "";
  const effectiveQuery = [normalizedQuery, categoryQuery].filter(Boolean).join(" ").trim();
  const searchQuery = effectiveQuery || "Webエンジニア 技術";
  const publishedAfter = params.published ? resolvePublishedAfter(params.published) : undefined;
  // YouTube API が受け付ける値（short / medium / long）以外は除外する
  const videoDuration =
    params.duration === "short" || params.duration === "medium" || params.duration === "long"
      ? params.duration
      : undefined;
  try {
    return await searchYouTubeVideos(
      searchQuery,
      12,
      normalizedCategory,
      publishedAfter,
      videoDuration
    );
  } catch (error) {
    console.error("Failed to search YouTube videos", error);
    return filterFallbackVideos(params);
  }
}

/**
 * YouTube 動画 ID から動画の詳細情報を 1 件取得する
 * @param id - YouTube 動画 ID
 */
export async function getVideoById(id: string) {
  if (!hasApiKey()) {
    return fallbackVideos.find((video) => video.youtubeId === id || video.id === id);
  }

  try {
    const response = await fetchYouTube<YouTubeVideosResponse>("videos", {
      part: "snippet,contentDetails,statistics",
      id,
    });

    const item = response.items[0];
    if (!item) {
      return undefined;
    }

    const category = guessCategory(item.snippet.title, item.snippet.description);
    return mapApiItemToVideo(item, category);
  } catch (error) {
    console.error("Failed to load YouTube video detail", error);
    return fallbackVideos.find((video) => video.youtubeId === id || video.id === id);
  }
}

/**
 * 指定した動画に関連する動画を最大 3 件取得する
 * タイトルと先頭キーワードで再検索し、元の動画を除外して返す
 * @param video - 関連動画を取得したい基点となる動画
 */
export async function getRelatedVideos(video: Video) {
  if (!hasApiKey()) {
    return fallbackVideos
      .filter((candidate) => candidate.youtubeId !== video.youtubeId)
      .slice(0, 3);
  }

  try {
    const searchResults = await searchYouTubeVideos(
      `${video.title} ${video.keywords[0] ?? ""}`,
      8,
      video.category
    );
    return dedupeVideos(
      searchResults.filter((candidate) => candidate.youtubeId !== video.youtubeId)
    ).slice(0, 3);
  } catch (error) {
    console.error("Failed to load related videos", error);
    return fallbackVideos
      .filter((candidate) => candidate.youtubeId !== video.youtubeId)
      .slice(0, 3);
  }
}

/**
 * タイトルと説明文のキーワードマッチでカテゴリを推定する
 * YouTube API にはカテゴリ情報が安定して含まれないため独自に分類する
 * @param title - 動画タイトル
 * @param description - 動画説明文
 */
function guessCategory(title: string, description: string): VideoCategory {
  const combined = `${title} ${description}`.toLowerCase();

  if (/(next\.?js|react|typescript|frontend|ui)/i.test(combined)) return "frontend";
  if (/(node\.?js|api|database|auth|認証)/i.test(combined)) return "backend";
  if (/(ai|chatgpt|copilot|llm|prompt)/i.test(combined)) return "ai";
  if (/(docker|vercel|ci\/cd|deploy|kubernetes|cloud)/i.test(combined)) return "infra";
  if (/(eslint|prettier|github|vscode|tool)/i.test(combined)) return "tooling";
  return "career";
}

/**
 * フォールバックデータを検索条件で絞り込む
 * @param params.query - 検索キーワード（タイトル・要約・チャンネル名・キーワードを対象にする）
 * @param params.category - カテゴリ識別子
 * @param params.published - 投稿期間："day"（24時間）| "week"（7日）| "month"（30日）
 * @param params.duration - 動画長："short"（〜10分）| "medium"（10〜30分）| "long"（30分〜）
 */
function filterFallbackVideos(params: {
  query?: string;
  category?: string;
  published?: string;
  duration?: string;
}) {
  const normalizedQuery = params.query?.trim().toLowerCase() ?? "";
  const normalizedCategory = params.category?.trim() ?? "";
  const publishedCutoff = params.published ? resolvePublishedAfter(params.published) : undefined;

  return fallbackVideos.filter((video) => {
    if (normalizedCategory && video.category !== normalizedCategory) return false;

    if (publishedCutoff && new Date(video.publishedAt) < new Date(publishedCutoff)) return false;

    if (params.duration) {
      const secs = parseDurationSeconds(video.duration);
      if (params.duration === "short" && secs >= 10 * 60) return false;
      if (params.duration === "medium" && (secs < 10 * 60 || secs >= 30 * 60)) return false;
      if (params.duration === "long" && secs < 30 * 60) return false;
    }

    if (!normalizedQuery) return true;

    const haystack = [
      video.title,
      video.summary,
      video.categoryLabel,
      video.channelName,
      ...video.keywords,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}
