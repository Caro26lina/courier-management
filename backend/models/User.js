const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", trim: true },
  },
  { timestamps: true } // 👈 Optional but useful for createdAt / updatedAt
);

module.exports = mongoose.model("User", userSchema);
