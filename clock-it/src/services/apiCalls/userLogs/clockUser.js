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
        console.log("entrámosno response ok do script")
          

          return response;
      } else {
        console.log("entrámosno response not ok do script")
        const errorData = await response.json();
        throw new Error("Logout failed: ",errorData.message);
      }
  }catch(err){
        console.error("Error during Clock action:", err);
        throw err
    }
}