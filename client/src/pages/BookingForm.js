import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";
import {
  Check,
  CheckCircle2,
  X,
  Mail
} from "lucide-react";
import { useCurrency } from '../context/CurrencyContext';
import "./BookingForm.css";

/* ================= SUCCESS MODAL ================= */
const SuccessModal = ({ open, onClose, bookingDetails }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <CheckCircle2 size={60} color="#22c55e" />
          <h2>Booking Confirmed</h2>
          <p>Email sent successfully</p>
        </div>

        <div className="modal-body">
          <p><strong>Vehicle:</strong> {bookingDetails.carName}</p>
          <p><strong>Total:</strong> {bookingDetails.totalPrice} {bookingDetails.currency}</p>
          <p><strong>Email:</strong> {bookingDetails.customerEmail}</p>
        </div>

        <button className="btn-submit" onClick={onClose}>
          <Check /> Done
        </button>
      </div>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */
const BookingForm = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { currency, getCurrencySymbol } = useCurrency();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    contactNumber: "",
    selectedDate: "",
    adults: 1,
    pickupLocation: "normal",
    duration: "60min" // Default duration
  });

  const paymentVerifiedRef = useRef(false);

  /* ================= FETCH CAR ================= */
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/cars/${carId}`,
          { timeout: 10000 } // 10 second timeout
        );
        setCar(res.data);
      } catch (err) {
        console.error("Error fetching car:", err);
        if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
          alert("Request timed out. Please check your internet connection and try again.");
        } else if (err.response?.status === 500) {
          alert("Server error. Please check if the database is connected and try again.");
        } else if (err.response?.status === 404) {
          alert("Car not found. Please check the URL and try again.");
        } else {
          alert("Failed to load car details. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    if (carId) {
      fetchCar();
    }
  }, [carId]);

  /* ================= VERIFY PAYMENT AND CREATE BOOKING ================= */
  const verifyPaymentAndCreateBooking = useCallback(async (sessionId) => {
    if (!sessionId || paymentVerifiedRef.current) return;
    
    paymentVerifiedRef.current = true;
    
    try {
      setPaymentLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payment/verify-payment`,
        { sessionId }
      );

      if (res.data.success && res.data.booking) {
        // Send email notification
        try {
          if (process.env.REACT_APP_EMAILJS_SERVICE_ID) {
            await emailjs.send(
              process.env.REACT_APP_EMAILJS_SERVICE_ID,
              process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
              {
                vehicle_name: res.data.booking.car?.name || car?.name || "Car",
                customer_name: res.data.booking.customerName,
                customer_email: res.data.booking.customerEmail,
                total_price: res.data.booking.totalPrice,
                payment_method: "Card"
              },
              process.env.REACT_APP_EMAILJS_PUBLIC_KEY
            );
          }
        } catch (emailErr) {
          console.error("Email sending error:", emailErr);
        }

        // Show success modal
        setShowSuccess(true);
        setPaymentLoading(false);
        
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (err) {
      console.error("Payment verification error:", err);
      alert(err.response?.data?.error || "Failed to verify payment. Please contact support.");
      setPaymentLoading(false);
      paymentVerifiedRef.current = false; // Reset on error
    }
  }, [car]);

  /* ================= CHECK FOR PAYMENT SUCCESS ================= */
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId && !paymentLoading && !paymentVerifiedRef.current) {
      verifyPaymentAndCreateBooking(sessionId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ================= HELPERS ================= */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const totalDays = 1; // Single day booking

  const calculateTotal = () => {
    if (!car) return 0;
    let total = 0;
    
    // Get price based on selected duration
    switch (formData.duration) {
      case "30min":
        total = Number(car.price30min) || 0;
        break;
      case "60min":
        total = Number(car.price60min) || 0;
        break;
      case "90min":
        total = Number(car.price90min) || 0;
        break;
      case "120min":
        total = Number(car.price120min) || 0;
        break;
      default:
        total = Number(car.price60min) || Number(car.price30min) || 0;
    }
    
    if (formData.pickupLocation === "private") total += 300;
    return total;
  };

  /* ================= FORM SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    setShowPayment(true);
  };

  /* ================= STRIPE PAYMENT ================= */
  const handleStripePayment = async () => {
    const totalAmount = Number(calculateTotal());
    if (!totalAmount || totalAmount <= 0) {
      alert("Invalid amount");
      return;
    }

    if (!formData.customerName || !formData.customerEmail || !formData.selectedDate) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setPaymentLoading(true);
      const res =       await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payment/create-checkout-session`,
        {
          amount: totalAmount,
          carId: car._id,
          carName: car.name,
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          contactNumber: formData.contactNumber,
          startDate: formData.selectedDate,
          endDate: formData.selectedDate,
          totalDays,
          pickupLocation: formData.pickupLocation,
          duration: formData.duration,
          adults: formData.adults,
          currency: currency
        }
      );
      
      // Redirect to Stripe Checkout
      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err) {
      console.error("Stripe payment error:", err);
      alert(err.response?.data?.error || "Payment failed. Please try again.");
      setPaymentLoading(false);
    }
  };


  /* ================= CASH BOOKING ================= */
  const confirmCashBooking = async () => {
    try {
      setSubmitting(true);

      await axios.post(`${process.env.REACT_APP_API_URL}/api/bookings`, {
        carId: car._id,
        carName: car.name,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        contactNumber: formData.contactNumber,
        startDate: formData.selectedDate,
        endDate: formData.selectedDate,
        totalDays,
        pickupLocation: formData.pickupLocation,
        duration: formData.duration,
        adults: formData.adults,
        totalPrice: calculateTotal(),
        paymentMethod: "cash"
      });

      // Email non-blocking
      emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          vehicle_name: car.name,
          customer_name: formData.customerName,
          customer_email: formData.customerEmail,
          total_price: calculateTotal(),
          payment_method: "Cash"
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      ).then(() => console.log("Email sent")).catch(err => console.error(err));

      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    setShowPayment(false);
    setPaymentMethod("");
    setFormData({
      customerName: "",
      customerEmail: "",
      contactNumber: "",
      selectedDate: "",
      adults: 1,
      pickupLocation: "normal",
      duration: "60min"
    });
    navigate("/");
  };

  /* ================= UI ================= */
  if (loading) {
    return (
      <div className="bg-gradient-main min-h-screen flex items-center justify-center">
        <p className="loading text-white text-xl">Loading…</p>
      </div>
    );
  }
  
  if (!car) {
    return (
      <div className="bg-gradient-main min-h-screen flex items-center justify-center">
        <p className="loading text-white text-xl">Car not found</p>
      </div>
    );
  }

  return (
    <div className="booking-form-page" style={{ backgroundImage: `url(${car.image})` }}>
      <div className="booking-form-overlay"></div>
      <div className="booking-form-container">
        <div className="booking-form-wrapper">
          <form onSubmit={handleSubmit} className="booking-form-new">
            <h2 className="booking-form-title">Booking Details</h2>
            
            <div className="form-group-new">
              <input 
                name="customerName" 
                placeholder="Enter your name" 
                required 
                value={formData.customerName} 
                onChange={handleChange} 
                className="form-input-new"
              />
            </div>

            <div className="form-group-new">
              <input 
                name="customerEmail" 
                type="email" 
                placeholder="Enter your email" 
                required 
                value={formData.customerEmail} 
                onChange={handleChange} 
                className="form-input-new"
              />
            </div>

            <div className="form-group-new">
              <input 
                name="contactNumber" 
                placeholder="Contact Number" 
                required 
                value={formData.contactNumber} 
                onChange={handleChange} 
                className="form-input-new"
              />
            </div>

            <div className="form-group-new">
              <input 
                name="selectedDate" 
                type="date" 
                required 
                value={formData.selectedDate} 
                onChange={handleChange} 
                className="form-input-new"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group-new">
              <input 
                name="adults" 
                type="number" 
                min="1"
                placeholder="Adults" 
                required 
                value={formData.adults} 
                onChange={handleChange} 
                className="form-input-new"
              />
            </div>

            <div className="form-group-new">
              <select 
                name="duration" 
                value={formData.duration} 
                onChange={handleChange} 
                className="form-input-new"
                required
              >
                <option value="">Select Duration</option>
                {car.price30min != null && <option value="30min">30 Minutes - {car.price30min} {getCurrencySymbol(currency)}</option>}
                {car.price60min != null && <option value="60min">60 Minutes - {car.price60min} {getCurrencySymbol(currency)}</option>}
                {car.price90min != null && <option value="90min">90 Minutes - {car.price90min || 0} {getCurrencySymbol(currency)}</option>}
                {car.price120min != null && <option value="120min">120 Minutes - {car.price120min || 0} {getCurrencySymbol(currency)}</option>}
              </select>
            </div>

            <div className="form-group-new">
              <select 
                name="pickupLocation" 
                value={formData.pickupLocation} 
                onChange={handleChange} 
                className="form-input-new"
              >
                <option value="normal">Normal Pickup</option>
                <option value="private">Private 4x4 (+300)</option>
              </select>
            </div>

            <div className="form-group-new">
              <select 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)} 
                required 
                className="form-input-new"
              >
                <option value="">Select Payment Method</option>
                <option value="card">Card (Stripe)</option>
                <option value="cash">Cash</option>
              </select>
            </div>

            <div className="total-price-display">
              <div className="price-row">
                <span>Duration:</span>
                <span>
                  {formData.duration === "30min" && car.price30min && `${car.price30min} ${getCurrencySymbol(currency)}`}
                  {formData.duration === "60min" && car.price60min && `${car.price60min} ${getCurrencySymbol(currency)}`}
                  {formData.duration === "90min" && car.price90min && `${car.price90min} ${getCurrencySymbol(currency)}`}
                  {formData.duration === "120min" && car.price120min && `${car.price120min} ${getCurrencySymbol(currency)}`}
                </span>
              </div>
              {formData.pickupLocation === "private" && (
                <div className="price-row">
                  <span>Private 4x4:</span>
                  <span>+300 {getCurrencySymbol(currency)}</span>
                </div>
              )}
              <div className="price-row total">
                <span>Total:</span>
                <span>{calculateTotal()} {getCurrencySymbol(currency)}</span>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-booking-submit"
              disabled={paymentLoading || submitting}
            >
              {paymentLoading ? "Processing…" : submitting ? "Submitting…" : "Book Now"}
            </button>
          </form>

          {showPayment && paymentMethod === "card" && (
            <div className="payment-modal-overlay">
              <div className="payment-modal">
                <h3>Confirm Payment</h3>
                <p className="payment-amount">Total Amount: {calculateTotal()} {car.currency || "AED"}</p>
                <div className="payment-modal-buttons">
                  <button 
                    className="btn-pay-now" 
                    onClick={handleStripePayment} 
                    disabled={paymentLoading}
                  >
                    {paymentLoading ? "Processing…" : `Pay ${calculateTotal()} ${getCurrencySymbol(currency)}`}
                  </button>
                  <button 
                    className="btn-cancel-payment" 
                    onClick={() => setShowPayment(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {showPayment && paymentMethod === "cash" && (
            <div className="payment-modal-overlay">
              <div className="payment-modal">
                <h3>Confirm Booking</h3>
                <p className="payment-amount">Total Amount: {calculateTotal()} {car.currency || "AED"}</p>
                <div className="payment-modal-buttons">
                  <button 
                    className="btn-pay-now" 
                    onClick={confirmCashBooking} 
                    disabled={submitting}
                  >
                    {submitting ? "Processing…" : "Confirm Booking"}
                  </button>
                  <button 
                    className="btn-cancel-payment" 
                    onClick={() => setShowPayment(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <SuccessModal
        open={showSuccess}
        onClose={closeSuccess}
        bookingDetails={{
          carName: car.name,
          customerEmail: formData.customerEmail,
          totalPrice: calculateTotal(),
          currency: currency
        }}
      />
    </div>
  );
};

export default BookingForm;
