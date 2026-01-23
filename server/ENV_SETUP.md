# 🔐 Environment Variables Setup

## 📝 Step 1: .env File Create Karo

`server/` folder mein `.env` file create karo:

```bash
cd server
touch .env
```

## 📋 Step 2: Ye Content Add Karo

`.env` file mein ye add karo (apne actual values ke saath):

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# JWT Secret (koi bhi random string)
JWT_SECRET=my_super_secret_jwt_key_12345

# Server Port
PORT=5000

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=dkjjrna9o
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456

# Node Environment
NODE_ENV=development
```

## ☁️ Step 3: Cloudinary Credentials Le Lo

1. **Cloudinary.com** pe jao
2. **Dashboard** → **Settings** → **Security**
3. Yahan se copy karo:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

## ✅ Step 4: Verify

Server start karo:
```bash
cd server
npm start
```

Agar koi error nahi aaya, to setup sahi hai! ✅

## 🔒 Security

- ✅ `.env` file **NEVER** commit karo
- ✅ `.gitignore` mein already add hai
- ✅ Production mein Render pe Environment Variables add karo
