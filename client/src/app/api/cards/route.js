import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "src/config/database";
import CardModel from "src/models/cardModel";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("token");
    const token = tokenCookie?.value;

    console.log("COOKIE TOKEN:", token);

    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id; //

    const { cardId, title, description, image } = await req.json();

    const newCard = await CardModel.create({
      cardId,
      title,
      description,
      image,
      user: userId,
    });

    return Response.json(newCard);
  } catch (err) {
    console.error("JWT error:", err);
    return new Response("Unauthorized", { status: 401 });
  }
}

export async function DELETE(req) {
  await connectDB();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return new Response("Unauthorized", { status: 401 });

  const decoded = jwt.verify(token, JWT_SECRET);
  const userId = decoded.id;

  const { cardId } = await req.json();

  const deleted = await CardModel.findOneAndDelete({
    cardId: cardId,
    user: userId,
  });

  if (!deleted) {
    return new Response("Card not found or unauthorized", { status: 404 });
  }

  return Response.json({ message: "Card deleted", deleted });
}
