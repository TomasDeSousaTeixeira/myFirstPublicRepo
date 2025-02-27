import sql from "../../db/connection.js";

// Function to check if the token exists in the database
export const isQrAvailable = async (qr) => {
  try {
    const result = await sql`SELECT qr FROM active_qr_codes WHERE qr = ${qr}`;
    return result.length > 0;
  } catch (error) {
    console.error("Error checking QR availability:", error);
    throw new Error("Failed to check QR availability"); 
  }
};

// Function to delete the token from the database
export const deleteQr = async (qr) => {
  try {
    await sql`DELETE FROM active_qr_codes WHERE qr = ${qr}`;
  } catch (error) {
    console.error("Error deleting QR:", error);
    throw new Error("Failed to delete QR"); 
  }
};