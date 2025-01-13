import axios from "axios";
import { WeatherData } from "../types";

const API_KEY = "04c6c26f344681bc2d78062defe63d20";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeather = async (city: string): Promise<WeatherData> => {
  const response = await axios.get(BASE_URL, {
    params: {
      q: city,
      units: "metric",
      appid: API_KEY,
    },
  });

  // Dodaj pole date do zwracanych danych, bez czasu
  const weatherData: WeatherData = {
    ...response.data,
    date: new Date().toDateString(),
  };

  return weatherData;
};
