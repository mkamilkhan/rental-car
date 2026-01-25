# 🔐 Render pe Stripe Production Keys Update Karne ka Guide

## ⚠️ Important: Ab Production Mode Active Hai

Ye steps follow karo Render dashboard pe:

---

## 📋 Step 1: Backend (Server) Environment Variable Update

1. **Render Dashboard** pe jao: https://dashboard.render.com
2. **offroad-rental-server** service select karo
3. **Environment** tab pe click karo
4. **STRIPE_SECRET_KEY** variable find karo
5. **Edit** button click karo
6. **Value** update karo:

```
sk_live_YOUR_LIVE_SECRET_KEY_HERE
```

7. **Save Changes** click karo

---

## 📋 Step 2: Client (Frontend) Environment Variable Update

1. **Render Dashboard** pe jao: https://dashboard.render.com
2. **offroad-rental-client** service select karo
3. **Environment** tab pe click karo
4. **REACT_APP_STRIPE_PUBLIC_KEY** variable find karo
5. **Edit** button click karo
6. **Value** update karo:

```
pk_live_YOUR_LIVE_PUBLIC_KEY_HERE
```

7. **Save Changes** click karo

---

## 🔄 Step 3: Manual Deploy (Optional)

Environment variables update karne ke baad:

1. **Manual Deploy** button click karo (dono services pe)
2. Ya wait karo - automatic redeploy ho sakta hai
3. Deployment complete hone ka wait karo (2-5 minutes)

---

## ✅ Step 4: Verify

### Backend Check:
1. Server logs check karo
2. Koi Stripe-related error nahi hona chahiye
3. API calls sahi kaam kar rahe hain

### Client Check:
1. Browser console check karo
2. Stripe Checkout page load hona chahiye
3. Payment flow test karo (small amount se)

---

## 🧪 Step 5: Test Production Payment

### ⚠️ Warning:
**Production mode mein REAL MONEY charge hoga!**

### Test Steps:
1. Website pe booking form fill karo
2. **Payment Method**: "Card (Stripe)" select karo
3. **Small amount** se test karo (e.g., 1 AED)
4. **Real card** details enter karo
5. Payment complete karo
6. **Stripe Dashboard** check karo: https://dashboard.stripe.com/payments
7. Payment **Succeeded** status mein dikhni chahiye

---

## 📊 Quick Reference

### Backend Key:
```
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_SECRET_KEY_HERE
```

### Client Key:
```
REACT_APP_STRIPE_PUBLIC_KEY=pk_live_YOUR_LIVE_PUBLIC_KEY_HERE
```

---

## 🐛 Troubleshooting

### Issue: "Invalid API Key"
- Check karo key `sk_live_...` ya `pk_live_...` se start ho rahi hai
- Check karo key mein koi extra spaces nahi hain
- **Manual Deploy** karo after updating keys

### Issue: "Payment not working"
- Check karo **Live mode** active hai Stripe Dashboard mein
- Check karo environment variables sahi set hain
- Check karo browser console aur server logs for errors

### Issue: "Test cards not working"
- **Production mode** mein test cards kaam nahi karte
- Real cards use karo for testing
- Ya phir **Test mode** mein test karo

---

## ✅ Final Checklist

- [ ] Backend pe `STRIPE_SECRET_KEY=sk_live_...` set hai
- [ ] Client pe `REACT_APP_STRIPE_PUBLIC_KEY=pk_live_...` set hai
- [ ] Render pe **Manual Deploy** kiya (ya automatic redeploy ho gaya)
- [ ] Stripe Dashboard mein **Live mode** active hai
- [ ] Test payment successful (small amount)
- [ ] Payment appears in Stripe Dashboard

**🎉 Ab aap production-ready ho!**
