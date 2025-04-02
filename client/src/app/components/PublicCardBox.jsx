// components/PublicCardBox.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PublicCardBox({ card, onSave }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const imageUrl =
    card.printings.length >= 3
      ? card.printings[card.printings.length - 3].image_url
      : card.printings[0]?.image_url || "";

  return (
    <li
      className="card-item position-relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer", maxWidth: "200px", margin: "10px" }}
    >
      <img
        src={imageUrl}
        alt={card.name}
        style={{ width: "100%", borderRadius: "8px" }}
      />

      {hovered && (
        <div className="hover-buttons d-flex flex-column position-absolute top-50 start-50 translate-middle text-center">
          <button
            className="btn btn-success mb-2"
            onClick={(e) => {
              e.stopPropagation();
              onSave(card);
            }}
          >
            Save
          </button>
          <button
            className="btn btn-warning"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/cards/${card.unique_id}`);
            }}
          >
            Details
          </button>
        </div>
      )}
    </li>
  );
}
