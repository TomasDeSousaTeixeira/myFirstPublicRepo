import sql from "../../db/connection.js";

// Function to check if the token exists in the database
export const isQrAvailable = async (qr) => {
  const result = await sql`SELECT qr FROM active_qr_codes WHERE qr = ${qr}`;
  return result.length > 0;
};

// Function to delete the token from the database
export const deleteQr = async (qr) => {
  await sql`DELETE FROM active_qr_codes WHERE qr = ${qr}`;
};