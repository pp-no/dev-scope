import { NextResponse } from "next/server";
import { categories, getHomeVideos, searchVideos } from "@/lib/videos";

export async function GET(request: Request) {
  // クエリが来たら検索、なければトップ向けの注目動画を返す。
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const category = url.searchParams.get("category") ?? "";
  const videos = q || category ? await searchVideos({ query: q, category }) : await getHomeVideos();

  return NextResponse.json({
    categories,
    videos,
  });
}
