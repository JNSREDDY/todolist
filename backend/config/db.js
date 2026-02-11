import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT)
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err); // shows exact error
  } else {
    console.log("MySQL Connected");
  }
});
