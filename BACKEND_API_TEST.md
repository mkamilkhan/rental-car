# 🧪 Backend API Test Guide

## ✅ Backend URL:
`https://offroad-rental-server.onrender.com`

---

## 🧪 Test API Endpoints:

### 1. Root Endpoint:
```
GET https://offroad-rental-server.onrender.com/
```
**Expected**: API info JSON

---

### 2. Get All Cars:
```
GET https://offroad-rental-server.onrender.com/api/cars
```
**Expected**: Cars array

---

### 3. Health Check:
```
GET https://offroad-rental-server.onrender.com/api/cars
```
**Expected**: 200 OK with cars data

---

## 🐛 Agar "Not Found" Aaye:

### Check Karo:
1. **URL sahi hai?**
   - `https://offroad-rental-server.onrender.com/api/cars`
   - `/api/` prefix zaroori hai

2. **Backend running hai?**
   - Render Dashboard → Service → Logs check karo
   - "Server running on port" dikhna chahiye

3. **MongoDB connected?**
   - Logs mein "MongoDB Atlas Connected" dikhna chahiye

---

## ✅ Fixed:

- Root route (`/`) ab proper response dega
- Error messages improve kiye
- API endpoints properly configured

---

## 🎯 Next:

Ab client aur admin deploy karo! 🚀
