# Render Environment Variables Setup

## 🚨 Mobile Login Issue Fix

Mobile par "localhost refused to connect" error aa raha hai kyunki `REACT_APP_API_URL` environment variable set nahi hai.

## ✅ Solution: Render Client Environment Variables

### Step 1: Render Dashboard me jao
1. Render.com par login karo
2. Apna **Client (React App)** project select karo
3. **Environment** tab par click karo

### Step 2: Environment Variable Add Karo

**Variable Name:**
```
REACT_APP_API_URL
```

**Value:**
```
https://offroad-rental-server.onrender.com
```
(Replace with your actual Render server URL)

### Step 3: Save aur Redeploy
1. **Save Changes** button click karo
2. Render automatically redeploy karega
3. Wait for deployment to complete

## 📋 Complete Environment Variables List

### Client (React App) - Render Environment Variables:

```env
REACT_APP_API_URL=https://offroad-rental-server.onrender.com
REACT_APP_STRIPE_PUBLIC_KEY=pk_live_51SrZXHH1c9BxRJ0Mf21IyYxZuOy6d8QzOEcoz5Uc0dSTJOAZJxcYuMGn7zxO079ozqqMTXeGkmQbzJvzKN0OJc31008SwWaesl
```

### Server (Node.js) - Render Environment Variables:

```env
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
GOOGLE_CLIENT_ID=1007752398769-93vfqulagovu8gq1mpgf2mgaal4tikq2.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=https://offroad-rental-server.onrender.com/api/auth/google/callback
FRONTEND_URL=https://offroad-rental-client.onrender.com
SESSION_SECRET=your-session-secret
STRIPE_SECRET_KEY=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
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
NODE_ENV=production
PORT=5000
```

## 🔍 How to Check if Variable is Set

1. Render Dashboard → Your Client Project
2. **Environment** tab
3. Check if `REACT_APP_API_URL` exists
4. Value should be your Render server URL (not localhost)

## ✅ After Setting Environment Variable

1. **Redeploy** automatically hoga
2. Wait for deployment (2-5 minutes)
3. Mobile par test karo
4. Ab "localhost refused to connect" error nahi aayega

## 🚨 Important Notes

- **Client** (React App) me `REACT_APP_API_URL` set karna **MUST** hai
- Mobile devices par `localhost` kaam nahi karta
- Always use full Render URL (https://...)
- Environment variables set karne ke baad redeploy zaroori hai

## 📱 Testing

1. Mobile browser me website open karo
2. "Login with Google" click karo
3. Ab Google account selection screen dikhna chahiye
4. "localhost refused to connect" error nahi aana chahiye
