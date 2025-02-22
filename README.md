# TaskZen - Task Management Web App

## 📝 Description
TaskZen is a modern task management web application that allows users to organize their tasks efficiently. Users can create, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are categorized into **To-Do**, **In Progress**, and **Done**, with real-time updates ensuring seamless task management.  

## 🌐 Live Link
[TaskZen - Live App](https://app-taskzen.vercel.app/)

---

## 📖 Table of Contents
- [📝 Description](#-description)
- [🌐 Live Link](#-live-link)
- [📦 Dependencies](#-dependencies)
- [🛠 Technologies Used](#-technologies-used)
- [🚀 Installation Steps](#-installation-steps)
  - [1️⃣ Clone the Repository](#1️⃣-clone-the-repository)
  - [2️⃣ Install Dependencies](#2️⃣-install-dependencies)
  - [3️⃣ Set Up Environment Variables](#3️⃣-set-up-environment-variables)
  - [4️⃣ Run the Development Server](#4️⃣-run-the-development-server)
  - [5️⃣ Open in Browser](#5️⃣-open-in-browser)
- [📌 Features](#-features)
- [🎯 Upcoming Enhancements](#-upcoming-enhancements)
- [📜 License](#-license)

---


## 📦 Dependencies
The project uses the following dependencies for frontend development:

```json
{
  "@hookform/resolvers": "^4.1.0",
  "@radix-ui/react-avatar": "^1.1.3",
  "@radix-ui/react-checkbox": "^1.1.4",
  "@radix-ui/react-dialog": "^1.1.6",
  "@radix-ui/react-label": "^2.1.2",
  "@radix-ui/react-select": "^2.1.6",
  "@radix-ui/react-separator": "^1.1.2",
  "@radix-ui/react-slot": "^1.1.2",
  "@radix-ui/react-switch": "^1.1.3",
  "@radix-ui/react-toast": "^1.2.6",
  "@tanstack/react-query": "^5.66.8",
  "@types/react-beautiful-dnd": "^13.1.8",
  "axios": "^1.7.9",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "date-fns": "^3.6.0",
  "firebase": "^11.3.1",
  "framer-motion": "^12.4.7",
  "ldrs": "^1.0.2",
  "lucide-react": "^0.475.0",
  "motion": "^12.4.7",
  "react": "^18.3.1",
  "react-beautiful-dnd": "^13.1.1",
  "react-day-picker": "^8.10.1",
  "react-dom": "^18.3.1",
  "react-hook-form": "^7.54.2",
  "react-hot-toast": "^2.5.2",
  "react-ionicons": "^4.2.1",
  "react-router": "^7.2.0",
  "react-spinners": "^0.15.0",
  "sweetalert2": "^11.17.2",
  "tailwind-merge": "^3.0.1",
  "tailwindcss-animate": "^1.0.7",
  "yup": "^1.6.1"
}
```

## 🛠 Technologies Used
- **Frontend:** React, Vite.js, TailwindCSS, Firebase Authentication
- **State Management:** React Query, React Hook Form
- **Drag & Drop:** react-beautiful-dnd
- **Animations:** Framer Motion
- **Notifications:** React Hot Toast, SweetAlert2
- **Backend:** Express.js, MongoDB (for task storage)
- **Real-Time Updates:** Firebase, MongoDB Change Streams, WebSockets

## 🚀 Installation Steps
Follow these steps to set up the project locally:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/web-mahadihasan/TasksZen
cd taskzen-frontend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_BACKEND_URL=http://localhost:5000
```

### 4️⃣ Run the Development Server
```bash
npm run dev
```

### 5️⃣ Open in Browser
Visit [http://localhost:5173](http://localhost:5173) to see the application running.

## 📌 Features
✅ User Authentication (Google Sign-In)  
✅ Task Management: Add, Edit, Delete, Reorder tasks  
✅ Drag-and-Drop Functionality  
✅ Categories: **To-Do**, **In Progress**, **Done**  
✅ Task Deadline Color Indicators  
✅ Activity Log (Track Task Creation, Updates, Deletions)  
✅ Real-Time Updates with Firebase & MongoDB  
✅ Responsive UI (Desktop & Mobile Support)  

## 🎯 Upcoming Enhancements
- Dark Mode Toggle  
- Task Priority Feature  
- Collaborative Task Management  

## 📜 License
This project is licensed under the **MIT License**.

---

🚀 **Happy Task Managing!** 🚀
```

