import Link from "next/link";
import { categories } from "@/lib/videos";

export function CategoryGrid() {
  return (
    <div className="grid-cards columns-3">
      {/* カテゴリの入口は検索条件のショートカットとしてリンク化する。 */}
      {categories.map((category) => (
        <Link
          key={category.value}
          href={`/search?category=${category.value}`}
          className="category-card"
        >
          <strong>{category.label}</strong>
          <span className="prose">{category.description}</span>
          <span className="pill" style={{ width: "fit-content" }}>
            このカテゴリで探す
          </span>
        </Link>
      ))}
    </div>
  );
}
