import postgres from 'postgres';
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const DB_CONNECTION_PASSWORD = process.env.DB_CONNECTION_PASSWORD;
const sql = postgres({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    username: 'postgres',
    password: DB_CONNECTION_PASSWORD, // .env.local variable
  });
  
export default sql;
