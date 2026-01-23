import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, Loader2, X } from "lucide-react";
import "./BookingForm.css";

const BookingSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    
    if (!sessionId) {
      setError("No session ID found");
      setLoading(false);
      return;
    }

    verifyPayment(sessionId);
  }, [searchParams]);

  const verifyPayment = async (sessionId) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payment/verify-payment`,
        { sessionId }
      );

      if (res.data.success && res.data.booking) {
        setBooking(res.data.booking);
      } else {
        setError("Payment verification failed");
      }
    } catch (err) {
      console.error("Payment verification error:", err);
      setError(err.response?.data?.error || "Failed to verify payment");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-main min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4" size={48} color="#ffed4e" />
          <p className="text-white text-xl">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-main min-h-screen flex items-center justify-center p-6">
        <div className="modal-content max-w-md">
          <div className="modal-header">
            <X size={60} color="#ef4444" />
            <h2>Payment Error</h2>
            <p>{error}</p>
          </div>
          <button className="btn-submit" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-main min-h-screen flex items-center justify-center p-6">
      <div className="modal-content max-w-2xl">
        <div className="modal-header">
          <CheckCircle2 size={60} color="#22c55e" />
          <h2>Payment Successful!</h2>
          <p>Your booking has been confirmed</p>
        </div>

        <div className="modal-body">
          {booking && (
            <>
              <div className="space-y-3">
                <p><strong>Vehicle:</strong> {booking.car?.name || "N/A"}</p>
                <p><strong>Customer:</strong> {booking.customerName || booking.customerEmail}</p>
                <p><strong>Email:</strong> {booking.customerEmail}</p>
                <p><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
                <p><strong>Total Days:</strong> {booking.totalDays}</p>
                <p><strong>Total Price:</strong> {booking.totalPrice} {booking.paymentInfo?.currency?.toUpperCase() || "AED"}</p>
                <p><strong>Payment Method:</strong> Card</p>
                <p><strong>Status:</strong> {booking.status}</p>
              </div>
            </>
          )}
        </div>

        <button className="btn-submit" onClick={() => navigate("/")}>
          Done
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;
