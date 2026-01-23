# ☁️ Cloudinary Setup Guide

## 📋 Step 1: Cloudinary Account Banao

1. **Cloudinary.com** pe jao
2. **Sign Up** karo (free account available)
3. Login karo

## 🔑 Step 2: API Credentials Le Lo

1. **Dashboard** pe jao
2. **Settings** → **Security** section mein jao
3. Yahan milenge:
   - **Cloud Name** (e.g., `dkjjrna9o`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123456`)

## ⚙️ Step 3: .env File Mein Add Karo

`server/.env` file mein ye values dalo:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=dkjjrna9o
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

**Important**: Apne actual credentials dalo (upar wale example nahi!)

## ✅ Step 4: Verify Setup

### Test Karo:
1. Server start karo: `cd server && npm start`
2. Admin dashboard mein jao
3. Car add karo with image
4. Image Cloudinary pe upload honi chahiye

## 📝 Example .env File

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# JWT Secret
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

## 🔒 Security Notes

- ✅ `.env` file **NEVER** commit karo GitHub pe
- ✅ `.gitignore` mein already `.env` add hai
- ✅ Production mein Render pe Environment Variables add karo

## 🌐 Render Deployment

Render pe deploy karte waqt:

1. **Render Dashboard** → Your Service → **Environment**
2. Add these variables:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

## 🐛 Troubleshooting

### Error: "Cloudinary config missing"
- Check karo `.env` file `server/` folder mein hai
- Check karo variable names sahi hain
- Server restart karo

### Error: "Invalid API credentials"
- Cloudinary dashboard se credentials verify karo
- API Secret sahi copy kiya hai ya nahi check karo

### Images upload nahi ho rahi
- Network connection check karo
- Cloudinary account active hai ya nahi check karo
- File size limit check karo (free plan: 10MB per file)

## ✅ Done!

Ab Cloudinary setup ho gaya hai! 🎉

Images ab Cloudinary pe upload hongi instead of local `uploads/` folder.
