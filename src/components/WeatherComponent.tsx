import React, { useState, useEffect } from "react";
import { getWeather } from "../services/weatherService";
import styles from "../styles/WeatherComponent.module.css";
import { WeatherData } from "../types";

const WeatherComponent: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getWeather("London")
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>Błąd: {error}</div>;

  return (
    <div className={styles.weather}>
      <h1>Weather in {weather?.name}</h1>
      <p>Temperature: {weather?.main.temp}°C</p>
      <p>Conditions: {weather?.weather[0].description}</p>
      <p>Humidity: {weather?.main.humidity}%</p>
      <p>Pressure: {weather?.main.pressure} hPa</p>
      <p>Wind Speed: {weather?.wind.speed} m/s</p>
      <p>Wind Direction: {weather?.wind.deg}°</p>
      <p>Cloudiness: {weather?.clouds.all}%</p>
      <p>Visibility: {weather?.visibility} m</p>
      {weather?.sys.sunrise && (
        <p>
          Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
        </p>
      )}
      {weather?.sys.sunset && (
        <p>
          Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
        </p>
      )}
    </div>
  );
};

export default WeatherComponent;
