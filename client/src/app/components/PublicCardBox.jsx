"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PublicCardBox({ cards, onSave }) {
  const [hovered, setHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // pitch selection
  const router = useRouter();

  const activeCard = cards[activeIndex];
  const activeImage = activeCard?.printings[0]?.image_url || "";

  return (
    <li
      className="card-item position-relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer", maxWidth: "300px", margin: "10px" }}
    >
      <img
        src={activeImage}
        alt={activeCard.name}
        style={{ width: "100%", borderRadius: "1px" }}
      />

      {/* Pitch Buttons */}
      {cards.length > 1 && (
        <div className="d-flex justify-content-center mt-2 gap-2">
          {cards.map((card, idx) => (
            <button
              key={card.unique_id}
              className={`btn btn-sm ${idx === activeIndex ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(idx);
              }}
            >
              {`Pitch ${card.pitch}`}
            </button>
          ))}
        </div>
      )}

      {/* Hover Buttons */}
      {hovered && (
        <div className="hover-buttons d-flex flex-row position-absolute top-50 start-50 translate-middle text-center">
          <button
            className="btn btn-success m-2"
            onClick={(e) => {
              e.stopPropagation();
              onSave(activeCard);
            }}
          >
            Save
          </button>
          <button
            className="btn btn-warning m-2"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/cards/${activeCard.unique_id}`);
            }}
          >
            Details
          </button>
        </div>
      )}
    </li>
  );
}
