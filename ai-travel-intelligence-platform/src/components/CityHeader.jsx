import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Bookmark, MapPin } from "lucide-react";
import * as Icons from "lucide-react";
import { getWeatherInfo } from "../utils/weatherCodes";
import { Skeleton } from "./LoadingState";

export default function CityHeader({ city, weather, timeInfo, weatherError }) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const weatherInfo = weather ? getWeatherInfo(weather.current?.weather_code) : null;
  const WeatherIcon = weatherInfo ? Icons[weatherInfo.icon] || Icons.Cloud : null;

  return (
    <div className="city-header">
      <img src={city.image} alt={`${city.name} skyline`} className="city-header-bg" loading="eager" />
      <div className="city-header-overlay" />

      <div className="city-header-topbar">
        <button className="header-icon-btn" onClick={() => navigate("/")} aria-label="Back to home">
          <ArrowLeft size={18} />
        </button>
        <button
          className={`header-icon-btn ${saved ? "header-icon-btn-active" : ""}`}
          onClick={() => setSaved((s) => !s)}
          aria-label="Save destination"
          aria-pressed={saved}
        >
          <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="city-header-content">
        <h1>{city.name.toUpperCase()}</h1>
        <p className="city-header-sub">
          <MapPin size={15} /> {city.state}, {city.country}
        </p>

        <div className="city-header-stats">
          {weatherError ? (
            <div className="header-stat header-stat-error">Live weather temporarily unavailable</div>
          ) : weather ? (
            <>
              <div className="header-stat">
                {WeatherIcon && <WeatherIcon size={22} />}
                <div>
                  <span className="header-stat-value">{Math.round(weather.current.temperature_2m)}°C</span>
                  <span className="header-stat-label">{weatherInfo.label}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="header-stat">
              <Skeleton width="80px" height="30px" />
            </div>
          )}

          <div className="header-stat-divider" />

          {timeInfo ? (
            <div className="header-stat">
              <div>
                <span className="header-stat-value">{timeInfo.timeString}</span>
                <span className="header-stat-label">{timeInfo.dateString}</span>
              </div>
            </div>
          ) : (
            <Skeleton width="120px" height="30px" />
          )}

          <div className="header-stat-divider" />

          <div className="header-stat">
            <div>
              <span className="header-stat-value">{timeInfo?.timezone || "—"}</span>
              <span className="header-stat-label">Timezone</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
