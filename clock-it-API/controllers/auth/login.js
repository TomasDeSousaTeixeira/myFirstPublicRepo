import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sql from "../../db/connection.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const SECRET_KEY = process.env.SECRET_KEY;


export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await sql`SELECT * FROM users WHERE username = ${username}`;
    const user = result[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign({ username: user.username }, SECRET_KEY, {
        expiresIn: "1d",
      });

      const refreshToken = jwt.sign({ username: user.username }, SECRET_KEY, {
        expiresIn: "7d",
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day (matches access token expiry)
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (matches refresh token expiry)
      });

      res.status(200).json({
        message: "Login successful",
        userID: user.id,
        username: username,
        userRole: user.role,
      });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
