import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";

/*
 Minimal App that calls your backend:
 GET http://127.0.0.1:8000/weather?city=<cityName>
 Backend returns: { weather: { city, temperature, windspeed, time }, recent: [...] }
*/

function App() {
  const [weather, setWeather] = useState(null);
  const [recent, setRecent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (cityName) => {
    if (!cityName) return;
    setIsLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/weather?city=${encodeURIComponent(cityName)}`
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Failed to fetch weather");
      }

      const json = await res.json();
      // backend returns { weather: {...}, recent: [...] }
      setWeather(json.weather);
      setRecent(json.recent || []);
    } catch (e) {
      setError(e.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="center">
          <h1>🌦 Weather Now</h1>
          <p className="small-muted">Quickly check current weather for any city</p>
        </div>

        <div style={{ marginTop: 20 }} className="center">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        <div style={{ marginTop: 20 }}>
          {isLoading && <Loader />}

          {error && (
            <div style={{ color: "crimson", marginTop: 12 }} className="center">
              {error}
            </div>
          )}

          {weather && !isLoading && (
            <div style={{ marginTop: 16 }}>
              <WeatherCard data={weather} />
            </div>
          )}

          {!weather && !isLoading && !error && (
            <div className="center small-muted" style={{ marginTop: 18 }}>
              Enter a city to fetch weather
            </div>
          )}

          {recent && recent.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <h3>Recent searches</h3>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {recent.map((r, i) => (
                  <button
                    key={i}
                    className="btn"
                    style={{ padding: "6px 10px", background: "#eef2ff", color: "#1f2937", borderRadius: 8, border: "1px solid #c7d2fe" }}
                    onClick={() => handleSearch(r.city)}
                  >
                    {r.city}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
