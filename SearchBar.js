import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      margin: "20px 0"
    }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", width: "50%" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for kurtis, shoes, bags..."
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ddd",
            borderTopLeftRadius: "5px",
            borderBottomLeftRadius: "5px",
            fontSize: "16px"
          }}
        />
        <button type="submit" style={{
          padding: "10px 20px",
          backgroundColor: "#ff3f6c",
          color: "#fff",
          border: "none",
          borderTopRightRadius: "5px",
          borderBottomRightRadius: "5px",
          cursor: "pointer"
        }}>
          Search
        </button>
      </form>
    </div>
  );
}
