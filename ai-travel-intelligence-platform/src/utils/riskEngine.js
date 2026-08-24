// Explainable, transparent risk engine for the prototype.
// This intentionally avoids opaque ML — every factor and its weight is visible.

const WEIGHTS = {
  governmentAlert: 40,
  severeWeather: 30,
  verifiedIncident: 25,
  traffic: 10,
  crowd: 8,
  communityReport: 5,
};

// weatherTone comes from utils/weatherCodes (storm/rain/snow considered "severe" contributors)
export function computeRiskAssessment({ demoSafety, weatherTone }) {
  const positives = [];
  const warnings = [];
  let score = 0; // lower is better (0 = no negative signals)

  // Government alerts
  if (demoSafety.governmentAlert) {
    score += WEIGHTS.governmentAlert;
    warnings.push({
      text: demoSafety.governmentAlert,
      weight: WEIGHTS.governmentAlert,
      category: "Government",
    });
  } else {
    positives.push("No major government alert in demo data");
  }

  // Weather severity
  const severeWeatherTones = ["storm", "snow"];
  if (severeWeatherTones.includes(weatherTone)) {
    score += WEIGHTS.severeWeather;
    warnings.push({
      text: "Severe weather conditions currently reported",
      weight: WEIGHTS.severeWeather,
      category: "Weather",
    });
  } else {
    positives.push("Normal weather conditions");
  }

  // Verified incidents
  if (demoSafety.verifiedIncident) {
    score += WEIGHTS.verifiedIncident;
    warnings.push({
      text: demoSafety.verifiedIncident,
      weight: WEIGHTS.verifiedIncident,
      category: "Incidents",
    });
  } else {
    positives.push("No significant recent incidents in demo data");
  }

  // Traffic
  if (demoSafety.traffic) {
    score += WEIGHTS.traffic;
    warnings.push({
      text: demoSafety.traffic,
      weight: WEIGHTS.traffic,
      category: "Traffic",
    });
  }

  // Crowd
  if (demoSafety.crowd) {
    score += WEIGHTS.crowd;
    warnings.push({
      text: demoSafety.crowd,
      weight: WEIGHTS.crowd,
      category: "Crowds",
    });
  }

  // Community reports
  if (demoSafety.communityReport) {
    score += WEIGHTS.communityReport;
    warnings.push({
      text: demoSafety.communityReport,
      weight: WEIGHTS.communityReport,
      category: "Community",
    });
  }

  let level = "LOW";
  if (score >= 45) level = "HIGH";
  else if (score >= 20) level = "MODERATE";

  // Confidence is higher when fewer conflicting/uncertain signals exist
  const confidence = Math.max(60, 96 - warnings.length * 6);

  return {
    level,
    score,
    confidence,
    positives,
    warnings,
    analyzedAt: new Date(),
  };
}

export const RISK_WEIGHTS_EXPLAINER = [
  { factor: "Government alerts", importance: "High", weight: WEIGHTS.governmentAlert },
  { factor: "Severe weather", importance: "High", weight: WEIGHTS.severeWeather },
  { factor: "Verified incidents", importance: "High", weight: WEIGHTS.verifiedIncident },
  { factor: "Traffic", importance: "Medium", weight: WEIGHTS.traffic },
  { factor: "Crowd reports", importance: "Medium", weight: WEIGHTS.crowd },
  { factor: "Community reports", importance: "Lower", weight: WEIGHTS.communityReport },
];
