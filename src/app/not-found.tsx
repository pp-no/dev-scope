import Link from "next/link";

export default function NotFound() {
  return (
    <main className="surface">
      {/* 動画詳細の URL が存在しない場合は、ホームへ戻すだけのシンプルな画面にする。 */}
      <h1>ページが見つかりません</h1>
      <p className="prose">指定された動画は存在しないか、削除されています。</p>
      <Link href="/" className="button button-primary">
        ホームへ戻る
      </Link>
    </main>
  );
}
