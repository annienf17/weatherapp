import axios from "axios";
import { WeatherData, ForecastData } from "../types";

const API_KEY = "04c6c26f344681bc2d78062defe63d20";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const getWeather = async (city: string): Promise<WeatherData> => {
  const response = await axios.get(BASE_URL, {
    params: {
      q: city,
      units: "metric",
      appid: API_KEY,
    },
  });

  const weatherData: WeatherData = {
    ...response.data,
    date: new Date().toDateString(),
  };

  return weatherData;
};

export const getForecast = async (city: string): Promise<ForecastData[]> => {
  const response = await axios.get(FORECAST_URL, {
    params: {
      q: city,
      units: "metric",
      appid: API_KEY,
    },
  });

  const forecastData: ForecastData[] = response.data.list.map((item: any) => ({
    date: item.dt_txt,
    temp: item.main.temp,
    description: item.weather[0].description,
    humidity: item.main.humidity,
    pressure: item.main.pressure,
    windSpeed: item.wind.speed,
    windDirection: item.wind.deg,
    cloudiness: item.clouds.all,
    visibility: item.visibility,
    sunrise: new Date(item.sys.sunrise * 1000).toLocaleTimeString(),
    sunset: new Date(item.sys.sunset * 1000).toLocaleTimeString(),
  }));

  return forecastData;
};
