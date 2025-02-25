import db from "../../db/connection.js";

export const getLogs = async (req, res) => {
  try {
    const id = req.query.id;

   
    const logs = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM logs WHERE user_id = ? ORDER BY date DESC, time DESC", [id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    res
      .status(200)
      .json({ message: "Your personal logs are here!", data: logs });
  } catch (error) {
    console.error("Error getting personal logs:", error);
    res
      .status(500)
      .json({ message: "Failed to get personal logs. Please try again." });
  }
};

export const getLastLogs = async (req, res) => {
  try {
    const id = req.query.id;

    const logs = await new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM logs WHERE user_id = ? ORDER BY date DESC, time DESC LIMIT 3",
        [id],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });

    res
      .status(200)
      .json({ message: "Your latest logs are here!", data: logs });
  } catch (error) {
    console.error("Error getting latest logs:", error);
    res
      .status(500)
      .json({ message: "Failed to get latest logs. Please try again." });
  }
};