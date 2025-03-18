import sql from "../../db/connection.js";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import { isQrAvailable, deleteQr } from "../../utils/QR/QRService.js"; 

dotenv.config({ path: ".env.local" });

const SECRET_KEY = process.env.SECRET_KEY;
const MAX_QR_AGE_MINUTES = 1;

export const insertLog = async (req, res) => {
  try {
    const { encryptedData } = req.body;

    if (!encryptedData) {
      return res.status(400).json({ message: "No QR data provided" });
    }

    // Check if token exists before proceeding
    const qrIsAvailable = await isQrAvailable(encryptedData);
    if (!qrIsAvailable) {
      return res.status(400).json({ message: "Invalid or expired QR Code" });
    }

    // Decrypt the payload
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedPayload = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedPayload) {
      return res.status(400).json({ message: "Invalid QR data" });
    }

    // Parse decrypted payload
    const { id, action, timestamp } = JSON.parse(decryptedPayload);

    if (!id || !action || !timestamp) {
      return res.status(400).json({ message: "Malformed QR payload" });
    }

    // Check QR code age
    const qrTime = new Date(timestamp);
    const currentTime = new Date();
    const timeDifference = (currentTime - qrTime) / (1000 * 60);

    if (Math.abs(timeDifference) > MAX_QR_AGE_MINUTES) {
      return res
        .status(400)
        .json({ message: "QR Code is too old, please create a new one." });
    }

    // Insert log into the database
    const result = await sql`
      INSERT INTO logs (user_id, date, time, action)
      VALUES (${id}, CURRENT_DATE, CURRENT_TIME, ${action})`;

    // Delete token after a successful scan
    await deleteQr(encryptedData);

    // Emit socket event to notify front-end
    const userSockets = req.app.locals.userSockets;
    const idStr = String(id);
    const userSocket = userSockets.get(idStr);

    if (userSocket) {
      userSocket.emit("qr-used", {
        success: true,
        action,
        timestamp: Date.now(),
      });
    } else {
      console.log("Socket not found for id:", id);
    }

    res.status(200).json({ message: "Log added successfully!", action });
  } catch (error) {
    console.error("Error adding log:", error);
    res
      .status(500)
      .json({ message: "Failed to add the log. Error: "+ error.message });
  }
};
