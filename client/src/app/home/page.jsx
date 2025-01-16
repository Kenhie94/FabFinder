"use client";

import { useState } from "react";
import "./style.css";

export default function Homepage() {
  const [searchTerm, setSearchTerm] = useState(""); // Track user input
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const [error, setError] = useState(null); // Handle errors

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      // Fetch the data
      const response = await fetch("https://raw.githubusercontent.com/the-fab-cube/flesh-and-blood-cards/refs/heads/develop/json/english/card.json");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      // Filter cards by name matching the search term
      const filteredCards = data.filter((card) => card.name.toLowerCase().includes(searchTerm.toLowerCase()));

      setSearchResults(filteredCards);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="homepage">
      <div className="header-section text-center">
        <h1>Welcome to FabFinder</h1>
        <form onSubmit={handleSearch} className="d-flex justify-content-center mt-3">
          <div className="form-group">
            <label htmlFor="searchEngine" className="form-label">
              Card Finder:
            </label>
            <input
              type="text"
              className="form-control"
              name="searchEngine"
              id="searchEngine"
              placeholder="Search for Flesh and Blood cards"
              value={searchTerm} // Controlled input
              onChange={(e) => setSearchTerm(e.target.value)} // Update state
            />
          </div>
          <button type="submit" className="btn btn-danger ms-3 align-self-end">
            Search
          </button>
        </form>
        {error && <p className="text-danger">Error: {error}</p>}
        {searchResults.length === 0 && searchTerm && !error && <p>No results found for "{searchTerm}".</p>}
      </div>
      <div className="cards-section mt-5">
        <ul className="cards-container d-flex flex-wrap justify-content-center p-0">
          {searchResults.map((card) => (
            <li className="card-item" key={card.unique_id}>
              <img src={card.printings[0].image_url} alt={card.name} />
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
