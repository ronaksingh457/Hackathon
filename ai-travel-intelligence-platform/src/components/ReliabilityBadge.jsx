import { ShieldCheck, BadgeCheck, Users, ShieldAlert } from "lucide-react";

const CONFIG = {
  VERIFIED: { label: "VERIFIED", icon: ShieldCheck, className: "reliability-verified" },
  CONFIRMED: { label: "CONFIRMED", icon: BadgeCheck, className: "reliability-confirmed" },
  COMMUNITY: { label: "COMMUNITY REPORT", icon: Users, className: "reliability-community" },
  UNVERIFIED: { label: "UNVERIFIED", icon: ShieldAlert, className: "reliability-unverified" },
};

export default function ReliabilityBadge({ level = "COMMUNITY", size = "sm" }) {
  const config = CONFIG[level] || CONFIG.COMMUNITY;
  const Icon = config.icon;
  return (
    <span className={`reliability-badge ${config.className} ${size === "lg" ? "reliability-lg" : ""}`}>
      <Icon size={size === "lg" ? 14 : 12} strokeWidth={2.4} />
      {config.label}
    </span>
  );
}
