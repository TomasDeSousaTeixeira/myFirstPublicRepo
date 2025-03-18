export async function logOutUser() {
  try {
    const response = await fetch("https://localhost:5000/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    alert("Logout failed!");
  }
}
