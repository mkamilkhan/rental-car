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
                    color: ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b"][
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

        <div
          className="relative bg-gradient-header"
          style={{ padding: "32px", paddingBottom: "48px" }}
        >
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
            <p style={{ color: "#065f46", fontWeight: "500" }}>
              🎊 Congratulations! Your dream car is reserved for you!
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="flex items-center gap-2" style={{ fontWeight: "600", color: "#111827" }}>
              <Sparkles style={{ width: "20px", height: "20px", color: "#8b5cf6" }} />
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
                    style={{ width: "32px", height: "32px", background: "#e0e7ff" }}
                  >
                    <CheckCircle2 style={{ width: "16px", height: "16px", color: "#6366f1" }} />
                  </div>
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: "14px", color: "#6b7280" }}>Vehicle</p>
                  <p style={{ fontWeight: "600", color: "#111827" }}>{bookingDetails.carName}</p>
                </div>
              </div>

              <div
                className="flex items-start gap-3 summary-card-2 rounded-xl"
                style={{ padding: "16px" }}
              >
                <div style={{ marginTop: "2px" }}>
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{ width: "32px", height: "32px", background: "#f3e8ff" }}
                  >
                    <Calendar style={{ width: "16px", height: "16px", color: "#8b5cf6" }} />
                  </div>
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: "14px", color: "#6b7280" }}>Duration</p>
                  <p style={{ fontWeight: "600", color: "#111827" }}>
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
                    style={{ width: "32px", height: "32px", background: "#fce7f3" }}
                  >
                    <DollarSign style={{ width: "16px", height: "16px", color: "#ec4899" }} />
                  </div>
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: "14px", color: "#6b7280" }}>Total Amount</p>
                  <p className="text-gradient" style={{ fontSize: "24px", fontWeight: "bold" }}>
                    {bookingDetails.totalPrice} {bookingDetails.currency}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex items-start gap-3 rounded-xl"
            style={{ padding: "16px", background: "#eff6ff", border: "1px solid #bfdbfe" }}
          >
            <Mail style={{ width: "20px", height: "20px", color: "#2563eb", marginTop: "2px", flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: "14px", fontWeight: "500", color: "#1e3a8a" }}>
                Confirmation Email Sent
              </p>
              <p style={{ fontSize: "14px", color: "#1e40af", marginTop: "4px" }}>
                We've sent a confirmation to <span style={{ fontWeight: "400" }}>
                  {/* {bookingDetails.customerEmail} */}  offroadrentalhub@gmail.com
                  </span>
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn-submit">
            Book Another Car
          </button>

          <p className="text-center" style={{ fontSize: "14px", color: "#6b7280" }}>
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
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    pickupLocation: "",
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
      total += 300; // fixed extra AED
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

    // EmailJS integration
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
      pickupLocation: "",
      contactNumber: "",
      customerEmail: "",
      customerName: ""
    });
  };

  if (loading) return <p>Loading...</p>;
  if (!car) return <p>Car not found</p>;



  return (
    <div className="bg-gradient-main">
      <div className="container" style={{ paddingTop: "32px", paddingBottom: "48px" }}>
        <div className="text-center space-y-3" style={{ marginBottom: "48px" }}>
          <h1 className="text-gradient" style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "12px" }}>
            Book Your Dream Car
          </h1>
          <p style={{ fontSize: "18px", color: "#6b7280" }}>
            Complete your booking details below for a premium experience
          </p>
        </div>

        <div className="grid-lg-2" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* Car Summary Card */}
          <div className="card overflow-hidden transition-shadow" style={{ padding: "0" }}>
            <div className="relative overflow-hidden" style={{ height: "320px" }}>
    
<img
  src={car.image}
  alt={car.name}
  className="w-full h-full object-cover"
