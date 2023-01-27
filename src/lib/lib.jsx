// ?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation,rain,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum&current_weather=true&timeformat=unixtime&timezone=Europe%2FBerlin

import axios from "axios";

export function getWeather(lat, lon, timezone) {
  return axios
    .get(
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation,rain,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum&current_weather=true&timeformat=unixtime&timezone=Europe%2FBerlin",
      { params: { latitude: lat, longitude: lon, timezone } }
    )
    .then(({ data }) => {
      return {
        current: parseCurrentWeather(data),
        daily: parseDailyWeather(data),
        hourly: parseHourlyWeather(data),
      };
    });
}

function parseCurrentWeather({ current_weather, daily }) {
  const { temperature: currentTemp, windspeed: windSpeed, weathercode: iconCode } = current_weather;

  const {
    temperature_2m_max: [maxTemp],
    temperature_2m_min: [minTemp],
    precipitation_sum: [precip],
    rain_sum: [rain],
  } = daily;

  return {
    currentTemp: Math.round(currentTemp),
    highTemp: Math.round(maxTemp),
    lowTemp: Math.round(minTemp),
    windSpeed: Math.round(windSpeed),
    precip: Math.round(precip * 100) / 100,
    rain: Math.round(rain * 100) / 100,
    iconCode,
  };
}
function parseDailyWeather({ daily }) {
  return daily.time.map((time, index) => {
    return {
      timestamp: time * 1000,
      iconCode: daily.weathercode[index],
      maxTemp: Math.round(daily.temperature_2m_max[index]),
    };
  });
}

function parseHourlyWeather({ hourly, current_weather }) {
  return hourly.time
    .map((time, index) => {
      return {
        timestamp: time * 1000,
        iconCode: hourly.weathercode[index],
        temp: Math.round(hourly.temperature_2m[index]),
        windSpeed: Math.round(hourly.windspeed_10m[index]),
        precip: Math.round(hourly.precipitation[index] * 100) / 100,
        rain: Math.round(hourly.rain[index] * 100) / 100,
      };
    })
    .filter(({ timestamp }) => timestamp > current_weather.time * 1000);
}

export function dayFormatter(timestamp) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(timestamp);
}

export function iconFormatter(iconCode) {
  switch (iconCode) {
    case 0 || 1:
      return "sun";
    case 2:
      return "cloud-sun";
    case 3:
      return "cloud";
    case 45 || 48:
      return "smog";
    case 51 || 53 || 55:
      return "cloud-showers-heavy";
    case 71 || 73 || 75:
      return "snowflake";
    case 95 || 96 || 99:
      return "cloudbolt";
    default:
      return "sun";
  }
}

export function hourFormatter(timestamp) {
  return new Intl.DateTimeFormat("en-US", { hour: "numeric" }).format(timestamp);
}
