import sql from "../../db/connection.js";

export const getLogs = async (req, res) => {
  try {
    const id = req.query.id
    const result = await sql`Select * from logs where user_id = ${id}`;

   res
      .status(200)
      .json({ message: "Your personal logs are here!", data: result });
  } catch (error) {
    console.error("Error getting personal logs:", error);
   
    res
      .status(500)
      .json({ message: "Failed to get personal logs. Error: "+ error.message });
  }
}

export const getLastLogs = async (req, res) => {
  
  try {
    const id = req.query.id
 
    const result = await sql`Select * from logs where user_id = ${id} ORDER BY date DESC LIMIT 3`;

   res
      .status(200)
      .json({ message: "Your latest logs are here!", data: result });
  } catch (error) {
    console.error("Error getting personal logs:", error);

    res
      .status(500)
      .json({ message: "Failed to get latest logs. Error: "+ error.message });
  }
}