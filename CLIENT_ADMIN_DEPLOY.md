# 🌐 Client & Admin Dashboard Deploy - Step by Step

## ✅ Backend Deployed! Ab 2 aur services deploy karo:

1. **Client Website** (Static Site)
2. **Admin Dashboard** (Static Site)

---

## 🎨 Step 1: Client Website Deploy

### Render Dashboard pe:

1. **"+ New"** button click karo
2. **"Static Site"** select karo (Web Service nahi!)

### Settings Fill Karo:

**Name:**
- `offroad-rental-client`
- Ya koi bhi name

**Source Code:**
- Repository: `mkamilkhan / rental-car`
- Branch: `main`

**Root Directory** ⚠️ **IMPORTANT**:
- Value: `client`
- Ye zaroori hai!

**Build Command**:
- Value: `npm install && npm run build`

**Publish Directory** ⚠️ **IMPORTANT**:
- Value: `build`
- Ye zaroori hai!

**Environment Variables**:
- Click "+ Add Environment Variable"
- NAME: `REACT_APP_API_URL`
- Value: Apna backend URL (jo abhi deploy kiya)
  - Example: `https://offroad-rental-server.onrender.com`

**Instance Type:**
- Free select karo

**"Create Static Site"** button click karo

**Client URL**: `https://offroad-rental-client.onrender.com`

---

## 🔐 Step 2: Admin Dashboard Deploy

### Render Dashboard pe:

1. **"+ New"** button click karo
2. **"Static Site"** select karo (Web Service nahi!)

### Settings Fill Karo:

**Name:**
- `offroad-rental-admin`
- Ya koi bhi name

**Source Code:**
- Repository: `mkamilkhan / rental-car`
- Branch: `main`

**Root Directory** ⚠️ **IMPORTANT**:
- Value: `admin-dashboard`
- Ye zaroori hai!

**Build Command**:
- Value: `npm install && npm run build`

**Publish Directory** ⚠️ **IMPORTANT**:
- Value: `build`
- Ye zaroori hai!

**Environment Variables**:
- Click "+ Add Environment Variable"
- NAME: `REACT_APP_API_URL`
- Value: Apna backend URL (jo abhi deploy kiya)
  - Example: `https://offroad-rental-server.onrender.com`

**Instance Type:**
- Free select karo

**"Create Static Site"** button click karo

**Admin URL**: `https://offroad-rental-admin.onrender.com`

---

## ✅ Final Checklist

### Client Website:
- [ ] Type: **Static Site** ✅
- [ ] Root Directory: `client` ⚠️
- [ ] Build Command: `npm install && npm run build`
- [ ] Publish Directory: `build` ⚠️
- [ ] Environment Variable: `REACT_APP_API_URL` = backend URL

### Admin Dashboard:
- [ ] Type: **Static Site** ✅
- [ ] Root Directory: `admin-dashboard` ⚠️
- [ ] Build Command: `npm install && npm run build`
- [ ] Publish Directory: `build` ⚠️
- [ ] Environment Variable: `REACT_APP_API_URL` = backend URL

---

## 🎉 Final Links:

Deploy hone ke baad aapke paas 3 links honge:

1. 🌐 **Website**: `https://offroad-rental-client.onrender.com`
2. 🔐 **Dashboard**: `https://offroad-rental-admin.onrender.com`
3. 🖥️ **API**: `https://offroad-rental-server.onrender.com` (already done)

---

## ⚠️ Important Points:

1. **Static Site** select karo (Web Service nahi!)
2. **Root Directory** sahi honi chahiye:
   - Client: `client`
   - Admin: `admin-dashboard`
3. **Publish Directory**: `build` (dono ke liye)
4. **REACT_APP_API_URL**: Backend URL dalo (dono ke liye same)

---

## 🚀 Ab Deploy Karo!

Pehle Client deploy karo, phir Admin deploy karo! 🎉
