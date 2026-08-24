export default function EvidenceCard({ category, statusText, positive, icon: Icon }) {
  return (
    <div className={`evidence-card ${positive ? "evidence-positive" : "evidence-warning"}`}>
      <div className="evidence-icon">{Icon && <Icon size={16} />}</div>
      <div>
        <p className="evidence-category">{category}</p>
        <p className="evidence-status">{positive ? "✓" : "⚠"} {statusText}</p>
      </div>
    </div>
  );
}
