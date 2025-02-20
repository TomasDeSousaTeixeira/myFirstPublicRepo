const JWT_SECRET = process.env.SECRET_KEY;

export const refreshToken = async (req, res) => {
    try {
        
      const refreshToken = req.cookies?.refreshToken;
  
      if (!refreshToken) {
        return res.status(401).json({ error: "No refresh token provided." });
      }
  
      // Verify the refresh token
      jwt.verify(refreshToken, JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ error: "Invalid or expired refresh token." });
        }
  
        // Generate a new access token
        const newAccessToken = jwt.sign({ username: user.username }, JWT_SECRET, {
          expiresIn: "1h", 
        });
  
        // Set the new access token cookie
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          maxAge: 60 * 60 * 1000, // 1 hour (matches access token expiry)
        });
  
        res.status(200).json({ message: "Access token refreshed" });
      });
    } catch (error) {
      console.error("Error during token refresh:", error);
      res.status(500).json({ error: "Server error", details: error.message });
    }
  };