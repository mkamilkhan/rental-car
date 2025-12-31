const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Car = require('../models/Car');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const twilio = require('twilio');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Create booking (auth optional - for admin only, users can book without login)
router.post('/', async (req, res) => {
  try {
    const { carId, startDate, endDate, pickupLocation, contactNumber, customerEmail, customerName } = req.body;
    
    // If user is logged in (admin), use their info, otherwise require email
    let userEmail, userName, userId;
    
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (user) {
          userEmail = user.email;
          userName = user.name;
          userId = user._id;
        }
      } catch (err) {
        // Token invalid or expired, continue without user
      }
    }
    
    // Use provided email or logged in user's email
    const finalEmail = customerEmail || userEmail;
    const finalName = customerName || userName;
    
    if (!finalEmail) {
      return res.status(400).json({ message: 'Email is required' });
    }

    if (!carId || !startDate || !endDate) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    // Availability check removed - allow all bookings
    // const existingBooking = await Booking.findOne({
    //   car: carId,
    //   status: { $in: ['pending', 'confirmed'] },
    //   $or: [
    //     { startDate: { $lte: end }, endDate: { $gte: start } }
    //   ]
    // });

    // if (existingBooking) {
    //   return res.status(400).json({ message: 'Car is not available for the selected dates' });
    // }

    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    // Use price60min if available, otherwise pricePerDay
    const pricePerDay = car.price60min ? car.price60min : car.pricePerDay;
    const totalPrice = totalDays * pricePerDay;

    const booking = await Booking.create({
      user: userId || null,
      customerEmail: finalEmail,
      customerName: finalName || '',
      car: carId,
      startDate: start,
      endDate: end,
      totalDays,
      totalPrice,
      pickupLocation: pickupLocation || '',
      contactNumber: contactNumber || ''
    });

    await booking.populate('car');
    if (booking.user) {
      await booking.populate('user', 'name email');
    }

    // Get admin email and WhatsApp - Always send to m.kamil.se@gmail.com and 03358395531
    const adminEmail = 'm.kamil.se@gmail.com';
    const adminWhatsApp = '03358395531';

    // Prepare booking message for admin
    const bookingMessage = `🚗 *New Booking Confirmed*\n\n` +
      `*Vehicle:* ${car.name}\n` +
      `*Brand/Model:* ${car.brand} ${car.model} (${car.year})\n` +
      `*Customer Name:* ${finalName || 'N/A'}\n` +
      `*Email:* ${finalEmail}\n` +
      `*Contact Number:* ${contactNumber || 'N/A'}\n` +
      `*Start Date:* ${new Date(startDate).toLocaleDateString('en-GB')}\n` +
      `*End Date:* ${new Date(endDate).toLocaleDateString('en-GB')}\n` +
      `*Total Days:* ${totalDays}\n` +
      `*Pickup Location:* ${pickupLocation || 'N/A'}\n` +
      `*Total Price:* ${totalPrice} ${car.currency || 'AED'}\n\n` +
      `*Booking ID:* ${booking._id}\n\n` +
      `New booking received! 🎉`;

    // Send Email to Admin - Always try to send
    let isEmailConfigured = false;
    let emailSent = false;
    
    try {
      // Check if email is configured - exclude example passwords
      const examplePasswords = [
        'your-app-password',
        'semikhan',
        'programmer',
        'abcd efgh ijkl mnop',
        'wxyz abcd efgh ijkl'
      ];
      
      isEmailConfigured = process.env.EMAIL_USER && 
                                process.env.EMAIL_PASS && 
                                process.env.EMAIL_USER !== 'your-email@gmail.com' &&
                                process.env.EMAIL_USER !== '' &&
                                process.env.EMAIL_PASS !== '' &&
                                !examplePasswords.includes(process.env.EMAIL_PASS.trim());

      console.log('\n📧 ===== BOOKING EMAIL NOTIFICATION =====');
      console.log('Target Email: m.kamil.se@gmail.com');
      console.log('Email Configured:', isEmailConfigured);
      console.log('EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');
      console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET (length: ' + process.env.EMAIL_PASS.length + ')' : 'NOT SET');

      if (isEmailConfigured) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const adminMailOptions = {
          from: process.env.EMAIL_USER,
          to: adminEmail,
          subject: `🚗 New Booking: ${car.name} - ${finalName || 'Guest'}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #ff6b35;">🚗 New Booking Confirmed</h2>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e3c72; margin-top: 0;">Booking Details</h3>
                <p><strong>Vehicle:</strong> ${car.name}</p>
                <p><strong>Brand/Model:</strong> ${car.brand} ${car.model} (${car.year})</p>
                <p><strong>Customer Name:</strong> ${finalName || 'N/A'}</p>
                <p><strong>Email:</strong> ${finalEmail}</p>
                <p><strong>Contact Number:</strong> ${contactNumber || 'N/A'}</p>
                <p><strong>Start Date:</strong> ${new Date(startDate).toLocaleDateString('en-GB')}</p>
                <p><strong>End Date:</strong> ${new Date(endDate).toLocaleDateString('en-GB')}</p>
                <p><strong>Total Days:</strong> ${totalDays}</p>
                <p><strong>Pickup Location:</strong> ${pickupLocation || 'N/A'}</p>
                <p><strong>Total Price:</strong> ${totalPrice} ${car.currency || 'AED'}</p>
                <p><strong>Booking ID:</strong> ${booking._id}</p>
              </div>
              <p style="color: #666; font-size: 12px;">
                This email was sent from the OFFROAD RENTALHUB booking system.
              </p>
            </div>
          `
        };

        await transporter.sendMail(adminMailOptions);
        emailSent = true;
        console.log('✅ Email sent successfully to:', adminEmail);
        console.log('📧 Booking details sent via email');
        console.log('==========================================\n');
      } else {
        console.log('\n❌ ===== EMAIL NOT CONFIGURED =====');
        console.log('Email will NOT be sent!');
        console.log('\n⚠️  Current EMAIL_PASS value:', process.env.EMAIL_PASS || 'NOT SET');
        console.log('\n❌ PROBLEM:');
        if (examplePasswords.includes((process.env.EMAIL_PASS || '').trim())) {
          console.log('You are using an EXAMPLE password!');
          console.log('Example passwords like "abcd efgh ijkl mnop" will NOT work!');
          console.log('You MUST generate a REAL App Password from Google.');
        } else if (!process.env.EMAIL_PASS || process.env.EMAIL_PASS === '') {
          console.log('EMAIL_PASS is not set in .env file');
        }
        console.log('\n📋 SOLUTION - Generate REAL App Password:');
        console.log('1. Go to: https://myaccount.google.com/apppasswords');
        console.log('2. Enable 2-Step Verification (if not enabled)');
        console.log('3. Click "Select app" → Choose "Mail"');
        console.log('4. Click "Select device" → Choose "Other (Custom name)"');
        console.log('5. Type "Node.js" and click "Generate"');
        console.log('6. Copy the REAL 16-character password (NOT the example!)');
        console.log('7. Update server/.env file:');
        console.log('   EMAIL_USER=m.kamil.se@gmail.com');
        console.log('   EMAIL_PASS=paste-your-REAL-app-password-here');
        console.log('8. Restart server');
        console.log('\n💡 The password should look like: "wxyz abcd efgh ijkl" (but YOUR actual one!)');
        console.log('==========================================\n');
      }
    } catch (emailError) {
      console.error('\n❌ ===== EMAIL SENDING ERROR =====');
      console.error('Error:', emailError.message);
      console.error('Code:', emailError.code);
      console.error('Response:', emailError.response);
      
      if (emailError.code === 'EAUTH') {
        console.error('\n⚠️  Authentication failed!');
        console.error('Possible reasons:');
        console.error('1. Wrong password - Use Gmail App Password, not regular password');
        console.error('2. 2-Step Verification not enabled');
        console.error('3. App Password not generated');
        console.error('\nSolution:');
        console.error('1. Go to: https://myaccount.google.com/apppasswords');
        console.error('2. Generate App Password for "Mail"');
        console.error('3. Use that 16-character password in .env file');
      }
      console.error('================================\n');
    }

    // Send WhatsApp to Admin
    try {
      const formattedNumber = adminWhatsApp.replace(/[^0-9]/g, '');
      const whatsappLink = `https://wa.me/92${formattedNumber}?text=${encodeURIComponent(bookingMessage)}`;

      console.log('\n📱 ===== ADMIN WHATSAPP NOTIFICATION =====');
      console.log('Admin Number: 03358395531');
      console.log('Formatted Number: +92' + formattedNumber);
      console.log('\n📋 WhatsApp Message:');
      console.log(bookingMessage);
      console.log('\n🔗 WhatsApp Link (Click to send):');
      console.log(whatsappLink);
      console.log('\n⚠️  AUTOMATIC WHATSAPP SENDING:');
      
      // Try to send via Twilio WhatsApp API if configured
      if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_WHATSAPP_FROM) {
        try {
          const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
          
          await client.messages.create({
            from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
            to: `whatsapp:+92${formattedNumber}`,
            body: bookingMessage
          });
          
          console.log('✅ WhatsApp message sent automatically via Twilio to:', adminWhatsApp);
        } catch (twilioError) {
          console.log('❌ Twilio error:', twilioError.message);
          console.log('💡 Use the WhatsApp link above to send manually');
        }
      } else {
        console.log('❌ Twilio not configured - WhatsApp will NOT be sent automatically');
        console.log('\n📋 To enable automatic WhatsApp sending:');
        console.log('1. Sign up at: https://www.twilio.com (Free trial available)');
        console.log('2. Get WhatsApp API credentials from Twilio dashboard');
        console.log('3. Add to server/.env file:');
        console.log('   TWILIO_ACCOUNT_SID=your_account_sid');
        console.log('   TWILIO_AUTH_TOKEN=your_auth_token');
        console.log('   TWILIO_WHATSAPP_FROM=whatsapp:+14155238886');
        console.log('4. Restart server');
        console.log('\n💡 MANUAL WHATSAPP SENDING (Current Method):');
        console.log('Click this link to send WhatsApp message manually:');
        console.log(whatsappLink);
        console.log('\n📱 Or copy this link and open in browser to send to 03358395531');
      }
      console.log('==============================\n');

      // Store WhatsApp link in response for frontend
      booking.whatsappLink = whatsappLink;
    } catch (whatsappError) {
      console.error('❌ Error in WhatsApp notification:', whatsappError.message);
    }

    // Return booking with notification status
    res.status(201).json({
      ...booking.toObject(),
      notifications: {
        emailSent: emailSent,
        emailConfigured: isEmailConfigured,
        whatsappLink: booking.whatsappLink || null,
        dashboardNotification: true,
        adminEmail: adminEmail,
        adminWhatsApp: adminWhatsApp
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('car')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single booking
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('car')
      .populate('user', 'name email');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns the booking or is admin
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Cancel booking (auth optional - admin can cancel any booking)
router.put('/:id/cancel', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is admin (from token if provided)
    let isAdmin = false;
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const User = require('../models/User');
        const user = await User.findById(decoded.id);
        isAdmin = user && user.role === 'admin';
      } catch (err) {
        // Token invalid, continue
      }
    }

    // Allow cancellation if: user is admin OR booking has no user (guest booking)
    // Admin can cancel any booking
    if (!isAdmin) {
      return res.status(403).json({ message: 'Only admin can cancel bookings' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

