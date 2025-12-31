import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import About from './pages/About';
import Destination from './pages/Destination';
import Service from './pages/Service';
import Activities from './pages/Activities';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import CarDetails from './pages/CarDetails';
import BookingForm from './pages/BookingForm';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import MyBookings from '../src/pages/MyBookings';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  const [showLoading, setShowLoading] = useState(true);

  return (
    <LanguageProvider>
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
              <Route path="/contact" element={<Contact />} />
              <Route path="/car/:id" element={<CarDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/booking/:carId" element={<BookingForm />} />
              <Route
                path="/my-bookings"
                element={
                  <PrivateRoute>
                    <MyBookings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <PrivateRoute adminOnly>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Footer />
              </>
            )}
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;

