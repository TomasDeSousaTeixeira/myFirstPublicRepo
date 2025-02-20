import { requestNewAccessToken } from "../auth/requestNewAccessToken";
export async function createQR(id, action) {
    const response = await fetch("https://localhost:5000/createQR", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, action, timestamp: Date.now() }),
      });
  
      if (response.status === 403) {
          return await requestNewAccessToken(createQR, id, action);
        }
      if (response.ok) {
       
        return response
      } else {
        const errorData = await response.json();
        alert(errorData.message);
        return;
      }
}