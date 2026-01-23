# 🚀 Render Deployment Steps - Quick Guide

## 📋 Step 1: Git Push (Pehle Git pe push karo)

### Terminal mein ye commands run karo:

```bash
# 1. Sab files add karo
cd /Users/EAPPLE/Desktop/dejavuadventure
git add .

# 2. Commit karo
git commit -m "Add client, admin-dashboard, and server - ready for deployment"

# 3. Push karo GitHub pe
git push origin main
```

**Note**: Agar pehli baar push kar rahe ho, to:
```bash
git remote add origin https://github.com/YOUR_USERNAME/dejavuadventure.git
git branch -M main
git push -u origin main
```

---

## 🌐 Step 2: Render pe 3 Services Deploy Karo

### 🖥️ **Service 1: Backend Server (API)**

1. **Render Dashboard** → **"New +"** → **"Web Service"**
2. **GitHub Repository** connect karo
3. **Settings**:
   - **Name**: `offroad-rental-server`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
4. **Environment Variables** add karo:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_key
   ```
5. **"Create Web Service"** click karo

**Backend URL**: `https://offroad-rental-server.onrender.com` (ya jo bhi name diya)

---

### 🎨 **Service 2: Client Website (Main Website)**

1. **Render Dashboard** → **"New +"** → **"Static Site"**
2. **GitHub Repository** connect karo
3. **Settings**:
   - **Name**: `offroad-rental-client`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
4. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://offroad-rental-server.onrender.com
   ```
5. **Custom Domain** (Optional):
   - Settings → Custom Domains
   - Add: `www.offroadrentalhub.com` (ya apna domain)
6. **"Create Static Site"** click karo

**Client URL**: `https://offroad-rental-client.onrender.com` ya custom domain

---

### 🔐 **Service 3: Admin Dashboard**

1. **Render Dashboard** → **"New +"** → **"Static Site"**
2. **GitHub Repository** connect karo
3. **Settings**:
   - **Name**: `offroad-rental-admin`
   - **Root Directory**: `admin-dashboard`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
4. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://offroad-rental-server.onrender.com
   ```
5. **Custom Domain** (Optional):
   - Settings → Custom Domains
   - Add: `admin.offroadrentalhub.com` (ya apna domain)
6. **"Create Static Site"** click karo

**Admin URL**: `https://offroad-rental-admin.onrender.com` ya custom domain

---

## ⚙️ Step 3: Server CORS Update

`server/index.js` mein CORS update karo:

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

### Backend Server:
- ✅ `MONGODB_URI`
- ✅ `JWT_SECRET`
- ✅ `STRIPE_SECRET_KEY`
- ✅ `PORT=10000`

### Client Website:
- ✅ `REACT_APP_API_URL=https://your-server-url.onrender.com`

### Admin Dashboard:
- ✅ `REACT_APP_API_URL=https://your-server-url.onrender.com`

---

## 🔄 Step 5: Auto-Deploy Setup

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

---

## 🌍 Custom Domain Setup (Optional)

### Agar custom domain chahiye:

1. **Client Domain** (e.g., `www.offroadrentalhub.com`):
   - Render → Client Service → Settings → Custom Domains
   - Add domain
   - DNS mein CNAME add karo:
     - Type: `CNAME`
     - Name: `www`
     - Value: `offroad-rental-client.onrender.com`

2. **Admin Domain** (e.g., `admin.offroadrentalhub.com`):
   - Render → Admin Service → Settings → Custom Domains
   - Add domain
   - DNS mein CNAME add karo:
     - Type: `CNAME`
     - Name: `admin`
     - Value: `offroad-rental-admin.onrender.com`

---

## ✅ Final Checklist

- [ ] Git push ho gaya
- [ ] Backend server deployed
- [ ] Client website deployed
- [ ] Admin dashboard deployed
- [ ] Environment variables set kiye
- [ ] CORS updated
- [ ] Test kiya sab kuch

---

## 🎉 Done!

Ab aapke paas 3 separate services hain:
- 🌐 **Client**: `https://offroad-rental-client.onrender.com`
- 🔐 **Admin**: `https://offroad-rental-admin.onrender.com`
- 🖥️ **API**: `https://offroad-rental-server.onrender.com`

Sab alag-alag domains pe deploy ho gaye hain! 🚀
