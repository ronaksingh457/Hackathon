const FORECAST_BASE = "https://api.open-meteo.com/v1/forecast";

// Cache weather results for a short period to avoid redundant network calls
const weatherCache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function getWeather(latitude, longitude, timezone) {
  const cacheKey = `${latitude.toFixed(2)},${longitude.toFixed(2)}`;
  const cached = weatherCache.get(cacheKey);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.data;
  }

  const url = new URL(FORECAST_BASE);
  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);
  url.searchParams.set(
    "current",
    [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "precipitation",
      "rain",
      "showers",
      "weather_code",
      "cloud_cover",
      "wind_speed_10m",
    ].join(",")
  );
  url.searchParams.set("timezone", timezone || "auto");
  url.searchParams.set("temperature_unit", "celsius");
  url.searchParams.set("wind_speed_unit", "kmh");
  url.searchParams.set("precipitation_unit", "mm");

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Weather request failed: ${response.status}`);
  }
  const data = await response.json();

  weatherCache.set(cacheKey, { data, fetchedAt: Date.now() });
  return data;
}
