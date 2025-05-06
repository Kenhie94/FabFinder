"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CardBox from "../components/PublicCardBox";
import FilterSidebar from "../components/SidebarFilter";
import "./style.css";

export default function Homepage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [searchConducted, setSearchConducted] = useState(false);
  const [noResultsMessage, setNoResultsMessage] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  const router = useRouter();

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  function groupCardsByNameAsArray(cards) {
    const grouped = {};
    cards.forEach((card) => {
      if (!grouped[card.name]) {
        grouped[card.name] = [card];
      } else {
        grouped[card.name].push(card);
      }
    });
    return Object.values(grouped); // Each item is now an array of pitch variants
  }

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setSearchConducted(true);
      setNoResultsMessage(false);

      const response = await fetch("https://raw.githubusercontent.com/the-fab-cube/flesh-and-blood-cards/refs/heads/develop/json/english/card.json");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      const filteredCards = data.filter((card) => card.name.toLowerCase().includes(searchTerm.toLowerCase()));

      const groupedCards = groupCardsByNameAsArray(filteredCards);

      setSearchResults(groupedCards);
      setCurrentPage(1);
      if (groupedCards.length === 0) setNoResultsMessage(true);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFilter = async (type) => {
    try {
      setSearchConducted(true);
      setNoResultsMessage(false);

      const response = await fetch("https://raw.githubusercontent.com/the-fab-cube/flesh-and-blood-cards/refs/heads/develop/json/english/card.json");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      const filteredCards = data.filter((card) => card.types.includes(type));
      const groupedCards = groupCardsByNameAsArray(filteredCards);

      setSearchResults(groupedCards);
      setCurrentPage(1);
      if (groupedCards.length === 0) setNoResultsMessage(true);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSave = async (card) => {
    try {
      const res = await fetch("/api/cards", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardId: card.unique_id,
          title: card.name,
          description: card.types?.join(", "),
          image: card.printings[0]?.image_url,
        }),
      });

      if (!res.ok) throw new Error("Failed to save card");
      alert(`Card "${card.name}" saved to your collection!`);
    } catch (err) {
      console.error(err);
      alert("Error saving card.");
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (noResultsMessage) {
      const timer = setTimeout(() => setNoResultsMessage(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [noResultsMessage]);

  const classTerms = [
    "Assassin",
    "Bard",
    "Brute",
    "Generic",
    "Guardian",
    "Illusionist",
    "Mechanologist",
    "Merchant",
    "Necromancer",
    "Ninja",
    "Pirate",
    "Ranger",
    "Runeblade",
    "Shapeshifter",
    "Warrior",
    "Wizard",
  ];

  const typeTerms = ["Chaos", "Draconic", "Earth", "Elemental", "Ice", "Light", "Lightning", "Royal", "Shadow"];

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = searchResults.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(searchResults.length / cardsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="container-fluid homepage">
      <div className="row">
        <div className="col-md-3 col-lg-2 sidebar-filter">
          <FilterSidebar classTerms={classTerms} typeTerms={typeTerms} onFilter={handleFilter} />
        </div>
        <div className="col-md-9 col-lg-10">
          <div className="header-section text-center">
            {!searchConducted && <img className="logoStyle" src="/FabFinder-Logo.png" alt="FabFinder Logo" />}
            <form onSubmit={handleSearch} className="d-flex justify-content-center mt-3">
              <div className="form-group">
                <input
                  type="text"
                  className="input-style form-control"
                  name="searchEngine"
                  id="searchEngine"
                  placeholder="Search for Flesh and Blood cards"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-danger ms-3 align-self-end">
                Search
              </button>
            </form>
            {searchConducted && noResultsMessage && !error && <p className="mt-3">😕 No cards found.</p>}
          </div>

          {searchResults.length > cardsPerPage && (
            <div className="pagination-controls text-center mt-4">
              <button className="btn btn-secondary mx-2" onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button className="btn btn-secondary mx-2" onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          )}

          <div className="cards-section mt-5">
            <ul className="cards-container d-flex flex-wrap justify-content-center p-0">
              {currentCards.map((cardGroup, index) => (
                <CardBox key={cardGroup[0].unique_id} cards={cardGroup} onSave={handleSave} />
              ))}
            </ul>

            {selectedCard && (
              <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <img src={selectedCard.printings[0].image_url} alt={selectedCard.name} style={{ width: "100%", height: "auto" }} />
                  <button className="close-button" onClick={() => router.push(`/cards/${selectedCard.unique_id}`)}>
                    See card detail
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
