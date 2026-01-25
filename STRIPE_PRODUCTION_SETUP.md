# 💳 Stripe Production Setup Guide

## ⚠️ Important: Test Mode se Production Mode mein Switch

Ab aap real clients ko website de rahe ho, isliye Stripe ko **Production Mode** mein switch karna hoga.

---

## 📋 Step 1: Stripe Live Keys Le Lo

### Stripe Dashboard se Live Keys:

1. **Stripe Dashboard** pe jao: https://dashboard.stripe.com
2. **Developers** → **API keys** section mein jao
3. **"Activate test mode"** toggle **OFF** karo (top right corner)
4. Ab **Live mode** active hai
5. Yahan se copy karo:
   - **Publishable key** (starts with `pk_live_...`)
   - **Secret key** (starts with `sk_live_...`) - Click "Reveal test key" to see it

---

## 🔐 Step 2: Render pe Environment Variables Update Karo

### Backend (Server) Environment Variables:

1. **Render Dashboard** → **offroad-rental-server** → **Environment**
2. Update these variables:

```
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_SECRET_KEY_HERE
```

**Important**: 
- ❌ `sk_test_...` remove karo
- ✅ `sk_live_...` add karo

### Client (Website) Environment Variables:

1. **Render Dashboard** → **offroad-rental-client** → **Environment**
2. Update this variable:

```
REACT_APP_STRIPE_PUBLIC_KEY=pk_live_51SrZXHH1c9BxRJ0Mf21IyYxZuOy6d8QzOEcoz5Uc0dSTJOAZJxcYuMGn7zxO079ozqqMTXeGkmQbzJvzKNxOJc31008SwWaesl
```

**Important**:
- ❌ `pk_test_...` remove karo
- ✅ `pk_live_...` add karo

---

## ✅ Step 3: Verify Production Setup

### Checklist:

- [ ] Stripe Dashboard mein **Live mode** active hai
- [ ] Backend pe `STRIPE_SECRET_KEY=sk_live_...` set hai
- [ ] Client pe `REACT_APP_STRIPE_PUBLIC_KEY=pk_live_...` set hai
- [ ] Render pe **Manual Deploy** karo (ya automatic redeploy hoga)

---

## 🧪 Step 4: Test Production Payment

### ⚠️ Warning:
**Production mode mein REAL MONEY charge hoga!**

### Test Karne ke Liye:

1. **Small amount** se test karo (e.g., 1 AED)
2. Apne **real card** se test karo
3. Payment complete hone ke baad **Stripe Dashboard** mein check karo:
   - **Payments** section mein payment dikhni chahiye
   - Status: **Succeeded**

---

## 🔒 Security Best Practices

### ✅ Do's:
- ✅ Live keys sirf **production environment** mein use karo
- ✅ Live keys **NEVER** commit karo GitHub pe
- ✅ `.env` file `.gitignore` mein hai (already done)
- ✅ Render pe **Environment Variables** use karo (not hardcoded)

### ❌ Don'ts:
- ❌ Live keys ko code mein hardcode mat karo
- ❌ Live keys ko GitHub pe commit mat karo
- ❌ Test keys ko production mein use mat karo

---

## 📊 Stripe Dashboard Links

### Test Mode Dashboard:
https://dashboard.stripe.com/test

### Live Mode Dashboard:
https://dashboard.stripe.com

---

## 🐛 Troubleshooting

### Issue: "Invalid API Key"
- Check karo key `sk_live_...` ya `pk_live_...` se start ho rahi hai
- Check karo key mein koi extra spaces nahi hain
- Render pe **Manual Deploy** karo after updating keys

### Issue: "Payment not working"
- Check karo **Live mode** active hai Stripe Dashboard mein
- Check karo environment variables sahi set hain
- Check karo browser console aur server logs for errors

### Issue: "Test cards not working"
- **Production mode** mein test cards kaam nahi karte
- Real cards use karo for testing
- Ya phir **Test mode** mein test karo

---

## 💰 Payment Processing

### Production Mode Features:
- ✅ Real money transactions
- ✅ Real card processing
- ✅ Automatic payment confirmation
- ✅ Email receipts (Stripe automatically sends)
- ✅ Payment history in Stripe Dashboard

### Payment Flow:
1. Customer fills booking form
2. Selects "Card" payment method
3. Redirects to Stripe Checkout (production)
4. Enters real card details
5. Payment processed
6. Redirects back to website
7. Booking confirmed automatically

---

## 📞 Support

Agar koi issue ho:
1. Check Stripe Dashboard for payment status
2. Check Render logs for errors
3. Verify environment variables are correct
4. Make sure Live mode is active in Stripe

---

## ✅ Final Checklist Before Going Live

- [ ] Stripe account verified (KYC completed if required)
- [ ] Live API keys obtained
- [ ] Environment variables updated on Render
- [ ] Test payment with real card (small amount)
- [ ] Payment appears in Stripe Dashboard
- [ ] Booking created successfully in database
- [ ] Email notifications working (if configured)

**🎉 Ab aap production-ready ho!**
