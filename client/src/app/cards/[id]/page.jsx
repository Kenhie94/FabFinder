"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CardDetail() {
  const router = useRouter();
  const params = useParams(); // Access dynamic route parameters
  const id = params.id; // Get the unique_id from the dynamic route
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    // Fetch card details based on the ID
    const fetchCardDetails = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/the-fab-cube/flesh-and-blood-cards/refs/heads/develop/json/english/card.json"
        );
        if (!response.ok) {
          throw new Error(`Error fetching card data: ${response.status}`);
        }
        const data = await response.json();

        // Find the card with the matching unique_id
        const selectedCard = data.find((card) => card.unique_id === id);

        if (!selectedCard) {
          throw new Error("Card not found.");
        }

        setCard(selectedCard);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCardDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!card) return <p>Card not found.</p>;

  return (
    <div className="card-detail d-flex flex-row justify-content-around mt-5">
      <div className="">
        <img
          src={card.printings[0]?.image_url}
          alt={card.name}
          style={{ maxWidth: "300px", marginBottom: "20px" }}
        />
      </div>
      <div>
        <h1>{card.name}</h1>
        <p>
          <strong>Class:</strong> {card.types[0] || ""}
        </p>
        <p>
          <strong>Types:</strong> {card.types[1] || ""}
        </p>
        <p>
          <strong>Sub-type:</strong> {card.types[2] || ""}
        </p>
        <p>
          <strong>Rarities:</strong> {card.printings[0].rarity || ""}
        </p>
        <p>
          <strong>Artist:</strong> {card.printings[0].artists[0] || ""}
        </p>
        <button
          className="btn btn-warning"
          onClick={() => router.push("/home")}
        >
          Back to Search
        </button>
      </div>
    </div>
  );
}
