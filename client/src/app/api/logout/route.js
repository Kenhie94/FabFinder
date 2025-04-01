import connectDB from "src/config/database";
import User from "src/models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { username, password } = await req.json();

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    return new Response(
      JSON.stringify({
        message: "Login successful",
        user: { id: user._id, username: user.username },
        token,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Login failed", details: error.message }),
      { status: 500 }
    );
  }
}
