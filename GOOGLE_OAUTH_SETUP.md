# Google OAuth Setup Guide

## 📋 Step 1: Install Required Packages

Install these packages in the `server` directory:

```bash
cd server
npm install passport passport-google-oauth20 express-session
```

## 🔑 Step 2: Get Google OAuth Credentials

### A. Google Cloud Console Setup

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create or Select Project:**
   - Click on project dropdown (top bar)
   - Click "New Project"
   - Project name: `Offroad Rental Hub` (or any name)
   - Click "Create"

3. **Enable Google+ API:**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" or "Google Identity Services"
   - Click on it and click "Enable"

4. **Configure OAuth Consent Screen:**
   - Go to "APIs & Services" → "OAuth consent screen"
   - User Type: Select **"External"** → Click "Create"
   - App name: `Offroad Rental Hub`
   - User support email: Your email
   - Developer contact: Your email
   - Click "Save and Continue"
   - Scopes: Click "Add or Remove Scopes" → Select:
     - `.../auth/userinfo.email`
     - `.../auth/userinfo.profile`
   - Click "Save and Continue"
   - Test users: Add your email (for testing)
   - Click "Save and Continue"
   - Summary: Click "Back to Dashboard"

5. **Create OAuth 2.0 Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "+ CREATE CREDENTIALS" → "OAuth client ID"
   - Application type: **Web application**
   - Name: `Offroad Rental Client`
   
   **Authorized JavaScript origins** (add these):
   ```
   http://localhost:5000
   https://offroad-rental-server.onrender.com
   ```
   (Replace with your actual backend URL if different)
   
   **Authorized redirect URIs** (add these):
   ```
   http://localhost:5000/api/auth/google/callback
   https://offroad-rental-server.onrender.com/api/auth/google/callback
   ```
   (Replace with your actual backend URL if different)
   
   - Click "CREATE"
   - **IMPORTANT:** Copy these two values:
     - **Client ID** (looks like: `123456789-abc123def456.apps.googleusercontent.com`)
     - **Client Secret** (looks like: `GOCSPX-abc123def456xyz789`)

### B. Add to Environment Variables

Open `server/.env` file and add:

```env
# Google OAuth (paste the values you copied above)
GOOGLE_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123def456xyz789

# Callback URL (use your backend URL)
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
# For production: https://offroad-rental-server.onrender.com/api/auth/google/callback

# Frontend URL
FRONTEND_URL=http://localhost:3001
# For production: https://offroad-rental-client.onrender.com

# Session Secret (any random string)
SESSION_SECRET=my-super-secret-session-key-12345
```

**Important:** 
- Replace `GOOGLE_CLIENT_ID` with your actual Client ID
- Replace `GOOGLE_CLIENT_SECRET` with your actual Client Secret
- Replace URLs with your actual Render URLs for production

## ✅ Features

- ✅ Google OAuth login only (no email/password)
- ✅ Automatic user creation on first Google login
- ✅ Links Google account to existing email if user exists
- ✅ JWT token generation after successful login
- ✅ Redirects to frontend with token

## 🚀 Testing

1. Start the server: `cd server && npm start`
2. Go to login page
3. Click "Continue with Google"
4. Select Google account
5. Should redirect back to app and log you in
