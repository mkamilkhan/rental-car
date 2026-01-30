// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('overview');
//   const [bookings, setBookings] = useState([]);
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCarForm, setShowCarForm] = useState(false);
//   const [editingCar, setEditingCar] = useState(null);
//   const [newBookingsCount, setNewBookingsCount] = useState(0);
//   const [lastBookingId, setLastBookingId] = useState(null);
//   const [notifications, setNotifications] = useState([]);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const [carFormData, setCarFormData] = useState({
//     name: '',
//     brand: '',
//     model: '',
//     year: new Date().getFullYear(),
//     pricePerDay: '',
//     price30min: '',
//     price60min: '',
//     currency: 'AED',
//     seats: '',
//     transmission: 'Automatic',
//     fuelType: 'Petrol',
//     imageFile: null,   // ✅ FILE
//     imageUrl: '',      // ✅ URL
//     description: '',
//     available: true
//   });
  
//   const [imagePreview, setImagePreview] = useState(null);
  

//   useEffect(() => {
//     fetchBookings();
//     fetchCars();
//   }, []);

//   useEffect(() => {
//     if (activeTab === 'bookings') {
//       fetchBookings();
//     } else if (activeTab === 'cars') {
//       fetchCars();
//     }
//   }, [activeTab]);

//   // Poll for new bookings every 5 seconds for real-time notifications
//   useEffect(() => {
//     // Initial check
//     checkNewBookings();
    
//     const interval = setInterval(() => {
//       checkNewBookings();
//     }, 5000); // Check every 5 seconds for faster notifications

//     return () => clearInterval(interval);
//   }, [lastBookingId]);

//   const checkNewBookings = async () => {
//     try {
//       const response = await axios.get('/api/admin/bookings');
//       const latestBookings = response.data;
      
//       if (latestBookings.length > 0) {
//         const latestBooking = latestBookings[0];
        
//         // Count all pending bookings
//         const pendingBookings = latestBookings.filter(b => b.status === 'pending');
//         setNewBookingsCount(pendingBookings.length);
        
//         // Check if this is a new booking
//         if (!lastBookingId || latestBooking._id !== lastBookingId) {
//           // Add notification for new booking (any status)
//           const newNotification = {
//             id: Date.now(),
//             message: `🔔 New booking: ${latestBooking.car?.name || 'Unknown'} - ${latestBooking.customerName || latestBooking.user?.name || 'Guest'}`,
//             bookingId: latestBooking._id,
//             status: latestBooking.status,
//             timestamp: new Date()
//           };
          
//           setNotifications(prev => {
//             // Check if notification already exists
//             const exists = prev.some(n => n.bookingId === latestBooking._id);
//             if (!exists) {
//               // Show browser notification if permission granted
//               if ('Notification' in window && Notification.permission === 'granted') {
//                 new Notification('New Booking Received!', {
//                   body: newNotification.message,
//                   icon: '/favicon.ico'
//                 });
//               }
//               return [newNotification, ...prev.slice(0, 9)]; // Keep last 10
//             }
//             return prev;
//           });
          
//           // Update last booking ID
//           setLastBookingId(latestBooking._id);
          
//           // Refresh bookings if on bookings tab
//           if (activeTab === 'bookings') {
//             fetchBookings();
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error checking new bookings:', error);
//     }
//   };
  
//   // Request browser notification permission on mount
//   useEffect(() => {
//     if ('Notification' in window && Notification.permission === 'default') {
//       Notification.requestPermission();
//     }
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('/api/admin/bookings');
//       setBookings(response.data);
      
//       // Update last booking ID and reset count when manually fetching
//       if (response.data.length > 0) {
//         const latestBooking = response.data[0];
//         const pendingCount = response.data.filter(b => b.status === 'pending').length;
//         setNewBookingsCount(pendingCount);
        
//         // Set last booking ID only if not set
//         if (!lastBookingId) {
//           setLastBookingId(latestBooking._id);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCars = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('/api/cars');
//       setCars(response.data);
//     } catch (error) {
//       console.error('Error fetching cars:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCarFormChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
  
//     if (type === 'file') {
//       const file = files[0];
//       if (!file) return;
  
//       setCarFormData(prev => ({
//         ...prev,
//         imageFile: file,
//         imageUrl: ''
//       }));
  
//       setImagePreview(URL.createObjectURL(file));
//     } else {
//       setCarFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//   };
  
  
  

//   const handleCarSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const formData = new FormData();
  
//       Object.entries(carFormData).forEach(([key, value]) => {
//         if (value !== null && value !== '') {
//           formData.append(key, value);
//         }
//       });
  
//       await axios.post('/api/admin/cars', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
  
//       alert('Car added successfully!');
//       fetchCars();
//       setShowCarForm(false);
//     } catch (err) {
//       alert('Image upload failed');
//     }
//   };
  
  
  

//   const handleEditCar = (car) => {
//     setEditingCar(car);
//     setCarFormData({
//       name: car.name,
//       brand: car.brand,
//       model: car.model,
//       year: car.year,
//       pricePerDay: car.pricePerDay,
//       price30min: car.price30min || '',
//       price60min: car.price60min || '',
//       currency: car.currency || 'AED',
//       seats: car.seats,
//       transmission: car.transmission,
//       fuelType: car.fuelType,
//       image: car.image,
//       description: car.description || '',
//       available: car.available
//     });
//     setShowCarForm(true);
//   };

//   const handleDeleteCar = async (carId) => {
//     if (!window.confirm('Are you sure you want to delete this car?')) {
//       return;
//     }
//     try {
//       await axios.delete(`/api/admin/cars/${carId}`);
//       fetchCars();
//     } catch (error) {
//       alert(error.response?.data?.message || 'Failed to delete car');
//     }
//   };

//   const handleToggleAvailability = async (carId, currentStatus) => {
//     try {
//       await axios.put(`/api/admin/cars/${carId}`, {
//         available: !currentStatus
//       });
//       fetchCars();
//     } catch (error) {
//       alert(error.response?.data?.message || 'Failed to update availability');
//     }
//   };

//   const handleUpdateBookingStatus = async (bookingId, status) => {
//     try {
//       await axios.put(`/api/admin/bookings/${bookingId}/status`, { status });
//       fetchBookings();
//     } catch (error) {
//       alert(error.response?.data?.message || 'Failed to update status');
//     }
//   };

//   const handleCancelBooking = async (bookingId) => {
//     if (!window.confirm('Are you sure you want to cancel this booking?')) {
//       return;
//     }
//     try {
//       await axios.put(`/api/bookings/${bookingId}/cancel`);
//       fetchBookings();
//     } catch (error) {
//       alert(error.response?.data?.message || 'Failed to cancel booking');
//     }
//   };

//   // Calculate stats
//   const activeBookings = bookings.filter(b => 
//     b.status === 'pending' || b.status === 'confirmed'
//   );
//   const bookedCarIds = [...new Set(activeBookings.map(b => b.car?._id?.toString()).filter(Boolean))];
  
//   const stats = {
//     totalCars: cars.length,
//     availableCars: cars.filter(car => !bookedCarIds.includes(car._id.toString())).length,
//     bookedCars: bookedCarIds.length,
//     totalBookings: bookings.length,
//     pendingBookings: bookings.filter(b => b.status === 'pending').length,
//     confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
//     cancelledBookings: bookings.filter(b => b.status === 'cancelled').length,
//     totalRevenue: bookings
//       .filter(b => b.status === 'confirmed')
//       .reduce((sum, b) => sum + (b.totalPrice || 0), 0)
//   };

//   const getStatusBadge = (status) => {
//     const statusMap = {
//       pending: { class: 'status-pending', text: 'Pending' },
//       confirmed: { class: 'status-confirmed', text: 'Approved' },
//       cancelled: { class: 'status-cancelled', text: 'Cancelled' }
//     };
//     const statusInfo = statusMap[status] || statusMap.pending;
//     return <span className={`status-badge ${statusInfo.class}`}>{statusInfo.text}</span>;
//   };

//   return (
//     <div className="admin-dashboard">
//       <div className="container">
//         <div className="admin-header">
//           <div className="admin-header-left">
//             <h1>Admin Dashboard</h1>
//             {newBookingsCount > 0 && (
//               <div className="notification-badge" onClick={() => setActiveTab('bookings')}>
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
//                   <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
//                 </svg>
//                 <span className="notification-count">{newBookingsCount}</span>
//                 <span className="notification-text">New Booking{newBookingsCount > 1 ? 's' : ''}</span>
//               </div>
//             )}
//           </div>
//           <button onClick={handleLogout} className="btn-logout-admin">
//             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//             Logout
//           </button>
//         </div>
        
//         {/* Notifications List */}
//         {notifications.length > 0 && (
//           <div className="notifications-panel">
//             <div className="notifications-header">
//               <h3>📬 Recent Notifications</h3>
//               <button onClick={() => { setNotifications([]); setNewBookingsCount(0); }} className="btn-clear-notifications">
//                 Clear All
//               </button>
//             </div>
//             <div className="notifications-list">
//               {notifications.map((notif) => (
//                 <div key={notif.id} className="notification-item" onClick={() => { setActiveTab('bookings'); setNewBookingsCount(0); }}>
//                   <div className="notification-icon">🔔</div>
//                   <div className="notification-content">
//                     <p className="notification-message">{notif.message}</p>
//                     <span className="notification-time">
//                       {new Date(notif.timestamp).toLocaleTimeString()}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//         <div className="admin-tabs">
//           <button
//             className={activeTab === 'overview' ? 'active' : ''}
//             onClick={() => setActiveTab('overview')}
//           >
//             Overview
//           </button>
//           <button
//             className={activeTab === 'bookings' ? 'active' : ''}
//             onClick={() => setActiveTab('bookings')}
//           >
//             Bookings
//           </button>
//           <button
//             className={activeTab === 'cars' ? 'active' : ''}
//             onClick={() => setActiveTab('cars')}
//           >
//             Cars
//           </button>
//         </div>

