"use client";

import { useState, useEffect } from "react";
import "./style.css";

export default function Homepage() {
  const [searchTerm, setSearchTerm] = useState(""); // Track user input
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const [error, setError] = useState(null); // Handle errors
  const [searchConducted, setSearchConducted] = useState(false); // Track if a search was performed
  const [noResultsMessage, setNoResultsMessage] = useState(false); // Track if "no results" should show

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      setSearchConducted(true); // Set search conducted to true
      setNoResultsMessage(false); // Reset no-results message

      // Fetch the data
      const response = await fetch("https://raw.githubusercontent.com/the-fab-cube/flesh-and-blood-cards/refs/heads/develop/json/english/card.json");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      // Filter cards by name matching the search term
      const filteredCards = data.filter((card) => card.name.toLowerCase().includes(searchTerm.toLowerCase()));

      setSearchResults(filteredCards);

      if (filteredCards.length === 0) {
        setNoResultsMessage(true); // Show no-results message
      }

      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message);
    }
  };

  // Automatically clear error after 1 second
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 10000); // Clear error after 1 second

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [error]);

  // Automatically clear "no results" message after 2.5 seconds
  useEffect(() => {
    if (noResultsMessage) {
      const timer = setTimeout(() => {
        setNoResultsMessage(false);
      }, 10000); // Clear no-results message after 2.5 seconds

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [noResultsMessage]);

  return (
    <div className="homepage">
      <div className="header-section text-center">
        {/* Conditionally render the logo */}
        {!searchConducted && <img className="logoStyle" src="/FabFinder-Logo.png" alt="FabFinder Logo" />}
        <form onSubmit={handleSearch} className="d-flex justify-content-center mt-3">
          <div className="form-group">
            <input
              type="text"
              className="input-style form-control"
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
        {/* Only display "no results" after a search has been conducted */}
        {searchConducted && noResultsMessage && !error && (
          <p className="mt-3">😕 No cards found.</p>
        )}
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
