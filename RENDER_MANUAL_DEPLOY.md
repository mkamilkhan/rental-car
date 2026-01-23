# 🚀 Render Manual Deployment Guide

## 📋 Overview
Aapko 2 alag links chahiye:
1. **Website** (Client) - `https://your-client-name.onrender.com`
2. **Dashboard** (Admin) - `https://your-admin-name.onrender.com`

## 🌐 Step 1: Backend Server Deploy (Pehle)

### Render Dashboard pe:
1. **"New +"** → **"Web Service"**
2. **GitHub Repository** connect: `mkamilkhan/rental-car`
3. **Settings**:
   - **Name**: `offroad-rental-server`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Plan**: Free (ya paid)

4. **Environment Variables** add karo:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   CLOUDINARY_CLOUD_NAME=dkjjrna9o
   CLOUDINARY_API_KEY=566211774567975
   CLOUDINARY_API_SECRET=S0mdkmfYoxXpLRFEGnzg7tOTeIg
   ```

5. **"Create Web Service"** click karo

**Backend URL**: `https://offroad-rental-server.onrender.com` (ya jo name diya)

---

## 🎨 Step 2: Client Website Deploy

### Render Dashboard pe:
1. **"New +"** → **"Static Site"**
2. **GitHub Repository** connect: `mkamilkhan/rental-car`
3. **Settings**:
   - **Name**: `offroad-rental-client`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Plan**: Free (ya paid)

4. **Environment Variables** add karo:
   ```
   REACT_APP_API_URL=https://offroad-rental-server.onrender.com
   ```
   (Yahan backend ka URL dalo jo upar banaya)

5. **"Create Static Site"** click karo

**Client URL**: `https://offroad-rental-client.onrender.com`

---

## 🔐 Step 3: Admin Dashboard Deploy

### Render Dashboard pe:
1. **"New +"** → **"Static Site"**
2. **GitHub Repository** connect: `mkamilkhan/rental-car`
3. **Settings**:
   - **Name**: `offroad-rental-admin`
   - **Root Directory**: `admin-dashboard`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Plan**: Free (ya paid)

4. **Environment Variables** add karo:
   ```
   REACT_APP_API_URL=https://offroad-rental-server.onrender.com
   ```
   (Yahan backend ka URL dalo jo upar banaya)

5. **"Create Static Site"** click karo

**Admin URL**: `https://offroad-rental-admin.onrender.com`

---

## ✅ Final Links

Deploy hone ke baad aapke paas 3 links honge:

1. 🌐 **Website**: `https://offroad-rental-client.onrender.com`
2. 🔐 **Dashboard**: `https://offroad-rental-admin.onrender.com`
3. 🖥️ **API**: `https://offroad-rental-server.onrender.com`

---

## 🔄 Auto-Deploy vs Manual Deploy

### Auto-Deploy (Default):
- GitHub pe push karte hi automatically deploy ho jayega
- **Recommended** ✅

### Manual Deploy:
- Render Dashboard → Service → **"Manual Deploy"** button
- Jab bhi manually deploy karna ho

---

## ⚙️ Important Settings

### Backend Server:
- **Auto-Deploy**: ON (recommended)
- **Health Check Path**: `/api/cars` (optional)

### Client & Admin:
- **Auto-Deploy**: ON (recommended)
- **Pull Request Previews**: ON (optional)

---

## 🎉 Done!

Ab aapke paas 2 alag links honge:
- ✅ Website link
- ✅ Dashboard link

**Sab alag-alag deploy ho jayega!** 🚀
