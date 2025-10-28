import React, { useState } from "react";

export default function SearchBar({ onSearch, isLoading }) {
  const [q, setQ] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!q) return;
    onSearch(q.trim());
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", justifyContent: "center", gap: 8 }}>
      <input
        className="input"
        placeholder="e.g., London"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        disabled={isLoading}
      />
      <button className="btn" type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Get Weather"}
      </button>
    </form>
  );
}
