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
    folder: 'cars',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'mp4', 'mov', 'MOV', 'MP4'],
    resource_type: 'auto' // Automatically detect image or video
  }
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

    console.log('📋 Admin bookings fetched:', {
      total: bookings.length,
      cash: bookings.filter(b => b.paymentMethod === 'cash').length,
      card: bookings.filter(b => b.paymentMethod === 'card').length,
      withCar: bookings.filter(b => b.car).length,
      withoutCar: bookings.filter(b => !b.car).length
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Admin bookings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
/* ================= CREATE BOOKING ================= */
/* ================= CREATE BOOKING ================= */
router.post('/bookings', async (req, res) => {
  try {
    const {
      carId,
      carName,
      customerName,
      customerEmail,
      contactNumber,
      startDate,
      endDate,
      totalDays,
      pickupLocation,
      totalPrice
    } = req.body;

    if (!carId || !customerName || !customerEmail || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const booking = await Booking.create({
      car: carId,
      carName,
      customerName,
      customerEmail,
      contactNumber,
      startDate,
      endDate,
      totalDays,
      pickupLocation,
      totalPrice,
      status: "pending"
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ message: "Failed to create booking", error: error.message });
  }
});


/* ================= ADD CAR ================= */
router.post('/cars', adminAuth, upload.single('image'), async (req, res) => {
  try {
    console.log('📝 Creating car - Body:', req.body);
    console.log('📝 Creating car - File:', req.file ? 'File received' : 'No file');
    
    // Convert empty strings to null/undefined for optional fields
    const carData = { ...req.body };
    
    // Validate required fields
    if (!carData.name || !carData.brand || !carData.model) {
      return res.status(400).json({ 
        message: 'Missing required fields: name, brand, and model are required' 
      });
    }

    if (!carData.seats || isNaN(Number(carData.seats))) {
      return res.status(400).json({ 
        message: 'Seats must be a valid number' 
      });
    }

    if (!carData.year || isNaN(Number(carData.year))) {
      return res.status(400).json({ 
        message: 'Year must be a valid number' 
      });
    }

    // Convert types
    carData.year = Number(carData.year);
    carData.seats = Number(carData.seats);
    
    // Handle boolean
    if (carData.available === 'true' || carData.available === true) {
      carData.available = true;
    } else {
      carData.available = false;
    }
    
    // Handle price fields - convert empty strings to undefined
    if (carData.price30min === '' || carData.price30min === null || carData.price30min === undefined) {
      carData.price30min = undefined;
    } else {
      carData.price30min = Number(carData.price30min);
    }
    
    if (carData.price60min === '' || carData.price60min === null || carData.price60min === undefined) {
      carData.price60min = undefined;
    } else {
      carData.price60min = Number(carData.price60min);
    }
    
    if (carData.price90min === '' || carData.price90min === null || carData.price90min === undefined) {
      carData.price90min = undefined;
    } else {
      carData.price90min = Number(carData.price90min);
    }
    
    if (carData.price120min === '' || carData.price120min === null || carData.price120min === undefined) {
      carData.price120min = undefined;
    } else {
      carData.price120min = Number(carData.price120min);
    }
    
    // Handle image - check Cloudinary config first
    let imageUrl = null;
    if (req.file) {
      imageUrl = req.file.path || req.file.secure_url;
      console.log('📸 Image uploaded to Cloudinary:', imageUrl);
    } else if (!carData.image) {
      return res.status(400).json({ 
        message: 'Image is required for new cars' 
      });
    } else {
      imageUrl = carData.image;
    }
    
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME && req.file) {
      console.warn('⚠️ Cloudinary not configured, but file was uploaded');
    }
    
    const car = await Car.create({
      ...carData,
      image: imageUrl,
    });

    console.log('✅ Car created successfully:', car._id);
    res.status(201).json(car);
  } catch (error) {
    console.error('❌ Error creating car:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message).join(', ');
      return res.status(400).json({ 
        message: 'Validation error', 
        error: errors
      });
    }
    
    // Handle Cloudinary errors
    if (error.message && error.message.includes('cloudinary')) {
      return res.status(500).json({ 
        message: 'Image upload failed. Please check Cloudinary configuration.', 
        error: error.message
      });
    }
    
    res.status(500).json({ 
      message: 'Failed to add car', 
      error: error.message,
      details: error.errors || error.stack
    });
  }
});

/* ================= UPDATE CAR ================= */
router.put('/cars/:id', adminAuth, upload.single('image'), async (req, res) => {
  try {
    console.log('📝 Updating car - ID:', req.params.id);
    console.log('📝 Updating car - Body:', req.body);
    console.log('📝 Updating car - File:', req.file);
    
    const updateData = { ...req.body };
    
    // Convert types if provided
    if (updateData.year !== undefined) {
      updateData.year = Number(updateData.year);
    }
    
    if (updateData.seats !== undefined) {
      updateData.seats = Number(updateData.seats);
    }
    
    // Handle boolean
    if (updateData.available === 'true' || updateData.available === true) {
      updateData.available = true;
    } else if (updateData.available === 'false' || updateData.available === false) {
      updateData.available = false;
    }
    
    // Handle price fields - convert empty strings to undefined
    if (updateData.price30min === '' || updateData.price30min === null || updateData.price30min === undefined) {
      updateData.price30min = undefined;
    } else {
      updateData.price30min = Number(updateData.price30min);
    }
    
    if (updateData.price60min === '' || updateData.price60min === null || updateData.price60min === undefined) {
      updateData.price60min = undefined;
    } else {
      updateData.price60min = Number(updateData.price60min);
    }
    
    if (updateData.price90min === '' || updateData.price90min === null || updateData.price90min === undefined) {
      updateData.price90min = undefined;
    } else {
      updateData.price90min = Number(updateData.price90min);
    }
    
    if (updateData.price120min === '' || updateData.price120min === null || updateData.price120min === undefined) {
      updateData.price120min = undefined;
    } else {
      updateData.price120min = Number(updateData.price120min);
    }

    if (req.file) {
      updateData.image = req.file.path || req.file.secure_url; // Cloudinary URL
    }

    const car = await Car.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });

    if (!car) return res.status(404).json({ message: 'Car not found' });

    console.log('✅ Car updated successfully:', car._id);
    res.json(car);
  } catch (error) {
    console.error('❌ Error updating car:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      details: error.errors || error
    });
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
