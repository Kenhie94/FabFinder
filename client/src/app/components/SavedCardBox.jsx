"use client";

import { useRouter } from "next/navigation";

export default function CardBox({ card, onDelete }) {
  const router = useRouter();

  const handleDelete = async () => {
  try {
      const res = await fetch("/api/cards", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardId: card.cardId }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete card");
      }

      if (typeof onDelete === "function") {
        onDelete(card.cardId); // Let parent update UI if needed
      }

      alert(`Card "${card.title}" deleted from your collection.`);
    } catch (err) {
      console.error(err);
      alert("Failed to delete card.");
    }
  };

  const handleDetails = () => {
    router.push(`/cards/${card.cardId}`);
  };

  return (
    <li className="card-item" style={{ maxWidth: "200px", margin: "10px" }}>
      <img src={card.image} alt={card.title} style={{ width: "100%" }} />
      <div className="text-center mt-2">
        <button className="btn btn-warning btn-sm mx-2" onClick={handleDetails}>
          Details
        </button>
        <button className="btn btn-danger btn-sm mx-2" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}
