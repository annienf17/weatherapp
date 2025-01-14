import React, { useState, useEffect } from "react";
import { getWeather } from "../services/weatherService";
import styles from "../styles/WeatherComponent.module.css";
import { WeatherData } from "../types";
import {
  FaTemperatureHigh,
  FaCloud,
  FaWind,
  FaTint,
  FaCompressArrowsAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const WeatherComponent: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const [city, setCity] = useState<string>("New York");

  useEffect(() => {
    setLoading(true);
    getWeather(city)
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [city]);

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const convertToFahrenheit = (celsius: number) => {
    return Math.round((celsius * 9) / 5 + 32);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(event.target.value);
  };

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>Błąd: {error}</div>;

  return (
    <div className={styles.weather}>
      <h1>Weather in USA</h1>
      <p>{weather?.date}</p>
      <label htmlFor="city">Choose a city: </label>
      <select id="city" value={city} onChange={handleCityChange}>
        <option value="New York">New York</option>
        <option value="New Jersey">New Jersey</option>
        <option value="Los Angeles">Los Angeles</option>
        <option value="Chicago">Chicago</option>
        <option value="Houston">Houston</option>
        <option value="Phoenix">Phoenix</option>
      </select>

      <p>
        <FaTemperatureHigh /> Temperature:{" "}
        {isCelsius
          ? `${Math.round(weather?.main.temp as number)}°C`
          : `${Math.round(
              convertToFahrenheit(weather?.main.temp as number)
            )}°F`}
      </p>
      <button onClick={toggleTemperatureUnit}>
        {isCelsius ? "Show in Fahrenheit" : "Show in Celsius"}
      </button>
      <p>
        <FaCloud /> Conditions: {weather?.weather[0].description}
      </p>
      <p>
        <FaTint /> Humidity: {weather?.main.humidity}%
      </p>
      <p>
        <FaCompressArrowsAlt /> Pressure: {weather?.main.pressure} hPa
      </p>
      <p>
        <FaWind /> Wind Speed: {weather?.wind.speed} m/s
      </p>
      <p>
        <FaWind /> Wind Direction: {weather?.wind.deg}°
      </p>
      <p>
        <FaCloud /> Cloudiness: {weather?.clouds.all}%
      </p>
      <p>
        <FaSun /> Visibility: {weather?.visibility} m
      </p>
      {weather?.sys.sunrise && (
        <p>
          <FaSun /> Sunrise:{" "}
          {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      )}
      {weather?.sys.sunset && (
        <p>
          <FaMoon /> Sunset:{" "}
          {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      )}
    </div>
  );
};

export default WeatherComponent;
