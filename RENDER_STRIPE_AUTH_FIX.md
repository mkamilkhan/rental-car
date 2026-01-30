# Render: "Stripe authentication failed" – Fix

Ye error tab aata hai jab **server** (Render backend) par Stripe **Secret key** galat hai ya set nahi hai.

---

## 1. Render par STRIPE_SECRET_KEY check karo

1. **https://dashboard.render.com** → apna **Backend/Server** service (e.g. `offroad-rental-server`) kholo  
2. **Environment** tab pe jao  
3. **STRIPE_SECRET_KEY** dhoondo:
   - **Agar nahi hai** → **Add Environment Variable** se add karo  
   - **Agar hai** → **Edit** karke value sahi karo  

---

## 2. Value sahi honi chahiye

- **Name:** `STRIPE_SECRET_KEY` (bilkul yahi, extra space nahi)  
- **Value:** Stripe **Secret key** jo **sk_live_** ya **sk_test_** se **start** hoti hai  

### Galat cheezein (ye use mat karo)

| Galat | Sahi |
|--------|------|
| `pk_live_...` (Publishable key) | `sk_live_...` (Secret key) |
| `rk_live_...` (Restricted key) | `sk_live_...` (Secret key) |
| Key ke start/end mein space ya quotes | Sirf key paste karo, bina space/quotes |
| Client (React) service pe daalna | Sirf **Server** service pe daalna |

---

## 3. Stripe Dashboard se Secret key copy karo

1. **https://dashboard.stripe.com** → Login  
2. **Developers** → **API keys**  
3. **Secret key** wale field ke saamne **Reveal** click karo  
4. **Copy** karo (jo **sk_live_** ya **sk_test_** se shuru hoti hai)  
5. Render **Environment** mein **STRIPE_SECRET_KEY** ki value mein **paste** karo (koi extra space na ho)  

---

## 4. Save aur Redeploy

1. Render par **Save Changes** click karo  
2. Redeploy hone do (2–5 min)  
3. Phir payment dubara try karo  

---

## 5. Ab bhi error aaye to

- Server **Logs** (Render → Server service → Logs) check karo – wahan Stripe/key related error dikh sakta hai  
- Confirm karo key **sk_live_** ya **sk_test_** se start ho rahi hai  
- Agar key nayi banayi hai to **Save** ke baad **Manual Deploy** ek baar run karo  
