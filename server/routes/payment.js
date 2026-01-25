const express = require("express");
const Stripe = require("stripe");
const router = express.Router();
const Booking = require("../models/Booking");
const Car = require("../models/Car");

// Validate Stripe key before initializing
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ STRIPE_SECRET_KEY is not set in environment variables");
}

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

// Create checkout session
router.post("/create-checkout-session", async (req, res) => {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      console.error("❌ Stripe is not configured. STRIPE_SECRET_KEY is missing.");
      return res.status(500).json({ 
        error: "Payment service is not configured. Please contact support." 
      });
    }

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
      duration,
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
        duration: duration || req.body.duration || "60min",
        totalPrice: amount.toString(),
        paymentMethod: "card"
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error("❌ Stripe error:", err);
    
    // Better error messages for common issues
    let errorMessage = "Payment processing failed. Please try again.";
    
    if (err.type === 'StripeInvalidRequestError') {
      if (err.message.includes('API key')) {
        errorMessage = "Invalid Stripe API key. Please check server configuration.";
      } else if (err.message.includes('currency')) {
        errorMessage = "Invalid currency. Please use a valid currency code.";
      } else {
        errorMessage = err.message || "Invalid payment request.";
      }
    } else if (err.type === 'StripeAuthenticationError') {
      errorMessage = "Stripe authentication failed. Please check API key configuration.";
    } else if (err.type === 'StripeAPIError') {
      errorMessage = "Stripe API error. Please try again later.";
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    res.status(500).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Verify payment and create booking
router.post("/verify-payment", async (req, res) => {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      console.error("❌ Stripe is not configured. STRIPE_SECRET_KEY is missing.");
      return res.status(500).json({ 
        error: "Payment service is not configured. Please contact support." 
      });
    }

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
    console.error("❌ Payment verification error:", err);
    
    let errorMessage = "Payment verification failed. Please contact support.";
    
    if (err.type === 'StripeInvalidRequestError') {
      if (err.message.includes('API key')) {
        errorMessage = "Invalid Stripe API key. Please check server configuration.";
      } else {
        errorMessage = err.message || "Invalid payment session.";
      }
    } else if (err.type === 'StripeAuthenticationError') {
      errorMessage = "Stripe authentication failed. Please check API key configuration.";
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    res.status(500).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router;
