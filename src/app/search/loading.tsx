export default function SearchLoading() {
  return (
    <div className="search-layout">
      {/* ============= SIDEBAR ============= */}
      <aside className="sidebar">
        {[14, 10, 8, 12, 9, 11].map((w, i) => (
          <div key={i} className="sidebar__item">
            <span
              className="skeleton"
              style={{ width: `${w * 8}px`, height: 12, borderRadius: 4 }}
            />
          </div>
        ))}
      </aside>

      {/* ============= MAIN ============= */}
      <main style={{ padding: "24px 28px 60px" }}>
        {/* ヘッダー */}
        <div className="skeleton" style={{ width: 100, height: 11, marginBottom: 14 }} />
        <div className="skeleton" style={{ width: 240, height: 24, marginBottom: 10 }} />
        <div className="skeleton" style={{ width: 60, height: 11, marginBottom: 28 }} />

        {/* カードグリッド */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 18,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--r-lg)",
                overflow: "hidden",
              }}
            >
              <div className="skeleton" style={{ height: 140, borderRadius: 0 }} />
              <div
                style={{
                  padding: "14px 14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div className="skeleton" style={{ height: 11, width: "50%" }} />
                <div className="skeleton" style={{ height: 14, width: "90%" }} />
                <div className="skeleton" style={{ height: 14, width: "75%" }} />
                <div className="skeleton" style={{ height: 11, width: "60%", marginTop: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
