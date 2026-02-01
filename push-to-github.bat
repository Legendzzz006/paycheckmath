@echo off
echo ========================================
echo  Pushing PaycheckMath.com to GitHub
echo ========================================
echo.

cd /d "%~dp0"

echo Step 1: Checking git status...
git status
echo.

echo Step 2: Adding all changes...
git add .
echo.

echo Step 3: Committing changes...
git commit -m "Add Tier 2 and Tier 3 calculators - Complete suite of 9 calculators"
echo.

echo Step 4: Pushing to GitHub...
git push origin main
echo.

if %ERRORLEVEL% EQU 0 (
    echo ========================================
    echo  SUCCESS! Changes pushed to GitHub
    echo ========================================
) else (
    echo ========================================
    echo  ERROR! Push failed. Try these:
    echo  1. Make sure you're connected to internet
    echo  2. Check if remote repository exists
    echo  3. Verify you have push permissions
    echo  4. Try: git push origin master
    echo ========================================
)

echo.
pause
