// Open-Meteo WMO Weather interpretation codes
// https://open-meteo.com/en/docs

export const weatherCodeMap = {
  0: { label: "Clear Sky", icon: "Sun", tone: "clear" },
  1: { label: "Mainly Clear", icon: "Sun", tone: "clear" },
  2: { label: "Partly Cloudy", icon: "CloudSun", tone: "cloudy" },
  3: { label: "Overcast", icon: "Cloud", tone: "cloudy" },
  45: { label: "Fog", icon: "CloudFog", tone: "fog" },
  48: { label: "Depositing Rime Fog", icon: "CloudFog", tone: "fog" },
  51: { label: "Light Drizzle", icon: "CloudDrizzle", tone: "rain" },
  53: { label: "Moderate Drizzle", icon: "CloudDrizzle", tone: "rain" },
  55: { label: "Dense Drizzle", icon: "CloudDrizzle", tone: "rain" },
  56: { label: "Light Freezing Drizzle", icon: "CloudDrizzle", tone: "rain" },
  57: { label: "Dense Freezing Drizzle", icon: "CloudDrizzle", tone: "rain" },
  61: { label: "Slight Rain", icon: "CloudRain", tone: "rain" },
  63: { label: "Moderate Rain", icon: "CloudRain", tone: "rain" },
  65: { label: "Heavy Rain", icon: "CloudRain", tone: "rain" },
  66: { label: "Light Freezing Rain", icon: "CloudRain", tone: "rain" },
  67: { label: "Heavy Freezing Rain", icon: "CloudRain", tone: "rain" },
  71: { label: "Slight Snow Fall", icon: "Snowflake", tone: "snow" },
  73: { label: "Moderate Snow Fall", icon: "Snowflake", tone: "snow" },
  75: { label: "Heavy Snow Fall", icon: "Snowflake", tone: "snow" },
  77: { label: "Snow Grains", icon: "Snowflake", tone: "snow" },
  80: { label: "Slight Rain Showers", icon: "CloudRainWind", tone: "rain" },
  81: { label: "Moderate Rain Showers", icon: "CloudRainWind", tone: "rain" },
  82: { label: "Violent Rain Showers", icon: "CloudRainWind", tone: "rain" },
  85: { label: "Slight Snow Showers", icon: "Snowflake", tone: "snow" },
  86: { label: "Heavy Snow Showers", icon: "Snowflake", tone: "snow" },
  95: { label: "Thunderstorm", icon: "CloudLightning", tone: "storm" },
  96: { label: "Thunderstorm, Slight Hail", icon: "CloudLightning", tone: "storm" },
  99: { label: "Thunderstorm, Heavy Hail", icon: "CloudLightning", tone: "storm" },
};

export function getWeatherInfo(code) {
  return weatherCodeMap[code] || { label: "Unknown", icon: "CloudQuestion", tone: "cloudy" };
}
