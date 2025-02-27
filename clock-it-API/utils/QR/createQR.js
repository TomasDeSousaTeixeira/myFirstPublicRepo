import sql from "../../db/connection.js";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import { isQrAvailable, deleteQr } from "./QRService.js";

dotenv.config({ path: ".env.local" });

const SECRET_KEY = process.env.SECRET_KEY;

export async function createQrData(req, res) {
  try {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(req.body),
      SECRET_KEY
    ).toString();

    await sql`INSERT INTO active_qr_codes (qr) VALUES (${encryptedData})`;

    // Set a timeout to delete token if not used
    setTimeout(async () => {
      const qrIsAvailable = await isQrAvailable(encryptedData);
      if (qrIsAvailable) {
        await deleteQr(encryptedData);
        console.log(`Expired QR deleted: ${encryptedData}`);
      }
    }, 60000); 

    res.status(200).json({ message: "QR Data generated successfully", data: encryptedData });
  } catch (error) {
    console.error("Error generating QR Data:", error);
    res.status(500).json({ message: "Failed to generate QR Data. Error: " + error.message });
  }
}
