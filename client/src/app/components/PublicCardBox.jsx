"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PublicCardBox({ card, onSave }) {
  const [hovered, setHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // Track selected variation
  const router = useRouter();

  const printings = card.printings || [];
  const activeImage = printings[activeIndex]?.image_url || "";

  return (
    <li
      className="card-item position-relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer", maxWidth: "300px", margin: "10px" }}
    >
      <img
        src={activeImage}
        alt={card.name}
        style={{ width: "100%", borderRadius: "1px" }}
      />

      {/* Print variation selector */}
      {printings.length > 1 && (
        <div className="d-flex justify-content-center mt-2 gap-2">
          {printings.map((_, idx) => (
            <button
              key={idx}
              className={`btn btn-sm ${idx === activeIndex ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(idx);
              }}
            >
              {`P${idx + 1}`}
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
              onSave(card);
            }}
          >
            Save
          </button>
          <button
            className="btn btn-warning m-2"
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
