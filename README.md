# 💪 Fit With Me - React Native Fitness App

Complete fitness tracking app with 800+ exercises, workout logging, and progress tracking.

## 🚀 Quick Setup (2 Steps!)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run App

```bash
# Android
npm run android

# iOS (Mac only)
cd ios && pod install && cd ..
npm run ios
```

**That's it!** No API key needed - everything works offline! 🎉

---

## ✅ What You Get

- **800+ Exercises** with detailed instructions
- **1,600+ Images** (2 images per exercise)
- **100% Offline** - No internet needed
- **Multiple muscle groups**: chest, back, legs, abs, shoulders, etc.
- **Equipment types**: dumbbell, barbell, body weight, cable, machine, etc.
- **Difficulty levels**: beginner, intermediate, expert
- **Exercise types**: strength, cardio, stretching, plyometrics, etc.

---

## 📱 Features

- ✅ Authentication (Login, Signup, Forgot Password)
- ✅ Profile Setup (Gender, Age, Weight, Height, Goal, Activity Level)
- ✅ 800+ Exercises with images & instructions
- ✅ Search by name, muscle, equipment
- ✅ Favorites System
- ✅ Workout Logging
- ✅ Progress Tracking
- ✅ BMI Calculator
- ✅ Dark Theme
- ✅ 100% Offline - No API needed!

---

## 📂 Project Structure

```
Fit_With_Me/
├── free-exercise-db-main/  # Local exercise database
│   ├── dist/
│   │   └── exercises.json  # All 800+ exercises
│   └── exercises/          # 1,600+ images
├── src/
│   ├── api/               # Local data service
│   ├── components/        # 8 Reusable components
│   ├── navigation/        # Navigation setup
│   ├── screens/           # 24 screens
│   ├── store/             # Redux (6 slices)
│   ├── theme/             # Dark theme
│   └── utils/             # Helpers
├── android/               # Android native
├── ios/                   # iOS native
└── package.json
```

---

## 🎯 Exercise Data

**Local Database:** `free-exercise-db-main/dist/exercises.json`

**Sample Exercise:**
```json
{
  "id": "Pushups",
  "name": "Pushups",
  "level": "beginner",
  "equipment": "body only",
  "primaryMuscles": ["chest"],
  "secondaryMuscles": ["shoulders", "triceps"],
  "instructions": ["Step 1...", "Step 2..."],
  "images": ["Pushups/0.jpg", "Pushups/1.jpg"]
}
```

---

## 🔧 Troubleshooting

### Android Build Issues

**If you see "peer not authenticated" or SSL errors:**

This means your antivirus/firewall is blocking Gradle from downloading dependencies.

**QUICK FIX (Choose one):**

1. **Disable Windows Firewall temporarily:**
   - Press `Win + R`, type `firewall.cpl`
   - Turn off firewall for Private and Public networks
   - Run `npm run android`
   - Re-enable firewall after build

2. **Use Mobile Hotspot:**
   - Connect PC to your phone's hotspot
   - Run `npm run android`

3. **Run the fix script:**
   ```bash
   fix-android-build.bat
   ```

4. **Start emulator first:**
   - Open Android Studio
   - Start an emulator
   - Then run `npm run android`

**See full guide:** `ANDROID_BUILD_TROUBLESHOOTING.md`

### General Issues

**Clear cache:**
```bash
# Clear Metro cache
npm start -- --reset-cache

# Android clean
cd android && ./gradlew clean && cd ..

# iOS clean
cd ios && pod install && cd ..
```

---

## 📦 Tech Stack

- React Native 0.73.2
- TypeScript
- Redux Toolkit
- React Navigation
- Local JSON Database (800+ exercises)
- 1,600+ Local Images

---

## 🌟 Key Benefits

- ✅ **No API Key** - Works out of the box
- ✅ **100% Offline** - No internet required
- ✅ **Fast** - All data is local
- ✅ **Free** - No subscription or limits
- ✅ **Complete** - 800+ exercises with images

---

**Ready to use! 🚀 Just run and enjoy!**
