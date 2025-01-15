import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { getWeather } from "../services/weatherService";
import { WeatherData } from "../types";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
  }, []);

  const handleAddFavorite = (city: string) => {
    const newFavorites = [...favorites, city];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const handleRemoveFavorite = (city: string) => {
    const newFavorites = favorites.filter((fav) => fav !== city);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const fetchWeather = async (city: string) => {
    const data = await getWeather(city);
    setWeatherData(data);
  };

  return (
    <div>
      <h2>Favorites</h2>
      <input
        type="text"
        placeholder="Add a favorite city"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddFavorite((e.target as HTMLInputElement).value);
            (e.target as HTMLInputElement).value = "";
          }
        }}
      />
      <ul>
        {favorites.map((city, index) => (
          <li key={index}>
            {city}
            <button onClick={() => fetchWeather(city)}>Get Weather</button>
            <button onClick={() => handleRemoveFavorite(city)}>Remove</button>
          </li>
        ))}
      </ul>
      {weatherData && (
        <div>
          <h3>Weather Data for {weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Date: {weatherData.date}</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
