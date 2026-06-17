# 🌱 Smart Crop Storage System

A modern, IoT-enabled full-stack application designed to help farmers and agricultural operators monitor storage environments in real-time to prevent spoilage for multiple crops (Carrots, Tomatoes, Potatoes).

## 🌟 Key Features
- **Real-Time Wi-Fi Connectivity**: ESP32 sensors send environmental data (Temperature, Humidity, Ethylene) over Wi-Fi directly to the backend API.
- **Smart Analytics Dashboard**: Visualize historical trends using Recharts, with beautiful, custom-built Vanilla CSS UI (Mobile-First & Responsive).
- **Gamification & AI Suggestions**: Includes an intelligent assistant that recommends optimal storage tweaks, and a "Freshness Score" that gamifies storage efficiency.
- **Robust Notifications**: Integrates with the Browser Notification API to send critical alerts directly to your phone or desktop.
- **Full-Stack Architecture**: React (Vite) frontend with a Node.js/Express backend capable of MongoDB connectivity and structured logging.

## 🚀 Getting Started

### 1. Installation
Ensure you have Node.js installed. In the root directory, run the following to install all dependencies for both the frontend and backend:

```bash
npm install
npm run install-all
```

### 2. Environment Variables
The application uses `.env` files for configuration. Defaults are provided.
- `backend/.env`: Configure your `DATABASE_URL` (MongoDB), `DEBUG_MODE`, and `NODE_ENV`.
- `frontend/.env`: Configure the `VITE_API_URL`.

### 3. Running the App
To start both the Frontend and Backend simultaneously, simply run:

```bash
npm start
```A
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

### 4. Database Seeding
If you want to view sample structure or seed a real MongoDB database with starting data, run:
```bash
cd backend
node seed.js
```

## 🛠️ Architecture Notes
- **Styling**: Strict adherence to Vanilla CSS for maximum flexibility (No Tailwind dependency).
- **Backend Security**: Features a gracefully falling-back database connection. If no MongoDB string is provided, it operates cleanly in a local mock state.
- **Health Checks**: The backend provides a `/health` route for load balancers.
