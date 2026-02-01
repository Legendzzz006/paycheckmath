# How to Update Your GitHub Repository

## Quick Commands

If you've already set up the repository, just run these commands:

```bash
cd salary-calculator
git add .
git commit -m "Add Tier 2 and Tier 3 calculators - 9 total calculators complete"
git push origin main
```

---

## Detailed Step-by-Step Guide

### Step 1: Check Git Status

First, see what files have changed:

```bash
cd salary-calculator
git status
```

This will show you all the new and modified files.

### Step 2: Stage All Changes

Add all the new files and changes to git:

```bash
git add .
```

Or if you want to add specific files only:

```bash
git add lib/
git add components/
git add app/
git add scripts/
```

### Step 3: Commit Your Changes

Create a commit with a descriptive message:

```bash
git commit -m "Add Tier 2 and Tier 3 calculators

- Added Monthly Income Calculator
- Added Part-Time Salary Calculator  
- Added Salary Comparison Calculator
- Added Raise Calculator
- Updated homepage with organized calculator sections
- Updated footer and sitemap
- All 9 calculators now complete and tested
- 44 total pages generated successfully"
```

### Step 4: Push to GitHub

Push your changes to GitHub:

```bash
git push origin main
```

If your default branch is named `master` instead of `main`:

```bash
git push origin master
```

---

## If You Haven't Set Up Git Yet

### 1. Initialize Git (if not already done)

```bash
cd salary-calculator
git init
```

### 2. Add Remote Repository

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### 3. Check Current Branch

```bash
git branch
```

If you're not on `main`, create and switch to it:

```bash
git branch -M main
```

### 4. Add, Commit, and Push

```bash
git add .
git commit -m "Complete PaycheckMath.com with all 9 calculators"
git push -u origin main
```

---

## Common Issues and Solutions

### Issue: "fatal: remote origin already exists"

**Solution**: Remove the old remote and add the new one:

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### Issue: "Updates were rejected because the remote contains work"

**Solution**: Pull the remote changes first:

```bash
git pull origin main --rebase
git push origin main
```

Or if you want to force push (⚠️ this will overwrite remote):

```bash
git push origin main --force
```

### Issue: "Permission denied (publickey)"

**Solution**: You need to authenticate. Use one of these methods:

1. **Use HTTPS with Personal Access Token**:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate a new token with `repo` permissions
   - Use the token as your password when pushing

2. **Or set up SSH keys**:
   - Follow GitHub's SSH key setup guide
   - Use SSH URL: `git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git`

---

## Verify Your Push

After pushing, verify on GitHub:

1. Go to your repository on GitHub
2. Check that all new files are there
3. Look for your commit message
4. Verify the file count matches (should see all new calculator files)

---

## What Files Were Added/Changed

### New Files (Tier 2 & 3):
```
lib/
  monthlyCalculations.ts
  partTimeCalculations.ts
  comparisonCalculations.ts
  raiseCalculations.ts
  inflationCalculations.ts
  costOfLivingCalculations.ts

components/
  MonthlyCalculator.tsx
  PartTimeCalculator.tsx
  ComparisonCalculator.tsx
  RaiseCalculator.tsx

app/
  monthly-income-calculator/page.tsx
  part-time-salary-calculator/page.tsx
  salary-comparison-calculator/page.tsx
  raise-calculator/page.tsx

scripts/
  create-all-calculator-pages.js

Documentation/
  ALL-TIERS-COMPLETE.md
  UPDATE-GITHUB.md
```

### Modified Files:
```
app/page.tsx (homepage with all calculators)
components/Footer.tsx (added new calculator links)
app/sitemap.ts (added new routes)
```

---

## Next Steps After Pushing

1. **Verify on GitHub**: Check that all files are uploaded
2. **Deploy to Cloudflare Pages**: Connect your GitHub repo to Cloudflare
3. **Test Live Site**: Make sure all calculators work in production
4. **Monitor**: Check for any build errors or issues

---

## Quick Reference

```bash
# Check status
git status

# Add all changes
git add .

# Commit with message
git commit -m "Your message here"

# Push to GitHub
git push origin main

# View commit history
git log --oneline

# View remote URL
git remote -v
```

---

**Need Help?**

If you encounter any issues:
1. Check the error message carefully
2. Make sure you're in the `salary-calculator` directory
3. Verify your GitHub repository exists
4. Check your internet connection
5. Ensure you have push permissions to the repository
