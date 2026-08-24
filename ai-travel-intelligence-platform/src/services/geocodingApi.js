const GEOCODING_BASE = "https://geocoding-api.open-meteo.com/v1/search";

// Simple in-memory cache to avoid re-fetching geocoding data for the same city
const geoCache = new Map();

export async function searchCity(cityName, countryCode = "IN") {
  const cacheKey = `${cityName}-${countryCode}`;
  if (geoCache.has(cacheKey)) {
    return geoCache.get(cacheKey);
  }

  const url = new URL(GEOCODING_BASE);
  url.searchParams.set("name", cityName);
  url.searchParams.set("count", "5");
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");
  if (countryCode) url.searchParams.set("countryCode", countryCode);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Geocoding request failed: ${response.status}`);
  }
  const data = await response.json();
  const result = data?.results?.[0] || null;
  geoCache.set(cacheKey, result);
  return result;
}
