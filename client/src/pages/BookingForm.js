import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  Users,
  Settings,
  Fuel,
  Check,
  Loader2,
  CheckCircle2,
  DollarSign,
  Sparkles,
  X
} from "lucide-react";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./BookingForm.css";

// Success Modal Component
const SuccessModal = ({ open, onClose, bookingDetails }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (open) {
      setShowConfetti(true);
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "unset";
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-overlay animate-fadeIn">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-content animate-scaleIn">
        {showConfetti && (
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: "-10%",
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                <Sparkles
                  className="h-4 w-4"
                  style={{
                    color: ["#ffed4e", "#fbbf24", "#f59e0b", "#f97316"][
                      Math.floor(Math.random() * 4)
                    ],
                    transform: `rotate(${Math.random() * 360}deg)`
                  }}
                />
              </div>
            ))}
          </div>
        )}

        <button onClick={onClose} className="modal-close">
          <X style={{ width: "24px", height: "24px" }} />
        </button>

        <div className="bg-gradient-header" style={{ padding: "32px", paddingBottom: "48px" }}>
          <div className="pattern-grid absolute inset-0"></div>
          <div className="relative text-center">
            <div
              className="inline-flex items-center justify-center bg-white rounded-full shadow-xl mb-4 animate-bounce-slow"
              style={{ width: "80px", height: "80px" }}
            >
              <CheckCircle2
                style={{ width: "48px", height: "48px", color: "#22c55e", strokeWidth: 2.5 }}
              />
            </div>
            <h2
              style={{ fontSize: "32px", fontWeight: "bold", color: "white", marginBottom: "8px" }}
            >
              Booking Successful! 🎉
            </h2>
            <p style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.9)" }}>
              Your reservation has been confirmed
            </p>
          </div>
        </div>

        <div style={{ padding: "32px", marginTop: "-24px" }} className="space-y-6">
          <div className="success-badge rounded-2xl text-center" style={{ padding: "24px" }}>
            <p style={{ color: "#22c55e", fontWeight: "600" }}>
              🎊 Congratulations! Your dream car is reserved for you!
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="flex items-center gap-2" style={{ fontWeight: "600", color: "#ffffff" }}>
              <Sparkles style={{ width: "20px", height: "20px", color: "#ffed4e" }} />
              Booking Summary
            </h4>

            <div className="space-y-3">
              <div
                className="flex items-start gap-3 summary-card-1 rounded-xl"
                style={{ padding: "16px" }}
              >
                <div style={{ marginTop: "2px" }}>
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{ width: "32px", height: "32px", background: "rgba(255, 237, 78, 0.2)" }}
                  >
                    <CheckCircle2 style={{ width: "16px", height: "16px", color: "#ffed4e" }} />
                  </div>
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: "14px", color: "#9ca3af" }}>Vehicle</p>
                  <p style={{ fontWeight: "600", color: "#ffffff" }}>{bookingDetails.carName}</p>
                </div>
              </div>

              <div
                className="flex items-start gap-3 summary-card-2 rounded-xl"
                style={{ padding: "16px" }}
              >
                <div style={{ marginTop: "2px" }}>
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{ width: "32px", height: "32px", background: "rgba(255, 237, 78, 0.2)" }}
                  >
                    <Calendar style={{ width: "16px", height: "16px", color: "#ffed4e" }} />
                  </div>
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: "14px", color: "#9ca3af" }}>Duration</p>
                  <p style={{ fontWeight: "600", color: "#ffffff" }}>
                    {bookingDetails.totalDays} {bookingDetails.totalDays === 1 ? "Day" : "Days"}
                  </p>
                </div>
              </div>

              <div
                className="flex items-start gap-3 summary-card-3 rounded-xl"
                style={{ padding: "16px" }}
              >
                <div style={{ marginTop: "2px" }}>
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{ width: "32px", height: "32px", background: "rgba(255, 237, 78, 0.2)" }}
                  >
                    <DollarSign style={{ width: "16px", height: "16px", color: "#ffed4e" }} />
                  </div>
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: "14px", color: "#9ca3af" }}>Total Amount</p>
                  <p style={{ fontSize: "24px", fontWeight: "bold", color: "#ffed4e" }}>
                    {bookingDetails.totalPrice} {bookingDetails.currency}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex items-start gap-3 rounded-xl"
            style={{ padding: "16px", background: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.3)" }}
          >
            <Mail style={{ width: "20px", height: "20px", color: "#22c55e", marginTop: "2px", flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: "14px", fontWeight: "500", color: "#22c55e" }}>
                Confirmation Email Sent
              </p>
              <p style={{ fontSize: "14px", color: "#9ca3af", marginTop: "4px" }}>
                We've sent a confirmation to <span style={{ fontWeight: "400", color: "#ffffff" }}>
                  offroadrentalhub@gmail.com
                </span>
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn-submit">
            <Check style={{ width: "20px", height: "20px" }} />
            Book Another Tour
          </button>

          <p className="text-center" style={{ fontSize: "14px", color: "#9ca3af" }}>
            Thank you for choosing our service! 🚗
          </p>
        </div>
      </div>
    </div>
  );
};

