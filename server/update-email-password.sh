#!/bin/bash
echo "=========================================="
echo "Gmail App Password Update Helper"
echo "=========================================="
echo ""
echo "Step 1: Generate Gmail App Password"
echo "1. Go to: https://myaccount.google.com/apppasswords"
echo "2. Select 'Mail' and generate password"
echo "3. Copy the 16-character password"
echo ""
read -p "Enter your 16-character App Password (with spaces): " APP_PASSWORD
echo ""
echo "Updating .env file..."
sed -i.bak "s/EMAIL_PASS=.*/EMAIL_PASS=$APP_PASSWORD/" .env
echo "✅ Updated! Backup saved as .env.bak"
echo ""
echo "New EMAIL_PASS value:"
grep EMAIL_PASS .env
echo ""
echo "Now restart your server!"
