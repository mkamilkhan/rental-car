# Simple Fix for GitHub Push Protection

## ⚠️ Important: Don't Click "It's used in tests" or "False positive"

Those are **REAL production Stripe keys** - they should NOT be in git history!

## ✅ Best Solution: Remove Keys from Git History

### Option 1: Use BFG Repo-Cleaner (Recommended)

1. **Download BFG:**
   ```bash
   brew install bfg
   # OR download from: https://rtyley.github.io/bfg-repo-cleaner/
   ```

2. **Create replacement file:**
   ```bash
   cd /Users/EAPPLE/Desktop/dejavuadventure
   echo 'sk_live_==>sk_live_your_stripe_secret_key_here' > /tmp/stripe-keys.txt
   echo 'pk_live_==>pk_live_your_stripe_public_key_here' >> /tmp/stripe-keys.txt
   ```

3. **Clean history:**
   ```bash
   bfg --replace-text /tmp/stripe-keys.txt
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   ```

4. **Push:**
   ```bash
   git push --force-with-lease
   ```

### Option 2: Manual Git Filter-Branch

Run the script:
```bash
cd /Users/EAPPLE/Desktop/dejavuadventure
./REMOVE_KEYS_FROM_HISTORY.sh
```

### Option 3: Quick Fix - Allow on GitHub (NOT Recommended)

If you MUST push now and can't clean history:

1. On the GitHub page, click **"Allow secret"** button (bottom of page)
2. This is a **one-time exception**
3. ⚠️ **Security Risk**: Real production keys will remain in git history
4. After allowing, immediately:
   - Rotate/revoke the exposed Stripe keys
   - Generate new keys
   - Update `.env` files with new keys
   - Clean git history properly later

## 🔒 After Fixing: Rotate Your Stripe Keys

Since the keys were exposed in git history:

1. **Go to Stripe Dashboard:**
   - https://dashboard.stripe.com/apikeys

2. **Revoke old keys:**
   - Click on the exposed keys
   - Click "Revoke key"

3. **Generate new keys:**
   - Create new Live API keys
   - Update Render environment variables
   - Update `.env` files

4. **Test payment flow:**
   - Make a test booking
   - Verify payment works with new keys

## 📋 Recommended Steps:

1. ✅ Use BFG to clean history (Option 1)
2. ✅ Force push cleaned history
3. ✅ Rotate Stripe keys (revoke old, create new)
4. ✅ Update Render environment variables
5. ✅ Test payment flow

## ⚠️ Important Notes:

- **Never** commit real API keys to git
- Always use placeholders in documentation
- Use environment variables for real keys
- Rotate keys if accidentally exposed
