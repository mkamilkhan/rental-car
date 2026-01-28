# Google Cloud Console - OAuth Setup Guide

## 📍 Current Location
Aap abhi **"OAuth Overview"** page par hain.

## 🎯 Kahan Jana Hai:

### Step 1: OAuth Clients Configure Karo
**Left sidebar me "Clients" par click karo:**
- Left menu me **"Clients"** (grid icon ke saath) par click karo
- Yahan par apne OAuth Client ID configure karo

### Step 2: OAuth Client ID Settings
**"Clients" page par:**

1. **Agar pehle se client hai:**
   - Apna existing OAuth Client ID click karo
   - Ya "Create Client" button click karo

2. **Client Configuration:**
   - **Application type:** Web application
   - **Name:** Offroad Rental Hub (ya koi bhi naam)

3. **Authorized JavaScript origins:**
   ```
   https://your-server.onrender.com
   http://localhost:5000
   ```
   (Apne actual Render server URL se replace karo)

4. **Authorized redirect URIs:**
   ```
   https://your-server.onrender.com/api/auth/google/callback
   http://localhost:5000/api/auth/google/callback
   ```
   (Apne actual Render server URL se replace karo)

5. **Save** button click karo

### Step 3: OAuth Consent Screen (Old Method)
**Agar "Clients" me nahi mila, to:**

1. **Left sidebar me "Audience" par click karo**
   - Yahan par OAuth consent screen settings hain
   - User Type: **External** select karo
   - App name, support email, etc. fill karo

2. **Scopes add karo:**
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`

3. **Test users add karo** (agar Testing mode me ho)

### Step 4: Branding (Optional)
**Left sidebar me "Branding" par click karo:**
- App logo add kar sakte ho
- App name customize kar sakte ho

## 🔑 Important Settings for Mobile:

### Authorized Redirect URIs me ye ensure karo:
```
https://your-server.onrender.com/api/auth/google/callback
```

**Mobile ke liye important:**
- Redirect URI exactly match hona chahiye
- HTTPS use karo (HTTP mobile browsers me issue kar sakta hai)
- Trailing slash nahi hona chahiye

### OAuth Consent Screen:
- **Publishing status:** Production (ya Testing with test users)
- **User Type:** External
- **Scopes:** Email aur Profile

## 📱 Mobile-Specific Fix:

Code me already `prompt: 'select_account'` add kar diya hai, lekin Google Cloud Console me bhi check karo:

1. **Clients** → Apna Client ID → **Settings**
2. **Advanced settings** me check karo:
   - "Force account selection" enabled ho
   - "Offline access" enabled ho

## ✅ Verification:

1. **Clients** page par jao
2. Apna OAuth Client ID check karo
3. **Authorized redirect URIs** me apna Render URL hai ya nahi
4. **Save** karo agar koi change kiya ho

## 🚨 Common Issues:

### Issue 1: "Redirect URI mismatch"
**Solution:** 
- Authorized redirect URIs me exact URL add karo
- Trailing slash check karo
- HTTP vs HTTPS check karo

### Issue 2: "Email input dikh raha hai mobile par"
**Solution:**
- Code me `prompt: 'select_account'` already add hai
- Google Cloud Console me OAuth consent screen "Publish" karo
- 24 hours wait karo (Google changes propagate hone me time lagta hai)

### Issue 3: "No data available" (Overview page par)
**Normal hai:** Jab tak login attempts nahi hote, data nahi dikhega. Ye issue nahi hai.

## 📞 Next Steps:

1. **Clients** page par jao
2. Apna OAuth Client ID configure karo
3. Authorized redirect URIs me Render URL add karo
4. Save karo
5. Mobile par test karo
