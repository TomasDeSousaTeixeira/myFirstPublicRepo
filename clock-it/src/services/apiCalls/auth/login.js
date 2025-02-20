export async function logInUser(userData) {
    
    try {
        const response = await fetch("https://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
          credentials: "include",
        });
       
        if (!response.ok) {
          throw new Error("Login failed");
        }
        
        return response;
        }catch (error) {
            console.error("Error during login:", error);
            alert("Login failed! Please check your username and password.");
    }
}