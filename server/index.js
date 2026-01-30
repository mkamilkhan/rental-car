// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/cars', require('./routes/cars'));
// app.use('/api/bookings', require('./routes/bookings'));
// app.use('/api/admin', require('./routes/admin'));
// app.use('/api/contact', require('./routes/contact'));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rental-car-booking', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Initialize default admin user
// const User = require('./models/User');
// const bcrypt = require('bcryptjs');

// async function initializeAdmin() {
//   try {
//     const adminExists = await User.findOne({ email: 'admin@admin.com' });
//     if (!adminExists) {
//       const hashedPassword = await bcrypt.hash('admin123', 10);
//       await User.create({
//         name: 'Admin',
//         email: 'admin@admin.com',
//         password: hashedPassword,
//         role: 'admin'
//       });
//       console.log('Default admin user created: admin@admin.com / admin123');
//     }
//   } catch (error) {
//     console.error('Error initializing admin:', error);
//   }
// }

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   initializeAdmin();
// });




// Middlewareconst express = require("express");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

const User = require("./models/User");

// ROUTES
const paymentRoutes = require("./routes/payment");
const authRoutes = require("./routes/auth");
const carRoutes = require("./routes/cars");
const bookingRoutes = require("./routes/bookings");
const adminRoutes = require("./routes/admin");
const contactRoutes = require("./routes/contact");
const blogRoutes = require("./routes/blogs");

const app = express();

/* =======================
   GLOBAL MIDDLEWARE
======================= */
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://offroad-rental-client.onrender.com',
    'https://offroad-rental-admin.onrender.com',
    // Add your custom domains here if you have them
    // 'https://www.offroadrentalhub.com',
    // 'https://admin.offroadrentalhub.com'
  ],
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/uploads", express.static("uploads"));

/* =======================
   API ROUTES (FIRST)
======================= */
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);

/* =======================
   SERVE FRONTEND (REACT) - Only in development
======================= */
// Only serve build folder if it exists (for local development)
// In production, frontend is deployed separately
if (process.env.NODE_ENV !== 'production') {
  const buildPath = path.join(__dirname, "build");
  const fs = require('fs');
  if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));
    app.get("*", (req, res) => {
      if (req.path.startsWith("/api/")) {
        return res.status(404).json({ message: "API endpoint not found" });
      }
      res.sendFile(path.join(buildPath, "index.html"));
    });
  }
}

// Production: Only API routes, no frontend serving
if (process.env.NODE_ENV === 'production') {
  app.get("/", (req, res) => {
    res.json({ 
      message: "Backend API Server", 
      status: "running",
      endpoints: [
        "/api/auth",
        "/api/cars", 
        "/api/bookings", 
        "/api/admin", 
        "/api/payment", 
        "/api/contact"
      ]
    });
  });
  
  // Catch all other non-API routes
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api/")) {
      return res.status(404).json({ message: "API endpoint not found", path: req.path });
    }
    res.status(404).json({ 
      message: "Not Found",
      info: "This is a backend API server. Frontend is deployed separately.",
      availableEndpoints: "/api/auth, /api/cars, /api/bookings, /api/admin, /api/payment, /api/contact"
    });
  });
}

/* =======================
   MONGODB CONNECTION
======================= */
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("❌ MONGODB_URI is not defined in .env file");
      return false;
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
    });
    
    console.log("✅ MongoDB Atlas Connected Successfully");
    return true;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    
    if (err.message.includes("IP")) {
      console.error("\n⚠️  IP WHITELIST ISSUE DETECTED!");
      console.error("📋 To fix this:");
      console.error("1. Go to: https://cloud.mongodb.com/");
      console.error("2. Select your cluster");
      console.error("3. Click 'Network Access' → 'IP Access List'");
      console.error("4. Click 'Add IP Address'");
      console.error("5. Click 'Allow Access from Anywhere' (0.0.0.0/0) for development");
      console.error("   OR add your current IP address");
      console.error("6. Wait 1-2 minutes for changes to apply");
      console.error("\n💡 For production, use specific IP addresses only!\n");
    }
    
    return false;
  }
};

/* =======================
   DEFAULT ADMIN SETUP
======================= */
async function initializeAdmin() {
  // Wait for MongoDB connection
  if (mongoose.connection.readyState !== 1) {
    console.log("⏳ Waiting for MongoDB connection before initializing admin...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (mongoose.connection.readyState !== 1) {
      console.error("❌ Cannot initialize admin - MongoDB not connected");
      return;
    }
  }

  try {
    const adminExists = await User.findOne({ email: "admin@admin.com" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "Admin",
        email: "admin@admin.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("✅ Default admin created (admin@admin.com / admin123)");
    } else {
      console.log("ℹ️  Admin user already exists");
    }
  } catch (error) {
    console.error("❌ Admin init error:", error.message);
  }
}

/* =======================
   START SERVER
======================= */
const PORT = process.env.PORT || 5000;

// Start server and connect to MongoDB
const startServer = async () => {
  // Connect to MongoDB first
  const dbConnected = await connectDB();
  
  if (!dbConnected) {
    console.error("\n⚠️  WARNING: Server starting without database connection!");
    console.error("   Some features may not work properly.\n");
  }

  // Start server
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    
    // Initialize admin after server starts (if DB is connected)
    if (dbConnected) {
      initializeAdmin();
    }
  });
};

startServer();
