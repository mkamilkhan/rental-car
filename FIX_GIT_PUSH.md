# 🔧 Git Push Fix - Large Files Problem

## Problem
Git push fail ho raha hai kyunki files bahut bari hain (505MB+). GitHub ki limit 100MB per file hai.

## Solution

### Step 1: Large Files Remove Karo (Agar Git mein already hain)
```bash
# Video files remove karo
git rm --cached client/public/assets/vehicles/*.MOV
git rm --cached client/public/assets/vehicles/*.mp4
git rm --cached client/public/assets/vehicles/*.MP4

# Build folders remove karo
git rm -r --cached server/build/
```

### Step 2: .gitignore Update Karo
`.gitignore` mein already add kar diya hai:
- `*.MOV`, `*.mp4`, `*.MP4` - Video files
- `server/build/` - Build folder

### Step 3: Git Buffer Increase Karo
```bash
git config http.postBuffer 524288000
```

### Step 4: Phir Push Karo
```bash
git add .
git commit -m "Remove large files and update .gitignore"
git push origin main
```

## Alternative: Git LFS (Agar Videos Chahiye)

Agar videos GitHub pe chahiye to Git LFS use karo:

```bash
# Git LFS install karo (pehle)
brew install git-lfs

# Initialize
git lfs install

# Track video files
git lfs track "*.MOV"
git lfs track "*.mp4"
git lfs track "*.MP4"

# Add .gitattributes
git add .gitattributes
git commit -m "Add Git LFS tracking"
```

## Best Practice
- Videos ko GitHub pe nahi rakho
- Use cloud storage (Cloudinary, AWS S3, etc.)
- Ya phir videos ko production mein directly upload karo

## Current Status
✅ .gitignore updated
✅ Large files excluded
✅ Git buffer increased

Ab push karo! 🚀
