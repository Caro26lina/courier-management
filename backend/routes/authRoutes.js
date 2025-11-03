const express = require("express");
const { register, userLogin, adminLogin } = require("../controllers/authController");

const router = express.Router();

// ✅ USER REGISTER
router.post("/register", register);

// ✅ USER LOGIN
router.post("/user/login", userLogin);

// ✅ ADMIN LOGIN
router.post("/admin/login", adminLogin);

module.exports = router;
