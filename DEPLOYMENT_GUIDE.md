# 🚀 Deployment Guide - Client & Admin Dashboard (Separate Domains)

## 📋 Overview
This guide explains how to deploy the **Client Website** and **Admin Dashboard** separately to different domains on Render.

---

## 🗂️ Project Structure

```
dejavuadventure/
├── client/              # Main website (React app)
├── admin-dashboard/     # Admin panel (React app)
└── server/              # Backend API (Node.js/Express)
```

---

## 📦 Step 1: Git Setup & Push

### 1.1 Initialize Git (if not already done)
```bash
cd /Users/EAPPLE/Desktop/dejavuadventure
git init
```

### 1.2 Create .gitignore (if not exists)
Make sure `.gitignore` includes:
```
node_modules/
.env
.DS_Store
build/
dist/
*.log
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### 1.3 Add all files
```bash
git add .
```

### 1.4 Commit
```bash
git commit -m "Initial commit: Client, Admin Dashboard, and Server"
```

### 1.5 Create GitHub Repository
1. Go to GitHub.com
2. Click "New Repository"
3. Name it: `dejavuadventure` (or any name you like)
4. **Don't** initialize with README
5. Click "Create repository"

### 1.6 Connect and Push
```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/dejavuadventure.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🌐 Step 2: Deploy Backend Server (Render)

### 2.1 Create New Web Service on Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select `dejavuadventure` repository

### 2.2 Configure Backend Service
- **Name**: `dejavuadventure-server` (or any name)
- **Root Directory**: `server`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node index.js`
- **Environment Variables**:
  ```
  NODE_ENV=production
  PORT=10000
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  STRIPE_SECRET_KEY=your_stripe_secret_key
  REACT_APP_API_URL=https://your-server-domain.onrender.com
  ```

### 2.3 Deploy
Click **"Create Web Service"** and wait for deployment.

**Backend URL**: `https://your-server-name.onrender.com`

---

## 🎨 Step 3: Deploy Client Website (Render)

### 3.1 Create New Static Site on Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub repository
4. Select `dejavuadventure` repository

### 3.2 Configure Client Service
- **Name**: `dejavuadventure-client` (or any name)
- **Root Directory**: `client`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `build`
- **Environment Variables**:
  ```
  REACT_APP_API_URL=https://your-server-domain.onrender.com
  ```

### 3.3 Custom Domain (Optional)
1. Go to **Settings** → **Custom Domains**
2. Add your domain: `www.yourwebsite.com`
3. Follow DNS instructions

### 3.4 Deploy
Click **"Create Static Site"** and wait for deployment.

**Client URL**: `https://your-client-name.onrender.com` or your custom domain

---

## 🔐 Step 4: Deploy Admin Dashboard (Render)

### 4.1 Create Another Static Site on Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub repository
4. Select `dejavuadventure` repository

### 4.2 Configure Admin Dashboard Service
- **Name**: `dejavuadventure-admin` (or any name)
- **Root Directory**: `admin-dashboard`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `build`
- **Environment Variables**:
  ```
  REACT_APP_API_URL=https://your-server-domain.onrender.com
  ```

### 4.3 Custom Domain (Optional)
1. Go to **Settings** → **Custom Domains**
2. Add your admin domain: `admin.yourwebsite.com` or `dashboard.yourwebsite.com`
3. Follow DNS instructions

### 4.4 Deploy
Click **"Create Static Site"** and wait for deployment.

**Admin URL**: `https://your-admin-name.onrender.com` or your custom domain

---

## ⚙️ Step 5: Update Environment Variables

### 5.1 Update Client `.env` (if needed)
Create `client/.env.production`:
```
REACT_APP_API_URL=https://your-server-domain.onrender.com
```

### 5.2 Update Admin Dashboard `.env` (if needed)
Create `admin-dashboard/.env.production`:
```
REACT_APP_API_URL=https://your-server-domain.onrender.com
```

### 5.3 Update Server Environment Variables
In Render Dashboard → Your Server Service → Environment:
```
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
REACT_APP_API_URL=https://your-server-domain.onrender.com
```

---

## 🔄 Step 6: Enable Auto-Deploy

All three services will automatically deploy when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main
```

Render will automatically:
1. Detect the push
2. Rebuild the affected services
3. Deploy the updates

---

## 📝 Step 7: CORS Configuration

Make sure your server allows requests from both domains.

In `server/index.js`, update CORS:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://your-client-domain.onrender.com',
    'https://your-admin-domain.onrender.com',
    'http://localhost:3000', // For local development
    'http://localhost:3001'  // For local admin development
  ],
  credentials: true
}));
```

---

## 🌍 Domain Setup Example

### Example Domains:
- **Client Website**: `www.offroadrentalhub.com`
- **Admin Dashboard**: `admin.offroadrentalhub.com`
- **Backend API**: `api.offroadrentalhub.com` (or use Render default)

### DNS Configuration:
1. **Client Domain**:
   - Type: `CNAME`
   - Name: `www`
   - Value: `your-client-name.onrender.com`

2. **Admin Domain**:
   - Type: `CNAME`
   - Name: `admin`
   - Value: `your-admin-name.onrender.com`

3. **API Domain** (if using custom domain):
   - Type: `CNAME`
   - Name: `api`
   - Value: `your-server-name.onrender.com`

---

## ✅ Checklist

- [ ] Git repository created and pushed
- [ ] Backend server deployed on Render
- [ ] Client website deployed on Render
- [ ] Admin dashboard deployed on Render
- [ ] Environment variables configured
- [ ] CORS updated for both domains
- [ ] Custom domains configured (if using)
- [ ] Test all three services

---

## 🐛 Troubleshooting

### Issue: Build fails
- Check build logs in Render
- Ensure all dependencies are in `package.json`
- Check Node version compatibility

### Issue: API calls fail
- Verify `REACT_APP_API_URL` is correct
- Check CORS configuration
- Verify server is running

### Issue: Admin can't login
- Check backend URL in admin dashboard
- Verify JWT_SECRET matches
- Check MongoDB connection

---

## 📞 Support

If you face any issues:
1. Check Render deployment logs
2. Check browser console for errors
3. Verify environment variables
4. Test API endpoints directly

---

## 🎉 You're Done!

Your setup:
- ✅ Client: `https://your-client-domain.com`
- ✅ Admin: `https://your-admin-domain.com`
- ✅ API: `https://your-api-domain.com`

All three are separate and can be deployed independently!
