import bcrypt from "bcryptjs";
import sql from "../../db/connection.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;
    if (!name || !email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await sql`INSERT INTO users (name, email, password, username)
      VALUES (${name}, ${email}, ${hashedPassword}, ${username})
      RETURNING id, name, email, username;`;

    res
      .status(201)
      .json({ message: "User registered successfully", user: result[0] });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error :" + error.message });
  }
};