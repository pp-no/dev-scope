export type VideoCategory =
  | "frontend"
  | "backend"
  | "ai"
  | "infra"
  | "tooling"
  | "career";

export type Video = {
  id: string;
  youtubeId: string;
  title: string;
  summary: string;
  description: string;
  category: VideoCategory;
  categoryLabel: string;
  channelName: string;
  channelUrl: string;
  channelId: string;
  publishedAt: string;
  duration: string;
  views: string;
  keywords: string[];
  resources: { label: string; href: string }[];
  thumbnailUrl: string;
};

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

export const popularKeywords = [
  "Next.js",
  "React Server Components",
  "TypeScript",
  "AIコーディング",
  "Docker",
  "Vercel",
];

export const categorySearchTerms: Record<VideoCategory, string> = {
  frontend: "Next.js React TypeScript UI",
  backend: "Node.js API 認証 データベース",
  ai: "AI コーディング ChatGPT Copilot",
  infra: "Docker Vercel CI/CD クラウド",
  tooling: "ESLint Prettier GitHub VS Code",
  career: "個人開発 ポートフォリオ エンジニア 学習",
};

export const categoryTopics: Record<VideoCategory, string[]> = {
  frontend: ["Next.js", "React", "TypeScript", "UI"],
  backend: ["Node.js", "API", "認証", "DB"],
  ai: ["AIコーディング", "ChatGPT", "Copilot", "LLM"],
  infra: ["Docker", "Vercel", "CI/CD", "Cloud"],
  tooling: ["ESLint", "Prettier", "GitHub", "VS Code"],
  career: ["個人開発", "ポートフォリオ", "キャリア", "学習"],
};

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

// 開発環境や API 障害時でも画面を確認できるよう、最小限の代替データを残しておく。
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
    thumbnailUrl: `https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg`,
  },
  {
    id: "aqz-KE-bpKQ",
    youtubeId: "aqz-KE-bpKQ",
    title: "React のパフォーマンス最適化を基礎から整理する",
    summary:
      "再レンダリングの考え方、コンポーネント分割、状態配置を中心に、過剰最適化を避ける実践的なアプローチを解説。",
    description:
      "再レンダリングの考え方、コンポーネント分割、状態配置を中心に、過剰最適化を避ける実践的なアプローチを解説。",
    category: "frontend",
    categoryLabel: "フロントエンド",
    channelName: "Frontend Signals",
    channelUrl: "https://youtube.com",
    channelId: "mock",
    publishedAt: "2026-03-03T00:00:00Z",
    duration: "18:41",
    views: "31K 回視聴",
    keywords: ["React", "Performance", "State", "Rendering"],
    resources: categoryResources.frontend,
    thumbnailUrl: `https://i.ytimg.com/vi/aqz-KE-bpKQ/hqdefault.jpg`,
  },
];

// YouTube API のレスポンスはそのままだと画面側で扱いづらいため、
// アプリ内で共通に使う最小限の Video 形へ正規化する。
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

