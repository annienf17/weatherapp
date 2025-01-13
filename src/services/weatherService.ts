import axios from "axios";
import { WeatherData, ForecastData } from "../types";

const API_KEY = "04c6c26f344681bc2d78062defe63d20";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeather = async (city: string): Promise<WeatherData> => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      units: "metric",
      appid: API_KEY,
    },
  });
  return {
    ...response.data,
    date: new Date().toDateString(),
  };
};

export const getForecast = async (
  lat: number,
  lon: number
): Promise<ForecastData> => {
  const response = await axios.get(`${BASE_URL}/onecall`, {
    params: {
      lat,
      lon,
      exclude: "current,minutely,hourly,alerts",
      units: "metric",
      appid: API_KEY,
    },
  });
  return response.data;
};
