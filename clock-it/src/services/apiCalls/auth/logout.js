export async function logOutUser() {
  try {
    const response = await fetch("https://localhost:5000/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Logout failed: ",errorData.message);
    }
    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error
  }
}
