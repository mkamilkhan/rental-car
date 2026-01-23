const express = require("express");
const Stripe = require("stripe");
const router = express.Router();
const Booking = require("../models/Booking");
const Car = require("../models/Car");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create checkout session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { 
      amount, 
      carId, 
      carName,
      customerName, 
      customerEmail, 
      contactNumber, 
      startDate, 
      endDate, 
      totalDays, 
      pickupLocation, 
      currency = "aed" 
    } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    if (!carId || !customerEmail || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required booking details" });
    }

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const successUrl = `${frontendUrl}/booking-success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${frontendUrl}/booking/${carId}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: { 
              name: carName || "Car Rental Booking",
              description: `Booking from ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}`
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      metadata: {
        carId,
        carName: carName || "",
        customerName: customerName || "",
        customerEmail,
        contactNumber: contactNumber || "",
        startDate,
        endDate,
        totalDays: totalDays || 1,
        pickupLocation: pickupLocation || "normal",
        duration: req.body.duration || "60min",
        totalPrice: amount.toString(),
        paymentMethod: "card"
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Verify payment and create booking
router.post("/verify-payment", async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: "Session ID is required" });
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    // Check if booking already exists
    const existingBooking = await Booking.findOne({ 
      "paymentInfo.sessionId": sessionId 
    });

    if (existingBooking) {
      return res.json({ 
        success: true, 
        booking: existingBooking,
        message: "Booking already exists" 
      });
    }

    // Extract booking details from metadata
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
      duration,
      totalPrice,
      paymentMethod
    } = session.metadata;

    // Verify car exists
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    // Calculate total days if not provided
    const start = new Date(startDate);
    const end = new Date(endDate);
    const calculatedDays = totalDays ? parseInt(totalDays) : Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

    // Create booking
    const booking = await Booking.create({
      car: carId,
      customerName: customerName || "",
      customerEmail,
      contactNumber: contactNumber || "",
      startDate: start,
      endDate: end,
      totalDays: calculatedDays,
      pickupLocation: pickupLocation || "normal",
      duration: duration || "60min",
      totalPrice: parseFloat(totalPrice),
      paymentMethod: paymentMethod || "card",
      status: "confirmed",
      paymentInfo: {
        sessionId,
        paymentIntentId: session.payment_intent,
        amountPaid: parseFloat(totalPrice),
        currency: session.currency
      }
    });

    await booking.populate('car');
    
    console.log('✅ Card payment booking created:', {
      bookingId: booking._id,
      carId: booking.car?._id,
      carName: booking.car?.name,
      customerEmail: booking.customerEmail,
      paymentMethod: booking.paymentMethod,
      status: booking.status,
      totalPrice: booking.totalPrice
    });

    res.json({ 
      success: true, 
      booking,
      message: "Booking created successfully" 
    });
  } catch (err) {
    console.error("Payment verification error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
