import bcrypt from "bcryptjs";

async function test() {
  const password = "test123";
  const hashed = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hashed);

  const isMatch = await bcrypt.compare(password, hashed);
  console.log("Password match:", isMatch);
}

test();
