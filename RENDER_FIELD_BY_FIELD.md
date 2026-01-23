# 📝 Render Backend Deploy - Field by Field Guide

## ✅ Step 1: Source Code Section

**Source Code:**
- ✅ Already set: `mkamilkhan / rental-car`
- Agar change karna ho to **"Edit"** button click karo

---

## ✅ Step 2: Name Field

**Name:**
- Value: `offroad-rental-server`
- Ya koi bhi name (e.g., `rental-backend`, `api-server`)
- ✅ Already filled hai

---

## ✅ Step 3: Project (Optional)

**Project Optional:**
- **Left Dropdown**: "Select a project..." - **Skip karo** (optional hai)
- **Right Dropdown**: "Select an environment..." - **Skip karo** (optional hai)
- Ye fields blank rakho

---

## ✅ Step 4: Language

**Language:**
- Value: `Node` ✅
- Already auto-detected hai
- Change ki zaroorat nahi

---

## ✅ Step 5: Branch

**Branch:**
- Value: `main` ✅
- Already set hai
- Agar different branch use kar rahe ho to change karo

---

## ✅ Step 6: Region

**Region:**
- Value: `Oregon (US West)` ✅
- Ya apne najdeek wala region select karo
- Default rakho agar koi preference nahi

---

## ✅ Step 7: Root Directory ⚠️ **IMPORTANT**

**Root Directory Optional:**
- Value: `server` ⚠️ **ZAROORI HAI!**
- Ye field fill karna **MUST** hai
- Type: `server`
- Description: Backend code `server/` folder mein hai

---

## ✅ Step 8: Build Command

**Build Command:**
- Value: `npm install` ✅
- Ya rakho: `npm install`
- Already filled hai

---

## ✅ Step 9: Start Command ⚠️ **IMPORTANT**

**Start Command:**
- Value: `node index.js` ⚠️ **ZAROORI HAI!**
- Ya `npm start` (agar package.json mein script hai)
- Already filled hai ✅

---

## ✅ Step 10: Instance Type

**Instance Type:**
- **Free** select karo (testing ke liye) ✅
- Ya **Starter** ($7/month) - production ke liye
- Free tier:
  - 512 MB RAM
  - 0.1 CPU
  - Spins down after inactivity
  - No SSH access

**Note**: Free tier testing ke liye theek hai, production ke liye paid plan lo.

---

## ✅ Step 11: Environment Variables ⚠️ **ZAROORI**

**Environment Variables** section mein ye add karo:

### Click "+ Add Environment Variable" button:

1. **NODE_ENV**:
   - NAME: `NODE_ENV`
   - Value: `production`

2. **PORT**:
   - NAME: `PORT`
   - Value: `10000`

3. **MONGODB_URI**:
   - NAME: `MONGODB_URI`
   - Value: Apna MongoDB connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

4. **JWT_SECRET**:
   - NAME: `JWT_SECRET`
   - Value: Koi random string
   - Example: `my_super_secret_jwt_key_12345`

5. **STRIPE_SECRET_KEY**:
   - NAME: `STRIPE_SECRET_KEY`
   - Value: Apna Stripe secret key
   - Example: `sk_test_...` ya `sk_live_...`

6. **CLOUDINARY_CLOUD_NAME**:
   - NAME: `CLOUDINARY_CLOUD_NAME`
   - Value: `dkjjrna9o`

7. **CLOUDINARY_API_KEY**:
   - NAME: `CLOUDINARY_API_KEY`
   - Value: `566211774567975`

8. **CLOUDINARY_API_SECRET**:
   - NAME: `CLOUDINARY_API_SECRET`
   - Value: `S0mdkmfYoxXpLRFEGnzg7tOTeIg`

### Har variable add karne ke liye:
1. **"+ Add Environment Variable"** button click karo
2. Left field mein **NAME** type karo
3. Right field mein **Value** type karo
4. Phir next variable add karo

---

## ✅ Step 12: Advanced (Optional)

**Advanced Section:**
- **Skip karo** (optional hai)
- Default settings theek hain

---

## ✅ Step 13: Deploy

**"Deploy Web Service"** button click karo:
- Black button bottom left pe hai
- Click karo
- 2-5 minutes wait karo
- Deployment complete hone ke baad URL mil jayega

---

## 📋 Complete Checklist

- [ ] Source Code: `mkamilkhan / rental-car` ✅
- [ ] Name: `offroad-rental-server` ✅
- [ ] Project: Skip (optional)
- [ ] Language: `Node` ✅
- [ ] Branch: `main` ✅
- [ ] Region: `Oregon (US West)` ✅
- [ ] **Root Directory**: `server` ⚠️ **MUST**
- [ ] Build Command: `npm install` ✅
- [ ] **Start Command**: `node index.js` ⚠️ **MUST**
- [ ] Instance Type: `Free` ✅
- [ ] Environment Variables: Sab 8 variables add kiye ✅
- [ ] Deploy button click kiya ✅

---

## 🎯 Most Important Fields:

1. ⚠️ **Root Directory**: `server` (MUST)
2. ⚠️ **Start Command**: `node index.js` (MUST)
3. ⚠️ **Environment Variables**: Sab add karo (MUST)

---

## ✅ After Deploy:

1. Backend URL copy karo
2. Test karo: `https://your-backend-url.onrender.com/api/cars`
3. Logs check karo (agar error ho)

**Next**: Client aur Admin deploy karo! 🚀
