# 📚 KlassMate
### Student Productivity and Time-Management Support System

> 👩‍💻 **Main Developer:** Anna Marie Zolina
> 🏫 Technological Institute of the Philippines — Computer Engineering Department
> 📚 CPE 033 - Human-Centered Innovation

---

## 📌 About the Project

**KlassMate** is a mobile productivity app designed to help college students manage their academic responsibilities more effectively. It addresses the root causes of poor academic performance — procrastination, poor time management, digital distractions, and deadline overload — through a single, student-friendly platform.

This project was developed as a final requirement for **CPE 033 - Human-Centered Innovation** at the Technological Institute of the Philippines, Quezon City.

---

## 👥 The Team

| Name | Role |
|------|------|
| **Anna Marie Zolina** | **Lead Developer / Project Planner / System Designer** |
| Gabriel Jan Inlayo | Documentation / Research Contributor |
| Leoj Jeam Tandayu | Concept Developer / Research Contributor |
| Princess Nicole Valdez | Documentation Lead / Research Contributor |

---

## 🎯 The Problem

College students face persistent difficulties managing academic responsibilities due to:
- ❌ Poor time management
- ❌ Procrastination
- ❌ Frequent distractions (smartphones, social media)
- ❌ Overlapping deadlines
- ❌ Inconsistent use of planning tools

These challenges lead to heightened stress, rushed task completion, and reduced quality of academic outputs.

---

## ✅ Our Solution

KlassMate integrates multiple productivity tools in one platform:

| Feature | Description |
|---------|-------------|
| 📅 Task Checklist | Add, complete, and manage academic tasks daily |
| 🗓️ Schedule Viewer | Weekly calendar with class time blocks |
| 📖 Course Tracker | View all courses, professors, rooms, and topics |
| 📊 Grades / GPA | Track grades and overall CGPA per semester |
| 🍅 Focus Mode | Pomodoro timer to beat procrastination |
| 🤖 KM Bot (AI) | Claude-powered AI study assistant |
| 👤 Profile | Student stats — attendance, GPA, credits earned |
| ⚙️ Settings | Notifications, focus preferences, account settings |

---

## 📱 App Screens

| Screen | Description |
|--------|-------------|
| Splash Screen | Animated logo entry |
| Onboarding | 3-slide intro carousel |
| Login & Sign Up | Auth forms with validation |
| Home | Today's classes + task checklist |
| Courses | All courses with search |
| Schedule | Weekly calendar view |
| Results / Grades | GPA card + course grade bars |
| Profile | Student stats and dashboard |
| **KM Bot** | AI Chatbot powered by Claude API |
| **Focus Mode** | Pomodoro timer (25/5/15 min) |
| Course Detail | Topics, schedule, AI quick access |
| Settings | App configuration and preferences |

---

## 🛠️ Tech Stack

- **Framework:** React Native (Expo SDK 51)
- **Navigation:** React Navigation 6
- **Icons:** @expo/vector-icons (Ionicons)
- **AI Chatbot:** Anthropic Claude API (claude-haiku)
- **Storage:** AsyncStorage
- **Build Tool:** EAS Build (Expo Application Services)
- **Design:** Figma (UI Prototyping)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo Go app OR Android device

### Installation

```bash
# Clone the repository
git clone https://github.com/YOURUSERNAME/KlassMate.git

# Navigate to project folder
cd KlassMate

# Install dependencies
npm install --legacy-peer-deps

# Start the app
npx expo start
```

### Build APK for Android
```bash
eas build -p android --profile preview
```

---

## 🤖 AI Chatbot Setup (KM Bot)

1. Get a free API key at [console.anthropic.com](https://console.anthropic.com)
2. Open `src/screens/AIAssistantScreen.js`
3. Replace `YOUR_API_KEY_HERE` with your actual key:

```javascript
const API_KEY = 'sk-ant-api03-...';
```

> ⚠️ Never commit your real API key to GitHub!

---

## 🗂️ Project Structure

```
KlassMate/
├── App.js                          # Navigation setup
├── package.json
├── eas.json                        # EAS Build config
└── src/
    ├── theme/
    │   └── colors.js               # Brand colors & shadows
    ├── data/
    │   └── mockData.js             # Sample courses, tasks, schedule
    └── screens/
        ├── SplashScreen.js
        ├── OnboardingScreen.js
        ├── LoginScreen.js
        ├── SignUpScreen.js
        ├── HomeScreen.js
        ├── CoursesScreen.js
        ├── ScheduleScreen.js
        ├── ResultsScreen.js
        ├── ProfileScreen.js
        ├── AIAssistantScreen.js    ← KM Bot (Claude AI)
        ├── FocusModeScreen.js      ← Pomodoro Timer
        ├── CourseDetailScreen.js
        └── SettingsScreen.js
```

---

## 📋 Functional Requirements

- ✅ User account creation and login
- ✅ Add and manage academic tasks and deadlines
- ✅ Task priority and completion tracking
- ✅ Class schedule with weekly calendar view
- ✅ Course information and grade tracking
- ✅ Focus mode for distraction-free studying
- ✅ AI-powered study assistant (KM Bot)
- ✅ Student profile with statistics
- ✅ Push notification settings
- ✅ Secure login with form validation

---

## 🏆 Competition Analysis

| Existing Solution | KlassMate Advantage |
|---|---|
| Google Calendar | KlassMate adds task management + AI + focus tools |
| Notion | KlassMate is student-specific, no manual setup needed |
| Todoist | KlassMate directly addresses procrastination behavior |
| Forest App | KlassMate combines focus + full task + grade tracking |

---

## ⚡ Development Notes

This app was built using a **vibe coding** approach — leveraging AI-assisted development to rapidly prototype, design, and implement the full system, while maintaining complete understanding of the codebase, architecture, and design decisions.

The development process involved:
- 🎨 UI/UX design and prototyping in Figma
- 🤖 AI-assisted React Native implementation
- 🔧 Manual debugging, testing, and refinement
- 📱 APK build and deployment via EAS Build

> Vibe coding is an emerging development methodology where developers use AI tools to accelerate implementation while staying in full creative and technical control of the product.

---

## 🏫 Project Information

**School:** Technological Institute of the Philippines
**Campus:** Quezon City
**Department:** Computer Engineering
**Subject:** CPE 033 - Human-Centered Innovation

