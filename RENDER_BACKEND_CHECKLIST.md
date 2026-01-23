# ✅ Backend Deploy Checklist

## Render Dashboard Settings:

- [ ] **Service Type**: Web Service ✅
- [ ] **Repository**: `mkamilkhan/rental-car` ✅
- [ ] **Name**: `offroad-rental-server` (ya koi bhi name)
- [ ] **Root Directory**: `server` ⚠️ **MUST**
- [ ] **Build Command**: `npm install`
- [ ] **Start Command**: `node index.js` ⚠️ **MUST**

## Environment Variables:

- [ ] `NODE_ENV=production`
- [ ] `PORT=10000`
- [ ] `MONGODB_URI=your_mongodb_connection_string`
- [ ] `JWT_SECRET=your_jwt_secret`
- [ ] `STRIPE_SECRET_KEY=your_stripe_key`
- [ ] `CLOUDINARY_CLOUD_NAME=dkjjrna9o`
- [ ] `CLOUDINARY_API_KEY=566211774567975`
- [ ] `CLOUDINARY_API_SECRET=S0mdkmfYoxXpLRFEGnzg7tOTeIg`

## After Deploy:

- [ ] Backend URL copy karo
- [ ] Test karo: `https://your-backend-url.onrender.com/api/cars`
- [ ] Logs check karo (agar error ho)

## Next Steps:

- [ ] Client deploy karo (backend URL use karega)
- [ ] Admin deploy karo (backend URL use karega)

---

**Backend URL**: `https://offroad-rental-server.onrender.com` (ya jo name diya)