//         {activeTab === 'overview' && (
//           <div className="admin-overview">
//             <div className="stats-grid">
//               <div className="stat-card stat-primary">
//                 <div className="stat-icon">
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M9 17V7M9 7L5 11M9 7L13 11M15 7V17M15 17L19 13M15 17L11 13"/>
//                   </svg>
//                 </div>
//                 <div className="stat-content">
//                   <h3>{stats.totalCars}</h3>
//                   <p>Total Vehicles</p>
//                 </div>
//               </div>
//               <div className="stat-card stat-success">
//                 <div className="stat-icon">
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"/>
//                   </svg>
//                 </div>
//                 <div className="stat-content">
//                   <h3>{stats.availableCars}</h3>
//                   <p>Available Cars</p>
//                 </div>
//               </div>
//               <div className="stat-card stat-warning">
//                 <div className="stat-icon">
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5"/>
//                   </svg>
//                 </div>
//                 <div className="stat-content">
//                   <h3>{stats.bookedCars}</h3>
//                   <p>Booked Cars</p>
//                 </div>
//               </div>
//               <div className="stat-card stat-info">
//                 <div className="stat-icon">
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"/>
//                   </svg>
//                 </div>
//                 <div className="stat-content">
//                   <h3>{stats.totalBookings}</h3>
//                   <p>Total Bookings</p>
//                 </div>
//               </div>
//               <div className="stat-card stat-pending">
//                 <div className="stat-icon">
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M12 8V12L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"/>
//                   </svg>
//                 </div>
//                 <div className="stat-content">
//                   <h3>{stats.pendingBookings}</h3>
//                   <p>Pending</p>
//                 </div>
//               </div>
//               <div className="stat-card stat-revenue">
//                 <div className="stat-icon">
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6312 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6312 13.6815 18 14.5717 18 15.5C18 16.4283 17.6312 17.3185 16.9749 17.9749C16.3185 18.6312 15.4283 19 14.5 19H6"/>
//                   </svg>
//                 </div>
//                 <div className="stat-content">
//                   <h3>{stats.totalRevenue.toLocaleString()} AED</h3>
//                   <p>Total Revenue</p>
//                 </div>
//               </div>
//             </div>

//             <div className="charts-section">
//               {/* Vehicle Status - Bar Chart */}
//               <div className="chart-card">
//                 <h3>🚗 Vehicle Status - Bar Chart</h3>
//                 <div className="bar-chart-container">
//                   <div className="bar-chart">
//                     <div className="bar-item">
//                       <div className="bar-column-wrapper">
//                         <div 
//                           className="bar-column bar-total-vehicles" 
//                           style={{ height: `${Math.max(stats.totalCars, stats.pendingBookings, Math.floor(stats.totalRevenue / 1000), 1) > 0 ? (stats.totalCars / Math.max(stats.totalCars, stats.pendingBookings, Math.floor(stats.totalRevenue / 1000), 1)) * 100 : 0}%` }}
//                         >
//                           <span className="bar-count">{stats.totalCars}</span>
//                         </div>
//                       </div>
//                       <div className="bar-label">Total Vehicles</div>
//                     </div>
//                     <div className="bar-item">
//                       <div className="bar-column-wrapper">
//                         <div 
//                           className="bar-column bar-pending" 
//                           style={{ height: `${Math.max(stats.totalCars, stats.pendingBookings, Math.floor(stats.totalRevenue / 1000), 1) > 0 ? (stats.pendingBookings / Math.max(stats.totalCars, stats.pendingBookings, Math.floor(stats.totalRevenue / 1000), 1)) * 100 : 0}%` }}
//                         >
//                           <span className="bar-count">{stats.pendingBookings}</span>
//                         </div>
//                       </div>
//                       <div className="bar-label">Pending</div>
//                     </div>
//                     <div className="bar-item">
//                       <div className="bar-column-wrapper">
//                         <div 
//                           className="bar-column bar-revenue" 
//                           style={{ height: `${Math.max(stats.totalCars, stats.pendingBookings, Math.floor(stats.totalRevenue / 1000), 1) > 0 ? (Math.floor(stats.totalRevenue / 1000) / Math.max(stats.totalCars, stats.pendingBookings, Math.floor(stats.totalRevenue / 1000), 1)) * 100 : 0}%` }}
//                         >
//                           <span className="bar-count">{Math.floor(stats.totalRevenue / 1000)}K</span>
//                         </div>
//                       </div>
//                       <div className="bar-label">Total Revenue (AED)</div>
//                     </div>
//                     <div className="bar-item">
//                       <div className="bar-column-wrapper">
//                         <div 
//                           className="bar-column bar-available" 
//                           style={{ height: `${stats.totalCars > 0 ? (stats.availableCars / Math.max(stats.availableCars, stats.bookedCars, 1)) * 100 : 0}%` }}
//                         >
//                           <span className="bar-count">{stats.availableCars}</span>
//                         </div>
//                       </div>
//                       <div className="bar-label">Available</div>
//                     </div>
//                     <div className="bar-item">
//                       <div className="bar-column-wrapper">
//                         <div 
//                           className="bar-column bar-booked" 
//                           style={{ height: `${stats.totalCars > 0 ? (stats.bookedCars / Math.max(stats.availableCars, stats.bookedCars, 1)) * 100 : 0}%` }}
//                         >
//                           <span className="bar-count">{stats.bookedCars}</span>
//                         </div>
//                       </div>
//                       <div className="bar-label">Booked</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Booking Status - Pie Chart */}
//               <div className="chart-card">
//                 <h3>📊 Booking Status - Pie Chart</h3>
//                 <div className="pie-chart-container">
//                   <div className="pie-chart-wrapper">
//                     <svg className="pie-chart" viewBox="0 0 200 200">
//                       {(() => {
//                         const total = stats.totalBookings || 1;
//                         const pendingPercent = (stats.pendingBookings / total) * 100;
//                         const confirmedPercent = (stats.confirmedBookings / total) * 100;
//                         const cancelledPercent = (stats.cancelledBookings / total) * 100;
                        
//                         let currentPercent = 0;
//                         const radius = 80;
//                         const centerX = 100;
//                         const centerY = 100;
                        
//                         const createArc = (percent, color) => {
//                           if (percent === 0) return null;
//                           const startAngle = (currentPercent / 100) * 360 - 90;
//                           const endAngle = ((currentPercent + percent) / 100) * 360 - 90;
//                           currentPercent += percent;
                          
//                           const startAngleRad = (startAngle * Math.PI) / 180;
//                           const endAngleRad = (endAngle * Math.PI) / 180;
                          
//                           const x1 = centerX + radius * Math.cos(startAngleRad);
//                           const y1 = centerY + radius * Math.sin(startAngleRad);
//                           const x2 = centerX + radius * Math.cos(endAngleRad);
//                           const y2 = centerY + radius * Math.sin(endAngleRad);
                          
//                           const largeArcFlag = percent > 50 ? 1 : 0;
                          
//                           return (
//                             <path
//                               d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
//                               fill={color}
//                               stroke="#fff"
//                               strokeWidth="3"
//                             />
//                           );
//                         };
                        
