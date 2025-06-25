// import mysql from "mysql2/promise";

// const connection = mysql.createConnection({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   socketPath: process.env.DB_SOCKET_PATH, // like /cloudsql/project:region:instance
// });




// connection.connect((err) => {
//   if (err) {
//     console.error("❌ DB connection failed:", err);
//   } else {
//     console.log("✅ Connected via socket to Cloud SQL!");
//   }
// });

// export default connection;


// server/config/db.js

import mysql from "mysql2/promise"; // Keep this! This is correct for Promises.

// Create a connection pool instead of a single connection.
// Pools are highly recommended for Cloud Run/serverless to manage connections efficiently.
const pool = mysql.createPool({
  host: 'localhost', // Cloud SQL Proxy listens on localhost
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  socketPath: process.env.DB_SOCKET_PATH, // Your Cloud SQL Unix socket path
  waitForConnections: true, // Ensures connections are queued if max is reached
  connectionLimit: 10,     // Max number of connections in the pool
  queueLimit: 0            // No limit on connection queue
});

// Optional: Test the pool connection when the module loads
// This helps verify the database connection during container startup
pool.getConnection()
  .then(connection => {
    console.log("✅ Connected via socket to Cloud SQL pool!");
    connection.release(); // Release the connection back to the pool immediately after testing
  })
  .catch(err => {
    console.error("❌ DB connection pool failed:", err);
    // For critical startup errors, you might want to exit the process
    // This will cause Cloud Run to restart the container, potentially picking up correct configs.
    process.exit(1);
  });

export default pool; // Export the pool instance for use in your routes