import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
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

    const { title, description } = await req.json();

    const newCard = await CardModel.create({
      title,
      description,
      user: userId,
    });

    return Response.json(newCard);
  } catch (err) {
    console.error("JWT error:", err);
    return new Response("Unauthorized", { status: 401 });
  }
}