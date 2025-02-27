import { requestNewAccessToken } from "../auth/requestNewAccessToken";

export async function createQR(id, action) {
  try{  
  const response = await fetch("https://localhost:5000/createQR", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, action, timestamp: Date.now() }),
      });
  
      if (response.status === 403) {
          return await requestNewAccessToken(createQR, id, action);
        }
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
    
        return response; 
      } catch (error) {
        console.error("Error in createQR:", error);
        throw error; 
      }
    }