import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";
import {
  Check,
  CheckCircle2,
  X,
  Mail
} from "lucide-react";
import { useCurrency } from '../context/CurrencyContext';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
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
  const location = useLocation();
  const navigate = useNavigate();
  const { currency, getCurrencySymbol } = useCurrency();
  const { user, token, authLoading } = useContext(AuthContext);


  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("60min"); // Default or from URL

  useEffect(() => {
    if (authLoading) {
      console.log("BookingForm: waiting for auth to finish");
      return;
    }
  
    if (!token) {
      console.log("BookingForm: no token after auth → login");
      navigate('/login');
      return;
    }
  
    console.log("BookingForm: token OK", token.slice(0, 20));
    // continue booking logic here
  
  }, [authLoading, token]);
  
  const [formData, setFormData] = useState({
    customerName: "",
    contactNumber: "",
    pickupLocation: "normal",
  });

  const paymentVerifiedRef = useRef(false);

  // Get duration from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const duration = params.get('duration');
    if (duration) {
      setSelectedDuration(duration);
    }
  }, [location]);

  // Check if user is logged in
  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) {
      return; // Don't do anything while auth is loading
    }
    
    // Check if there's a token from context but user is not set
    // This might happen if AuthContext hasn't finished fetching user yet
    if (token && !user) {
      console.log('BookingForm: Token exists but user not set, waiting for AuthContext to fetch user...');
      // Don't redirect yet, wait a bit more for AuthContext to fetch user
      return;
    }
    
    // If user is already logged in, don't redirect - allow them to use the form
    if (user) {
      console.log('BookingForm: User is logged in, allowing access to form');
      return; // User is logged in, no need to redirect
    }
    
    // Check if we're coming from auth callback (has token in URL)
    const urlParams = new URLSearchParams(window.location.search);
    const hasToken = urlParams.get('token');
    
    // Only redirect if user is NOT logged in AND not coming from callback AND no token from context
    const hasAnyToken = !!token;
    
    if (!user && !hasToken && !hasAnyToken) {
      // Save full path including query params for redirect after login
      const fullPath = location.pathname + location.search;
      console.log('BookingForm: User not logged in and no token. Saving path:', fullPath);
      
      // Save to BOTH localStorage AND sessionStorage
      try {
        localStorage.setItem('from', fullPath);
        sessionStorage.setItem('from', fullPath);
        console.log('BookingForm: Path saved to both storages');
        
        // Verify
        const verifyLocal = localStorage.getItem('from');
        const verifySession = sessionStorage.getItem('from');
        console.log('BookingForm: localStorage path:', verifyLocal);
        console.log('BookingForm: sessionStorage path:', verifySession);
      } catch (error) {
        console.error('BookingForm: Error saving path:', error);
      }
      
      navigate('/login', { replace: false });
    }
  }, [user, authLoading, navigate, location]);

  /* ================= FETCH CAR ================= */
  useEffect(() => {
    const fetchCar = async () => {
      if (!carId) {
        console.error('BookingForm: No carId provided');
        setLoading(false);
        return;
      }
      
      console.log('BookingForm: Fetching car with ID:', carId);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/cars/${carId}`,
          { timeout: 10000 }
        );
        console.log('BookingForm: Car fetched successfully:', res.data);
        setCar(res.data);
      } catch (err) {
        console.error("BookingForm: Error fetching car:", err);
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
        console.log('BookingForm: Loading set to false');
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
      paymentVerifiedRef.current = false;
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
    switch (selectedDuration) {
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

  const getDurationPrice = () => {
    if (!car) return 0;
    switch (selectedDuration) {
      case "30min": return car.price30min || 0;
      case "60min": return car.price60min || 0;
      case "90min": return car.price90min || 0;
      case "120min": return car.price120min || 0;
      default: return car.price60min || car.price30min || 0;
    }
  };

  /* ================= FORM SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    
    // Check if user is logged in - check both user object and token
    const hasToken = !!token;
    const hasUser = !!user?.email;
    const emailFromStorage = localStorage.getItem('userEmail');
    
    // If token exists, proceed (user object will load in background)
    if (hasToken || hasUser || emailFromStorage) {
      setShowPayment(true);
      return;
    }
    
    // No token, no user, no email - need to login
    alert("Please login to continue");
    navigate('/login');
  };

  /* ================= STRIPE PAYMENT ================= */
  const handleStripePayment = async () => {
    const totalAmount = Number(calculateTotal());
    if (!totalAmount || totalAmount <= 0) {
      alert("Invalid amount");
      return;
    }

    if (!formData.customerName || !user?.email) {
      alert("Please fill in all required fields");
      return;
    }

    // Set endDate to next day for single-day bookings
    const today = new Date();
    const endDateObj = new Date(today);
    endDateObj.setDate(endDateObj.getDate() + 1);

    try {
      setPaymentLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payment/create-checkout-session`,
        {
          amount: totalAmount,
          carId: car._id,
          carName: car.name,
          customerName: formData.customerName,
          customerEmail: user?.email || localStorage.getItem('userEmail') || '', // From logged in user
          contactNumber: formData.contactNumber,
          startDate: today.toISOString().split('T')[0],
          endDate: endDateObj.toISOString().split('T')[0],
          totalDays,
          pickupLocation: formData.pickupLocation,
          duration: selectedDuration,
          adults: 1, // Default
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

      const today = new Date();
      const endDateObj = new Date(today);
      endDateObj.setDate(endDateObj.getDate() + 1);

      // Get token for authorization
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      await axios.post(`${process.env.REACT_APP_API_URL}/api/bookings`, {
        carId: car._id,
        carName: car.name,
        customerName: formData.customerName,
        customerEmail: user?.email || localStorage.getItem('userEmail') || '', // From logged in user
        contactNumber: formData.contactNumber,
        startDate: today.toISOString().split('T')[0],
        endDate: endDateObj.toISOString().split('T')[0],
        totalDays,
        pickupLocation: formData.pickupLocation,
        duration: selectedDuration,
        paymentMethod: formData.paymentMethod || 'cash',
        adults: 1, // Default
        totalPrice: calculateTotal()
      }, { headers });

      // Email non-blocking
      emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          vehicle_name: car.name,
          customer_name: formData.customerName,
          customer_email: user?.email || localStorage.getItem('userEmail') || '',
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
      contactNumber: "",
      pickupLocation: "normal",
    });
    navigate("/");
  };

  /* ================= UI ================= */
  // Debug logs - using token from context
  console.log('BookingForm Render:', {
    authLoading,
    loading,
    user: user ? 'logged in' : 'not logged in',
    car: car ? 'loaded' : 'not loaded',
    carId,
    hasToken: !!token,
    tokenPreview: token ? token.substring(0, 20) + '...' : 'no token'
  });

  // Show loading while auth or car data is loading
  if (authLoading || loading) {
    console.log('BookingForm: Showing loading screen');
    return (
      <div className="bg-gradient-main min-h-screen flex items-center justify-center">
        <p className="loading text-white text-xl">Loading…</p>
      </div>
    );
  }

  // Show login message only if auth is done loading and user is not logged in AND no token
  // If token exists, allow form to show (user will load in background)
  if (!authLoading && !user && !token) {
    console.log('BookingForm: User not logged in and no token, showing login message');
    return (
      <div className="bg-gradient-main min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Please login to continue</p>
          <Link to="/login" className="btn-booking-submit">Login</Link>
        </div>
      </div>
    );
  }
  
  // If token exists but user not loaded yet, show form anyway (user will load in background)
  // This allows users to start filling the form while user data loads
  if (token && !user && !authLoading) {
    console.log('BookingForm: Token exists, showing form while user loads in background...');
    // Continue to show form - user will be available soon
  }
  
  // Show error if car is not found (but only after loading is complete)
  if (!loading && !car) {
    console.log('BookingForm: Car not found');
    return (
      <div className="bg-gradient-main min-h-screen flex items-center justify-center">
        <p className="loading text-white text-xl">Car not found</p>
      </div>
    );
  }
  
  // If user is logged in and car is loaded, show the booking form
  console.log('BookingForm: Rendering booking form');

  return (
    <div className="booking-form-page">
      <div className="booking-form-overlay"></div>
      <div className="booking-form-container">
        <div className="booking-form-wrapper">
          {/* Left Side - Form */}
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
                name="contactNumber" 
                placeholder="Contact Number" 
                required 
                value={formData.contactNumber} 
                onChange={handleChange} 
                className="form-input-new"
              />
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

            <button 
              type="submit" 
              className="btn-booking-submit"
              disabled={paymentLoading || submitting}
            >
              {paymentLoading ? "Processing…" : submitting ? "Submitting…" : "Book Now"}
            </button>
          </form>

          {/* Right Side - Login Email & Car Details */}
          <div className="booking-details-side">
            {/* Login Email Section */}
            <div className="booking-email-section">
              <h3>Account Information</h3>
              <div className="email-display-box">
                <p><strong>Email:</strong> {user?.email || 'Loading...'}</p>
                <p><strong>Name:</strong> {user?.name || 'Loading...'}</p>
              </div>
            </div>

            {/* Car Details Section */}
            <div className="booking-car-details">
              <div className="booking-car-image">
                <img src={car.image} alt={car.name} />
              </div>
              <div className="booking-car-info">
                <h2>{car.name}</h2>
                <p className="booking-car-brand">{car.brand} {car.model}</p>
                {car.description && (
                  <p className="booking-car-description">{car.description}</p>
                )}
              </div>
            </div>

            {/* Pricing Details Section */}
            <div className="booking-pricing-details">
              <h3>Pricing Details</h3>
              <div className="pricing-detail-item">
                <span>Duration:</span>
                <span>{selectedDuration}</span>
              </div>
              <div className="pricing-detail-item">
                <span>Base Price:</span>
                <span>{getDurationPrice()} {getCurrencySymbol(currency)}</span>
              </div>
              {formData.pickupLocation === "private" && (
                <div className="pricing-detail-item">
                  <span>Private 4x4:</span>
                  <span>+300 {getCurrencySymbol(currency)}</span>
                </div>
              )}
              <div className="pricing-detail-item total-price">
                <span>Total:</span>
                <span>{calculateTotal()} {getCurrencySymbol(currency)}</span>
              </div>
            </div>
          </div>

          {showPayment && paymentMethod === "card" && (
            <div className="payment-modal-overlay">
              <div className="payment-modal">
                <h3>Confirm Payment</h3>
                <p className="payment-amount">Total Amount: {calculateTotal()} {getCurrencySymbol(currency)}</p>
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
                <p className="payment-amount">Total Amount: {calculateTotal()} {getCurrencySymbol(currency)}</p>
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
          customerEmail: user?.email || '',
          totalPrice: calculateTotal(),
          currency: currency
        }}
      />
    </div>
  );
};

export default BookingForm;
