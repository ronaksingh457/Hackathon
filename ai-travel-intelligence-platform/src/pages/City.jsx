import { useEffect, useState, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  MapPin, UtensilsCrossed, Gem, CalendarClock, ShieldCheck, Landmark, ThermometerSun,
} from "lucide-react";
import Navbar from "../components/Navbar";
import CityHeader from "../components/CityHeader";
import WeatherCard from "../components/WeatherCard";
import TimeCard from "../components/TimeCard";
import RiskCard from "../components/RiskCard";
import SafetyDrawer from "../components/SafetyDrawer";
import PlaceCard from "../components/PlaceCard";
import FoodCard from "../components/FoodCard";
import EventCard from "../components/EventCard";
import LocalInsightCard from "../components/LocalInsightCard";
import IntelligenceMap from "../components/IntelligenceMap";
import AIAssistant from "../components/AIAssistant";
import { LoadingState } from "../components/LoadingState";
import { getCityBySlug, supportedCities } from "../data/cities";
import { searchCity } from "../services/geocodingApi";
import { getWeather } from "../services/weatherApi";
import { getZonedParts } from "../utils/time";
import { getWeatherInfo } from "../utils/weatherCodes";
import { computeRiskAssessment } from "../utils/riskEngine";

export default function City() {
  const { cityName } = useParams();
  const city = getCityBySlug(cityName?.toLowerCase());

  const [geo, setGeo] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(false);
  const [timeInfo, setTimeInfo] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!city) return;
    let cancelled = false;
    setGeo(null);
    setWeather(null);
    setWeatherError(false);
    setTimeInfo(null);

    async function load() {
      try {
        const result = await searchCity(city.name);
        const resolved = result || {
          latitude: city.coordinatesFallback.latitude,
          longitude: city.coordinatesFallback.longitude,
          timezone: city.coordinatesFallback.timezone,
          country: city.country,
          admin1: city.state,
        };
        if (cancelled) return;
        setGeo(resolved);

        try {
          const weatherData = await getWeather(resolved.latitude, resolved.longitude, resolved.timezone);
          if (!cancelled) setWeather(weatherData);
        } catch (err) {
          if (!cancelled) setWeatherError(true);
        }
      } catch (err) {
        // Geocoding failed entirely — fall back to static coordinates so time still works
        if (cancelled) return;
        setGeo({
          latitude: city.coordinatesFallback.latitude,
          longitude: city.coordinatesFallback.longitude,
          timezone: city.coordinatesFallback.timezone,
        });
        setWeatherError(true);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [city]);

  useEffect(() => {
    if (!geo?.timezone) return;
    setTimeInfo(getZonedParts(geo.timezone));
    const interval = setInterval(() => {
      setTimeInfo(getZonedParts(geo.timezone));
    }, 1000);
    return () => clearInterval(interval);
  }, [geo]);

  const weatherTone = useMemo(() => {
    if (!weather) return null;
    return getWeatherInfo(weather.current.weather_code).tone;
  }, [weather]);

  const assessment = useMemo(() => {
    if (!city) return null;
    return computeRiskAssessment({ demoSafety: city.demoSafety, weatherTone });
  }, [city, weatherTone]);

  const mapMarkers = useMemo(() => {
    if (!city || !geo) return [];
    const baseLat = geo.latitude;
    const baseLng = geo.longitude;
    const jitter = (i) => (i % 2 === 0 ? 0.01 : -0.01) * (i + 1) * 0.4;
    const markers = [
      ...city.places.map((p, i) => ({
        id: p.id,
        lat: baseLat + jitter(i),
        lng: baseLng + jitter(i + 1),
        type: "attraction",
        title: p.name,
        description: p.description,
      })),
      {
        id: "safety-1",
        lat: baseLat + 0.015,
        lng: baseLng - 0.015,
        type: "safety",
        title: "Safety Alert",
        description: city.demoSafety.traffic || city.demoSafety.crowd || "No active alerts",
      },
      ...city.events.slice(0, 2).map((e, i) => ({
        id: e.id,
        lat: baseLat - 0.02 * (i + 1),
        lng: baseLng + 0.02 * (i + 1),
        type: "event",
        title: e.title,
        description: `${e.date} · ${e.location}`,
      })),
      ...city.localInsights.slice(0, 2).map((r, i) => ({
        id: r.id,
        lat: baseLat + 0.025 * (i + 1),
        lng: baseLng + 0.008 * (i + 1),
        type: "report",
        title: r.type,
        description: r.text,
      })),
    ];
    return markers;
  }, [city, geo]);

  if (!city) {
    return (
      <div className="page">
        <Navbar />
        <div className="not-found">
          <h2>City not found</h2>
          <p>We currently support these destinations:</p>
          <div className="not-found-list">
            {supportedCities.map((c) => (
              <Link key={c.slug} to={`/city/${c.slug}`} className="not-found-chip">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page city-page">
      <Navbar />

      <CityHeader city={city} weather={weather} timeInfo={timeInfo} weatherError={weatherError} />

      {!weather && !weatherError && (
        <div className="page-loading-banner">
          <LoadingState />
        </div>
      )}

      <div className="city-content">
        <div className="city-layout-grid">
          {/* Main Content (Left Column) */}
          <main className="city-main-content">
            {/* Overview Cards */}
            <section className="overview-grid">
              <div className="overview-card">
                <ThermometerSun size={18} />
                <span className="overview-value">{weather ? `${Math.round(weather.current.temperature_2m)}°C` : "—"}</span>
                <span className="overview-label">{weather ? getWeatherInfo(weather.current.weather_code).label : "Weather"}</span>
              </div>
              <div className="overview-card">
                <CalendarClock size={18} />
                <span className="overview-value">{timeInfo ? timeInfo.timeString : "—"}</span>
                <span className="overview-label">Local Time</span>
              </div>
              <div className="overview-card">
                <Landmark size={18} />
                <span className="overview-value">{city.events.length} updates</span>
                <span className="overview-label">Local Updates</span>
              </div>
              <div className="overview-card">
                <ShieldCheck size={18} />
                <span className="overview-value">{city.localInsights.length * 8} reports</span>
                <span className="overview-label">Local Intelligence</span>
              </div>
              <div className="overview-card">
                <MapPin size={18} />
                <span className="overview-value">{(city.places.length + city.hiddenGems.length) * 8} places</span>
                <span className="overview-label">Places</span>
              </div>
              <div className="overview-card">
                <UtensilsCrossed size={18} />
                <span className="overview-value">{city.events.length} upcoming</span>
                <span className="overview-label">Events</span>
              </div>
            </section>

            {/* Weather + Time */}
            <section className="two-col-grid">
              <WeatherCard weather={weather} error={weatherError} />
              <TimeCard timeInfo={timeInfo} />
            </section>

            {/* Safety Intelligence */}
            <section className="section-block">
              <div className="section-heading">
                <h2>Current Destination Intelligence</h2>
                <p>Why this destination is currently assessed the way it is — fully explainable.</p>
              </div>
              {assessment && (
                <RiskCard assessment={assessment} onOpenDrawer={() => setDrawerOpen(true)} />
              )}
            </section>

            {/* Popular Places */}
            <section className="section-block">
              <div className="section-heading">
                <h2>Popular Places</h2>
                <p>Well-known attractions worth prioritising in {city.name}.</p>
              </div>
              <div className="card-grid card-grid-3">
                {city.places.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            </section>

            {/* Hidden Gems */}
            <section className="section-block">
              <div className="section-heading">
                <h2><Gem size={20} /> Hidden Gems</h2>
                <p>Lesser-known spots recommended by local contributors.</p>
              </div>
              <div className="card-grid card-grid-2">
                {city.hiddenGems.map((gem) => (
                  <article className="hidden-gem-card" key={gem.id}>
                    <img src={gem.image} alt={gem.name} loading="lazy" />
                    <div>
                      <span className="hidden-gem-tag">{gem.tag}</span>
                      <h4>{gem.name}</h4>
                      <p>{gem.description}</p>
                      <span className="hidden-gem-location"><MapPin size={13} /> {gem.location}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Local Food */}
            <section className="section-block">
              <div className="section-heading">
                <h2>Local Food</h2>
                <p>Authentic dishes and where locals actually go for them.</p>
              </div>
              <div className="card-grid card-grid-3">
                {city.foods.map((food) => (
                  <FoodCard key={food.id} food={food} />
                ))}
              </div>
            </section>

            {/* Events & Updates */}
            <section className="section-block">
              <div className="section-heading">
                <h2>Events &amp; Current Updates</h2>
                <p>Demo data unless connected to a live events API.</p>
              </div>
              <div className="card-grid card-grid-3">
                {city.events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>

            {/* Local Intelligence */}
            <section className="section-block">
              <div className="section-heading">
                <h2>Local Intelligence</h2>
                <p>Structured, verifiable local reports — not a social feed.</p>
              </div>
              <div className="card-grid card-grid-3">
                {city.localInsights.map((insight) => (
                  <LocalInsightCard key={insight.id} insight={insight} />
                ))}
              </div>
            </section>

            {/* Map */}
            <section className="section-block">
              <div className="section-heading">
                <h2>Destination Map</h2>
                <p>Attractions, safety alerts, events and local reports plotted together.</p>
              </div>
              <IntelligenceMap city={city} markers={mapMarkers} />
            </section>
          </main>

          {/* Persistent Sticky Copilot Sidebar (Right Column) */}
          <aside className="city-sidebar">
            <div className="city-sidebar-sticky">
              {assessment && <AIAssistant city={city} weather={weather} assessment={assessment} />}
            </div>
          </aside>
        </div>
      </div>

      {drawerOpen && assessment && (
        <SafetyDrawer
          city={city}
          assessment={assessment}
          demoSafety={city.demoSafety}
          onClose={() => setDrawerOpen(false)}
        />
      )}

      <footer className="site-footer">
        <p>SAARTHI — Local Intelligence · Built for Smart India Hackathon</p>
      </footer>
    </div>
  );
}

