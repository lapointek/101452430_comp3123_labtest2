import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const api = {
  key: "5fe1bb085f9b36f7607cb07c7436a1b2",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState("");

  const searchPressed = async () => {
    try {
      const url = `${api.base}weather?q=${search}&units=metric&appid=${api.key}`;
      const response = await fetch(url);
      const data = await response.json();
      const iconCode = data.weather[0].icon;
      console.log(data);
      setWeather({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${iconCode}@2x.png`,
      });
    } catch (error) {
      console.error("Could not fetch data", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>

        <div>
          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <button onClick={searchPressed}>Search</button>
        </div>
        <p>Location: {weather.location}</p>
        <p>Description: {weather.description}</p>
        <p>Temperature: {weather.temperature} °C</p>
        <p>Humidity: {weather.humidity}%</p>
        <p>Wind Speed: {weather.windSpeed} m/s</p>
        <img src={weather.icon} onerror="this.src.display='none'" />
      </header>
    </div>
  );
}

export default App;
