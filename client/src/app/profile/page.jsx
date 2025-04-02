"use client";

import { useEffect, useState } from "react";
import CardBox from "../components/SavedCardBox";
import "../home/style.css";

export default function ProfilePage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/cards/user", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch saved cards");

        const data = await res.json();
        setCards(data);
      } catch (err) {
        console.error(err);
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
      {cards.length === 0 ? (
        <p>No cards saved yet.</p>
      ) : (
        <ul className="cards-container d-flex flex-wrap justify-content-center p-0">
          {cards.map((card) => (
            <CardBox key={card._id} card={card} onClick={() => {}} />
          ))}
        </ul>
      )}
    </div>
  );
}
