"use client";

export default function CardBox({ card, onClick }) {
  return (
    <li className="card-item" onClick={() => onClick(card)} style={{ cursor: "pointer" }}>
      <img src={card.image} alt={card.title} />
    </li>
  );
}