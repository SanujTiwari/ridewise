# RideWise - Mobile Application (Android & iOS)

> **Sub-Second Live Public Transport Telematics Mobile App**
> Built with React Native, Expo SDK 51, TypeScript, Lucide Icons, and WebSockets.

---

## 📱 Mobile Features

* 📍 **Passenger Live Map Telematics:** Real-time bus tracking, speed telematics, and arrival ETAs.
* 🔍 **Universal Route Search:** Dynamic route options with fare calculations (₹), travel durations, and stop sequence timelines.
* 🛞 **Driver GPS Telematics Portal:** Start/End active trips and broadcast device GPS coordinates live to connected passengers over WebSockets (`ws://10.0.2.2:8000/api/v1/ws/bus-location`).
* 🛡️ **Admin Fleet Overview:** Active bus counts, driver rosters, and on-time performance metrics.

---

## ⚡ Quick Start

```bash
cd mobile

# 1. Install Node dependencies
npm install

# 2. Start Expo Development Server
npm start

# 3. Launch on Android Emulator or Physical Device
npm run android
```

---

## 🏗️ Architecture Rationale

* **Shared Domain Schemas:** Reuses backend Pydantic & React web TypeScript domain interfaces (`User`, `Bus`, `Route`, `Stop`, `ServiceAlert`).
* **Android Emulator Gateway:** Connects to FastAPI backend at `10.0.2.2:8000` (Android default host loopback).
