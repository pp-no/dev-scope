import Link from "next/link";
import { categories } from "@/lib/videos";

const categoryIcons: Record<string, { path: string; color: string }> = {
  frontend: {
    color: "var(--c-frontend)",
    path: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 18l9 5 9-5",
  },
  backend: {
    color: "var(--c-backend)",
    path: "M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h4",
  },
  ai: {
    color: "var(--c-ai)",
    path: "M12 3l1.8 4.4L18 9l-4.2 1.6L12 15l-1.8-4.4L6 9l4.2-1.6zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z",
  },
  infra: {
    color: "var(--c-infra)",
    path: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM3 12h18M12 3a14 14 0 0 1 0 18A14 14 0 0 1 12 3z",
  },
  tooling: {
    color: "var(--c-tools)",
    path: "M9 6a2 2 0 1 0-2 2h10a2 2 0 1 0-2-2v10a2 2 0 1 0 2-2H7a2 2 0 1 0 2 2z",
  },
  career: {
    color: "var(--c-career)",
    path: "M3 17l6-6 4 4 8-8M21 7v6h-6",
  },
};

export function CategoryGrid() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14 }}>
      {categories.map((cat) => {
        const icon = categoryIcons[cat.value];
        return (
          <Link
            key={cat.value}
            href={`/search?category=${cat.value}`}
            className="cat-card"
          >
            <div className="cat-card__icon" style={{ color: icon?.color }}>
              <svg
                width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor"
                strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d={icon?.path ?? ""} />
              </svg>
            </div>
            <div>
              <div className="cat-card__name">{cat.label}</div>
              <div className="cat-card__desc">{cat.description}</div>
            </div>
            <div className="cat-card__glow" style={{ background: icon?.color }} />
          </Link>
        );
      })}
    </div>
  );
}
