import mysql from "mysql2";

const connection = mysql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  socketPath: process.env.DB_SOCKET_PATH, // like /cloudsql/project:region:instance
});




connection.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
  } else {
    console.log("✅ Connected via socket to Cloud SQL!");
  }
});

export default connection;