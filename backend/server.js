// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const courierRoutes = require("./routes/courierRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Debug Middleware (shows incoming request path)
app.use((req, res, next) => {
  console.log(`📩 Request: ${req.method} ${req.path}`);
  next();
});

// ✅ API ROUTES
app.use("/api/courier", courierRoutes);
app.use("/api/auth", authRoutes);

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("✅ Courier Management Backend Running Successfully");
});

// ✅ MongoDB Connection (updated for Atlas)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
