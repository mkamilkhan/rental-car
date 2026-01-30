#!/bin/bash

# Script to remove Stripe keys from git history
# This will rewrite git history - use with caution!

echo "⚠️  WARNING: This will rewrite git history!"
echo "Make sure you have a backup before proceeding."
echo ""
read -p "Continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Aborted."
    exit 1
fi

# Method 1: Use git filter-branch to replace content in specific files
echo "Removing Stripe keys from git history..."

# Create a script to replace the keys
cat > /tmp/fix-stripe-keys.sh << 'EOF'
#!/bin/bash
# Replace actual Stripe keys with placeholders in the files
sed -i '' 's/sk_live_[A-Za-z0-9]\{50,\}/sk_live_your_stripe_secret_key_here/g' RENDER_ENV_VARIABLES.md SERVER_ENV_VARIABLES.md 2>/dev/null || true
sed -i '' 's/pk_live_[A-Za-z0-9]\{50,\}/pk_live_your_stripe_public_key_here/g' RENDER_ENV_VARIABLES.md SERVER_ENV_VARIABLES.md 2>/dev/null || true
EOF

chmod +x /tmp/fix-stripe-keys.sh

# Use git filter-branch to apply the fix to all commits
git filter-branch --force --tree-filter '
  if [ -f RENDER_ENV_VARIABLES.md ]; then
    sed -i "" "s/sk_live_[A-Za-z0-9]\{50,\}/sk_live_your_stripe_secret_key_here/g" RENDER_ENV_VARIABLES.md 2>/dev/null || true
    sed -i "" "s/pk_live_[A-Za-z0-9]\{50,\}/pk_live_your_stripe_public_key_here/g" RENDER_ENV_VARIABLES.md 2>/dev/null || true
  fi
  if [ -f SERVER_ENV_VARIABLES.md ]; then
    sed -i "" "s/sk_live_[A-Za-z0-9]\{50,\}/sk_live_your_stripe_secret_key_here/g" SERVER_ENV_VARIABLES.md 2>/dev/null || true
  fi
' --prune-empty --tag-name-filter cat -- --all

echo ""
echo "✅ Git history cleaned!"
echo "Now run: git push --force-with-lease"
echo ""
echo "⚠️  Note: Force push will rewrite remote history. Make sure all team members are aware!"