// Main BookingForm Component
const BookingForm = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    pickupLocation: "normal",
    contactNumber: "",
    customerEmail: "",
    customerName: ""
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`/api/cars/${carId}`);
        setCar(res.data);
      } catch (err) {
        console.error("Error fetching car:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [carId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 0) return 0;

    let total = days * car.pricePerDay;

    // Extra charge for Private 4x4
    if (formData.pickupLocation === "private") {
      total += 300;
    }

    return total;
  };

  const totalDays =
    formData.startDate && formData.endDate
      ? Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          vehicle_name: car.name,
          brand_model: `${car.brand} ${car.model}`,
          customer_name: formData.customerName,
          customer_email: formData.customerEmail,
          contact_number: formData.contactNumber,
          start_date: formData.startDate,
          end_date: formData.endDate,
          total_days: totalDays,
          pickup_location: formData.pickupLocation,
          total_price: calculateTotal(),
          booking_id: Math.floor(Math.random() * 1000000)
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      setShowSuccess(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("Failed to send confirmation email.");
    }

    setSubmitting(false);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setFormData({
      startDate: "",
      endDate: "",
      pickupLocation: "normal",
      contactNumber: "",
      customerEmail: "",
      customerName: ""
    });
  };

  if (loading) return <p style={{ color: "#ffffff", textAlign: "center", padding: "3rem" }}>Loading...</p>;
  if (!car) return <p style={{ color: "#ffffff", textAlign: "center", padding: "3rem" }}>Car not found</p>;

  return (
    <div className="bg-gradient-main">
      {/* Header Section */}
      <div className="booking-header">
        <div className="container">
          <h1 className="text-gradient">Book Your Adventure</h1>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: "3rem" }}>
        <div className="grid-lg-2">
          {/* LEFT SIDE - Car Summary Card */}
          <div className="card">
            <div className="car-image-container">
              <img src={car.image} alt={car.name} />
              <div className="car-image-overlay" />
              
              {/* Price Badge on Image */}
              <div className="price-badge">
                {car.price60min} {car.currency}
              </div>

              {/* Car Info Overlay */}
              <div className="car-image-info">
                <h2>{car.name}</h2>
                <p>{car.brand} {car.model} ({car.year})</p>
              </div>
            </div>

            <div className="specs-container">
              <div className="grid-md-3">
                <div className="spec-card">
                  <Users style={{ width: "28px", height: "28px" }} />
                  <span>Seat</span>
                  <span>{car.seats}</span>
                </div>
                <div className="spec-card">
                  <Settings style={{ width: "28px", height: "28px" }} />
                  <span>Trans.</span>
                  <span>{car.transmission}</span>
                </div>
                <div className="spec-card">
                  <Fuel style={{ width: "28px", height: "28px" }} />
                  <span>Fuel</span>
                  <span>{car.fuelType}</span>
                </div>
              </div>

              <div className="daily-rate-section">
                <p>Daily Rate</p>
                <p>
                  {car.price60min} <span>{car.currency}</span>
                </p>
                <p>Per Day</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Booking Form */}
          <div className="booking-form-card">
            <h3>Booking Details</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <label  style={{color:'white'}}>Full Name</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label style={{color:'white'}} htmlFor="customerEmail">Email</label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label style={{color:'white'}} htmlFor="contactNumber">Contact Number</label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                  required
                />
              </div>

              <div className="grid-md-2">
                <div className="form-group">
                  <label style={{color:'white'}} htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label style={{color:'white'}} htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    min={formData.startDate || new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <p className="pickup-note">
                  If <strong>Private 4x4 Pickup & Drop-off</strong> is selected, an additional charge of <strong>300 AED</strong> will apply.
                </p>
                <label style={{color:'white'}} htmlFor="pickupLocation">Pickup Location</label>
                <select
                  id="pickupLocation"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  required
                >
                  <option value="normal">Normal Pickup (No Extra Charge)</option>
                  <option value="private">Private 4x4 Pickup & Drop-off (+300 AED)</option>
                </select>
              </div>

              <button type="submit" className="btn-submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin" style={{ width: "20px", height: "20px" }} />
                    Booking...
                  </>
                ) : (
                  <>
                    <Check style={{ width: "20px", height: "20px" }} />
                    Confirm Booking
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <SuccessModal
        open={showSuccess}
        onClose={handleCloseSuccess}
        bookingDetails={{
          carName: car.name,
          customerEmail: formData.customerEmail,
          totalDays,
          totalPrice: calculateTotal(),
          currency: car.currency
        }}
      />
    {/* Tabs */}
{/* TABS HEADER */}
<div className="car-tabs-header">
  <span
    className={activeTab === "description" ? "active" : ""}
    onClick={() => setActiveTab("description")}
  >
    Description
  </span>

  <span
    className={activeTab === "features" ? "active" : ""}
    onClick={() => setActiveTab("features")}
  >
    Features
  </span>

  <span
    className={activeTab === "terms" ? "active" : ""}
    onClick={() => setActiveTab("terms")}
  >
    Terms
  </span>
</div>

{/* TAB CONTENT */}
<div className="car-tab-body">
  {activeTab === "description" && (
    <p>{car?.description || "No description available."}</p>
  )}

  {activeTab === "features" && (
    <ul>
      <li>4x4 Off-Road</li>
      <li>Automatic Transmission</li>
      <li>Air Conditioning</li>
    </ul>
  )}

  {activeTab === "terms" && (
    <p>Driver must be 21+. Valid ID required.</p>
  )}
</div>


    </div>
  );
};

export default BookingForm;