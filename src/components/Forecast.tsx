import React, { useState } from "react";
import { getForecast } from "../services/weatherService";
import { ForecastData } from "../types";

const Forecast: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [forecast, setForecast] = useState<ForecastData[]>([]);

  const fetchForecast = async () => {
    const data = await getForecast(city);
    setForecast(data);
  };

  return (
    <div>
      <h2>Weather Forecast</h2>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchForecast}>Get Forecast</button>
      <ul>
        {forecast.map((item, index) => (
          <li key={index}>
            <p>Date: {item.date}</p>
            <p>Temperature: {item.temp}°C</p>
            <p>Conditions: {item.description}</p>
            <p>Humidity: {item.humidity}%</p>
            <p>Pressure: {item.pressure} hPa</p>
            <p>Wind Speed: {item.windSpeed} m/s</p>
            <p>Wind Direction: {item.windDirection}°</p>
            <p>Cloudiness: {item.cloudiness}%</p>
            <p>Visibility: {item.visibility} m</p>
            <p>Sunrise: {item.sunrise}</p>
            <p>Sunset: {item.sunset}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forecast;
