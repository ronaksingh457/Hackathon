import { Clock } from "lucide-react";

export default function SourceBadge({ source, timestamp, demo }) {
  return (
    <div className="source-badge">
      <span className="source-badge-name">{source}</span>
      <span className="source-badge-dot">•</span>
      <span className="source-badge-time">
        <Clock size={11} /> {timestamp}
      </span>
      {demo && <span className="demo-tag">DEMO DATA</span>}
    </div>
  );
}
