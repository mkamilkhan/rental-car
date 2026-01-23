# Payment Method Testing Guide 🧪

## Prerequisites

### 1. Environment Variables Check
Make sure these are set in your `.env` files:

**Server (`server/.env`):**
```env
MONGODB_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=sk_test_... (for testing)
FRONTEND_URL=http://localhost:3000
```

**Client (`client/.env`):**
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_... (for testing)
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

### 2. Start Servers
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm start
```

---

## Test 1: Cash Payment Method 💵

### Steps:
1. **Open Booking Page**
   - Go to: `http://localhost:3000/booking/[carId]`
   - Replace `[carId]` with an actual car ID from your database

2. **Fill Booking Form**
   - Full Name: `Test User`
   - Email: `test@example.com`
   - Contact Number: `+971501234567`
   - Start Date: Select today or future date
   - End Date: Select date after start date
   - Pickup Location: Choose "Normal Pickup" or "Private 4x4"
   - **Payment Method: Select "Cash"**

3. **Click "Continue"**
   - Form should validate
   - "Confirm Booking" button should appear

4. **Click "Confirm Booking"**
   - Should show "Processing..." state
   - Success modal should appear
   - Booking should be created in database

### ✅ What to Verify:
- [ ] Form validation works (all fields required)
- [ ] Date validation (end date after start date)
- [ ] "Confirm Booking" button appears after selecting Cash
- [ ] Loading state shows "Processing..."
- [ ] Success modal appears with booking details
- [ ] Booking saved in MongoDB with `paymentMethod: "cash"`
- [ ] Email sent (if EmailJS configured)
- [ ] Form resets after closing modal

### 🔍 Check Database:
```javascript
// In MongoDB or Admin Dashboard
// Booking should have:
{
  paymentMethod: "cash",
  status: "pending" or "confirmed",
  customerEmail: "test@example.com",
  totalPrice: [calculated amount]
}
```

---

## Test 2: Card Payment Method (Stripe) 💳

### Stripe Test Cards

Use these test card numbers in Stripe Checkout:

| Card Number | Description | Result |
|------------|-------------|--------|
| `4242 4242 4242 4242` | Visa (Success) | ✅ Payment succeeds |
| `4000 0000 0000 0002` | Visa (Declined) | ❌ Payment declined |
| `5555 5555 5555 4444` | Mastercard (Success) | ✅ Payment succeeds |
| `4000 0025 0000 3155` | Requires 3D Secure | 🔐 3D Secure flow |

**Test Details:**
- **Expiry Date:** Any future date (e.g., `12/25`)
- **CVC:** Any 3 digits (e.g., `123`)
- **ZIP Code:** Any 5 digits (e.g., `12345`)

### Steps:

1. **Open Booking Page**
   - Go to: `http://localhost:3000/booking/[carId]`

2. **Fill Booking Form**
   - Full Name: `Test User`
   - Email: `test@example.com`
   - Contact Number: `+971501234567`
   - Start Date: Select today or future date
   - End Date: Select date after start date
   - Pickup Location: Choose any option
   - **Payment Method: Select "Card (Stripe)"**

3. **Click "Continue"**
   - Form should validate
   - "Pay [Amount] AED" button should appear

4. **Click "Pay [Amount] AED"**
   - Should redirect to Stripe Checkout page
   - Should show loading state "Processing..."

5. **On Stripe Checkout:**
   - Enter test card: `4242 4242 4242 4242`
   - Expiry: `12/25`
   - CVC: `123`
   - ZIP: `12345`
   - Click "Pay"

6. **After Payment:**
   - Should redirect to `/booking-success?session_id=...`
   - Should verify payment
   - Should create booking
   - Should show success message

### ✅ What to Verify:
- [ ] Form validation works
- [ ] "Pay" button appears after selecting Card
- [ ] Redirects to Stripe Checkout
- [ ] Stripe Checkout loads correctly
- [ ] Test card payment succeeds
- [ ] Redirects back to success page
- [ ] Payment verified successfully
- [ ] Booking created in database
- [ ] Success message displayed
- [ ] Booking has `paymentMethod: "card"` and `status: "confirmed"`

