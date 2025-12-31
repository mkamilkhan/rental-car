import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { CheckCircle2, Mail, Calendar, DollarSign, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  bookingDetails: {
    carName: string;
    totalDays: number;
    totalPrice: number;
    currency: string;
    customerEmail: string;
  };
}

export function SuccessModal({ open, onClose, bookingDetails }: SuccessModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (open) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg bg-white border-0 shadow-2xl overflow-hidden p-0">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                <Sparkles 
                  className="h-4 w-4" 
                  style={{ 
                    color: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'][Math.floor(Math.random() * 4)],
                    transform: `rotate(${Math.random() * 360}deg)`
                  }} 
                />
              </div>
            ))}
          </div>
        )}

        {/* Gradient Header */}
        <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 pb-12">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
          
          <div className="relative text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-xl mb-4 animate-bounce-slow">
              <CheckCircle2 className="h-12 w-12 text-green-500" strokeWidth={2.5} />
            </div>
            <DialogHeader>
              <DialogTitle className="text-3xl md:text-4xl font-bold text-white mb-2">
                Booking Successful! 🎉
              </DialogTitle>
              <DialogDescription className="text-lg text-white/90">
                Your reservation has been confirmed
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 -mt-6">
          {/* Success Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 text-center">
            <p className="text-green-800 font-medium">
              🎊 Congratulations! Your dream car is reserved for you!
            </p>
          </div>

          {/* Booking Details */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Booking Summary
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                <div className="mt-0.5">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Vehicle</p>
                  <p className="font-semibold text-gray-900">{bookingDetails.carName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <div className="mt-0.5">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold text-gray-900">
                    {bookingDetails.totalDays} {bookingDetails.totalDays === 1 ? 'Day' : 'Days'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-pink-50 to-indigo-50 rounded-xl">
                <div className="mt-0.5">
                  <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-pink-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {bookingDetails.totalPrice} {bookingDetails.currency}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
            <Mail className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900">Confirmation Email Sent</p>
              <p className="text-sm text-blue-700 mt-1">
                We've sent a confirmation to <span className="font-semibold">{bookingDetails.customerEmail}</span>
              </p>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={onClose}
            className="w-full h-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Book Another Car
          </Button>

          <p className="text-center text-sm text-gray-500">
            Thank you for choosing our service! 🚗
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}