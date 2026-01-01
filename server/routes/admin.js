// server/routes/admin.js
const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const Booking = require('../models/Booking');
const { adminAuth } = require('../middleware/auth');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

/* ================= CLOUDINARY CONFIG ================= */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ================= MULTER + CLOUDINARY ================= */
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'rental-cars',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }],
  },
});

const upload = multer({ storage });

/* ================= BOOKINGS ================= */
router.get('/bookings', adminAuth, async (req, res) => {
  try {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const bookings = await Booking.find({})
      .populate('car')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Admin bookings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/* ================= ADD CAR ================= */
router.post('/cars', adminAuth, upload.single('image'), async (req, res) => {
  try {
    const car = await Car.create({
      ...req.body,
      image: req.file?.path || null, // Cloudinary URL
    });

    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add car', error: error.message });
  }
});

/* ================= UPDATE CAR ================= */
router.put('/cars/:id', adminAuth, upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.path; // Cloudinary URL
    }

    const car = await Car.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!car) return res.status(404).json({ message: 'Car not found' });

    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/* ================= DELETE CAR ================= */
router.delete('/cars/:id', adminAuth, async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/* ================= UPDATE BOOKING STATUS ================= */
router.put('/bookings/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('car').populate('user', 'name email');

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const Car = require('../models/Car');
// const Booking = require('../models/Booking');
// const { adminAuth } = require('../middleware/auth');
// const multer = require('multer');
// const path = require('path');

// // Multer config for image upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // folder to save images
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

// // ======================
// // Get all bookings
// // ======================
// router.get('/bookings', adminAuth, async (req, res) => {
//   try {
//     const bookings = await Booking.find()
//       .populate('car')
//       .populate('user', 'name email')
//       .sort({ createdAt: -1 });
//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // ======================
// // Add new car
// // ======================
// app.post(
//   '/api/admin/cars',
//   upload.single('imageFile'),
//   (req, res) => {
//     console.log(req.body); // 👀 must show all fields
//     console.log(req.file); // 👀 image

//     const car = new Car({
//       ...req.body,
//       image: req.file?.filename || req.body.imageUrl
//     });

//     car.save();
//     res.json({ success: true });
//   }
// );

// console.log(req.body);
// console.log(req.file);


// // ======================
// // Update car
// // ======================
// router.put('/cars/:id', adminAuth, upload.single('image'), async (req, res) => {
//   try {
//     const carData = { ...req.body };
//     if (req.file) {
//       carData.image = req.file.filename; // Update image if new file uploaded
//     }

//     const car = await Car.findByIdAndUpdate(
//       req.params.id,
//       carData,
//       { new: true, runValidators: true }
//     );

//     if (!car) {
//       return res.status(404).json({ message: 'Car not found' });
//     }
//     res.json(car);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // ======================
// // Delete car
// // ======================
// router.delete('/cars/:id', adminAuth, async (req, res) => {
//   try {
//     const car = await Car.findByIdAndDelete(req.params.id);
//     if (!car) {
//       return res.status(404).json({ message: 'Car not found' });
//     }
//     res.json({ message: 'Car deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // ======================
// // Update booking status
// // ======================
// router.put('/bookings/:id/status', adminAuth, async (req, res) => {
//   try {
//     const { status } = req.body;
//     const booking = await Booking.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     ).populate('car').populate('user', 'name email');

//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }
//     res.json(booking);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// module.exports = router;
