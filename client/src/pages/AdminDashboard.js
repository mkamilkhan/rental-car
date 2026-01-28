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
    
  useEffect(() => {
    fetchBookings();
    fetchCars();
  }, []);

  useEffect(() => {
    if (activeTab === 'bookings') {
      fetchBookings();
    } else if (activeTab === 'cars') {
      fetchCars();
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
  
      // Append all form fields except imageFile
      Object.entries(carFormData).forEach(([key, value]) => {
        if (key !== 'imageFile') {
          // Booleans need to be converted to strings
          formData.append(key, typeof value === 'boolean' ? value.toString() : value);
        }
      });
  
      // Append image file (if selected)
      if (carFormData.imageFile instanceof File) {
        formData.append('image', carFormData.imageFile); // must match backend field name
      }
  
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  
      if (editingCar) {
        // Update existing car
        await axios.put(
          `${apiUrl}/api/admin/cars/${editingCar._id}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        alert('✅ Car updated successfully');
      } else {
        // Add new car
        await axios.post(
          `${apiUrl}/api/admin/cars`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        alert('✅ Car added successfully');
      }
  
      fetchCars();
      setShowCarForm(false);
      setEditingCar(null);
      setImagePreview(null);
    } catch (error) {
      console.error(error);
      alert('❌ Failed to save car');
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
  
  

  const handleDeleteCar = async (carId) => {
    if (!window.confirm('Are you sure you want to delete this car?')) {
      return;
    }
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await axios.delete(`${apiUrl}/api/admin/cars/${carId}`);
      fetchCars();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete car');
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
              Messages
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
              Files
            </a>
          </li>
          <li className="sidebar-nav-item">
            <a className="sidebar-nav-link">
              <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 7H17M7 12H17M7 17H12"/>
              </svg>
              Tags
            </a>
          </li>
          <li className="sidebar-nav-item">
            <a className="sidebar-nav-link">
              <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M20 8C20 9.65685 18.6569 11 17 11C15.3431 11 14 9.65685 14 8C14 6.34315 15.3431 5 17 5C18.6569 5 20 6.34315 20 8Z"/>
                <path d="M12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"/>
              </svg>
              Users
            </a>
          </li>
          <li className="sidebar-nav-item">
            <a className="sidebar-nav-link">
              <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"/>
                <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.3791 9.87119 19.8681 9.51699 19.4677C9.16279 19.0673 8.67894 18.8046 8.15 18.73C7.82978 18.6884 7.51438 18.5931 7.22 18.448C6.95272 18.2703 6.74228 18.0181 6.615 17.72C6.48115 17.4184 6.44145 17.0838 6.50023 16.7594C6.55901 16.435 6.71368 16.1357 6.944 15.9L7.004 15.84C7.18966 15.654 7.236 15.4337 7.236 15.1709C7.236 14.9081 7.18424 14.6478 7.08357 14.405C6.98291 14.1622 6.83543 13.9416 6.65 13.755C6.46426 13.569 6.24372 13.4215 6.00088 13.3209C5.75804 13.2202 5.49778 13.1684 5.235 13.1684C4.97222 13.1684 4.71196 13.2202 4.46912 13.3209C4.22628 13.4215 4.00574 13.569 3.82 13.755L3.76 13.815C3.52949 14.0457 3.37482 14.345 3.31604 14.6694C3.25726 14.9938 3.29695 15.3284 3.43 15.63C3.55684 15.9258 3.76728 16.178 4.03554 16.3557C4.3038 16.5334 4.61818 16.6287 4.94 16.63H5.05C5.58043 16.63 6.08914 16.8407 6.46421 17.2158C6.83929 17.5909 7.05 18.0996 7.05 18.63C7.05 19.1604 6.83929 19.6691 6.46421 20.0442C6.08914 20.4193 5.58043 20.63 5.05 20.63H5C4.46957 20.63 3.96086 20.4193 3.58579 20.0442C3.21071 19.6691 3 19.1604 3 18.63V18.5C3 17.9696 3.21071 17.4609 3.58579 17.0858C3.96086 16.7107 4.46957 16.5 5 16.5H5.09C5.42082 16.4923 5.73178 16.397 6 16.226Z"/>
              </svg>
              Setting
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
        <div className="dashboard-header">
          <h1 className="dashboard-title">Content Creator Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back! Here's what's happening with your bookings today.</p>
        </div>
                
        {notifications.length > 0 && (
          <div className="notifications-panel">
            <div className="notifications-header">
              <h3>📬 Recent Notifications</h3>
              <button onClick={() => { setNotifications([]); setNewBookingsCount(0); }} className="btn-clear-notifications">
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
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #1F2937',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                      <img src={car.image} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        background: car.available ? '#10b981' : '#ef4444',
                        color: 'white',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}>
                        {car.available ? '✓ Available' : '✗ Not Available'}
                      </span>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <h4 style={{ color: '#ffffff', marginBottom: '0.5rem', fontSize: '1.125rem' }}>{car.name}</h4>
                      <p style={{ color: '#9CA3AF', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                        {car.brand} {car.model} ({car.year})
                      </p>
                      <div style={{ marginBottom: '1rem' }}>
                        <p style={{ color: '#ffffff', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
                          {car.price30min && <span style={{ display: 'block' }}>30min: {car.price30min} {car.currency || 'AED'}</span>}
                          {car.price60min && <span style={{ display: 'block' }}>60min: {car.price60min} {car.currency || 'AED'}</span>}
                          {car.price90min && <span style={{ display: 'block' }}>90min: {car.price90min} {car.currency || 'AED'}</span>}
                          {car.price120min && <span style={{ display: 'block' }}>120min: {car.price120min} {car.currency || 'AED'}</span>}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => handleToggleAvailability(car._id, car.available)}
                          className="btn"
                          style={{
                            background: car.available ? '#f59e0b' : '#10b981',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.875rem'
                          }}
                        >
                          {car.available ? '✗ Mark Unavailable' : '✓ Mark Available'}
                        </button>
                        <button
                          onClick={() => handleEditCar(car)}
                          className="btn btn-secondary"
                          style={{
                            background: '#1F2937',
                            color: '#ffffff',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            border: '1px solid #1F2937',
                            cursor: 'pointer',
                            fontSize: '0.875rem'
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
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.875rem'
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
      </div>
    </div>
  );
};

export default AdminDashboard;
