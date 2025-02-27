export async function logInUser(userData) {
    
    try {
        const response = await fetch("https://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
          credentials: "include",
        });
       
        if (!response.ok) {
          const errorData = await response.json(); 
          throw new Error("Login failed. " + errorData.message)
        }
        
        return response;
        }catch (error) {
          console.error("Error during login:", error);
          throw error
        }
}