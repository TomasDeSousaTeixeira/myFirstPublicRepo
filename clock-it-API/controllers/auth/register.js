import bcrypt from "bcryptjs";
import db from "../../db/connection.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;
    if (!name || !email || !password || !username) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (name, email, password, username, created_at)
      VALUES (?, ?, ?, ?, ?);
    `;
    const params = [name, email, hashedPassword, username, new Date().toISOString()];

    const userId = await new Promise((resolve, reject) => {
      db.run(query, params, function (err) {
        if (err) {
          reject(err);
        } else {
          // `this.lastID` contains the PK with AutoIncrement if the table has one
          resolve(this.lastID);
        }
      });
    });

    res
      .status(201)
      .json({ message: "User registered successfully", userId });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};