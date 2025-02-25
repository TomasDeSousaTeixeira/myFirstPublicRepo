import db from "../../db/connection.js";

// Function to check if the token exists in the database
export const isQrAvailable = async (qr) => {
  const result = await new Promise((resolve, reject) => {
    db.get("SELECT qr FROM active_qr_codes WHERE qr = ?", [qr], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row); // Returns the row if found, otherwise `undefined`
      }
    });
  });

  return !!result; // Convert answer to a boolean
};

// Function to delete the token from the database
export const deleteQr = async (qr) => {
  await new Promise((resolve, reject) => {
    db.run("DELETE FROM active_qr_codes WHERE qr = ?", [qr], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(); 
      }
    });
  });
};