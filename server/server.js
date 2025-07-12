import express from "express";
import next from "next";
import bodyParser from "body-parser";
import mysql from "mysql";
import Cors from "cors";

export default function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) =>
        result instanceof Error ? reject(result) : resolve(result)
      );
    });
}

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const cors = initMiddleware(
  Cors({
    origin: "http://localhost:3001", // Replace with your frontend domain
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

const dbConfig = {
  host: "119.18.54.49",
  user: "ledgerfg_admin",
  password: "Bnisuccess@123",
  database: "ledgerfg_app_production",
  port: "3306",
};

const pool = mysql.createPool(dbConfig);
app.prepare().then(async () => {
  const server = express();
  server.use(bodyParser.json());
  server.get("/api/users/:id", async (req, res) => {
    await cors(req, res);
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        return res.status(500).json({ error: "Database connection error" });
      }
      connection.query(
        "SELECT count(*) as count, log_email as email FROM `logs` GROUP BY log_email order by count desc",
        (error, results) => {
          connection.release(); // Release the connection back to the pool

          if (error) {
            console.error("Error executing query:", error);
            return res.status(500).json({ error: "Database query error" });
          }
          res.json(results);
        }
      );
    });
  });
  server.all("/*any", (req, res) => {
    return handle(req, res);
  });
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
