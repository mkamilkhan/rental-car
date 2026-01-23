# 🖥️ Backend Server Deploy - Step by Step

## 📋 Step 1: Render Dashboard pe Jao

1. Browser mein `dashboard.render.com` open karo
2. Login karo (agar nahi kiya to sign up karo)

---

## 📋 Step 2: New Web Service Create Karo

1. Top right corner mein **"+ New"** button click karo
2. Dropdown se **"Web Service"** select karo
   - **"Web Service"** = Backend API ke liye
   - **"Static Site"** = Frontend ke liye (ye nahi)

---

## 📋 Step 3: GitHub Repository Connect Karo

1. **"Source Code"** section mein:
   - **"Git Provider"** tab already selected hoga ✅
   - Agar nahi hai to **"Git Provider"** click karo

2. **Search bar** mein apna repository name type karo:
   - `rental-car` ya `mkamilkhan/rental-car`
   - Ya GitHub username type karo

3. **Repository list** se apna repository select karo:
   - `mkamilkhan/rental-car` (ya jo bhi name hai)

4. **"Credentials"** button pe click karo:
   - Agar GitHub connect nahi hai to connect karo
   - GitHub account se authorize karo

---

## 📋 Step 4: Service Settings Fill Karo

### Basic Settings:

1. **Name**:
   - Type: `offroad-rental-server`
   - Ya koi bhi name (e.g., `rental-backend`, `api-server`)

2. **Region**:
   - Default rakho (Oregon, US)
   - Ya apne najdeek wala select karo

3. **Branch**:
   - `main` (default)
   - Ya jo branch use kar rahe ho

4. **Root Directory** ⚠️ **IMPORTANT**:
   - Type: `server`
   - Ye bahut zaroori hai! Backend code `server/` folder mein hai

5. **Runtime**:
   - `Node` select karo (automatic detect ho sakta hai)

6. **Build Command**:
   - Type: `npm install`
   - Ya rakho blank (default)

7. **Start Command** ⚠️ **IMPORTANT**:
   - Type: `node index.js`
   - Ya `npm start` (agar package.json mein script hai)

---

## 📋 Step 5: Environment Variables Add Karo

**"Environment"** section mein ye variables add karo:

### Required Variables:

1. **NODE_ENV**:
   - Key: `NODE_ENV`
   - Value: `production`

2. **PORT**:
   - Key: `PORT`
   - Value: `10000`
   - (Render automatically port assign karta hai, but specify karo)

3. **MONGODB_URI**:
   - Key: `MONGODB_URI`
   - Value: Apna MongoDB connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

4. **JWT_SECRET**:
   - Key: `JWT_SECRET`
   - Value: Koi random string (e.g., `my_super_secret_jwt_key_12345`)

5. **STRIPE_SECRET_KEY**:
   - Key: `STRIPE_SECRET_KEY`
   - Value: Apna Stripe secret key
   - Example: `sk_test_...` ya `sk_live_...`

6. **CLOUDINARY_CLOUD_NAME**:
   - Key: `CLOUDINARY_CLOUD_NAME`
   - Value: `dkjjrna9o`

7. **CLOUDINARY_API_KEY**:
   - Key: `CLOUDINARY_API_KEY`
   - Value: `566211774567975`

8. **CLOUDINARY_API_SECRET**:
   - Key: `CLOUDINARY_API_SECRET`
   - Value: `S0mdkmfYoxXpLRFEGnzg7tOTeIg`

### Optional Variables:

- `REACT_APP_API_URL` (agar frontend ke liye chahiye)

---

## 📋 Step 6: Plan Select Karo

1. **Plan** section mein:
   - **Free** select karo (testing ke liye)
   - Ya **Starter** ($7/month) - production ke liye

2. **Auto-Deploy**:
   - **ON** rakho ✅ (recommended)
   - GitHub push pe automatically deploy hoga

---

## 📋 Step 7: Deploy Karo

1. Sab settings check karo:
   - ✅ Root Directory: `server`
   - ✅ Start Command: `node index.js`
   - ✅ Environment Variables: Sab add kiye
   - ✅ Plan: Selected

2. **"Create Web Service"** button click karo

3. **Deployment start** ho jayega:
   - Build process dikhega
   - Logs dekh sakte ho
   - 2-5 minutes lag sakte hain

---

## 📋 Step 8: Deployment Complete

1. **Deployment successful** hone ke baad:
   - Green checkmark dikhega ✅
   - Service URL mil jayega

2. **Backend URL** copy karo:
   - Example: `https://offroad-rental-server.onrender.com`
   - Ya jo bhi name diya

3. **Test karo**:
   - Browser mein URL open karo
   - Ya `https://your-backend-url.onrender.com/api/cars` check karo

---

## ✅ Important Points

### ⚠️ Root Directory:
- **MUST be**: `server`
- Ye galat ho to build fail ho jayega

### ⚠️ Start Command:
- **MUST be**: `node index.js`
- Ya `npm start` (agar package.json mein script hai)

### ⚠️ Environment Variables:
- Sab variables add karna zaroori hai
- Values sahi honi chahiye

### ⚠️ MongoDB URI:
- MongoDB Atlas pe IP whitelist karo
- `0.0.0.0/0` add karo (sab IPs allow)

---

## 🐛 Agar Problem Aaye:

### Build Fail:
- Logs check karo
- Root Directory sahi hai ya nahi verify karo
- `package.json` mein dependencies check karo

### Server Start Nahi Ho Raha:
- Start Command check karo
- Environment Variables verify karo
- Logs mein error dekh sakte ho

### API Calls Fail:
- CORS settings check karo
- MongoDB connection verify karo
- Environment Variables sahi hain ya nahi

---

## 🎉 Done!

Backend deploy ho gaya! Ab aapke paas backend URL hai:
- `https://offroad-rental-server.onrender.com`

**Next Step**: Client aur Admin deploy karo (ye URL use karengi)
