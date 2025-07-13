import express from "express";
import next from "next";
import bodyParser from "body-parser";
import mysql from "mysql";
import Cors from "cors";
import pkf from "@next/env";

const { loadEnvConfig } = pkf;
loadEnvConfig(process.cwd());

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
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
};
console.log("bbb", dbConfig);

const pool = mysql.createPool(dbConfig);
app.prepare().then(async () => {
  const server = express();
  server.use(bodyParser.json());
  server.get("/api/users", async (req, res) => {
    await cors(req, res);
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        return res.status(500).json({ error: "Database connection error" });
      }
      connection.query(
        "SELECT count(*) as count, log_email as email FROM `logs` where log_source = 'self' and log_user_id != 'XXX' GROUP BY log_email order by count desc",
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
  //   server.post("/api/user", async (req, res) => {
  //     await cors(req, res);
  //     return res.status(200).json({ message: "Success" });
  //   });
  server.all("/*any", (req, res) => {
    return handle(req, res);
  });
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
