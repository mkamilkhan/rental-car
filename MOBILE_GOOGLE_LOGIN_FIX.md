# Mobile Google Login Fix

## Problem
Mobile par Google login click karne par email input dikh raha hai instead of Google account selection.

## Solution Applied
Code me `prompt: 'select_account'` add kiya hai jo Google ko force karega account selection show karne ke liye.

## Google Cloud Console Settings Check Karo

### Step 1: OAuth Consent Screen
1. Google Cloud Console → APIs & Services → OAuth consent screen
2. **User Type:** External (not Internal)
3. **Publishing status:** Testing ya Production
4. **Scopes:** Ensure these are added:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`

### Step 2: OAuth 2.0 Credentials
1. APIs & Services → Credentials
2. Apna OAuth Client ID click karo
3. **Authorized JavaScript origins** me ye add karo:
   ```
   https://your-server.onrender.com
   http://localhost:5000
   ```

4. **Authorized redirect URIs** me ye add karo:
   ```
   https://your-server.onrender.com/api/auth/google/callback
   http://localhost:5000/api/auth/google/callback
   ```

### Step 3: Mobile-Specific Settings
**Important:** Mobile browsers ke liye, ensure karo:

1. **OAuth Consent Screen:**
   - "App domain" me apna domain add karo
   - "Authorized domains" me apna domain add karo

2. **Test Users (if Testing mode):**
   - Apna email add karo test users me
   - Mobile se login karne wale users ka email bhi add karo

### Step 4: Render Environment Variables
Server ke Render dashboard me ye variables set karo:

```env
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=https://your-server.onrender.com/api/auth/google/callback
FRONTEND_URL=https://your-client.onrender.com
```

## Testing
1. Mobile browser me website open karo
2. "Login with Google" click karo
3. Ab Google account selection screen dikhna chahiye (not email input)

## If Still Not Working
1. Google Cloud Console me OAuth consent screen "Publish" karo (Testing se Production)
2. 24 hours wait karo (Google changes ko propagate karne me time lagta hai)
3. Clear browser cache on mobile
4. Incognito/Private mode me test karo
