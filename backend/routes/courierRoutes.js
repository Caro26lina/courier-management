// routes/courierRoutes.js
const express = require("express");
const {
  addCourier,
  getUserCouriers,
  getAllCouriers,
  updateCourier,
  deleteCourier,
} = require("../controllers/courierController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// ✅ USER ROUTES
router.post("/add", authMiddleware, addCourier);
router.get("/myCouriers", authMiddleware, getUserCouriers);

// ✅ ADMIN ROUTES → (Admin only)
router.get("/admin/all", authMiddleware, adminMiddleware, getAllCouriers);

// ✅ COMMON ROUTES (for update & delete)
router.put("/update/:id", authMiddleware, adminMiddleware, updateCourier);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteCourier);

module.exports = router;
