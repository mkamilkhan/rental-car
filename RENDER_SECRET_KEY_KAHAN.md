# Render pe Secret Key kahan add karo

## Stripe Secret Key Render pe kahan daalni hai

**Jawab:** Backend (Server) service ke **Environment** tab mein.

---

## Step-by-step

### 1. Render Dashboard kholo
- https://dashboard.render.com pe jao  
- Login karo

### 2. Backend (Server) service pe jao
- Jo service **server** / **backend** hai (e.g. `offroad-rental-server`) us par click karo

### 3. Environment tab
- Left side ya top pe **Environment** link pe click karo

### 4. STRIPE_SECRET_KEY add / edit karo
- **Key:** `STRIPE_SECRET_KEY` (name bilkul yahi hona chahiye)  
- **Value:** apni Stripe secret key – jo Stripe dashboard se copy ki hai (Stripe → Developers → API keys → Secret key), e.g. `sk_live_...`
- Agar pehle se `STRIPE_SECRET_KEY` hai to **Edit** karke value update karo  
- Nahi hai to **Add Environment Variable** se naya add karo

### 5. Save
- **Save Changes** click karo  
- Render redeploy karega; 2–5 min wait karo

---

## Summary

| Kya add karna hai | Kahan (Render pe) | Variable name |
|-------------------|-------------------|---------------|
| Stripe **Secret** key | **Server** service → Environment | `STRIPE_SECRET_KEY` |
| Stripe **Publishable** key | **Client** service → Environment | `REACT_APP_STRIPE_PUBLIC_KEY` |

Secret key **sirf server** pe daalni hai, client pe nahi.