export function formatDate(value: string) {
  // 日付はロケール依存の表現にして、UI 側で毎回整形しない。
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

function getApiKey() {
  return process.env.YOUTUBE_API_KEY?.trim();
}

function hasApiKey() {
  // API キーの有無で、実データ取得とフォールバックを切り替える。
  return Boolean(getApiKey());
}

function buildYouTubeUrl(path: string, params: Record<string, string | number | undefined>) {
  // API 呼び出し先は全てこの関数に集約して、URL 生成の重複を防ぐ。
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

async function fetchYouTube<T>(path: string, params: Record<string, string | number | undefined>) {
  const response = await fetch(buildYouTubeUrl(path, params), {
    // 取得結果は短時間キャッシュして、画面遷移のたびに API を叩きすぎないようにする。
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`YouTube API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

function pickThumbnailUrl(thumbnails?: YouTubeSearchResponse["items"][number]["snippet"]["thumbnails"]) {
  // YouTube のサムネイルは解像度ごとに候補があるので、見栄えの良いものから拾う。
  return thumbnails?.high?.url ?? thumbnails?.medium?.url ?? thumbnails?.default?.url ?? "";
}

function formatDuration(duration?: string) {
  if (!duration) {
    return "";
  }

  // ISO 8601 形式の動画長を、画面で読める mm:ss / h:mm:ss に変換する。
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

function formatViewCount(viewCount?: string) {
  if (!viewCount) {
    return "視聴回数非公開";
  }

  // 数字はそのままだと長いので、一覧では compact 表記に丸める。
  const numeric = Number.parseInt(viewCount, 10);
  if (Number.isNaN(numeric)) {
    return `${viewCount} 回視聴`;
  }

  return `${new Intl.NumberFormat("ja-JP", { notation: "compact" }).format(numeric)} 回視聴`;
}

function truncateSummary(description: string) {
  // 一覧カードでは本文を読みやすくするため、説明文を短く切って要点だけ表示する。
  const normalized = description.replace(/\s+/g, " ").trim();
  if (normalized.length <= 120) {
    return normalized;
  }

  return `${normalized.slice(0, 120)}…`;
}

function keywordsFromText(title: string, description: string, category: VideoCategory) {
  // 検索の起点になるキーワードは、カテゴリ語と本文中の語を合わせて抽出する。
  const pool = [
    ...categoryTopics[category],
    ...title.split(/[\s、。/・-]+/),
    ...description.split(/[\s、。/・-]+/),
  ]
    .map((value) => value.trim())
    .filter(Boolean);

  return Array.from(new Set(pool)).slice(0, 6);
}

function mapApiItemToVideo(
  item: YouTubeSearchResponse["items"][number] | YouTubeVideosResponse["items"][number],
  category: VideoCategory,
): Video {
  // API ごとに形が違うので、ここでアプリ共通の Video に統一する。
  const snippet = item.snippet;
  const thumbnailUrl = pickThumbnailUrl(snippet.thumbnails);
  const title = snippet.title;
  const description = snippet.description || title;
  const youtubeId = typeof item.id === "string" ? item.id : item.id.videoId ?? "";

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

async function searchYouTubeVideos(
  query: string,
  maxResults = 12,
  categoryHint?: VideoCategory,
) {
  // 検索は search.list で videoId を集めてから、videos.list で詳細を補う二段構成にする。
  const searchResponse = await fetchYouTube<YouTubeSearchResponse>("search", {
    part: "snippet",
    type: "video",
    q: query,
    maxResults,
    order: "relevance",
    safeSearch: "moderate",
    relevanceLanguage: "ja",
    regionCode: "JP",
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
    .map((item) => mapApiItemToVideo(item, categoryHint ?? guessCategory(item.snippet.title, item.snippet.description)));
}

function dedupeVideos(videos: Video[]) {
  // 関連動画や検索結果で同じ動画が重複しないよう、videoId で一意化する。
  return Array.from(new Map(videos.map((video) => [video.youtubeId, video])).values());
}

export async function getHomeVideos() {
  if (!hasApiKey()) {
    // API キー未設定でも画面確認できるよう、ローカルのフォールバックデータを返す。
    return fallbackVideos;
  }

  try {
    const videos = await searchYouTubeVideos("Webエンジニア 技術 動画", 6);
    return videos.length > 0 ? videos : fallbackVideos;
  } catch (error) {
    console.error("Failed to load home videos from YouTube API", error);
    return fallbackVideos;
  }
}

export async function searchVideos(params: { query?: string; category?: string }) {
  if (!hasApiKey()) {
    // 開発環境で API が未設定でも検索画面が壊れないよう、フォールバック側で絞り込む。
    return filterFallbackVideos(params);
  }

  const normalizedQuery = params.query?.trim() ?? "";
  const normalizedCategory = categories.find((item) => item.value === params.category)?.value;
  const categoryQuery = normalizedCategory ? categorySearchTerms[normalizedCategory] : "";
  const effectiveQuery = [normalizedQuery, categoryQuery].filter(Boolean).join(" ").trim();
  const searchQuery = effectiveQuery || "Webエンジニア 技術";
  try {
    return await searchYouTubeVideos(searchQuery, 12, normalizedCategory);
  } catch (error) {
    console.error("Failed to search YouTube videos", error);
    return filterFallbackVideos(params);
  }
}

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

export async function getRelatedVideos(video: Video) {
  if (!hasApiKey()) {
    return fallbackVideos.filter((candidate) => candidate.youtubeId !== video.youtubeId).slice(0, 3);
  }

  try {
    const searchResults = await searchYouTubeVideos(`${video.title} ${video.keywords[0] ?? ""}`, 8, video.category);
    return dedupeVideos(
      searchResults.filter((candidate) => candidate.youtubeId !== video.youtubeId),
    ).slice(0, 3);
  } catch (error) {
    console.error("Failed to load related videos", error);
    return fallbackVideos.filter((candidate) => candidate.youtubeId !== video.youtubeId).slice(0, 3);
  }
}

function guessCategory(title: string, description: string): VideoCategory {
  // YouTube にはカテゴリ情報が安定して入っていないため、文脈語から大まかに分類する。
  const combined = `${title} ${description}`.toLowerCase();

  if (/(next\.?js|react|typescript|frontend|ui)/i.test(combined)) return "frontend";
  if (/(node\.?js|api|database|auth|認証)/i.test(combined)) return "backend";
  if (/(ai|chatgpt|copilot|llm|prompt)/i.test(combined)) return "ai";
  if (/(docker|vercel|ci\/cd|deploy|kubernetes|cloud)/i.test(combined)) return "infra";
  if (/(eslint|prettier|github|vscode|tool)/i.test(combined)) return "tooling";
  return "career";
}

function filterFallbackVideos(params: { query?: string; category?: string }) {
  // フォールバック表示でも、検索 UX を本番と同じに近づけるために同じ条件で絞り込む。
  const normalizedQuery = params.query?.trim().toLowerCase() ?? "";
  const normalizedCategory = params.category?.trim() ?? "";

  return fallbackVideos.filter((video) => {
    const categoryMatch = normalizedCategory ? video.category === normalizedCategory : true;
    if (!categoryMatch) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

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
