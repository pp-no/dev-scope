import { NextResponse } from "next/server";
import { categories, getHomeVideos, searchVideos } from "@/lib/videos";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const category = url.searchParams.get("category") ?? "";
  const videos = q || category ? await searchVideos({ query: q, category }) : await getHomeVideos();

  return NextResponse.json({
    categories,
    videos,
  });
}
