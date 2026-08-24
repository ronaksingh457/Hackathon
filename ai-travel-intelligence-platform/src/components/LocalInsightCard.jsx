import { useState } from "react";
import * as Icons from "lucide-react";
import { MapPin, ThumbsUp, Flag } from "lucide-react";

export default function LocalInsightCard({ insight }) {
  const [confirmations, setConfirmations] = useState(insight.confirmations ?? null);
  const [confirmed, setConfirmed] = useState(false);
  const Icon = Icons[insight.icon] || Icons.Info;

  function handleConfirm() {
    if (confirmed) return;
    setConfirmations((c) => (c ?? 0) + 1);
    setConfirmed(true);
  }

  return (
    <article className="insight-card">
      <div className="insight-card-header">
        <span className="insight-icon"><Icon size={16} /></span>
        <h4>{insight.type}</h4>
      </div>
      <p className="insight-location"><MapPin size={13} /> {insight.location}</p>
      <p className="insight-text">{insight.text}</p>

      <div className="insight-footer">
        {insight.timeAgo && <span className="insight-time">{insight.timeAgo}</span>}
        {typeof confirmations === "number" && (
          <span className="insight-confirmations">{confirmations} confirmations</span>
        )}
        {insight.reliability && (
          <span className="insight-reliability">{insight.reliability}% reliability</span>
        )}
        {insight.tagLabel && <span className="insight-tag">{insight.tagLabel}</span>}
      </div>

      {typeof insight.confirmations === "number" && (
        <div className="insight-actions">
          <button className={`insight-btn ${confirmed ? "insight-btn-active" : ""}`} onClick={handleConfirm}>
            <ThumbsUp size={13} /> Confirm
          </button>
          <button className="insight-btn insight-btn-ghost">
            <Flag size={13} /> Report
          </button>
        </div>
      )}
    </article>
  );
}
