# Project Separation Guide

## Overview

The project has been separated into two independent applications:

1. **Main Website** (`client/`) - Public-facing website for users
2. **Admin Dashboard** (`admin-dashboard/`) - Separate admin panel

## Structure

```
dejavuadventure/
├── client/                 # Main website (for users)
│   ├── src/
│   │   ├── pages/          # User pages (Home, About, Booking, etc.)
│   │   └── App.js          # Main app (NO admin routes)
│   └── package.json
│
├── admin-dashboard/        # Admin dashboard (separate app)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AdminDashboard.js
│   │   │   └── Login.js
│   │   └── App.js          # Admin-only app
│   └── package.json
│
└── server/                 # Shared backend API
    └── routes/
        ├── admin.js        # Admin routes
        └── ...
```

## Main Website (`client/`)

### Features
- Public pages (Home, About, Contact, etc.)
- Car listings
- Booking form
- User bookings
- NO admin dashboard

### Routes
- `/` - Home
- `/about` - About
- `/contact` - Contact
- `/car/:id` - Car details
- `/booking/:carId` - Booking form
- `/my-bookings` - User bookings
- `/login` - User login
- `/signup` - User signup

### Deployment
Deploy to main domain: `https://yourwebsite.com`

## Admin Dashboard (`admin-dashboard/`)

### Features
- Admin login
- Dashboard overview
- Bookings management
- Vehicles management
- Statistics

### Routes
- `/` - Admin dashboard (protected)
- `/login` - Admin login

### Deployment
Deploy to separate domain/subdomain: `https://admin.yourwebsite.com` or `https://dashboard.yourwebsite.com`

## Setup Instructions

### 1. Main Website Setup

```bash
cd client
npm install
npm start
```

### 2. Admin Dashboard Setup

```bash
cd admin-dashboard
npm install
npm start
```

### 3. Environment Variables

#### Main Website (`client/.env`)
```
REACT_APP_API_URL=http://localhost:5000
```

#### Admin Dashboard (`admin-dashboard/.env`)
```
REACT_APP_API_URL=http://localhost:5000
```

## Deployment

### Main Website
1. Build: `cd client && npm run build`
2. Deploy `build/` folder to main domain

### Admin Dashboard
1. Build: `cd admin-dashboard && npm run build`
2. Deploy `build/` folder to separate domain/subdomain

## Benefits

✅ **Security**: Admin dashboard is completely separate
✅ **Scalability**: Can deploy on different servers
✅ **Maintenance**: Update admin without affecting main site
✅ **Client Access**: Client gets only the main website code
✅ **Different Domains**: Can use different domains/subdomains

## Notes

- Both apps share the same backend API (`server/`)
- Admin routes are protected on the backend
- Admin dashboard requires admin role authentication
- Main website has no admin features
