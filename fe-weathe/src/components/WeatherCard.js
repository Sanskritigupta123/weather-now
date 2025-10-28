import React from "react";

export default function WeatherCard({ data }) {
  if (!data) return null;
  const { city, temperature, windspeed, time } = data;

  return (
    <div className="card" style={{ marginTop: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0 }}>{city}</h2>
          <div className="small-muted">As of: {time}</div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{Math.round(temperature)}°C</div>
          <div className="small-muted">Wind: {Math.round(windspeed)} km/h</div>
        </div>
      </div>
    </div>
  );
}
