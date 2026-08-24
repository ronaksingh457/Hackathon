export function Skeleton({ width = "100%", height = "16px", radius = "6px", style }) {
  return (
    <span
      className="skeleton"
      style={{ width, height, borderRadius: radius, ...style }}
    />
  );
}

export function LoadingState({ label = "Loading destination intelligence..." }) {
  return (
    <div className="loading-inline">
      <span className="spinner" />
      <span>{label}</span>
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <div className="header-skeleton">
      <Skeleton width="220px" height="42px" />
      <Skeleton width="160px" height="18px" style={{ marginTop: 10 }} />
      <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
        <Skeleton width="120px" height="60px" radius="12px" />
        <Skeleton width="120px" height="60px" radius="12px" />
        <Skeleton width="120px" height="60px" radius="12px" />
      </div>
    </div>
  );
}

export function CardSkeleton({ lines = 3 }) {
  return (
    <div className="card-skeleton">
      <Skeleton width="60%" height="18px" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} width={i === lines - 1 ? "40%" : "90%"} height="12px" style={{ marginTop: 10 }} />
      ))}
    </div>
  );
}
