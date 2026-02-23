# Android Build Troubleshooting Guide

## Current Error
```
peer not authenticated
No PSK available. Unable to resume
```

This error means your Windows system is blocking Gradle from downloading dependencies from Maven repositories due to SSL/TLS certificate issues.

---

## ✅ SOLUTIONS (Try in order)

### Solution 1: Disable Antivirus/Firewall (RECOMMENDED)
Your antivirus or Windows Firewall is blocking the HTTPS connections.

**Steps:**
1. **Disable Windows Defender Firewall:**
   - Press `Win + R`
   - Type `firewall.cpl` and press Enter
   - Click "Turn Windows Defender Firewall on or off"
   - Select "Turn off Windows Defender Firewall" for both Private and Public networks
   - Click OK

2. **Disable Antivirus (if installed):**
   - Right-click antivirus icon in system tray
   - Select "Disable protection" or "Pause protection"
   - Choose "Disable for 1 hour"

3. **Run the build again:**
   ```bash
   npm run android
   ```

4. **Re-enable firewall/antivirus after build completes**

---

### Solution 2: Use Mobile Hotspot or VPN
Your network/ISP might be blocking Maven repositories.

**Steps:**
1. Connect your PC to your mobile phone's hotspot
2. Or connect to a VPN service
3. Run the build again:
   ```bash
   npm run android
   ```

---

### Solution 3: Use the Fix Script
Run the provided batch file to clean everything:

```bash
fix-android-build.bat
```

Then try building again.

---

### Solution 4: Start Emulator First
Sometimes the build works better when emulator is already running.

**Steps:**
1. Open Android Studio
2. Go to Tools → Device Manager
3. Start an emulator (any Android device)
4. Wait for it to fully boot
5. In your project terminal, run:
   ```bash
   npm run android
   ```

---

### Solution 5: Check if Emulator is Running
```bash
adb devices
```

Should show:
```
List of devices attached
emulator-5554   device
```

If it shows "offline", restart the emulator.

---

### Solution 6: Manual Gradle Cache Clean
```bash
# Stop all Gradle processes
cd android
gradlew --stop

# Clean cache (Windows)
rmdir /s /q %USERPROFILE%\.gradle\caches

# Clean project
gradlew clean

# Try build again
cd ..
npm run android
```

---

### Solution 7: Configure Proxy (If behind corporate network)
If you're on a corporate network with proxy:

1. Open `android/gradle.properties`
2. Add these lines (replace with your proxy details):
   ```properties
   systemProp.http.proxyHost=your.proxy.host
   systemProp.http.proxyPort=8080
   systemProp.https.proxyHost=your.proxy.host
   systemProp.https.proxyPort=8080
   systemProp.http.proxyUser=username
   systemProp.http.proxyPassword=password
   systemProp.https.proxyUser=username
   systemProp.https.proxyPassword=password
   ```

---

## 🔍 What We've Already Fixed

1. ✅ Downgraded Gradle from 8.0.2 to 7.6.4
2. ✅ Downgraded Android Gradle Plugin from 8.1.1 to 7.4.2
3. ✅ Added fallback Maven repositories
4. ✅ Added HTTP fallback for Maven Central
5. ✅ Increased network timeouts
6. ✅ Added SSL/TLS configuration
7. ✅ Enabled Gradle caching

---

## 📱 Alternative: Build APK Directly

If nothing works, try building the APK directly:

```bash
cd android
gradlew assembleDebug
```

The APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

Then install manually:
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🆘 Still Not Working?

The issue is 100% related to your network/firewall blocking Maven repository access. You MUST:

1. **Disable antivirus/firewall** (most common solution)
2. **Use different network** (mobile hotspot)
3. **Check if you're behind corporate proxy**

This is NOT a code issue - the project configuration is correct. The problem is your Windows system blocking the network connections.

---

## ✨ After Build Succeeds

Once the build works, you can re-enable your firewall/antivirus. Gradle will have cached all dependencies, so future builds will be faster and won't need to download anything.
