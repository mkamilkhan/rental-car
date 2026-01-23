# ⚡ Quick Deploy Guide - 3 Simple Steps

## Step 1: Git Push
```bash
cd /Users/EAPPLE/Desktop/dejavuadventure
git add .
git commit -m "Ready for deployment"
git push origin main
```

## Step 2: Render pe 3 Services Banao

### 1️⃣ Backend (Web Service)
- Type: **Web Service**
- Root: `server`
- Build: `npm install`
- Start: `node index.js`
- Env Vars: MONGODB_URI, JWT_SECRET, STRIPE_SECRET_KEY

### 2️⃣ Client (Static Site)
- Type: **Static Site**
- Root: `client`
- Build: `npm install && npm run build`
- Publish: `build`
- Env Var: `REACT_APP_API_URL=https://your-backend-url.onrender.com`

### 3️⃣ Admin (Static Site)
- Type: **Static Site**
- Root: `admin-dashboard`
- Build: `npm install && npm run build`
- Publish: `build`
- Env Var: `REACT_APP_API_URL=https://your-backend-url.onrender.com`

## Step 3: CORS Update
`server/index.js` mein CORS update karo (already done ✅)

**Done! 🎉**
