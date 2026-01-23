# 🚀 Deployment Steps - Urdu/Hindi Guide

## 📦 Step 1: Git Push (Pehle GitHub pe push karo)

### Terminal mein ye commands run karo:

```bash
# 1. Sab files add karo
cd /Users/EAPPLE/Desktop/dejavuadventure
git add .

# 2. Commit karo
git commit -m "Add client, admin-dashboard, and server - ready for separate deployment"

# 3. Push karo GitHub pe
git push origin main
```

**Agar error aaye** to:
```bash
# Force push (sirf zarurat par)
git push origin main --force
```

---

## 🌐 Step 2: Render pe 3 Alag Services Deploy Karo

### 🖥️ **Service 1: Backend Server (API)**

1. **Render.com** pe jao → Login karo
2. **"New +"** button click karo → **"Web Service"** select karo
3. **GitHub Repository** connect karo: `mkamilkhan/rental-car`
4. **Settings** fill karo:
   - **Name**: `offroad-rental-server` (ya koi bhi name)
   - **Root Directory**: `server` ⚠️ **Important!**
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Plan**: Free (ya paid)
5. **Environment Variables** add karo:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```
6. **"Create Web Service"** click karo

**Backend URL**: `https://offroad-rental-server.onrender.com` (ya jo name diya)

---

### 🎨 **Service 2: Client Website (Main Website)**

1. **Render Dashboard** → **"New +"** → **"Static Site"** select karo
2. **GitHub Repository** connect karo: `mkamilkhan/rental-car`
3. **Settings** fill karo:
   - **Name**: `offroad-rental-client` (ya koi bhi name)
   - **Root Directory**: `client` ⚠️ **Important!**
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build` ⚠️ **Important!**
4. **Environment Variables** add karo:
   ```
   REACT_APP_API_URL=https://offroad-rental-server.onrender.com
   ```
   (Yahan backend ka URL dalo jo upar banaya)
5. **Custom Domain** (Optional - agar apna domain hai):
   - Settings → Custom Domains → Add domain
   - Example: `www.offroadrentalhub.com`
6. **"Create Static Site"** click karo

**Client URL**: `https://offroad-rental-client.onrender.com` ya custom domain

---

### 🔐 **Service 3: Admin Dashboard**

1. **Render Dashboard** → **"New +"** → **"Static Site"** select karo
2. **GitHub Repository** connect karo: `mkamilkhan/rental-car`
3. **Settings** fill karo:
   - **Name**: `offroad-rental-admin` (ya koi bhi name)
   - **Root Directory**: `admin-dashboard` ⚠️ **Important!**
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build` ⚠️ **Important!**
4. **Environment Variables** add karo:
   ```
   REACT_APP_API_URL=https://offroad-rental-server.onrender.com
   ```
   (Yahan backend ka URL dalo jo upar banaya)
5. **Custom Domain** (Optional - agar apna domain hai):
   - Settings → Custom Domains → Add domain
   - Example: `admin.offroadrentalhub.com`
6. **"Create Static Site"** click karo

**Admin URL**: `https://offroad-rental-admin.onrender.com` ya custom domain

---

## ⚙️ Step 3: Server CORS Update (Important!)

`server/index.js` file mein CORS update karna zaroori hai:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://offroad-rental-client.onrender.com',
    'https://offroad-rental-admin.onrender.com',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  credentials: true
}));
```

Phir push karo:
```bash
git add server/index.js
git commit -m "Update CORS for Render domains"
git push origin main
```

---

## 📝 Step 4: Environment Variables Checklist

### ✅ Backend Server (Render pe):
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Koi random string (jwt secret key)
- `STRIPE_SECRET_KEY` - Stripe secret key
- `PORT=10000` - Port number
- `NODE_ENV=production`

### ✅ Client Website (Render pe):
- `REACT_APP_API_URL` - Backend server ka URL
  Example: `https://offroad-rental-server.onrender.com`

### ✅ Admin Dashboard (Render pe):
- `REACT_APP_API_URL` - Backend server ka URL
  Example: `https://offroad-rental-server.onrender.com`

---

## 🔄 Step 5: Auto-Deploy (Automatic)

Render automatically deploy karega jab bhi GitHub pe push karo:

```bash
# Koi bhi change karo
git add .
git commit -m "Update something"
git push origin main
```

Render automatically:
1. Changes detect karega
2. Build karega
3. Deploy karega

**Har service alag-alag deploy hoga!**

---

## 🌍 Custom Domain Setup (Agar Apna Domain Hai)

### Client Domain (e.g., `www.offroadrentalhub.com`):
1. Render → Client Service → Settings → Custom Domains
2. Add domain: `www.offroadrentalhub.com`
3. DNS mein CNAME add karo:
   - Type: `CNAME`
   - Name: `www`
   - Value: `offroad-rental-client.onrender.com`

### Admin Domain (e.g., `admin.offroadrentalhub.com`):
1. Render → Admin Service → Settings → Custom Domains
2. Add domain: `admin.offroadrentalhub.com`
3. DNS mein CNAME add karo:
   - Type: `CNAME`
   - Name: `admin`
   - Value: `offroad-rental-admin.onrender.com`

---

## ✅ Final Checklist

- [ ] Git push ho gaya ✅
- [ ] Backend server deployed ✅
- [ ] Client website deployed ✅
- [ ] Admin dashboard deployed ✅
- [ ] Environment variables set kiye ✅
- [ ] CORS updated ✅
- [ ] Test kiya sab kuch ✅

---

## 🎉 Done!

Ab aapke paas 3 separate services hain alag-alag domains pe:

- 🌐 **Client Website**: `https://offroad-rental-client.onrender.com`
- 🔐 **Admin Dashboard**: `https://offroad-rental-admin.onrender.com`
- 🖥️ **Backend API**: `https://offroad-rental-server.onrender.com`

**Sab alag-alag deploy ho gaye hain!** 🚀

---

## 🐛 Agar Problem Aaye:

1. **Build fail ho raha hai?**
   - Render logs check karo
   - `package.json` mein sab dependencies check karo

2. **API calls fail ho rahe hain?**
   - `REACT_APP_API_URL` sahi hai ya nahi check karo
   - CORS settings check karo

3. **Admin login nahi ho raha?**
   - Backend URL sahi hai ya nahi check karo
   - MongoDB connection check karo

---

## 📞 Help Chahiye?

Agar koi problem aaye to:
1. Render deployment logs check karo
2. Browser console mein errors check karo
3. Environment variables verify karo

**Good Luck! 🍀**
