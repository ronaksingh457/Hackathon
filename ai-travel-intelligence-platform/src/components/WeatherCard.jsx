import * as Icons from "lucide-react";
import { Droplets, Wind, CloudRain, Cloud as CloudIcon } from "lucide-react";
import { getWeatherInfo } from "../utils/weatherCodes";
import { CardSkeleton } from "./LoadingState";

export default function WeatherCard({ weather, error }) {
  if (error) {
    return (
      <div className="panel-card weather-card weather-card-error">
        <h3>Current Weather</h3>
        <p className="weather-error-text">Live weather temporarily unavailable. Showing other destination intelligence instead.</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="panel-card weather-card">
        <CardSkeleton lines={4} />
      </div>
    );
  }

  const current = weather.current;
  const info = getWeatherInfo(current.weather_code);
  const Icon = Icons[info.icon] || Icons.Cloud;

  return (
    <div className="panel-card weather-card">
      <h3>Current Weather</h3>
      <div className="weather-main-row">
        <Icon size={44} className={`weather-tone-${info.tone}`} />
        <div>
          <div className="weather-temp">{Math.round(current.temperature_2m)}°C</div>
          <div className="weather-condition">{info.label}</div>
        </div>
      </div>
      <p className="weather-feels-like">Feels like {Math.round(current.apparent_temperature)}°C</p>

      <div className="weather-grid">
        <div className="weather-grid-item">
          <Droplets size={16} />
          <span className="weather-grid-label">Humidity</span>
          <span className="weather-grid-value">{current.relative_humidity_2m}%</span>
        </div>
        <div className="weather-grid-item">
          <Wind size={16} />
          <span className="weather-grid-label">Wind</span>
          <span className="weather-grid-value">{Math.round(current.wind_speed_10m)} km/h</span>
        </div>
        <div className="weather-grid-item">
          <CloudRain size={16} />
          <span className="weather-grid-label">Precipitation</span>
          <span className="weather-grid-value">{current.precipitation} mm</span>
        </div>
        <div className="weather-grid-item">
          <CloudIcon size={16} />
          <span className="weather-grid-label">Cloud Cover</span>
          <span className="weather-grid-value">{current.cloud_cover}%</span>
        </div>
      </div>
      <p className="weather-source">Source: Open-Meteo · Live data</p>
    </div>
  );
}
