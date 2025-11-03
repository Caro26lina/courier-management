const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

mongoose.connect("mongodb://localhost:27017/courierDB")
  .then(() => console.log("✅ Connected to DB"))
  .catch(err => console.log(err));

async function createAdmin() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.updateOne(
    { email: "admin@gmail.com" },
    {
      $set: {
        username: "Admin",
        password: hashedPassword,
        role: "admin"
      }
    },
    { upsert: true }
  );

  console.log("✅ Admin updated/created successfully");
  process.exit();
}

createAdmin();
