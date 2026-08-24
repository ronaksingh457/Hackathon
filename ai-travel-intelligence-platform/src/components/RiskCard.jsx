import { ShieldCheck, ShieldAlert, ShieldX, Clock, ChevronRight } from "lucide-react";

const LEVEL_CONFIG = {
  LOW: { label: "LOW RISK", icon: ShieldCheck, className: "risk-low" },
  MODERATE: { label: "MODERATE RISK", icon: ShieldAlert, className: "risk-moderate" },
  HIGH: { label: "HIGH RISK", icon: ShieldX, className: "risk-high" },
};

export default function RiskCard({ assessment, onOpenDrawer }) {
  const config = LEVEL_CONFIG[assessment.level];
  const Icon = config.icon;

  return (
    <div className={`risk-card ${config.className}`}>
      <div className="risk-card-top">
        <div className="risk-badge">
          <Icon size={22} />
          <span>{config.label}</span>
        </div>
        <span className="risk-confidence">Confidence: {assessment.confidence}%</span>
      </div>

      <div className="risk-columns">
        <div className="risk-column">
          <h4>Positive Indicators</h4>
          <ul className="risk-list risk-list-positive">
            {assessment.positives.map((p, i) => (
              <li key={i}>✓ {p}</li>
            ))}
          </ul>
        </div>
        <div className="risk-column">
          <h4>Current Warnings</h4>
          {assessment.warnings.filter((w) => ["Traffic", "Crowds", "Community"].includes(w.category)).length === 0 ? (
            <p className="risk-no-warnings">No active minor warnings in demo data.</p>
          ) : (
            <ul className="risk-list risk-list-warning">
              {assessment.warnings
                .filter((w) => ["Traffic", "Crowds", "Community"].includes(w.category))
                .map((w, i) => (
                  <li key={i}>⚠ {w.text}</li>
                ))}
            </ul>
          )}
        </div>
      </div>

      <div className="risk-footer">
        <span className="risk-timestamp">
          <Clock size={13} /> Last analyzed: {assessment.analyzedAt.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
        </span>
        <button className="risk-drawer-btn" onClick={onOpenDrawer}>
          View Full Safety Intelligence <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
