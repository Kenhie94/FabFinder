"use client";

export default function CardBox({ card, onClick }) {
  const imageUrl =
    card.printings.length >= 3
      ? card.printings[card.printings.length - 3].image_url
      : card.printings[0].image_url;

  return (
    <li
      className="card-item"
      onClick={() => onClick(card)}
      style={{ cursor: "pointer" }}
    >
      <img src={imageUrl} alt={card.name} />
    </li>
  );
}