/>

              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2), transparent)" }}
              />
              <div className="absolute" style={{ bottom: "0", left: "0", right: "0", padding: "24px", color: "white" }}>
                <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>{car.name}</h2>
                <p style={{ color: "rgba(255, 255, 255, 0.9)" }}>{car.brand} {car.model} ({car.year})</p>
              </div>
            </div>

            <div className="space-y-6" style={{ padding: "24px" }}>
              <div className="grid-md-3">
                <div className="flex flex-col items-center spec-card-indigo rounded-xl" style={{ padding: "16px" }}>
                  <Users style={{ width: "24px", height: "24px", color: "#6366f1", marginBottom: "8px" }} />
                  <span style={{ fontSize: "14px", color: "#6b7280" }}>Seats</span>
                  <span style={{ fontWeight: "600", color: "#111827" }}>{car.seats}</span>
                </div>
                <div className="flex flex-col items-center spec-card-purple rounded-xl" style={{ padding: "16px" }}>
                  <Settings style={{ width: "24px", height: "24px", color: "#8b5cf6", marginBottom: "8px" }} />
                  <span style={{ fontSize: "14px", color: "#6b7280", textAlign: "center" }}>Trans.</span>
                  <span style={{ fontWeight: "600", color: "#111827", fontSize: "12px" }}>{car.transmission}</span>
                </div>
                <div className="flex flex-col items-center spec-card-pink rounded-xl" style={{ padding: "16px" }}>
                  <Fuel style={{ width: "24px", height: "24px", color: "#ec4899", marginBottom: "8px" }} />
                  <span style={{ fontSize: "14px", color: "#6b7280" }}>Fuel</span>
                  <span style={{ fontWeight: "600", color: "#111827" }}>{car.fuelType}</span>
                </div>
              </div>

              <div className="bg-gradient-header rounded-xl text-center" style={{ padding: "24px", color: "white" }}>
                <p style={{ fontSize: "14px", opacity: 0.9, marginBottom: "4px" }}>Daily Rate</p>
                <p style={{ fontSize: "36px", fontWeight: "bold" }}>
                  {car.pricePerDay} <span style={{ fontSize: "20px" }}>{car.currency}</span>
                </p>
                <p style={{ fontSize: "14px", opacity: 0.9, marginTop: "4px" }}>per day</p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="card" style={{ padding: "32px" }}>
            <h3 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", marginBottom: "24px" }}>
              Booking Details
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email */}
              <div className="form-group">
                <label htmlFor="customerName">Full Name</label>
                <input type="text" id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} placeholder="Enter your full name" required />
              </div>

              <div className="form-group">
                <label htmlFor="customerEmail">Email</label>
                <input type="email" id="customerEmail" name="customerEmail" value={formData.customerEmail} onChange={handleChange} placeholder="Enter your email" required />
              </div>

              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number</label>
                <input type="text" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Enter your contact number" required />
              </div>

              {/* Start/End Date in single row */}
              <div className="grid-md-2">
                <div className="form-group">
                  <label htmlFor="startDate">Start Date</label>
                  <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} min={new Date().toISOString().split("T")[0]} required />
                </div>

                <div className="form-group">
                  <label htmlFor="endDate">End Date</label>
                  <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} min={formData.startDate || new Date().toISOString().split("T")[0]} required />
                </div>
              </div>

              <div className="form-group">
  <label htmlFor="pickupLocation">Pickup Location</label>
  <select
    id="pickupLocation"
    name="pickupLocation"
    value={formData.pickupLocation}
    onChange={handleChange}
    required
  >
    <option value="">Select Pickup Option</option>
    <option value="normal">Normal Pickup (No Extra Charge)</option>
    <option value="private">Private 4x4 Pickup & Drop-off (+300 AED)</option>
  </select>
</div>


              {/* Buttons */}
              <div className="flex gap-4 flex-wrap">
                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? "Booking..." : "Confirm Booking"}
                </button>

                {/* WhatsApp Button */}
                {/* <button
                  type="button"
                  className="btn-submit btn-whatsapp"
                  onClick={() => {
                    const whatsappMessage = `
🚗 New Booking Confirmed
Vehicle: ${car.name}
Brand/Model: ${car.brand} ${car.model}

Customer Name: ${formData.customerName}
Email: ${formData.customerEmail}
Contact: ${formData.contactNumber}

Start Date: ${formData.startDate}
End Date: ${formData.endDate}
Total Days: ${totalDays}

Pickup Location: ${formData.pickupLocation}
Total Price: ${calculateTotal()}
Booking ID: ${Math.floor(Math.random() * 1000000)}
`;
const whatsappURL = `https://wa.me/92335839531?text=${encodeURIComponent(whatsappMessage)}`;

                    window.location.href = whatsappURL;
                  }}
                >
                  Send via WhatsApp
                </button> */}
              </div>
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
    </div>
  );
};

export default BookingForm;
