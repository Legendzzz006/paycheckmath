# 📦 How to Push Your Project to GitHub

## Step 1: Create a GitHub Account (if you don't have one)

1. Go to https://github.com
2. Click "Sign up"
3. Follow the registration process

## Step 2: Create a New Repository

1. Go to https://github.com/new
2. Fill in the details:
   - **Repository name**: `paycheckmath`
   - **Description**: "US Salary Calculator - Convert annual salary to hourly, daily, weekly, and monthly pay"
   - **Visibility**: Public (so Cloudflare can access it)
   - **DO NOT** check "Initialize this repository with a README"
3. Click "Create repository"

## Step 3: Copy Your Repository URL

After creating the repository, you'll see a page with setup instructions.

Copy the URL that looks like:
```
https://github.com/YOUR_USERNAME/paycheckmath.git
```

## Step 4: Push Your Code

Now run these commands in your terminal (in the salary-calculator folder):

### Initialize Git (if not already done)
```bash
git init
```

### Add all files
```bash
git add .
```

### Commit your files
```bash
git commit -m "Initial commit - PaycheckMath salary calculator"
```

### Set the main branch
```bash
git branch -M main
```

### Add your GitHub repository as remote
Replace YOUR_USERNAME with your actual GitHub username:
```bash
git remote add origin https://github.com/YOUR_USERNAME/paycheckmath.git
```

### Push to GitHub
```bash
git push -u origin main
```

**Note**: You may be asked to login to GitHub. Use your GitHub username and password (or personal access token).

## Step 5: Verify Upload

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/paycheckmath`
2. You should see all your files there!

## Troubleshooting

### "Authentication failed"
If you get an authentication error, you need to create a Personal Access Token:

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "PaycheckMath Deploy"
4. Check the "repo" scope
5. Click "Generate token"
6. Copy the token (you won't see it again!)
7. Use this token as your password when pushing

### "Repository already exists"
If you get this error, use:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/paycheckmath.git
git push -u origin main
```

### "Permission denied"
Make sure you're using the correct GitHub username and that the repository is yours.

## Next Steps

Once your code is on GitHub:
1. Go to Cloudflare Pages
2. Connect your GitHub repository
3. Deploy!

See DEPLOYMENT-CHECKLIST.md for detailed deployment instructions.
