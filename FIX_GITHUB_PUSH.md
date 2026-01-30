# Fix GitHub Push Protection - Stripe Keys in History

## Problem
GitHub is blocking push because old commit `be91e32095429c02dac68abdb5a85c65aaf61994` contains Stripe API keys in:
- `RENDER_ENV_VARIABLES.md:51`
- `SERVER_ENV_VARIABLES.md:24`

## Solution Options:

### Option 1: Use GitHub Allow URL (Quick Fix)
1. Open this URL in browser:
   https://github.com/mkamilkhan/rental-car/security/secret-scanning/unblock-secret/38sTMrFL8OwzvYc1q6pkgIJocdU

2. Click "Allow secret" (one-time only)
3. Try `git push` again

### Option 2: Rewrite Git History (Recommended for Security)

**Step 1: Install git-filter-repo (if not installed)**
```bash
brew install git-filter-repo
```

**Step 2: Remove keys from history**
```bash
cd /Users/EAPPLE/Desktop/dejavuadventure
git filter-repo --path RENDER_ENV_VARIABLES.md --path SERVER_ENV_VARIABLES.md --invert-paths
```

**OR use BFG Repo-Cleaner:**
```bash
# Download BFG from: https://rtyley.github.io/bfg-repo-cleaner/
java -jar bfg.jar --replace-text passwords.txt
```

### Option 3: Create New Branch (Easiest)

1. Create new branch without the problematic commit:
```bash
git checkout -b main-clean
git push origin main-clean
```

2. Then delete old main and rename:
```bash
git push origin --delete main
git branch -m main-clean main
git push origin main
```

### Option 4: Manual Fix (Safest)

1. Checkout the problematic commit:
```bash
git checkout be91e32095429c02dac68abdb5a85c65aaf61994
```

2. Fix the files (remove keys)
3. Amend the commit:
```bash
git add RENDER_ENV_VARIABLES.md SERVER_ENV_VARIABLES.md
git commit --amend --no-edit
```

4. Rebase later commits:
```bash
git checkout main
git rebase be91e32095429c02dac68abdb5a85c65aaf61994
```

## Recommended: Use GitHub Allow URL

For now, the easiest solution is to use the GitHub URL to allow the secret one-time, then ensure all future commits don't have keys.
