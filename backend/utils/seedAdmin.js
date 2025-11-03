// utils/seedAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');

const seed = async () => {
  await connectDB(process.env.MONGO_URI);
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPass = process.env.ADMIN_PASS || 'Admin@123';

  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = new User({
      name: 'Admin',
      email: adminEmail,
      password: adminPass,
      role: 'admin'
    });
    await admin.save();
    console.log('Admin created:', adminEmail, adminPass);
  } else {
    console.log('Admin already exists:', adminEmail);
  }
  mongoose.connection.close();
};

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
