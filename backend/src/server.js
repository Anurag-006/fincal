const express = require("express");
const cors = require("cors");
require("dotenv").config();

const calculateRoutes = require("./routes/calculate");
const exportRoutes    = require("./routes/export");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());

// ── Routes ──────────────────────────────────────────────
app.use("/api/calculate", calculateRoutes);
app.use("/api/export",    exportRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "FinCal API is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`FinCal backend running at http://localhost:${PORT}`);
});
