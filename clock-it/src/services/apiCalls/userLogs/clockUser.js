import { requestNewAccessToken } from "../auth/requestNewAccessToken";
export async function clockUser(qrData) {
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
        const responseData = await response.json(); 

        return responseData;
    } else {
      const errorData = await response.json();
      return { error: true, message: errorData.message };
    }
  }