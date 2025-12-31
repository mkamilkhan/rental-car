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
    pricePerDay: '',
    price30min: '',
    price60min: '',
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
      const response = await axios.get('/api/admin/bookings');
      setBookings(response.data);
            
      if (response.data.length > 0) {
        const latestBooking = response.data[0];
        const pendingCount = response.data.filter(b => b.status === 'pending').length;
        setNewBookingsCount(pendingCount);
                
        if (!lastBookingId) {
          setLastBookingId(latestBooking._id);
        }
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/cars');
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCarFormChange = (e) => {
    const { name, value, type, checked, files } = e.target;
  
    if (type === 'file') {
      const file = files[0];
      if (!file) return;
  
      setCarFormData((prev) => ({
        ...prev,
        imageFile: file,
      }));
  
      setImagePreview(URL.createObjectURL(file));
    } else {
      setCarFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };
  
          
  const handleCarSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
  
      Object.entries(carFormData).forEach(([key, value]) => {
        if (key !== 'imageFile') {
          formData.append(key, value);
        }
      });
  
      if (carFormData.imageFile instanceof File) {
        formData.append('imageFile', carFormData.imageFile);
      }
  
      if (editingCar) {
        await axios.put(
          `/api/admin/cars/${editingCar._id}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        alert('✅ Car updated successfully');
      } else {
        await axios.post(
          '/api/admin/cars',
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
  
  


          
  const handleEditCar = (car) => {
    setEditingCar(car);
  
    setCarFormData({
      name: car.name,
      brand: car.brand,
      model: car.model,
      year: car.year,
      pricePerDay: car.pricePerDay,
      price30min: car.price30min || '',
      price60min: car.price60min || '',
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
      await axios.delete(`/api/admin/cars/${carId}`);
      fetchCars();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete car');
    }
  };

  const handleToggleAvailability = async (carId, currentStatus) => {
    try {
      await axios.put(`/api/admin/cars/${carId}`, {
        available: !currentStatus
      });
      fetchCars();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update availability');
    }
  };

  const handleUpdateBookingStatus = async (bookingId, status) => {
    try {
      await axios.put(`/api/admin/bookings/${bookingId}/status`, { status });
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
      await axios.put(`/api/bookings/${bookingId}/cancel`);
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

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="admin-header">
          <div className="admin-header-left">
            <h1>Admin Dashboard</h1>
            {newBookingsCount > 0 && (
              <div className="notification-badge" onClick={() => setActiveTab('bookings')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <span className="notification-count">{newBookingsCount}</span>
                <span className="notification-text">New Booking{newBookingsCount > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
          <button onClick={handleLogout} className="btn-logout-admin">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Logout
          </button>
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
            <div className="stats-grid">
              <div className="stat-card stat-primary">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 17V7M9 7L5 11M9 7L13 11M15 7V17M15 17L19 13M15 17L11 13"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <h3>{stats.totalCars}</h3>
                  <p>Total Vehicles</p>
                </div>
              </div>
              <div className="stat-card stat-success">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <h3>{stats.availableCars}</h3>
                  <p>Available Cars</p>
                </div>
              </div>
              <div className="stat-card stat-warning">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <h3>{stats.bookedCars}</h3>
                  <p>Booked Cars</p>
                </div>
              </div>
              <div className="stat-card stat-info">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <h3>{stats.totalBookings}</h3>
                  <p>Total Bookings</p>
                </div>
              </div>
              <div className="stat-card stat-pending">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 8V12L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <h3>{stats.pendingBookings}</h3>
                  <p>Pending</p>
                </div>
              </div>
              <div className="stat-card stat-revenue">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6312 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6312 13.6815 18 14.5717 18 15.5C18 16.4283 17.6312 17.3185 16.9749 17.9749C16.3185 18.6312 15.4283 19 14.5 19H6"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <h3>{stats.totalRevenue.toLocaleString()} AED</h3>
                  <p>Total Revenue</p>
                </div>
              </div>
            </div>

            <div className="charts-section">
              <div className="chart-card">
                <h3>🚗 Vehicle Status - Bar Chart</h3>
                <div className="bar-chart-container">
                  <div className="bar-chart">
                    <div className="bar-item">
                      <div className="bar-column-wrapper">
                        <div
                          className="bar-column bar-total-vehicles"
                          style={{ height: `${Math.max(stats.totalCars, stats.pendingBookings, Math.floor(stats.totalRevenue / 1000), 1) > 0 ? (stats.totalCars / Math.max(stats.totalCars, stats.pendingBookings, Math.floor(stats.totalRevenue / 1000), 1)) * 100 : 0}%` }}
                        >
                          <span className="bar-count">{stats.totalCars}</span>
                        </div>
                      </div>
                      <div className="bar-label">Total Vehicles</div>
                    </div>
                    <div className="bar-item">
                      <div className="bar-column-wrapper">
                        <div
                          className="bar-column bar-pending"
                          style={{ height: `${Math.max(stats.totalCars, stats.pendingBookings, Math.floor(stats.totalRevenue / 1000), 1) > 0 ? (stats.pendingBookings / Math.max(stats.totalCars, stats.pendingBookings, Math.floor(stats.totalRevenue / 1000), 1)) * 100 : 0}%` }}
                        >
                          <span className="bar-count">{stats.pendingBookings}</span>
                        </div>
                      </div>
                      <div className="bar-label">Pending</div>
                    </div>
                    <div className="bar-item">
                      <div className="bar-column-wrapper">
                        <div
                          className="bar-column bar-revenue"
                          style={{ height: `${Math.max(stats.totalCars, stats.pendingBookings, Math.floor(stats.totalRevenue / 1000), 1) > 0 ? (Math.floor(stats.totalRevenue / 1000) / Math.max(stats.totalCars, stats.pendingBookings, Math.floor(stats.totalRevenue / 1000), 1)) * 100 : 0}%` }}
                        >
                          <span className="bar-count">{Math.floor(stats.totalRevenue / 1000)}K</span>
                        </div>
                      </div>
                      <div className="bar-label">Total Revenue (AED)</div>
                    </div>
                    <div className="bar-item">
                      <div className="bar-column-wrapper">
                        <div
                          className="bar-column bar-available"
                          style={{ height: `${stats.totalCars > 0 ? (stats.availableCars / Math.max(stats.availableCars, stats.bookedCars, 1)) * 100 : 0}%` }}
                        >
                          <span className="bar-count">{stats.availableCars}</span>
                        </div>
                      </div>
                      <div className="bar-label">Available</div>
                    </div>
                    <div className="bar-item">
                      <div className="bar-column-wrapper">
                        <div
                          className="bar-column bar-booked"
                          style={{ height: `${stats.totalCars > 0 ? (stats.bookedCars / Math.max(stats.availableCars, stats.bookedCars, 1)) * 100 : 0}%` }}
                        >
                          <span className="bar-count">{stats.bookedCars}</span>
                        </div>
                      </div>
                      <div className="bar-label">Booked</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="chart-card">
                <h3>📊 Booking Status - Pie Chart</h3>
                <div className="pie-chart-container">
                  <div className="pie-chart-wrapper">
                    <svg className="pie-chart" viewBox="0 0 200 200">
                      {(() => {
                        const total = stats.totalBookings || 1;
                        const pendingPercent = (stats.pendingBookings / total) * 100;
                        const confirmedPercent = (stats.confirmedBookings / total) * 100;
                        const cancelledPercent = (stats.cancelledBookings / total) * 100;
                                                
                        let currentPercent = 0;
                        const radius = 80;
                        const centerX = 100;
                        const centerY = 100;
                                                
                        const createArc = (percent, color) => {
                          if (percent === 0) return null;
                          const startAngle = (currentPercent / 100) * 360 - 90;
                          const endAngle = ((currentPercent + percent) / 100) * 360 - 90;
                          currentPercent += percent;
                                                    
                          const startAngleRad = (startAngle * Math.PI) / 180;
                          const endAngleRad = (endAngle * Math.PI) / 180;
                                                    
                          const x1 = centerX + radius * Math.cos(startAngleRad);
                          const y1 = centerY + radius * Math.sin(startAngleRad);
                          const x2 = centerX + radius * Math.cos(endAngleRad);
                          const y2 = centerY + radius * Math.sin(endAngleRad);
                                                    
                          const largeArcFlag = percent > 50 ? 1 : 0;
                                                    
                          return (
                            <path
                              d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                              fill={color}
                              stroke="#fff"
                              strokeWidth="3"
                            />
                          );
                        };
                                                
                        return (
                          <>
                            {createArc(pendingPercent, '#FF6B6B')}
                            {createArc(confirmedPercent, '#51CF66')}
                            {createArc(cancelledPercent, '#FF8787')}
                          </>
                        );
                      })()}
                      <circle cx="100" cy="100" r="60" fill="white" />
                      <text x="100" y="95" textAnchor="middle" fontSize="24" fontWeight="800" fill="#1e3c72">
                        {stats.totalBookings}
                      </text>
                      <text x="100" y="115" textAnchor="middle" fontSize="14" fill="#666" fontWeight="600">
                        Total Bookings
                      </text>
                    </svg>
                  </div>
                  <div className="pie-legend">
                    <div className="legend-item">
                      <span className="legend-color" style={{background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8787 100%)'}}></span>
                      <span className="legend-label">Pending ({stats.pendingBookings})</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color" style={{background: 'linear-gradient(135deg, #51CF66 0%, #69DB7C 100%)'}}></span>
                      <span className="legend-label">Approved ({stats.confirmedBookings})</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color" style={{background: 'linear-gradient(135deg, #FF8787 0%, #FF6B6B 100%)'}}></span>
                      <span className="legend-label">Cancelled ({stats.cancelledBookings})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="admin-section">
            <div className="section-header-bookings">
              <h2>All Bookings ({bookings.length})</h2>
              <p>Manage and track all vehicle bookings</p>
            </div>
            {loading ? (
              <div className="loading">Loading bookings...</div>
            ) : (
              <div className="bookings-table">
                {bookings.length === 0 ? (
                  <div className="no-bookings">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '60px', height: '60px', color: '#ccc', marginBottom: '20px'}}>
                      <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"/>
                    </svg>
                    <p>No bookings found.</p>
                    <p style={{color: '#999', fontSize: '14px'}}>Bookings will appear here once customers make reservations.</p>
                  </div>
                ) : (
                  bookings.map((booking) => {
                    if (!booking.car) {
                      return null;
                    }
                    const customerName = booking.customerName || booking.user?.name || 'Guest';
                    const customerEmail = booking.customerEmail || booking.user?.email || 'N/A';
                    return (
                      <div key={booking._id} className="booking-row">
                        <div className="booking-info">
                          <h4>{booking.car?.name || 'Unknown Car'}</h4>
                          <p>Customer: {customerName} ({customerEmail})</p>
                          {booking.contactNumber && <p>Contact: {booking.contactNumber}</p>}
                          <p>
                            {new Date(booking.startDate).toLocaleDateString()} -{' '}
                            {new Date(booking.endDate).toLocaleDateString()}
                          </p>
                          {booking.pickupLocation && <p>Location: {booking.pickupLocation}</p>}
                          <p>Total: {booking.totalPrice} {booking.car?.currency || 'AED'}</p>
                        </div>
                        <div className="booking-actions">
                          {getStatusBadge(booking.status)}
                          <select
                            value={booking.status}
                            onChange={(e) => handleUpdateBookingStatus(booking._id, e.target.value)}
                            className="status-select"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Approved</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          {booking.status !== 'cancelled' && (
                            <button
                              onClick={() => handleCancelBooking(booking._id)}
                              className="btn-cancel-booking"
                            >
                              Cancel Booking
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'cars' && (
          <div className="admin-section">
            <button
              onClick={() => {
                setShowCarForm(true);
                setEditingCar(null);
                setCarFormData({
                  name: '',
                  brand: '',
                  model: '',
                  year: new Date().getFullYear(),
                  pricePerDay: '',
                  price30min: '',
                  price60min: '',
                  currency: 'AED',
                  seats: '',
                  transmission: 'Automatic',
                  fuelType: 'Petrol',
                  image: '',
                  description: '',
                  available: true
                });
              }}
              className="btn-add-car"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5V19M5 12H19"/>
              </svg>
              Add New Car
            </button>

            {showCarForm && (
              <div className="car-form-modal">
                <div className="car-form-content">
                  <h3>{editingCar ? 'Edit Car' : 'Add New Car'}</h3>
                  <form onSubmit={handleCarSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={carFormData.name}
                          onChange={handleCarFormChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Brand *</label>
                        <input
                          type="text"
                          name="brand"
                          value={carFormData.brand}
                          onChange={handleCarFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Model *</label>
                        <input
                          type="text"
                          name="model"
                          value={carFormData.model}
                          onChange={handleCarFormChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Year *</label>
                        <input
                          type="number"
                          name="year"
                          value={carFormData.year}
                          onChange={handleCarFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Price per Day ({carFormData.currency || 'AED'}) *</label>
                        <input
                          type="number"
                          name="pricePerDay"
                          value={carFormData.pricePerDay}
                          onChange={handleCarFormChange}
                          required
                          min="0"
                        />
                      </div>
                      <div className="form-group">
                        <label>Price 60min ({carFormData.currency || 'AED'})</label>
                        <input
                          type="number"
                          name="price60min"
                          value={carFormData.price60min}
                          onChange={handleCarFormChange}
                          min="0"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Price 30min ({carFormData.currency || 'AED'})</label>
                        <input
                          type="number"
                          name="price30min"
                          value={carFormData.price30min}
                          onChange={handleCarFormChange}
                          min="0"
                        />
                      </div>
                      <div className="form-group">
                        <label>Currency</label>
                        <select
                          name="currency"
                          value={carFormData.currency}
                          onChange={handleCarFormChange}
                        >
                          <option value="AED">AED</option>
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Seats *</label>
                        <input
                          type="number"
                          name="seats"
                          value={carFormData.seats}
                          onChange={handleCarFormChange}
                          required
                          min="1"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Transmission *</label>
                        <select
                          name="transmission"
                          value={carFormData.transmission}
                          onChange={handleCarFormChange}
                          required
                        >
                          <option value="Manual">Manual</option>
                          <option value="Automatic">Automatic</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Fuel Type *</label>
                        <select
                          name="fuelType"
                          value={carFormData.fuelType}
                          onChange={handleCarFormChange}
                          required
                        >
                          <option value="Petrol">Petrol</option>
                          <option value="Diesel">Diesel</option>
                          <option value="Electric">Electric</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Vehicle Image *</label>
                      <input
  type="file"
  name="imageFile"
  accept="image/*"
  onChange={handleCarFormChange}
  required={!editingCar}
/>


                      {imagePreview && (
                        <div style={{ marginTop: '10px' }}>
                          <img
                            src={imagePreview}
                            alt="preview"
                            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setCarFormData(prev => ({
                                ...prev,
                                imageFile: null,
                                imageUrl: ''
                              }));
                              setImagePreview(null);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        name="description"
                        value={carFormData.description}
                        onChange={handleCarFormChange}
                        rows="3"
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        <input
                          type="checkbox"
                          name="available"
                          checked={carFormData.available}
                          onChange={handleCarFormChange}
                        />
                        Available
                      </label>
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary">
                        {editingCar ? 'Update Car' : 'Add Car'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowCarForm(false);
                          setEditingCar(null);
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
              <div className="loading">Loading cars...</div>
            ) : (
              <div className="cars-grid">
                {cars.map((car) => (
                  <div key={car._id} className={`car-admin-card ${!car.available ? 'car-unavailable' : ''}`}>
                    <div className="car-image-wrapper-admin">
                      <img src={car.image} alt={car.name} />
                      {car.available ? (
                        <span className="availability-badge-admin available">✓ Available</span>
                      ) : (
                        <span className="availability-badge-admin unavailable">✗ Not Available</span>
                      )}
                    </div>
                    <div className="car-admin-info">
                      <h4>{car.name}</h4>
                      <p>{car.brand} {car.model} ({car.year})</p>
                      <p>{car.price60min ? `${car.price60min} ${car.currency || 'AED'}/60min` : `${car.pricePerDay} ${car.currency || 'AED'}/day`}</p>
                      <div className="car-admin-actions">
                        <button
                          onClick={() => handleToggleAvailability(car._id, car.available)}
                          className={`btn ${car.available ? 'btn-warning' : 'btn-success'}`}
                          title={car.available ? 'Mark as Not Available' : 'Mark as Available'}
                        >
                          {car.available ? '✗ Mark Unavailable' : '✓ Mark Available'}
                        </button>
                        <button
                          onClick={() => handleEditCar(car)}
                          className="btn btn-secondary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCar(car._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
