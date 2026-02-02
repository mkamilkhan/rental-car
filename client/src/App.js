// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate,HashRouter } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { LanguageProvider } from './context/LanguageContext';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// import LoadingScreen from './components/LoadingScreen';
// import Home from './pages/Home';
// import About from './pages/About';
// import Destination from './pages/Destination';
// import Service from './pages/Service';
// import Activities from './pages/Activities';
// import Blog from './pages/Blog';
// import Contact from './pages/Contact';
// import CarDetails from './pages/CarDetails';
// import BookingForm from './pages/BookingForm';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import AdminDashboard from './pages/AdminDashboard';
// import MyBookings from '../src/pages/MyBookings';
// import PrivateRoute from './components/PrivateRoute';
// import './App.css';

// function App() {
//   const [showLoading, setShowLoading] = useState(true);

//   return (
//     <LanguageProvider>
//       <AuthProvider>
//         <Router>
//           <div className="App">
//             {showLoading && <LoadingScreen onComplete={() => setShowLoading(false)} />}
//             {!showLoading && (
//               <>
//                 <Navbar />
//                 <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/destination" element={<Destination />} />
//               <Route path="/service" element={<Service />} />
//               <Route path="/activities" element={<Activities />} />
//               <Route path="/blog" element={<Blog />} />
//               <Route path="/contact" element={<Contact />} />
//               <Route path="/car/:id" element={<CarDetails />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route path="/booking/:carId" element={<BookingForm />} />
//               <Route
//                 path="/my-bookings"
//                 element={
//                   <PrivateRoute>
//                     <MyBookings />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/admin"
//                 element={
//                   <PrivateRoute adminOnly>
//                     <AdminDashboard />
//                   </PrivateRoute>
//                 }
//               />
//               <Route path="*" element={<Navigate to="/" replace />} />
//                 </Routes>
//                 <Footer />
//               </>
//             )}
//           </div>
//         </Router>
//       </AuthProvider>
//     </LanguageProvider>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { initializeGoogleTranslate } from './utils/translateHelper';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { FaWhatsapp } from "react-icons/fa6";
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import About from './pages/About';
import Destination from './pages/Destination';
import Service from './pages/Service';
import Activities from './pages/Activities';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import CarDetails from './pages/CarDetails';
import BookingForm from './pages/BookingForm';
import BookingSuccess from './pages/BookingSuccess';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthCallback from './pages/AuthCallback';
import MyBookings from './pages/MyBookings';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  // Only show loading screen on first visit, not on every page load
  const [showLoading, setShowLoading] = useState(() => {
    // Check if loading screen has been shown before
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');
    return !hasSeenLoading; // Show loading only if not seen in this session
  });

  // Initialize Google Translate on app load
  useEffect(() => {
    initializeGoogleTranslate();
  }, []);

  // Mark loading screen as seen
  useEffect(() => {
    if (!showLoading) {
      sessionStorage.setItem('hasSeenLoading', 'true');
    }
  }, [showLoading]);

  return (
    <LanguageProvider>
      <CurrencyProvider>
        <AuthProvider>
          <Router>
          <div className="App">
            {showLoading && <LoadingScreen onComplete={() => setShowLoading(false)} />}
            {!showLoading && (
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/destination" element={<Destination />} />
                  <Route path="/service" element={<Service />} />
                  <Route path="/activities" element={<Activities />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogDetail />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/car/:id" element={<CarDetails />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="/booking/:carId" element={<BookingForm />} />
                  <Route path="/booking-success" element={<BookingSuccess />} />
                  <Route
                    path="/my-bookings"
                    element={
                      <PrivateRoute>
                        <MyBookings />
                      </PrivateRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                 {/* ✅ WHATSAPP FLOATING BUTTON — GLOBAL */}
    <a
      href="https://wa.me/971562858526"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp />
    </a>

                <Footer />
              </>
            )}
          </div>
        </Router>
      </AuthProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}

export default App;

