import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const SECRET_KEY = process.env.SECRET_KEY;
export const refreshToken = async (req, res) => {
    try {
      const refreshToken = req.cookies?.refreshToken;
  
      if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided." });
      }
  
      // Verify the refresh token
      jwt.verify(refreshToken, SECRET_KEY, (err, user) => {
        if (err) {
          return res
            .status(403)
            .json({ message: "Invalid or expired refresh token." });
        }
  
        // Generate a new access token
        const newAccessToken = jwt.sign({ username: user.username }, SECRET_KEY, {
          expiresIn: "1d", // Short expiry for access token
        });
  
        // Set the new access token cookie
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          maxAge: 24 * 60 * 60 * 1000, // 1 day (matches access token expiry)
        });
  
        res.status(200).json({ message: "Access token refreshed" });
      });
    } catch (error) {
      console.error("Error during token refresh:", error);
      res.status(500).json({ message: "Server error: " + error.message });
    }
  };