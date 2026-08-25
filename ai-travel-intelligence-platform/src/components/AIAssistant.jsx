import { useState } from "react";
import { Sparkles, Send, Clock, MapPin, AlertTriangle, CheckCircle2 } from "lucide-react";
import { getWeatherInfo } from "../utils/weatherCodes";

const SUGGESTED = (cityName) => [
  `Is ${cityName} safe today?`,
  `What should I know before visiting the top attractions?`,
  `Find peaceful places under ₹500`,
  `What areas should I avoid during peak hours?`,
  `Plan a ₹4,000 day trip`,
  `What's happening in ${cityName} right now?`,
];

function extractBudget(text) {
  const match = text.match(/₹\s?([\d,]+)/) || text.match(/(\d{3,6})\s?(rs|rupees|inr)/i);
  if (!match) return null;
  return match[1].replace(/,/g, "");
}

function extractCompanions(text) {
  const lower = text.toLowerCase();
  if (lower.includes("parents")) return "2 adults + parents";
  if (lower.includes("family")) return "Family group";
  if (lower.includes("friends")) return "Friends group";
  if (lower.includes("solo")) return "Solo traveler";
  if (lower.includes("kids") || lower.includes("children")) return "Family with children";
  return "2 adults";
}

function generateResponse({ query, city, weather, assessment }) {
  const budget = extractBudget(query);
  const companions = extractCompanions(query);
  const weatherInfo = weather ? getWeatherInfo(weather.current.weather_code) : null;
  const topPlaces = city.places.slice(0, 3);
  const affordableFoods = city.foods;

  const warnings = assessment.warnings.filter((w) =>
    ["Traffic", "Crowds", "Community"].includes(w.category)
  );

  return {
    trip: companions,
    budget: budget ? `₹${Number(budget).toLocaleString("en-IN")}` : "Not specified",
    conditions: weather
      ? `${Math.round(weather.current.temperature_2m)}°C, ${weatherInfo.label}`
      : "Live weather unavailable",
    riskLevel: assessment.level,
    confidence: assessment.confidence,
    watchOuts: warnings.length ? warnings.map((w) => w.text) : ["No significant local warnings right now."],
    places: topPlaces,
    itinerary: [
      { part: "Morning", activity: topPlaces[0]?.name || "Explore key landmark" },
      { part: "Afternoon", activity: topPlaces[1]?.name || "Visit a heritage site" },
      { part: "Evening", activity: `Local market or ${topPlaces[2]?.name || "food street"}` },
    ],
    foodSuggestion: affordableFoods[0],
    tip: "Avoid congested routes around major attractions during peak hours (4 PM – 7 PM), and confirm prices before purchasing from unmetered vendors.",
  };
}

export default function AIAssistant({ city, weather, assessment }) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [thinking, setThinking] = useState(false);

  function handleAsk(text) {
    const q = text ?? query;
    if (!q.trim()) return;
    setThinking(true);
    setResponse(null);
    window.setTimeout(() => {
      setResponse(generateResponse({ query: q, city, weather, assessment }));
      setThinking(false);
    }, 550);
    setQuery(q);
  }

  return (
    <div className="ai-assistant assistant-panel">
      <div className="ai-assistant-heading">
        <span className="ai-badge"><Sparkles size={18} /></span>
        <div>
          <h3>SAARTHI</h3>
          <p>Your intelligent travel companion</p>
        </div>
      </div>

      <div className="assistant-panel-body">
        <form
          className="ai-input-row"
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk();
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask Saarthi anything about your trip..."
            aria-label="Ask Saarthi anything about your trip"
          />
          <button type="submit" aria-label="Send question to Saarthi">
            <Send size={16} />
          </button>
        </form>

        <div className="ai-suggestions">
          {SUGGESTED(city.name).map((s) => (
            <button key={s} className="ai-suggestion-chip" onClick={() => handleAsk(s)}>
              {s}
            </button>
          ))}
        </div>

        {thinking && (
          <div className="ai-thinking">
            <span className="spinner" /> Saarthi is preparing your destination briefing...
          </div>
        )}

        {response && !thinking && (
          <div className="ai-response">
            <div className="ai-response-grid">
              <div className="ai-response-block">
                <h5>Your Trip</h5>
                <p>{response.trip}</p>
              </div>
              <div className="ai-response-block">
                <h5>Budget</h5>
                <p>{response.budget}</p>
              </div>
              <div className="ai-response-block">
                <h5>Current Conditions</h5>
                <p>{response.conditions}</p>
                <span className={`ai-risk-pill ai-risk-${response.riskLevel.toLowerCase()}`}>
                  {response.riskLevel === "LOW" ? "🟢" : response.riskLevel === "MODERATE" ? "🟡" : "🔴"} {response.riskLevel} RISK
                </span>
              </div>
            </div>

            <div className="ai-response-section">
              <h5><AlertTriangle size={14} /> Things to Watch</h5>
              <ul>
                {response.watchOuts.map((w, i) => (
                  <li key={i}>⚠ {w}</li>
                ))}
              </ul>
            </div>

            <div className="ai-response-section">
              <h5><CheckCircle2 size={14} /> Recommended Places</h5>
              <ol>
                {response.places.map((p) => (
                  <li key={p.id}>{p.name} <span className="ai-place-loc"><MapPin size={11} /> {p.location}</span></li>
                ))}
              </ol>
            </div>

            <div className="ai-response-section">
              <h5><Clock size={14} /> Suggested Itinerary</h5>
              <div className="ai-itinerary">
                {response.itinerary.map((it) => (
                  <div key={it.part} className="ai-itinerary-item">
                    <span className="ai-itinerary-part">{it.part}</span>
                    <span>{it.activity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ai-response-section">
              <h5>Saarthi's Local Tip</h5>
              <p className="ai-local-tip">{response.tip}</p>
            </div>

            <p className="ai-response-footer">
              Generated by Saarthi from live weather + intelligence data · Not a substitute for official advisories
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
