@echo off
echo ========================================
echo USB Mobile Testing Setup
echo ========================================
echo.
echo Step 1: Make sure USB debugging is enabled on your phone
echo Step 2: Connect your phone via USB
echo Step 3: Accept the USB debugging prompt on your phone
echo.
pause

echo.
echo Checking for connected devices...
adb devices

echo.
echo Setting up port forwarding...
adb reverse tcp:3000 tcp:3000

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo On your phone's browser, go to:
echo http://localhost:3000
echo.
echo Press any key to stop port forwarding...
pause

adb reverse --remove tcp:3000
echo Port forwarding removed.
