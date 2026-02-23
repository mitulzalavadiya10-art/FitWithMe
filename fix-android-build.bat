@echo off
echo ========================================
echo Android Build Fix Script
echo ========================================
echo.

echo Step 1: Stopping all Gradle daemons...
cd android
call gradlew --stop
cd ..
echo Done!
echo.

echo Step 2: Cleaning Gradle cache...
rmdir /s /q %USERPROFILE%\.gradle\caches 2>nul
echo Done!
echo.

echo Step 3: Cleaning project...
cd android
call gradlew clean --no-daemon
cd ..
echo Done!
echo.

echo Step 4: Checking if Android emulator is running...
adb devices
echo.

echo ========================================
echo IMPORTANT INSTRUCTIONS:
echo ========================================
echo.
echo The "peer not authenticated" error means your network/firewall
echo is blocking Gradle from downloading dependencies.
echo.
echo SOLUTIONS:
echo.
echo 1. DISABLE ANTIVIRUS/FIREWALL temporarily:
echo    - Turn off Windows Defender Firewall
echo    - Turn off any antivirus (Avast, McAfee, etc.)
echo    - Try the build again
echo.
echo 2. USE VPN or MOBILE HOTSPOT:
echo    - Connect to a VPN
echo    - Or use your mobile phone's hotspot
echo    - Try the build again
echo.
echo 3. CHECK PROXY SETTINGS:
echo    - If you're behind a corporate proxy, you need to configure it
echo    - Add proxy settings to gradle.properties
echo.
echo 4. START EMULATOR FIRST:
echo    - Open Android Studio
echo    - Start an emulator manually
echo    - Then run: npm run android
echo.
echo ========================================
echo.
pause
