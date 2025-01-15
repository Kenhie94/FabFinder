"use client";

import { useState } from "react";

export default function Homepage() {
  const [searchTerm, setSearchTerm] = useState(""); // Track user input
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const [error, setError] = useState(null); // Handle errors

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      // Fetch the data
      const response = await fetch(
        "https://raw.githubusercontent.com/the-fab-cube/flesh-and-blood-cards/refs/heads/develop/json/english/card.json"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      // Filter cards by name matching the search term
      const filteredCards = data.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResults(filteredCards);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex">
      <div className="mt-5 m-auto">
        <h1>Welcome to FabFinder</h1>
        <form onSubmit={handleSearch}>
          <label htmlFor="searchEngine" className="d-flex flex-column">
            Card Finder:
          </label>
          <input
            type="text"
            name="searchEngine"
            id="searchEngine"
            placeholder="Search for Flesh and Blood cards"
            value={searchTerm} // Controlled input
            onChange={(e) => setSearchTerm(e.target.value)} // Update state
          />
          <button type="submit" className="btn btn-danger ms-2">
            Search
          </button>
        </form>

        {error && <p className="text-danger">Error: {error}</p>}

        <ul>
          {searchResults.map((card) => (
            <li key={card.unique_id}>
              <h3>{card.name}</h3>
              <img src={card.printings[0].image_url} alt="" />
            </li>
          ))}
        </ul>

        {searchResults.length === 0 && searchTerm && !error && (
          <p>No results found for "{searchTerm}".</p>
        )}
      </div>
    </div>
  );
}
