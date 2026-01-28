# Server Environment Variables - Render Setup

## 🚨 Mobile OAuth Callback Issue Fix

Mobile par Google OAuth callback `localhost` par redirect ho raha hai. Ye fix karo:

## ✅ Required Server Environment Variables

### Render Server Dashboard me ye variables set karo:

```env
# Google OAuth (MUST SET)
GOOGLE_CLIENT_ID=1007752398769-93vfqulagovu8gq1mpgf2mgaal4tikq2.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_CALLBACK_URL=https://offroad-rental-server.onrender.com/api/auth/google/callback

# Frontend URL (MUST SET)
FRONTEND_URL=https://offroad-rental-client.onrender.com

# Other required variables
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key_here
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
NODE_ENV=production
PORT=5000
```

## 🔑 Critical Variables for Mobile OAuth:

### 1. GOOGLE_CALLBACK_URL
```
https://offroad-rental-server.onrender.com/api/auth/google/callback
```
**Important:** Ye exact URL Google Cloud Console me "Authorized redirect URIs" me bhi add karo.

### 2. FRONTEND_URL
```
https://offroad-rental-client.onrender.com
```
**Important:** Ye URL use hota hai OAuth ke baad redirect karne ke liye.

## 📋 Steps to Fix:

### Step 1: Render Server Dashboard
1. Render.com → Apna **Server** project
2. **Environment** tab
3. Ye variables check/set karo:
   - `GOOGLE_CALLBACK_URL` = `https://offroad-rental-server.onrender.com/api/auth/google/callback`
   - `FRONTEND_URL` = `https://offroad-rental-client.onrender.com`

### Step 2: Google Cloud Console
1. Google Cloud Console → APIs & Services → Credentials
2. Apna OAuth Client ID click karo
3. **Authorized redirect URIs** me ye ensure karo:
   ```
   https://offroad-rental-server.onrender.com/api/auth/google/callback
   http://localhost:5000/api/auth/google/callback
   ```

### Step 3: Redeploy Server
1. Render Dashboard → Server project
2. **Manual Deploy** ya automatic redeploy
3. Wait for deployment (2-5 minutes)

## ✅ Verification:

1. Server logs check karo - ye dikhna chahiye:
   ```
   Google OAuth: Using callback URL: https://offroad-rental-server.onrender.com/api/auth/google/callback
   ```

2. Mobile par test karo:
   - "Login with Google" click karo
   - Google account select karo
   - Ab `https://offroad-rental-server.onrender.com/api/auth/google/callback` par redirect hona chahiye (not localhost)

## 🚨 Common Issues:

### Issue: Still redirecting to localhost
**Solution:**
- `GOOGLE_CALLBACK_URL` environment variable set karo
- Server redeploy karo
- Google Cloud Console me redirect URI check karo

### Issue: Frontend redirect not working
**Solution:**
- `FRONTEND_URL` environment variable set karo
- Apne actual Render client URL se replace karo

## 📱 Testing:

1. Mobile browser me website open karo
2. "Login with Google" click karo
3. Google account select karo
4. Ab callback URL `https://offroad-rental-server.onrender.com/api/auth/google/callback` hona chahiye
5. Phir frontend par redirect hona chahiye with token
