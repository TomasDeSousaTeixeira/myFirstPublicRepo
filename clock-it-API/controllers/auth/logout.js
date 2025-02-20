// Logout controller
export const logout = (req, res) => {
  try {
    res.clearCookie("accessToken" /*, { path: "/" }*/);
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);

    res.status(500).json({ message: "Failed to log out. Please try again." });
  }
};
