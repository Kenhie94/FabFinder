// /app/api/cards/user/route.js
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import CardModel from "src/models/cardModel";
import connectDB from "src/config/database";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET() {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("token");
    const token = tokenCookie?.value;

    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const cards = await CardModel.find({ user: userId }).sort({ createdAt: -1 });

    return Response.json(cards);
  } catch (err) {
    console.error("Error fetching cards:", err);
    return new Response("Failed to fetch cards", { status: 500 });
  }
}
