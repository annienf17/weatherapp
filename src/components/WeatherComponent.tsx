import React, { useState, useEffect } from "react";
import { getWeather } from "../services/weatherService";
import styles from "../styles/WeatherComponent.module.css";
import { WeatherData } from "../types";

const WeatherComponent: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const [city, setCity] = useState<string>("London");

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
      <h1>Weather in England</h1>
      <label htmlFor="city">Choose a city: </label>
      <select id="city" value={city} onChange={handleCityChange}>
        <option value="London">London</option>
        <option value="Manchester">Manchester</option>
        <option value="Birmingham">Birmingham</option>
        <option value="Liverpool">Liverpool</option>
        <option value="Leeds">Leeds</option>
      </select>
      <p>Date: {weather?.date}</p>
      <p>
        Temperature:{" "}
        {isCelsius
          ? `${Math.round(weather?.main.temp as number)}°C`
          : `${Math.round(
              convertToFahrenheit(weather?.main.temp as number)
            )}°F`}
      </p>
      <button onClick={toggleTemperatureUnit}>
        {isCelsius ? "Show in Fahrenheit" : "Show in Celsius"}
      </button>
      <p>Conditions: {weather?.weather[0].description}</p>
      <p>Humidity: {weather?.main.humidity}%</p>
      <p>Pressure: {weather?.main.pressure} hPa</p>
      <p>Wind Speed: {weather?.wind.speed} m/s</p>
      <p>Wind Direction: {weather?.wind.deg}°</p>
      <p>Cloudiness: {weather?.clouds.all}%</p>
      <p>Visibility: {weather?.visibility} m</p>
      {weather?.sys.sunrise && (
        <p>
          Sunrise:{" "}
          {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      )}
      {weather?.sys.sunset && (
        <p>
          Sunset:{" "}
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
