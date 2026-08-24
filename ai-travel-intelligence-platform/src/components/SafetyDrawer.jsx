import { X, Landmark, CloudSun, AlertTriangle, TrafficCone, Users, ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";
import EvidenceCard from "./EvidenceCard";
import ReliabilityBadge from "./ReliabilityBadge";
import SourceBadge from "./SourceBadge";
import { RISK_WEIGHTS_EXPLAINER } from "../utils/riskEngine";

const LEVEL_CONFIG = {
  LOW: { label: "LOW RISK", icon: ShieldCheck, className: "risk-low" },
  MODERATE: { label: "MODERATE RISK", icon: ShieldAlert, className: "risk-moderate" },
  HIGH: { label: "HIGH RISK", icon: ShieldX, className: "risk-high" },
};

export default function SafetyDrawer({ city, assessment, demoSafety, onClose }) {
  const config = LEVEL_CONFIG[assessment.level];
  const Icon = config.icon;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="drawer-header">
          <div>
            <p className="drawer-eyebrow">{city.name} — Live Safety Intelligence</p>
            <div className={`risk-badge risk-badge-inline ${config.className}`}>
              <Icon size={20} />
              <span>{config.label}</span>
            </div>
            <p className="drawer-confidence">Confidence: {assessment.confidence}%</p>
          </div>
          <button className="header-icon-btn" onClick={onClose} aria-label="Close safety intelligence">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          <section className="drawer-section">
            <h4>Evidence Breakdown</h4>
            <div className="evidence-grid">
              <EvidenceCard
                icon={Landmark}
                category="Government"
                positive={!demoSafety.governmentAlert}
                statusText={demoSafety.governmentAlert || "No active major tourist advisory"}
              />
              <EvidenceCard
                icon={CloudSun}
                category="Weather"
                positive={true}
                statusText="No severe weather warning"
              />
              <EvidenceCard
                icon={AlertTriangle}
                category="Recent Incidents"
                positive={!demoSafety.verifiedIncident}
                statusText={demoSafety.verifiedIncident || "No major incident detected in demo data"}
              />
              <EvidenceCard
                icon={TrafficCone}
                category="Traffic"
                positive={!demoSafety.traffic}
                statusText={demoSafety.traffic || "Traffic flow normal"}
              />
              <EvidenceCard
                icon={Users}
                category="Crowds"
                positive={!demoSafety.crowd}
                statusText={demoSafety.crowd || "No unusual crowd density reported"}
              />
            </div>
          </section>

          <section className="drawer-section">
            <h4>Explainable Risk Weighting</h4>
            <p className="drawer-note">
              This prototype uses a transparent rules-based engine — every factor and its relative importance is visible below (no black-box ML).
            </p>
            <table className="weight-table">
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>Importance</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                {RISK_WEIGHTS_EXPLAINER.map((w) => (
                  <tr key={w.factor}>
                    <td>{w.factor}</td>
                    <td><span className={`importance-pill importance-${w.importance.toLowerCase()}`}>{w.importance}</span></td>
                    <td>{w.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="drawer-section">
            <h4>Sources & Reliability</h4>
            <div className="source-reliability-list">
              <div className="source-reliability-item">
                <div>
                  <p className="sr-title">Weather</p>
                  <SourceBadge source="Open-Meteo" timestamp="Updated 5 min ago" />
                </div>
                <ReliabilityBadge level="VERIFIED" />
              </div>
              <div className="source-reliability-item">
                <div>
                  <p className="sr-title">Traffic</p>
                  <SourceBadge source="Community Report" timestamp="Updated 18 min ago" demo />
                </div>
                <ReliabilityBadge level="COMMUNITY" />
              </div>
              <div className="source-reliability-item">
                <div>
                  <p className="sr-title">Government</p>
                  <SourceBadge source="Official Source" timestamp="Updated 25 min ago" demo />
                </div>
                <ReliabilityBadge level="VERIFIED" />
              </div>
              <div className="source-reliability-item">
                <div>
                  <p className="sr-title">Crowd Density</p>
                  <SourceBadge source="Multiple Local Reports" timestamp="Updated 10 min ago" demo />
                </div>
                <ReliabilityBadge level="CONFIRMED" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
