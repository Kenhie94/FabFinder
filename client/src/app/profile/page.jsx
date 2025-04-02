"use client";

import { useEffect, useState } from "react";
import CardBox from "../components/CardBox";
import "../home/style.css";

export default function ProfilePage() {
  const [savedCards, setSavedCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        // Fetch saved cards from your MongoDB
        const savedRes = await fetch("/api/cards/user", {
          method: "GET",
          credentials: "include",
        });

        if (!savedRes.ok) throw new Error("Failed to fetch saved cards");

        const savedData = await savedRes.json();
        setSavedCards(savedData);

        // Fetch full card data from external GitHub API
        const githubRes = await fetch("https://raw.githubusercontent.com/the-fab-cube/flesh-and-blood-cards/refs/heads/develop/json/english/card.json");

        if (!githubRes.ok) throw new Error("Failed to fetch card database");

        const githubCards = await githubRes.json();
        setAllCards(githubCards);

        // Match saved cards with full data using unique_id
        const matched = githubCards.filter((card) => savedData.some((saved) => saved.cardId === card.unique_id));

        setMatchedCards(matched);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) return <p>Loading your collection...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h1>Saved Collection</h1>
      {matchedCards.length === 0 ? (
        <p>No matching cards found.</p>
      ) : (
        <ul className="cards-container d-flex flex-wrap justify-content-center p-0">
          {matchedCards.map((card) => (
            <CardBox key={card.unique_id} card={card} onClick={() => {}} />
          ))}
        </ul>
      )}
    </div>
  );
}
