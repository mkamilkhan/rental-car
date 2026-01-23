# ⚡ Render Quick Setup - 3 Services

## 🖥️ Service 1: Backend (API)
- **Type**: Web Service
- **Root**: `server`
- **Build**: `npm install`
- **Start**: `node index.js`
- **Env Vars**: MONGODB_URI, JWT_SECRET, STRIPE_SECRET_KEY, CLOUDINARY_*

**URL**: `https://offroad-rental-server.onrender.com`

---

## 🌐 Service 2: Website (Client)
- **Type**: Static Site
- **Root**: `client`
- **Build**: `npm install && npm run build`
- **Publish**: `build`
- **Env Var**: `REACT_APP_API_URL=https://offroad-rental-server.onrender.com`

**URL**: `https://offroad-rental-client.onrender.com`

---

## 🔐 Service 3: Dashboard (Admin)
- **Type**: Static Site
- **Root**: `admin-dashboard`
- **Build**: `npm install && npm run build`
- **Publish**: `build`
- **Env Var**: `REACT_APP_API_URL=https://offroad-rental-server.onrender.com`

**URL**: `https://offroad-rental-admin.onrender.com`

---

## ✅ Final Links:
1. 🌐 Website: `https://offroad-rental-client.onrender.com`
2. 🔐 Dashboard: `https://offroad-rental-admin.onrender.com`

**Auto-deploy ON rakho** - GitHub push pe automatically deploy hoga! 🚀
