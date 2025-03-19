import { requestNewAccessToken } from "../auth/requestNewAccessToken";
export async function clockUser(qrData) {
  try{ 
    const response = await fetch("https://localhost:5000/insertLog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ encryptedData: qrData }),
      });

      if (response.status === 403) {
          return await requestNewAccessToken(clockUser, qrData);
        }

      if (response.ok) {
        return response;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  }catch(err){
        console.error("Error during Clock action:", err);
        throw err
    }
}