### 🔍 Check Database:
```javascript
// Booking should have:
{
  paymentMethod: "card",
  status: "confirmed",
  paymentInfo: {
    sessionId: "cs_test_...",
    paymentIntentId: "pi_...",
    amountPaid: [amount],
    currency: "aed"
  }
}
```

### 🔍 Check Stripe Dashboard:
1. Go to: https://dashboard.stripe.com/test/payments
2. You should see test payment
3. Check payment status is "Succeeded"

---

## Test 3: Error Scenarios ❌

### 3.1 Invalid Form Data
- Try submitting without filling required fields
- **Expected:** Validation errors

### 3.2 Invalid Dates
- Try end date before start date
- **Expected:** Date validation error

### 3.3 Declined Card
- Use card: `4000 0000 0000 0002`
- **Expected:** Payment declined, error message

### 3.4 Cancel Payment
- Click "Cancel" on Stripe Checkout
- **Expected:** Redirects back to booking page

### 3.5 Network Error
- Disconnect internet during payment
- **Expected:** Error message, payment not processed

---

## Test 4: Payment Verification 🔍

### Test Duplicate Payment Prevention:
1. Complete a payment successfully
2. Try to verify the same `session_id` again
3. **Expected:** Should return existing booking, not create duplicate

### Test Payment Status Check:
1. Create a checkout session
2. Don't complete payment
3. Try to verify with session_id
4. **Expected:** Error "Payment not completed"

---

## Debugging Tips 🐛

### Check Browser Console:
- Open DevTools (F12)
- Check Console tab for errors
- Check Network tab for API calls

### Check Server Logs:
```bash
# Should see:
✅ MongoDB Atlas Connected Successfully
🚀 Server running on port 5000
```

### Common Issues:

1. **"Stripe payment failed"**
   - Check `STRIPE_SECRET_KEY` is set
   - Check it's a test key (starts with `sk_test_`)
   - Check Stripe account is active

2. **"Payment verification failed"**
   - Check MongoDB connection
   - Check booking details in metadata
   - Check session_id is valid

3. **"Booking not created"**
   - Check MongoDB connection
   - Check car exists in database
   - Check server logs for errors

4. **Redirect not working**
   - Check `FRONTEND_URL` in `.env`
   - Check `REACT_APP_API_URL` is correct
   - Check browser console for errors

---

## Test Checklist ✅

### Cash Payment:
- [ ] Form submission works
- [ ] Booking created in database
- [ ] Success modal appears
- [ ] Email sent (if configured)

### Card Payment:
- [ ] Stripe Checkout opens
- [ ] Test card payment succeeds
- [ ] Redirects to success page
- [ ] Payment verified
- [ ] Booking created with payment info
- [ ] Success message displayed

### Error Handling:
- [ ] Form validation works
- [ ] Date validation works
- [ ] Declined card shows error
- [ ] Cancel redirects correctly
- [ ] Network errors handled

---

## Quick Test Script 🚀

```bash
# 1. Start servers
cd server && npm start &
cd client && npm start &

# 2. Open browser
open http://localhost:3000/booking/[carId]

# 3. Test Cash Payment
# - Fill form
# - Select Cash
# - Submit

# 4. Test Card Payment
# - Fill form
# - Select Card
# - Use test card: 4242 4242 4242 4242
# - Complete payment
```

---

## Stripe Test Mode vs Live Mode

### Test Mode (Development Only):
- Use `sk_test_...` and `pk_test_...` keys
- Test cards work (e.g., 4242 4242 4242 4242)
- No real money charged
- Test in Stripe Dashboard: https://dashboard.stripe.com/test
- **⚠️ Only for development/testing!**

### Live Mode (Production - Current Setup):
- Use `sk_live_...` and `pk_live_...` keys
- Real cards only (test cards don't work)
- **Real money charged** ⚠️
- Test in Stripe Dashboard: https://dashboard.stripe.com
- **✅ Use this for real clients!**

**📖 Production setup ke liye `STRIPE_PRODUCTION_SETUP.md` file dekho!**

---

## Need Help?

If payment testing fails:
1. Check all environment variables are set
2. Check MongoDB is connected
3. Check Stripe keys are correct (test mode)
4. Check browser console for errors
5. Check server logs for errors
6. Verify car exists in database
