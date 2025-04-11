import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";

const server = express();
const router = jsonServer.router("./data/db.json");
const middlewares = jsonServer.defaults();

// 🧱 Set access rules
const rules = auth.rewriter({
  products: 444,
  featured_products: 444,
  orders: 660,
  users: 600,
});

// 🌐 CORS setup
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

// 🔁 Apply middlewares in order
server.use(rules);        // Rewrite routes
server.use(auth);         // Auth middleware
server.use(middlewares);  // Logger, static, etc.
server.use("", router);  // API base path

// 🛠 Error handler
server.use((err, req, res, next) => {
  console.error("Backend error:", err.stack);
  res.status(500).send("Something went wrong on the server!");
});

// 🔊 Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