//                         return (
//                           <>
//                             {createArc(pendingPercent, '#FF6B6B')}
//                             {createArc(confirmedPercent, '#51CF66')}
//                             {createArc(cancelledPercent, '#FF8787')}
//                           </>
//                         );
//                       })()}
//                       <circle cx="100" cy="100" r="60" fill="white" />
//                       <text x="100" y="95" textAnchor="middle" fontSize="24" fontWeight="800" fill="#1e3c72">
//                         {stats.totalBookings}
//                       </text>
//                       <text x="100" y="115" textAnchor="middle" fontSize="14" fill="#666" fontWeight="600">
//                         Total Bookings
//                       </text>
//                     </svg>
//                   </div>
//                   <div className="pie-legend">
//                     <div className="legend-item">
//                       <span className="legend-color" style={{background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8787 100%)'}}></span>
//                       <span className="legend-label">Pending ({stats.pendingBookings})</span>
//                     </div>
//                     <div className="legend-item">
//                       <span className="legend-color" style={{background: 'linear-gradient(135deg, #51CF66 0%, #69DB7C 100%)'}}></span>
//                       <span className="legend-label">Approved ({stats.confirmedBookings})</span>
//                     </div>
//                     <div className="legend-item">
//                       <span className="legend-color" style={{background: 'linear-gradient(135deg, #FF8787 0%, #FF6B6B 100%)'}}></span>
//                       <span className="legend-label">Cancelled ({stats.cancelledBookings})</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'bookings' && (
//           <div className="admin-section">
//             <div className="section-header-bookings">
//               <h2>All Bookings ({bookings.length})</h2>
//               <p>Manage and track all vehicle bookings</p>
//             </div>
//             {loading ? (
//               <div className="loading">Loading bookings...</div>
//             ) : (
//               <div className="bookings-table">
//                 {bookings.length === 0 ? (
//                   <div className="no-bookings">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '60px', height: '60px', color: '#ccc', marginBottom: '20px'}}>
//                       <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"/>
//                     </svg>
//                     <p>No bookings found.</p>
//                     <p style={{color: '#999', fontSize: '14px'}}>Bookings will appear here once customers make reservations.</p>
//                   </div>
//                 ) : (
//                   bookings.map((booking) => {
//                     if (!booking.car) {
//                       return null;
//                     }
//                     const customerName = booking.customerName || booking.user?.name || 'Guest';
//                     const customerEmail = booking.customerEmail || booking.user?.email || 'N/A';
//                     return (
//                       <div key={booking._id} className="booking-row">
//                         <div className="booking-info">
//                           <h4>{booking.car?.name || 'Unknown Car'}</h4>
//                           <p>Customer: {customerName} ({customerEmail})</p>
//                           {booking.contactNumber && <p>Contact: {booking.contactNumber}</p>}
//                           <p>
//                             {new Date(booking.startDate).toLocaleDateString()} -{' '}
//                             {new Date(booking.endDate).toLocaleDateString()}
//                           </p>
//                           {booking.pickupLocation && <p>Location: {booking.pickupLocation}</p>}
//                           <p>Total: {booking.totalPrice} {booking.car?.currency || 'AED'}</p>
//                         </div>
//                         <div className="booking-actions">
//                           {getStatusBadge(booking.status)}
//                           <select
//                             value={booking.status}
//                             onChange={(e) => handleUpdateBookingStatus(booking._id, e.target.value)}
//                             className="status-select"
//                           >
//                             <option value="pending">Pending</option>
//                             <option value="confirmed">Approved</option>
//                             <option value="cancelled">Cancelled</option>
//                           </select>
//                           {booking.status !== 'cancelled' && (
//                             <button
//                               onClick={() => handleCancelBooking(booking._id)}
//                               className="btn-cancel-booking"
//                             >
//                               Cancel Booking
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     );
//                   })
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'cars' && (
//           <div className="admin-section">
//             <button
//               onClick={() => {
//                 setShowCarForm(true);
//                 setEditingCar(null);
//                 setCarFormData({
//                   name: '',
//                   brand: '',
//                   model: '',
//                   year: new Date().getFullYear(),
//                   pricePerDay: '',
//                   price30min: '',
//                   price60min: '',
//                   currency: 'AED',
//                   seats: '',
//                   transmission: 'Automatic',
//                   fuelType: 'Petrol',
//                   image: '',
//                   description: '',
//                   available: true
//                 });
//               }}
//               className="btn-add-car"
//             >
//               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M12 5V19M5 12H19"/>
//               </svg>
//               Add New Car
//             </button>

//             {showCarForm && (
//               <div className="car-form-modal">
//                 <div className="car-form-content">
//                   <h3>{editingCar ? 'Edit Car' : 'Add New Car'}</h3>
//                   <form onSubmit={handleCarSubmit}>
//                     <div className="form-row">
//                       <div className="form-group">
//                         <label>Name *</label>
//                         <input
//                           type="text"
//                           name="name"
//                           value={carFormData.name}
//                           onChange={handleCarFormChange}
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>Brand *</label>
//                         <input
//                           type="text"
//                           name="brand"
//                           value={carFormData.brand}
//                           onChange={handleCarFormChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="form-row">
//                       <div className="form-group">
//                         <label>Model *</label>
//                         <input
//                           type="text"
//                           name="model"
//                           value={carFormData.model}
//                           onChange={handleCarFormChange}
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>Year *</label>
//                         <input
//                           type="number"
//                           name="year"
//                           value={carFormData.year}
//                           onChange={handleCarFormChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="form-row">
//                       <div className="form-group">
//                         <label>Price per Day ({carFormData.currency || 'AED'}) *</label>
//                         <input
//                           type="number"
//                           name="pricePerDay"
//                           value={carFormData.pricePerDay}
//                           onChange={handleCarFormChange}
//                           required
//                           min="0"
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>Price 60min ({carFormData.currency || 'AED'})</label>
//                         <input
//                           type="number"
//                           name="price60min"
//                           value={carFormData.price60min}
//                           onChange={handleCarFormChange}
//                           min="0"
//                         />
//                       </div>
//                     </div>
//                     <div className="form-row">
//                       <div className="form-group">
//                         <label>Price 30min ({carFormData.currency || 'AED'})</label>
//                         <input
//                           type="number"
//                           name="price30min"
//                           value={carFormData.price30min}
//                           onChange={handleCarFormChange}
//                           min="0"
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>Currency</label>
//                         <select
//                           name="currency"
//                           value={carFormData.currency}
//                           onChange={handleCarFormChange}
//                         >
//                           <option value="AED">AED</option>
//                           <option value="USD">USD</option>
//                           <option value="EUR">EUR</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div className="form-row">
//                       <div className="form-group">
//                         <label>Seats *</label>
//                         <input
//                           type="number"
//                           name="seats"
//                           value={carFormData.seats}
//                           onChange={handleCarFormChange}
//                           required
//                           min="1"
//                         />
//                       </div>
//                     </div>
//                     <div className="form-row">
//                       <div className="form-group">
//                         <label>Transmission *</label>
//                         <select
//                           name="transmission"
//                           value={carFormData.transmission}
//                           onChange={handleCarFormChange}
//                           required
//                         >
//                           <option value="Manual">Manual</option>
//                           <option value="Automatic">Automatic</option>
//                         </select>
//                       </div>
//                       <div className="form-group">
//                         <label>Fuel Type *</label>
//                         <select
//                           name="fuelType"
//                           value={carFormData.fuelType}
//                           onChange={handleCarFormChange}
//                           required
//                         >
//                           <option value="Petrol">Petrol</option>
//                           <option value="Diesel">Diesel</option>
//                           <option value="Electric">Electric</option>
//                           <option value="Hybrid">Hybrid</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div className="form-group">
//   <label>Vehicle Image *</label>

//   <input
//     type="file"
//     accept="image/*"
//     onChange={handleCarFormChange}
//   />

//   <input
//     type="text"
//     name="imageUrl"
//     placeholder="OR paste image URL"
//     value={carFormData.imageUrl}
//     onChange={(e) => {
//       setCarFormData(prev => ({
//         ...prev,
//         imageUrl: e.target.value,
//         imageFile: null
//       }));
//       setImagePreview(e.target.value);
//     }}
//     style={{ marginTop: '10px' }}
//   />

//   {imagePreview && (
//     <div style={{ marginTop: '10px' }}>
//       <img
//         src={imagePreview}
//         alt="preview"
//         style={{ width: '100%', height: '150px', objectFit: 'cover' }}
//       />
//       <button
//         type="button"
//         onClick={() => {
//           setCarFormData(prev => ({
//             ...prev,
//             imageFile: null,
//             imageUrl: ''
//           }));
//           setImagePreview(null);
//         }}
//       >
//         Remove
//       </button>
//     </div>
//   )}
// </div>

//                     <div className="form-group">
//                       <label>Description</label>
//                       <textarea
//                         name="description"
//                         value={carFormData.description}
//                         onChange={handleCarFormChange}
//                         rows="3"
//                       />
//                     </div>
//                     <div className="form-group">
//                       <label>
//                         <input
//                           type="checkbox"
//                           name="available"
//                           checked={carFormData.available}
//                           onChange={handleCarFormChange}
//                         />
//                         Available
//                       </label>
//                     </div>
//                     <div className="form-actions">
//                       <button type="submit" className="btn btn-primary">
//                         {editingCar ? 'Update Car' : 'Add Car'}
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setShowCarForm(false);
//                           setEditingCar(null);
//                         }}
//                         className="btn btn-secondary"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             )}

//             {loading ? (
//               <div className="loading">Loading cars...</div>
//             ) : (
//               <div className="cars-grid">
//                 {cars.map((car) => (
//                   <div key={car._id} className={`car-admin-card ${!car.available ? 'car-unavailable' : ''}`}>
//                     <div className="car-image-wrapper-admin">
//                       <img src={car.image} alt={car.name} />
//                       {car.available ? (
//                         <span className="availability-badge-admin available">✓ Available</span>
//                       ) : (
//                         <span className="availability-badge-admin unavailable">✗ Not Available</span>
//                       )}
//                     </div>
//                     <div className="car-admin-info">
//                       <h4>{car.name}</h4>
//                       <p>{car.brand} {car.model} ({car.year})</p>
//                       <p>{car.price60min ? `${car.price60min} ${car.currency || 'AED'}/60min` : `${car.pricePerDay} ${car.currency || 'AED'}/day`}</p>
//                       <div className="car-admin-actions">
//                         <button
//                           onClick={() => handleToggleAvailability(car._id, car.available)}
//                           className={`btn ${car.available ? 'btn-warning' : 'btn-success'}`}
//                           title={car.available ? 'Mark as Not Available' : 'Mark as Available'}
//                         >
//                           {car.available ? '✗ Mark Unavailable' : '✓ Mark Available'}
//                         </button>
//                         <button
//                           onClick={() => handleEditCar(car)}
//                           className="btn btn-secondary"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDeleteCar(car._id)}
//                           className="btn btn-danger"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCarForm, setShowCarForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [newBookingsCount, setNewBookingsCount] = useState(0);
  const [lastBookingId, setLastBookingId] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const [carFormData, setCarFormData] = useState({
    name: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    // pricePerDay: '',
    price30min: '',
    price60min: '',
    price90min: '',
    price120min: '',
    currency: 'AED',
    seats: '',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    description: '',
    available: true,
    imageFile: null,
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [showBlogDeleteModal, setShowBlogDeleteModal] = useState(false);
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    shortDescription: '',
    content: '',
    category: 'General',
    tags: '',
    status: 'published',
    isFeatured: false,
    imageFile: null,
  });
  const [blogImagePreview, setBlogImagePreview] = useState(null);
  const [blogSubmitting, setBlogSubmitting] = useState(false);
    
  useEffect(() => {
    fetchBookings();
    fetchCars();
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (activeTab === 'bookings') {
      fetchBookings();
    } else if (activeTab === 'cars') {
      fetchCars();
    } else if (activeTab === 'blogs') {
      fetchBlogs();
    }
  }, [activeTab]);

  useEffect(() => {
    checkNewBookings();
        
    const interval = setInterval(() => {
      checkNewBookings();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [lastBookingId]);

  const checkNewBookings = async () => {
    try {
      const response = await axios.get('/api/admin/bookings');
      const latestBookings = response.data;
            console.log(latestBookings,'latestBookings')
      if (latestBookings.length > 0) {
        const latestBooking = latestBookings[0];
                
        const pendingBookings = latestBookings.filter(b => b.status === 'pending');
        setNewBookingsCount(pendingBookings.length);
                
        if (!lastBookingId || latestBooking._id !== lastBookingId) {
          const newNotification = {
            id: Date.now(),
            message: `🔔 New booking: ${latestBooking.car?.name || 'Unknown'} - ${latestBooking.customerName || latestBooking.user?.name || 'Guest'}`,
            bookingId: latestBooking._id,
            status: latestBooking.status,
            timestamp: new Date()
          };
                  
          setNotifications(prev => {
            const exists = prev.some(n => n.bookingId === latestBooking._id);
            if (!exists) {
              if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('New Booking Received!', {
                  body: newNotification.message,
                  icon: '/favicon.ico'
                });
              }
              return [newNotification, ...prev.slice(0, 9)];
            }
            return prev;
          });
                  
          setLastBookingId(latestBooking._id);
                  
          if (activeTab === 'bookings') {
            fetchBookings();
          }
        }
      }
    } catch (error) {
      console.error('Error checking new bookings:', error);
    }
  };
  
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/api/admin/bookings`);
  
      // Handle both response formats: direct array or wrapped in data object
      const bookingsArray = Array.isArray(response.data) 
        ? response.data 
        : (response.data?.data || []);
      
      console.log('Fetched bookings:', bookingsArray.length, bookingsArray);
      
      setBookings(bookingsArray);
  
      const pendingCount = bookingsArray.filter(
        b => b.status === 'pending'
      ).length;
  
      setNewBookingsCount(pendingCount);
  
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };
  

  const fetchCars = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/api/cars`);
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setCars([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/api/admin/blogs`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      setBlogs(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
    }
  };

  // const handleCarFormChange = (e) => {
  //   const { name, value, type, checked, files } = e.target;
  
  //   if (type === 'file') {
  //     const file = files[0];
  //     if (!file) return;
  
  //     setCarFormData((prev) => ({
  //       ...prev,
  //       imageFile: file,
  //     }));
  
  //     setImagePreview(URL.createObjectURL(file));
  //   } else {
  //     setCarFormData((prev) => ({
  //       ...prev,
  //       [name]: type === 'checkbox' ? checked : value,
  //     }));
  //   }
  // };
  
          
  const handleCarSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
  
      // Validate required fields
      if (!carFormData.name || !carFormData.brand || !carFormData.model) {
        setErrorMessage('Please fill in all required fields (Name, Brand, Model)');
        setShowErrorModal(true);
        setTimeout(() => setShowErrorModal(false), 4000);
        return;
      }

      if (!carFormData.seats || carFormData.seats < 1) {
        setErrorMessage('Please enter a valid number of seats (minimum 1)');
        setShowErrorModal(true);
        setTimeout(() => setShowErrorModal(false), 4000);
        return;
      }

      // For new car, image is required
      if (!editingCar && !carFormData.imageFile) {
        setErrorMessage('Please select an image for the car');
        setShowErrorModal(true);
        setTimeout(() => setShowErrorModal(false), 4000);
        return;
      }
  
      // Append all form fields except imageFile
      Object.entries(carFormData).forEach(([key, value]) => {
        if (key !== 'imageFile') {
          if (value === null || value === undefined || value === '') {
            // Skip empty values for optional fields
            if (key === 'price30min' || key === 'price60min' || key === 'price90min' || key === 'price120min' || key === 'description') {
              return; // Skip optional fields
            }
          }
          
          // Convert types properly
          if (key === 'year' || key === 'seats') {
            formData.append(key, Number(value));
          } else if (key === 'price30min' || key === 'price60min' || key === 'price90min' || key === 'price120min') {
            if (value && value !== '') {
              formData.append(key, Number(value));
            }
          } else if (key === 'available') {
            formData.append(key, value === true || value === 'true' ? 'true' : 'false');
          } else {
            formData.append(key, value);
          }
        }
      });
  
      // Append image file (if selected)
      if (carFormData.imageFile instanceof File) {
        formData.append('image', carFormData.imageFile); // must match backend field name
      }
  
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const token = localStorage.getItem('token');
      
      // Get axios instance with default headers
      const axiosConfig = {
        headers: {
          // Don't set Content-Type manually - let browser set it with boundary for FormData
          'Authorization': token ? `Bearer ${token}` : undefined
        }
      };
      
      // Remove undefined headers
      Object.keys(axiosConfig.headers).forEach(key => {
        if (axiosConfig.headers[key] === undefined) {
          delete axiosConfig.headers[key];
        }
      });
      
      if (editingCar) {
        // Update existing car
        await axios.put(
          `${apiUrl}/api/admin/cars/${editingCar._id}`,
          formData,
          axiosConfig
        );
        setSuccessMessage('Car updated successfully!');
        setShowSuccessModal(true);
      } else {
        // Add new car
        await axios.post(
          `${apiUrl}/api/admin/cars`,
          formData,
          axiosConfig
        );
        setSuccessMessage('Car added successfully!');
        setShowSuccessModal(true);
      }
  
      fetchCars();
      setShowCarForm(false);
      setEditingCar(null);
      setImagePreview(null);
      
      // Auto close modal after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (error) {
      console.error('Car submit error:', error);
      const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to save car';
      setErrorMessage(errorMsg);
      setShowErrorModal(true);
      
      // Auto close error modal after 4 seconds
      setTimeout(() => {
        setShowErrorModal(false);
      }, 4000);
    }
  };
  
  // Handle file input change
  const handleCarFormChange = (e) => {
    const { name, value, type, checked, files } = e.target;
  
    if (type === 'file') {
      const file = files[0];
      setCarFormData(prev => ({ ...prev, imageFile: file }));
  
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else if (type === 'checkbox') {
      setCarFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setCarFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  
  


          
  const handleEditCar = (car) => {
    setEditingCar(car);
  
    setCarFormData({
      name: car.name,
      brand: car.brand,
      model: car.model,
      year: car.year,
      // pricePerDay: car.pricePerDay,
      price30min: car.price30min || '',
      price60min: car.price60min || '',
      price90min: car.price90min || '',
      price120min: car.price120min || '',
      currency: car.currency || 'AED',
      seats: car.seats,
      transmission: car.transmission,
      fuelType: car.fuelType,
      description: car.description || '',
      available: car.available,
      imageFile: null        // 🔥 VERY IMPORTANT
    });
  
    // ✅ sirf UI preview ke liye
    setImagePreview(car.image);
  
    setShowCarForm(true);
  };
  
  

  const handleDeleteCar = (carId) => {
    const car = cars.find(c => c._id === carId);
    setCarToDelete({ id: carId, name: car?.name || 'this car' });
    setShowDeleteModal(true);
  };

  const confirmDeleteCar = async () => {
    if (!carToDelete) return;
    
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await axios.delete(`${apiUrl}/api/admin/cars/${carToDelete.id}`);
      setShowDeleteModal(false);
      setCarToDelete(null);
      setSuccessMessage('Car deleted successfully!');
      setShowSuccessModal(true);
      fetchCars();
      
      // Auto close success modal after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (error) {
      setShowDeleteModal(false);
      setErrorMessage(error.response?.data?.message || 'Failed to delete car');
      setShowErrorModal(true);
      
      // Auto close error modal after 4 seconds
      setTimeout(() => {
        setShowErrorModal(false);
      }, 4000);
    }
  };

  const handleToggleAvailability = async (carId, currentStatus) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await axios.put(`${apiUrl}/api/admin/cars/${carId}`, {
        available: !currentStatus
      });
      fetchCars();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update availability');
    }
  };

  const handleUpdateBookingStatus = async (bookingId, status) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await axios.put(`${apiUrl}/api/admin/bookings/${bookingId}/status`, { status });
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update status');
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await axios.put(`${apiUrl}/api/bookings/${bookingId}/cancel`);
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const activeBookings = bookings.filter(b => 
    b.status === 'pending' || b.status === 'confirmed'
  );
  const bookedCarIds = [...new Set(activeBookings.map(b => b.car?._id?.toString()).filter(Boolean))];
  
  const stats = {
    totalCars: cars.length,
    availableCars: cars.filter(car => !bookedCarIds.includes(car._id.toString())).length,
    bookedCars: bookedCarIds.length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    cancelledBookings: bookings.filter(b => b.status === 'cancelled').length,
    totalRevenue: bookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0)
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { class: 'status-pending', text: 'Pending' },
      confirmed: { class: 'status-confirmed', text: 'Approved' },
      cancelled: { class: 'status-cancelled', text: 'Cancelled' }
    };
    const statusInfo = statusMap[status] || statusMap.pending;
    return <span className={`status-badge ${statusInfo.class}`}>{statusInfo.text}</span>;
  };

  const handleBlogFormChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (!file) return;
      setBlogFormData(prev => ({
        ...prev,
        imageFile: file,
      }));
      setBlogImagePreview(URL.createObjectURL(file));
    } else {
      setBlogFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent double submission
    if (blogSubmitting) return;
    
    try {
      // Frontend validation - Only title and image required
      if (!blogFormData.title || blogFormData.title.trim().length === 0) {
        setErrorMessage('Please enter a blog title');
        setShowErrorModal(true);
        setTimeout(() => setShowErrorModal(false), 4000);
        return;
      }

      // Validate title length
      if (blogFormData.title.trim().length < 3) {
        setErrorMessage('Title must be at least 3 characters long');
        setShowErrorModal(true);
        setTimeout(() => setShowErrorModal(false), 4000);
        return;
      }

      // Validate image for new blog
      if (!editingBlog && !blogFormData.imageFile) {
        setErrorMessage('Please upload a cover image for the blog');
        setShowErrorModal(true);
        setTimeout(() => setShowErrorModal(false), 4000);
        return;
      }

      // Set loading state
      setBlogSubmitting(true);

      const formData = new FormData();
      formData.append('title', blogFormData.title);
      formData.append('shortDescription', blogFormData.shortDescription);
      formData.append('content', blogFormData.content);
      formData.append('category', blogFormData.category || 'General');
      formData.append('tags', blogFormData.tags || '');
      formData.append('status', blogFormData.status || 'published');
      formData.append('isFeatured', blogFormData.isFeatured ? 'true' : 'false');

      if (blogFormData.imageFile instanceof File) {
        formData.append('image', blogFormData.imageFile);
      }

      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const token = localStorage.getItem('token');

      const axiosConfig = {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      };

      let response;
      if (editingBlog) {
        response = await axios.put(
          `${apiUrl}/api/admin/blogs/${editingBlog._id}`,
          formData,
          axiosConfig
        );
      } else {
        response = await axios.post(
          `${apiUrl}/api/admin/blogs`,
          formData,
          axiosConfig
        );
      }

      console.log('Blog saved:', response.data);
      setSuccessMessage(editingBlog ? 'Blog updated successfully!' : 'Blog created successfully!');
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 4000);

      setShowBlogForm(false);
      setEditingBlog(null);
      setBlogFormData({
        title: '',
        shortDescription: '',
        content: '',
        category: 'General',
        tags: '',
        status: 'published',
        isFeatured: false,
        imageFile: null,
      });
      setBlogImagePreview(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      console.error('Error response:', error.response);
      
      // Better error message handling
      let errorMsg = 'Failed to save blog';
      
      try {
        if (error.response?.data) {
          const responseData = error.response.data;
          
          // Handle string error
          if (typeof responseData.error === 'string') {
            errorMsg = responseData.error;
          } 
          // Handle error object
          else if (responseData.error && typeof responseData.error === 'object') {
            errorMsg = JSON.stringify(responseData.error);
          }
          // Handle message
          else if (responseData.message) {
            errorMsg = responseData.message;
            if (responseData.error) {
              errorMsg += ': ' + (typeof responseData.error === 'string' ? responseData.error : JSON.stringify(responseData.error));
            }
          }
        } else if (error.message) {
          errorMsg = error.message;
        }
      } catch (parseError) {
        console.error('Error parsing error response:', parseError);
        errorMsg = 'An unexpected error occurred. Please try again.';
      }
      
      setErrorMessage(errorMsg);
      setShowErrorModal(true);
      setTimeout(() => setShowErrorModal(false), 5000);
    } finally {
      // Always reset loading state
      setBlogSubmitting(false);
    }
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setShowBlogForm(true);
    setBlogFormData({
      title: blog.title || '',
      shortDescription: blog.shortDescription || '',
      content: blog.content || '',
      category: blog.category || 'General',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : (blog.tags || ''),
      status: blog.status || 'published',
      isFeatured: !!blog.isFeatured,
      imageFile: null,
    });
    setBlogImagePreview(blog.mainImage || null);
  };

  const handleDeleteBlogClick = (blog) => {
    setBlogToDelete(blog);
    setShowBlogDeleteModal(true);
  };

  const confirmDeleteBlog = async () => {
    if (!blogToDelete) return;
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const token = localStorage.getItem('token');
      await axios.delete(`${apiUrl}/api/admin/blogs/${blogToDelete._id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      setShowBlogDeleteModal(false);
      setBlogToDelete(null);
      setSuccessMessage('Blog deleted successfully!');
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 4000);
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to delete blog');
      setShowErrorModal(true);
      setTimeout(() => setShowErrorModal(false), 4000);
    }
  };

  // Generate chart data for last 7 days
  const getChartData = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayBookings = bookings.filter(b => {
        const bookingDate = new Date(b.createdAt);
        return bookingDate.toDateString() === date.toDateString();
      }).length;
      last7Days.push({
        date: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
        value: dayBookings
      });
    }
    return last7Days;
  };

  const chartData = getChartData();
  const maxChartValue = Math.max(...chartData.map(d => d.value), 1);

  return (
    <div className="admin-dashboard">
      {/* Left Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-logo">Dashboard</div>
        <ul className="sidebar-nav">
          <li className="sidebar-nav-item">
            <a 
              className={`sidebar-nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"/>
                <path d="M9 22V12H15V22"/>
              </svg>
              Dashboard
            </a>
          </li>
          <li className="sidebar-nav-item">
            <a 
              className={`sidebar-nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15"/>
              </svg>
              Booking Summary
            </a>
          </li>
          <li className="sidebar-nav-item">
            <a 
              className={`sidebar-nav-link ${activeTab === 'cars' ? 'active' : ''}`}
              onClick={() => setActiveTab('cars')}
            >
              <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"/>
                <path d="M14 2V8H20"/>
              </svg>
              Car Overview
            </a>
          </li>
        
          <li className="sidebar-nav-item">
            <a className="sidebar-nav-link" onClick={handleLogout}>
              <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"/>
              </svg>
              Log Out
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {notifications.length > 0 && (
          <div className="notifications-panel">
            <div className="notifications-header">
              <div className="notifications-header-left">
                <div className="notifications-icon-wrapper">
                  <svg className="notifications-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="notifications-title">Recent Notifications</h3>
                  <p className="notifications-subtitle">{notifications.length} new {notifications.length === 1 ? 'notification' : 'notifications'}</p>
                </div>
              </div>
              <button 
                onClick={() => { setNotifications([]); setNewBookingsCount(0); }} 
                className="btn-clear-notifications"
                title="Clear all notifications"
              >
                <svg className="btn-clear-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
                Clear All
              </button>
            </div>
            <div className="notifications-list">
              {notifications.map((notif) => (
                <div key={notif.id} className="notification-item" onClick={() => { setActiveTab('bookings'); setNewBookingsCount(0); }}>
                  <div className="notification-icon">🔔</div>
                  <div className="notification-content">
                    <p className="notification-message">{notif.message}</p>
                    <span className="notification-time">
                      {new Date(notif.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="admin-tabs">
          <button
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={activeTab === 'bookings' ? 'active' : ''}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
          </button>
          <button
            className={activeTab === 'cars' ? 'active' : ''}
            onClick={() => setActiveTab('cars')}
          >
            Cars
          </button>
          <button
            className={activeTab === 'blogs' ? 'active' : ''}
            onClick={() => setActiveTab('blogs')}
          >
            Blogs
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="admin-overview">
            {/* Top Stats Cards - 4 Cards */}
            <div className="stats-top-grid">
              <div className="stat-card-top">
                <div className="stat-card-label">Total Vehicles</div>
                <div className="stat-card-value">{stats.totalCars}</div>
              </div>
              <div className="stat-card-top">
                <div className="stat-card-label">Available Cars</div>
                <div className="stat-card-value">{stats.availableCars}</div>
              </div>
              <div className="stat-card-top">
                <div className="stat-card-label">Total Bookings</div>
                <div className="stat-card-value">{stats.totalBookings}</div>
              </div>
              <div className="stat-card-top">
                <div className="stat-card-label">Revenue (AED)</div>
                <div className="stat-card-value">{stats.totalRevenue.toLocaleString()}</div>
              </div>
            </div>

            {/* Main Content Grid - Graph Left, Account Right */}
            <div className="dashboard-content-grid">
              {/* Account Statistics - Left Side */}
              <div className="account-statistics-card">
                <h3 className="account-statistics-title">Account Statistics</h3>
                <div className="chart-container">
                  <div className="chart-line">
                    {chartData.map((item, index) => (
                      <div key={index} className="chart-bar" style={{ height: `${(item.value / maxChartValue) * 100}%` }}>
                        <span className="chart-bar-value">{item.value}</span>
                        <span className="chart-bar-label">{item.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Account Section - Right Side */}
              <div className="account-section-card">
                <h3 className="account-section-title">Account</h3>
                <div className="account-profile">
                  <div className="account-avatar">A</div>
                  <div className="account-name">Admin</div>
                </div>
                <div className="account-stats">
                  <div className="account-stat-item">
                    <span className="account-stat-label">Total Vehicles</span>
                    <span className="account-stat-value">{stats.totalCars}</span>
                  </div>
                  <div className="account-stat-item">
                    <span className="account-stat-label">Available Cars</span>
                    <span className="account-stat-value">{stats.availableCars}</span>
                  </div>
                  <div className="account-stat-item">
                    <span className="account-stat-label">Total Bookings</span>
                    <span className="account-stat-value">{stats.totalBookings}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Progress Bars */}
            <div className="statistics-section">
              <h3 className="statistics-title">Statistics</h3>
              <div className="statistics-item">
                <div className="statistics-header">
                  <span className="statistics-label">Available Cars</span>
                  <span className="statistics-percentage">{stats.totalCars > 0 ? Math.round((stats.availableCars / stats.totalCars) * 100) : 0}%</span>
                </div>
                <div className="statistics-progress-bar">
                  <div className="statistics-progress-fill" style={{ width: `${stats.totalCars > 0 ? (stats.availableCars / stats.totalCars) * 100 : 0}%` }}></div>
                </div>
              </div>
              <div className="statistics-item">
                <div className="statistics-header">
                  <span className="statistics-label">Booked Cars</span>
                  <span className="statistics-percentage">{stats.totalCars > 0 ? Math.round((stats.bookedCars / stats.totalCars) * 100) : 0}%</span>
                </div>
                <div className="statistics-progress-bar">
                  <div className="statistics-progress-fill" style={{ width: `${stats.totalCars > 0 ? (stats.bookedCars / stats.totalCars) * 100 : 0}%` }}></div>
                </div>
              </div>
              <div className="statistics-item">
                <div className="statistics-header">
                  <span className="statistics-label">Confirmed Bookings</span>
                  <span className="statistics-percentage">{stats.totalBookings > 0 ? Math.round((stats.confirmedBookings / stats.totalBookings) * 100) : 0}%</span>
                </div>
                <div className="statistics-progress-bar">
                  <div className="statistics-progress-fill" style={{ width: `${stats.totalBookings > 0 ? (stats.confirmedBookings / stats.totalBookings) * 100 : 0}%` }}></div>
                </div>
              </div>
              <div className="statistics-item">
                <div className="statistics-header">
                  <span className="statistics-label">Pending Bookings</span>
                  <span className="statistics-percentage">{stats.totalBookings > 0 ? Math.round((stats.pendingBookings / stats.totalBookings) * 100) : 0}%</span>
                </div>
                <div className="statistics-progress-bar">
                  <div className="statistics-progress-fill" style={{ width: `${stats.totalBookings > 0 ? (stats.pendingBookings / stats.totalBookings) * 100 : 0}%` }}></div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="recent-section">
              <h3 className="recent-title">Recent Bookings</h3>
              <div className="recent-list">
                {bookings.slice(0, 5).map((booking) => (
                  <div key={booking._id} className="recent-item">
                    <div className="recent-item-info">
                      <div className="recent-item-title">{booking.car?.name || 'Unknown Car'}</div>
                      <div className="recent-item-meta">
                        <span>{booking.customerName || 'Guest'}</span>
                        <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
                        <span>{booking.totalPrice} {booking.car?.currency || 'AED'}</span>
                      </div>
                    </div>
                    <div className="recent-item-actions">
                      {getStatusBadge(booking.status)}
                    </div>
                  </div>
                ))}
                {bookings.length === 0 && (
                  <div className="recent-item">
                    <div className="recent-item-info">
                      <div className="recent-item-title">No bookings yet</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Keep existing bookings and cars tabs */}
        {activeTab === 'bookings' && (
          <div className="bookings-section">
            <h2 className="dashboard-title">All Bookings</h2>
            {loading ? (
              <p>Loading...</p>
            ) : bookings.length === 0 ? (
              <p>No bookings found.</p>
            ) : (
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>Car</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Dates</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => {
                    if (!booking.car) return null;
                    const customerName = booking.customerName || booking.user?.name || 'Guest';
                    const customerEmail = booking.customerEmail || booking.user?.email || 'N/A';
                    const paymentMethod = booking.paymentMethod || 'cash';
                    const paymentMethodDisplay = paymentMethod === 'card' ? '💳 Card' : '💵 Cash';
                    
                    return (
                      <tr key={booking._id}>
                        <td>{booking.car?.name || 'Unknown'}</td>
                        <td>{customerName}</td>
                        <td>{customerEmail}</td>
                        <td>
                          {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                        </td>
                        <td>{booking.totalPrice} {booking.car?.currency || 'AED'}</td>
                        <td>{paymentMethodDisplay}</td>
                        <td>{getStatusBadge(booking.status)}</td>
                        <td>
                          <select
                            value={booking.status}
                            onChange={(e) => handleUpdateBookingStatus(booking._id, e.target.value)}
                            className="status-select"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'cars' && (
          <div className="bookings-section">
            <h2 className="dashboard-title">Cars Management</h2>
            
            <button
              onClick={() => {
                setShowCarForm(true);
                setEditingCar(null);
                setCarFormData({
                  name: '',
                  brand: '',
                  model: '',
                  year: new Date().getFullYear(),
                  price30min: '',
                  price60min: '',
                  price90min: '',
                  price120min: '',
                  currency: 'AED',
                  seats: '',
                  transmission: 'Automatic',
                  fuelType: 'Petrol',
                  description: '',
                  available: true,
                  imageFile: null
                });
                setImagePreview(null);
              }}
              className="btn btn-primary"
              style={{ marginBottom: '1.5rem' }}
            >
              + Add New Car
            </button>

            {showCarForm && (
              <div className="car-form-modal" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
              }}>
                <div className="car-form-content" style={{
                  background: '#1A1A1A',
                  padding: '2rem',
                  borderRadius: '12px',
                  maxWidth: '600px',
                  width: '90%',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  border: '1px solid #1F2937'
                }}>
                  <h3 style={{ color: '#ffffff', marginBottom: '1.5rem' }}>
                    {editingCar ? 'Edit Car' : 'Add New Car'}
                  </h3>
                  <form onSubmit={handleCarSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.5rem' }}>Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={carFormData.name}
                          onChange={handleCarFormChange}
                          required
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1F2937', background: '#111111', color: '#ffffff' }}
                        />
                      </div>
                      <div>
                        <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.5rem' }}>Brand *</label>
                        <input
                          type="text"
                          name="brand"
                          value={carFormData.brand}
                          onChange={handleCarFormChange}
                          required
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1F2937', background: '#111111', color: '#ffffff' }}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.5rem' }}>Model *</label>
                        <input
                          type="text"
                          name="model"
                          value={carFormData.model}
                          onChange={handleCarFormChange}
                          required
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1F2937', background: '#111111', color: '#ffffff' }}
                        />
                      </div>
                      <div>
                        <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.5rem' }}>Year *</label>
                        <input
                          type="number"
                          name="year"
                          value={carFormData.year}
                          onChange={handleCarFormChange}
                          required
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1F2937', background: '#111111', color: '#ffffff' }}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.5rem' }}>Price 30min ({carFormData.currency})</label>
                        <input
                          type="number"
                          name="price30min"
                          value={carFormData.price30min}
                          onChange={handleCarFormChange}
                          min="0"
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1F2937', background: '#111111', color: '#ffffff' }}
                        />
                      </div>
                      <div>
                        <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.5rem' }}>Price 60min ({carFormData.currency})</label>
                        <input
                          type="number"
                          name="price60min"
                          value={carFormData.price60min}
                          onChange={handleCarFormChange}
                          min="0"
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1F2937', background: '#111111', color: '#ffffff' }}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.5rem' }}>Price 90min ({carFormData.currency})</label>
                        <input
                          type="number"
                          name="price90min"
                          value={carFormData.price90min}
                          onChange={handleCarFormChange}
                          min="0"
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1F2937', background: '#111111', color: '#ffffff' }}
                        />
                      </div>
                      <div>
                        <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.5rem' }}>Price 120min ({carFormData.currency})</label>
                        <input
                          type="number"
                          name="price120min"
                          value={carFormData.price120min}
                          onChange={handleCarFormChange}
                          min="0"
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1F2937', background: '#111111', color: '#ffffff' }}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.5rem' }}>Seats *</label>
                        <input
                          type="number"
                          name="seats"
                          value={carFormData.seats}
                          onChange={handleCarFormChange}
                          required
                          min="1"
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1F2937', background: '#111111', color: '#ffffff' }}
                        />
                      </div>
                      <div>
                        <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.5rem' }}>Currency</label>
                        <select
                          name="currency"
                          value={carFormData.currency}
                          onChange={handleCarFormChange}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1F2937', background: '#111111', color: '#ffffff' }}
                        >
                          <option value="AED">AED</option>
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.5rem' }}>Transmission *</label>
                        <select
                          name="transmission"
                          value={carFormData.transmission}
                          onChange={handleCarFormChange}
                          required
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1F2937', background: '#111111', color: '#ffffff' }}
                        >
                          <option value="Manual">Manual</option>
                          <option value="Automatic">Automatic</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.5rem' }}>Fuel Type *</label>
                        <select
                          name="fuelType"
                          value={carFormData.fuelType}
                          onChange={handleCarFormChange}
                          required
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1F2937', background: '#111111', color: '#ffffff' }}
                        >
                          <option value="Petrol">Petrol</option>
                          <option value="Diesel">Diesel</option>
                          <option value="Electric">Electric</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.5rem' }}>Description</label>
                      <textarea
                        name="description"
                        value={carFormData.description}
                        onChange={handleCarFormChange}
                        rows="3"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1F2937', background: '#111111', color: '#ffffff', resize: 'vertical' }}
                      />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.5rem' }}>Vehicle Image *</label>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleCarFormChange}
                        required={!editingCar}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1F2937', background: '#111111', color: '#ffffff' }}
                      />
                      {imagePreview && (
                        <div style={{ marginTop: '10px' }}>
                          <img src={imagePreview} alt="preview" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                        </div>
                      )}
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          name="available"
                          checked={carFormData.available}
                          onChange={handleCarFormChange}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <span>Available</span>
                      </label>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                      <button type="submit" className="btn btn-primary">
                        {editingCar ? 'Update Car' : 'Add Car'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowCarForm(false);
                          setEditingCar(null);
                          setImagePreview(null);
                        }}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {loading ? (
              <p style={{ color: 'var(--text-desc)' }}>Loading cars...</p>
            ) : (
              <div className="cars-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem',
                marginTop: '1.5rem'
              }}>
                {cars.map((car) => (
                  <div key={car._id} className="car-admin-card" style={{
                    background: '#1A1A1A',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid #1F2937',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(233, 185, 73, 0.2)';
                    e.currentTarget.style.borderColor = '#E9B949';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.borderColor = '#1F2937';
                  }}
                  >
                    <div style={{ 
                      position: 'relative', 
                      height: '220px', 
                      overflow: 'hidden',
                      background: '#111111'
                    }}>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
                        zIndex: 1
                      }}></div>
                      <img 
                        src={car.image} 
                        alt={car.name} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          opacity: 0.85,
                          transition: 'opacity 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.opacity = '1'}
                        onMouseLeave={(e) => e.target.style.opacity = '0.85'}
                      />
                      <span style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        padding: '0.4rem 0.9rem',
                        borderRadius: '8px',
                        background: car.available ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        zIndex: 2,
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                      }}>
                        {car.available ? '✓ Available' : '✗ Unavailable'}
                      </span>
                    </div>
                    <div style={{ padding: '1.75rem' }}>
                      <h4 style={{ 
                        color: '#ffffff', 
                        marginBottom: '0.5rem', 
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        letterSpacing: '0.3px'
                      }}>
                        {car.name}
                      </h4>
                      <p style={{ 
                        color: '#9CA3AF', 
                        marginBottom: '1rem', 
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>
                        {car.brand} {car.model} • {car.year}
                      </p>
                      <div style={{ 
                        marginBottom: '1.25rem',
                        padding: '1rem',
                        background: '#111111',
                        borderRadius: '10px',
                        border: '1px solid #1F2937'
                      }}>
                        <p style={{ 
                          color: '#E9B949', 
                          marginBottom: '0.5rem', 
                          fontWeight: '700', 
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          marginBottom: '0.75rem'
                        }}>
                          Pricing
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          {car.price30min && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>30min</span>
                              <span style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: '600' }}>
                                {car.price30min} {car.currency || 'AED'}
                              </span>
                            </div>
                          )}
                          {car.price60min && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>60min</span>
                              <span style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: '600' }}>
                                {car.price60min} {car.currency || 'AED'}
                              </span>
                            </div>
                          )}
                          {car.price90min && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>90min</span>
                              <span style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: '600' }}>
                                {car.price90min} {car.currency || 'AED'}
                              </span>
                            </div>
                          )}
                          {car.price120min && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>120min</span>
                              <span style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: '600' }}>
                                {car.price120min} {car.currency || 'AED'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => handleToggleAvailability(car._id, car.available)}
                          className="btn"
                          style={{
                            background: car.available ? '#f59e0b' : '#10b981',
                            color: 'white',
                            padding: '0.65rem 1.25rem',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            transition: 'all 0.2s ease',
                            flex: '1',
                            minWidth: '120px'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          {car.available ? '✗ Unavailable' : '✓ Available'}
                        </button>
                        <button
                          onClick={() => handleEditCar(car)}
                          className="btn btn-secondary"
                          style={{
                            background: '#1F2937',
                            color: '#ffffff',
                            padding: '0.65rem 1.25rem',
                            borderRadius: '8px',
                            border: '1px solid #374151',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            transition: 'all 0.2s ease',
                            flex: '1',
                            minWidth: '100px'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = '#374151';
                            e.target.style.borderColor = '#E9B949';
                            e.target.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = '#1F2937';
                            e.target.style.borderColor = '#374151';
                            e.target.style.transform = 'scale(1)';
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCar(car._id)}
                          className="btn"
                          style={{
                            background: '#ef4444',
                            color: 'white',
                            padding: '0.65rem 1.25rem',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            transition: 'all 0.2s ease',
                            flex: '1',
                            minWidth: '100px'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = '#dc2626';
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = '#ef4444';
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {cars.length === 0 && (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#9CA3AF' }}>
                    <p>No cars found. Add your first car!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'blogs' && (
          <div className="bookings-section">
            <h2 className="dashboard-title">Blogs Management</h2>

            <button
              onClick={() => {
                setShowBlogForm(true);
                setEditingBlog(null);
                setBlogFormData({
                  title: '',
                  shortDescription: '',
                  content: '',
                  category: 'General',
                  tags: '',
                  status: 'published',
                  isFeatured: false,
                  imageFile: null,
                });
                setBlogImagePreview(null);
              }}
              className="btn btn-primary"
              style={{ marginBottom: '1.5rem' }}
            >
              + Add New Blog
            </button>

            {showBlogForm && (
              <div className="car-form-modal" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.9)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2000,
                padding: '1rem'
              }}>
                <div className="car-form-content" style={{
                  background: '#1A1A1A',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  maxWidth: '700px',
                  width: '100%',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  border: '1px solid #1F2937',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
                  position: 'relative'
                }}
                onScroll={(e) => {
                  // Prevent body scroll when modal is open
                  e.stopPropagation();
                }}
                >
                  {/* Header */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '1.25rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid #1F2937'
                  }}>
                    <h3 style={{ 
                      color: '#E9B949', 
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      margin: 0
                    }}>
                      {editingBlog ? 'Edit Blog' : 'Create Blog'}
                    </h3>
                    <button
                      onClick={() => {
                        setShowBlogForm(false);
                        setEditingBlog(null);
                        setBlogImagePreview(null);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#9CA3AF',
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#1F2937';
                        e.target.style.color = '#E9B949';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = '#9CA3AF';
                      }}
                    >
                      ×
                    </button>
                  </div>
                  {/* Loading Overlay */}
                  {blogSubmitting && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0, 0, 0, 0.8)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                      borderRadius: '12px'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid #1F2937',
                        borderTop: '4px solid #E9B949',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        marginBottom: '1rem'
                      }}></div>
                      <p style={{
                        color: '#E9B949',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        margin: 0
                      }}>
                        {editingBlog ? 'Updating blog...' : 'Creating blog...'}
                      </p>
                      <style>{`
                        @keyframes spin {
                          0% { transform: rotate(0deg); }
                          100% { transform: rotate(360deg); }
                        }
                      `}</style>
                    </div>
                  )}
                  
                  <form onSubmit={handleBlogSubmit} style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '0.875rem',
                    position: 'relative',
                    opacity: blogSubmitting ? 0.5 : 1,
                    pointerEvents: blogSubmitting ? 'none' : 'auto',
                    transition: 'opacity 0.3s ease'
                  }}>
                    {/* Title */}
                    <div>
                      <label style={{ 
                        color: '#E9B949', 
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 600
                      }}>
                        Title <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={blogFormData.title}
                        onChange={handleBlogFormChange}
                        required
                        placeholder="Blog title..."
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          borderRadius: '8px', 
                          border: '1px solid #1F2937', 
                          background: '#111111', 
                          color: '#ffffff',
                          fontSize: '0.9rem',
                          transition: 'all 0.2s ease',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#E9B949';
                          e.target.style.boxShadow = '0 0 0 2px rgba(233, 185, 73, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#1F2937';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    {/* Short Description */}
                    <div>
                      <label style={{ 
                        color: '#E9B949', 
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 600
                      }}>
                        Short Description
                      </label>
                      <textarea
                        name="shortDescription"
                        value={blogFormData.shortDescription}
                        onChange={handleBlogFormChange}
                        rows={2}
                        placeholder="Brief description (optional)..."
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          borderRadius: '8px', 
                          border: '1px solid #1F2937', 
                          background: '#111111', 
                          color: '#ffffff',
                          fontSize: '0.9rem',
                          resize: 'vertical',
                          fontFamily: 'inherit',
                          transition: 'all 0.2s ease',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#E9B949';
                          e.target.style.boxShadow = '0 0 0 2px rgba(233, 185, 73, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#1F2937';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <label style={{ 
                        color: '#E9B949', 
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 600
                      }}>
                        Content
                      </label>
                      <textarea
                        name="content"
                        value={blogFormData.content}
                        onChange={handleBlogFormChange}
                        rows={6}
                        placeholder="Blog content (optional)..."
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          borderRadius: '8px', 
                          border: '1px solid #1F2937', 
                          background: '#111111', 
                          color: '#ffffff',
                          fontSize: '0.9rem',
                          resize: 'vertical',
                          fontFamily: 'inherit',
                          transition: 'all 0.2s ease',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#E9B949';
                          e.target.style.boxShadow = '0 0 0 2px rgba(233, 185, 73, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#1F2937';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    {/* Category and Status Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
                      <div>
                        <label style={{ 
                          color: '#E9B949', 
                          display: 'block',
                          marginBottom: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: 600
                        }}>
                          Category
                        </label>
                        <input
                          type="text"
                          name="category"
                          value={blogFormData.category}
                          onChange={handleBlogFormChange}
                          placeholder="Category..."
                          style={{ 
                            width: '100%', 
                            padding: '0.75rem', 
                            borderRadius: '8px', 
                            border: '1px solid #1F2937', 
                            background: '#111111', 
                            color: '#ffffff',
                            fontSize: '0.9rem',
                            transition: 'all 0.2s ease',
                            boxSizing: 'border-box'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#E9B949';
                            e.target.style.boxShadow = '0 0 0 2px rgba(233, 185, 73, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#1F2937';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ 
                          color: '#E9B949', 
                          display: 'block',
                          marginBottom: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: 600
                        }}>
                          Status
                        </label>
                        <select
                          name="status"
                          value={blogFormData.status}
                          onChange={handleBlogFormChange}
                          style={{ 
                            width: '100%', 
                            padding: '0.75rem', 
                            borderRadius: '8px', 
                            border: '1px solid #1F2937', 
                            background: '#111111', 
                            color: '#ffffff',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxSizing: 'border-box'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#E9B949';
                            e.target.style.boxShadow = '0 0 0 2px rgba(233, 185, 73, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#1F2937';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <label style={{ 
                        color: '#E9B949', 
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 600
                      }}>
                        Tags
                      </label>
                      <input
                        type="text"
                        name="tags"
                        value={blogFormData.tags}
                        onChange={handleBlogFormChange}
                        placeholder="tags, comma, separated"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          borderRadius: '8px', 
                          border: '1px solid #1F2937', 
                          background: '#111111', 
                          color: '#ffffff',
                          fontSize: '0.9rem',
                          transition: 'all 0.2s ease',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#E9B949';
                          e.target.style.boxShadow = '0 0 0 2px rgba(233, 185, 73, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#1F2937';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    {/* Cover Image */}
                    <div>
                      <label style={{ 
                        color: '#E9B949', 
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 600
                      }}>
                        Cover Image {!editingBlog && <span style={{ color: '#ef4444' }}>*</span>}
                      </label>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleBlogFormChange}
                        required={!editingBlog}
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          borderRadius: '8px', 
                          border: '1px solid #1F2937', 
                          background: '#111111', 
                          color: '#ffffff',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#E9B949';
                          e.target.style.boxShadow = '0 0 0 2px rgba(233, 185, 73, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#1F2937';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      {blogImagePreview && (
                        <div style={{ 
                          marginTop: '0.75rem', 
                          borderRadius: '8px', 
                          overflow: 'hidden', 
                          border: '1px solid #E9B949'
                        }}>
                          <img
                            src={blogImagePreview}
                            alt="Blog preview"
                            style={{ 
                              width: '100%', 
                              maxHeight: '200px', 
                              objectFit: 'cover',
                              display: 'block'
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Featured Checkbox */}
                    <div style={{ 
                      padding: '0.75rem',
                      background: '#111111',
                      borderRadius: '8px',
                      border: '1px solid #1F2937'
                    }}>
                      <label style={{ 
                        color: '#ffffff', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.75rem', 
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        margin: 0
                      }}>
                        <input
                          type="checkbox"
                          name="isFeatured"
                          checked={blogFormData.isFeatured}
                          onChange={handleBlogFormChange}
                          style={{ 
                            width: '18px', 
                            height: '18px', 
                            cursor: 'pointer',
                            accentColor: '#E9B949'
                          }}
                        />
                        <span>⭐ Featured</span>
                      </label>
                    </div>

                    {/* Form Actions */}
                    <div style={{ 
                      display: 'flex', 
                      gap: '0.75rem', 
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid #1F2937'
                    }}>
                      <button
                        type="button"
                        disabled={blogSubmitting}
                        onClick={() => {
                          if (!blogSubmitting) {
                            setShowBlogForm(false);
                            setEditingBlog(null);
                            setBlogImagePreview(null);
                          }
                        }}
                        style={{
                          flex: 1,
                          padding: '0.75rem 1.25rem',
                          borderRadius: '8px',
                          border: '1px solid #374151',
                          background: '#1F2937',
                          color: '#ffffff',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          cursor: blogSubmitting ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s ease',
                          opacity: blogSubmitting ? 0.5 : 1
                        }}
                        onMouseEnter={(e) => {
                          if (!blogSubmitting) {
                            e.target.style.background = '#374151';
                            e.target.style.borderColor = '#E9B949';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!blogSubmitting) {
                            e.target.style.background = '#1F2937';
                            e.target.style.borderColor = '#374151';
                          }
                        }}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        disabled={blogSubmitting}
                        style={{
                          flex: 1,
                          padding: '0.75rem 1.25rem',
                          borderRadius: '8px',
                          border: 'none',
                          background: blogSubmitting 
                            ? 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)'
                            : 'linear-gradient(135deg, #E9B949 0%, #f59e0c 100%)',
                          color: '#000000',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          cursor: blogSubmitting ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 4px 12px rgba(233, 185, 73, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          opacity: blogSubmitting ? 0.7 : 1
                        }}
                        onMouseEnter={(e) => {
                          if (!blogSubmitting) {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 16px rgba(233, 185, 73, 0.4)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!blogSubmitting) {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 12px rgba(233, 185, 73, 0.3)';
                          }
                        }}
                      >
                        {blogSubmitting ? (
                          <>
                            <div style={{
                              width: '16px',
                              height: '16px',
                              border: '2px solid #000000',
                              borderTop: '2px solid transparent',
                              borderRadius: '50%',
                              animation: 'spin 0.8s linear infinite'
                            }}></div>
                            <span>{editingBlog ? 'Updating...' : 'Creating...'}</span>
                          </>
                        ) : (
                          <span>{editingBlog ? 'Update' : 'Create'}</span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {blogs.length === 0 ? (
              <p>No blogs found.</p>
            ) : (
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Featured</th>
                    <th>Published</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog._id}>
                      <td>{blog.title}</td>
                      <td>{blog.category || 'General'}</td>
                      <td>{blog.status === 'published' ? 'Published' : 'Draft'}</td>
                      <td>{blog.isFeatured ? 'Yes' : 'No'}</td>
                      <td>{blog.publishDate ? new Date(blog.publishDate).toLocaleDateString() : '-'}</td>
                      <td>
                        <button
                          className="btn-table btn-edit"
                          type="button"
                          onClick={() => handleEditBlog(blog)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-table btn-delete"
                          type="button"
                          onClick={() => handleDeleteBlogClick(blog)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div 
          className="success-modal-overlay"
          onClick={() => setShowSuccessModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <div 
            className="success-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
              padding: '2.5rem',
              borderRadius: '16px',
              maxWidth: '420px',
              width: '90%',
              border: '2px solid #E9B949',
              boxShadow: '0 20px 60px rgba(233, 185, 73, 0.3)',
              textAlign: 'center',
              animation: 'slideUp 0.3s ease',
              position: 'relative'
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 1.5rem',
              background: 'linear-gradient(135deg, #E9B949 0%, #f59e0c 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(233, 185, 73, 0.4)'
            }}>
              <svg 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#000000" 
                strokeWidth="3"
                style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
              >
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h3 style={{
              color: '#ffffff',
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '0.75rem',
              fontFamily: 'Impact, Arial Black, Arial, sans-serif'
            }}>
              Success!
            </h3>
            <p style={{
              color: '#9CA3AF',
              fontSize: '1rem',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              {successMessage}
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              style={{
                background: '#E9B949',
                color: '#000000',
                border: 'none',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f59e0c';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(233, 185, 73, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#E9B949';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div 
          className="error-modal-overlay"
          onClick={() => setShowErrorModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <div 
            className="error-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
              padding: '2.5rem',
              borderRadius: '16px',
              maxWidth: '420px',
              width: '90%',
              border: '2px solid #ef4444',
              boxShadow: '0 20px 60px rgba(239, 68, 68, 0.3)',
              textAlign: 'center',
              animation: 'slideUp 0.3s ease',
              position: 'relative'
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 1.5rem',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(239, 68, 68, 0.4)'
            }}>
              <svg 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="3"
                style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
              >
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </div>
            <h3 style={{
              color: '#ffffff',
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '0.75rem',
              fontFamily: 'Impact, Arial Black, Arial, sans-serif'
            }}>
              Error!
            </h3>
            <p style={{
              color: '#fca5a5',
              fontSize: '1rem',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              {errorMessage}
            </p>
            <button
              onClick={() => setShowErrorModal(false)}
              style={{
                background: '#ef4444',
                color: '#ffffff',
                border: 'none',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#dc2626';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(239, 68, 68, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#ef4444';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Car Confirmation Modal */}
      {showDeleteModal && (
        <div 
          className="delete-modal-overlay"
          onClick={() => {
            setShowDeleteModal(false);
            setCarToDelete(null);
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <div 
            className="delete-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
              padding: '2.5rem',
              borderRadius: '16px',
              maxWidth: '450px',
              width: '90%',
              border: '2px solid #E9B949',
              boxShadow: '0 20px 60px rgba(233, 185, 73, 0.3)',
              textAlign: 'center',
              animation: 'slideUp 0.3s ease',
              position: 'relative'
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 1.5rem',
              background: 'linear-gradient(135deg, #E9B949 0%, #f59e0c 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(233, 185, 73, 0.4)'
            }}>
              <svg 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#000000" 
                strokeWidth="3"
                style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
              >
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
            </div>
            <h3 style={{
              color: '#E9B949',
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '1rem',
              fontFamily: 'Impact, Arial Black, Arial, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Delete Car?
            </h3>
            <p style={{
              color: '#9CA3AF',
              fontSize: '1rem',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Are you sure you want to delete <strong style={{ color: '#E9B949' }}>{carToDelete?.name}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setCarToDelete(null);
                }}
                style={{
                  background: '#1F2937',
                  color: '#ffffff',
                  border: '1px solid #374151',
                  padding: '0.875rem 2rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  flex: 1
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#374151';
                  e.target.style.borderColor = '#4B5563';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#1F2937';
                  e.target.style.borderColor = '#374151';
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteCar}
                style={{
                  background: '#E9B949',
                  color: '#000000',
                  border: 'none',
                  padding: '0.875rem 2rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  flex: 1
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#f59e0c';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(233, 185, 73, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#E9B949';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Blog Confirmation Modal */}
      {showBlogDeleteModal && blogToDelete && (
        <div 
          className="delete-modal-overlay"
          onClick={() => {
            setShowBlogDeleteModal(false);
            setBlogToDelete(null);
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <div 
            className="delete-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
              padding: '2.5rem',
              borderRadius: '16px',
              maxWidth: '450px',
              width: '90%',
              border: '2px solid #E9B949',
              boxShadow: '0 20px 60px rgba(233, 185, 73, 0.3)',
              textAlign: 'center',
              animation: 'slideUp 0.3s ease',
              position: 'relative'
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 1.5rem',
              background: 'linear-gradient(135deg, #E9B949 0%, #f59e0c 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(233, 185, 73, 0.4)'
            }}>
              <svg 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#000000" 
                strokeWidth="3"
                style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
              >
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
            </div>
            <h3 style={{
              color: '#E9B949',
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '1rem',
              fontFamily: 'Impact, Arial Black, Arial, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Delete Blog?
            </h3>
            <p style={{
              color: '#9CA3AF',
              fontSize: '1rem',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Are you sure you want to delete <strong style={{ color: '#E9B949' }}>{blogToDelete?.title}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => {
                  setShowBlogDeleteModal(false);
                  setBlogToDelete(null);
                }}
                style={{
                  background: '#1F2937',
                  color: '#ffffff',
                  border: '1px solid #374151',
                  padding: '0.875rem 2rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  flex: 1
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#374151';
                  e.target.style.borderColor = '#4B5563';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#1F2937';
                  e.target.style.borderColor = '#374151';
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteBlog}
                style={{
                  background: '#E9B949',
                  color: '#000000',
                  border: 'none',
                  padding: '0.875rem 2rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  flex: 1
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#f59e0c';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(233, 185, 73, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#E9B949';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
