# Performix SaaS - Complete Fitness Business Platform

A comprehensive SaaS fitness platform built with React Native + Expo for mobile and Node.js + PostgreSQL for backend.

## Features

### Core Infrastructure & Multi-Tenant System
- Backend: Node.js + PostgreSQL with multi-tenancy support (gymId-based separation)
- Mobile App Framework: React Native with Expo
- JWT-based authentication with role-based access (Admin, Coach, Athlete)
- Gym onboarding with profile setup and team invitations
- Stripe integration for subscription billing

### Admin Tools (Mobile App)
- Admin Dashboard with stats and KPIs
- Manage Coaches & Athletes (CRUD operations)
- Class Scheduler with coach assignment and capacity management
- Workout Programming with multimedia instructions
- Class Bookings Overview
- Subscription and billing management

### Athlete & Coach Features
- User onboarding with gym invite codes
- Class scheduling, booking, and cancellation
- Waitlist and attendance tracking
- Workout management with result logging
- Performance tracking and history
- Leaderboards with filtering options

### Additional Features
- Profile and gym branding customization
- Push notifications via Expo Notifications API
- White-label mode support
- Reports and analytics
- Workout marketplace
- Third-party integrations (Garmin, Strava)

## Project Structure

```
/performix-app
├── mobile/                 # React Native + Expo app
│   ├── App.tsx
│   ├── assets/
│   ├── components/
│   ├── navigation/
│   ├── screens/
│   ├── services/
│   ├── context/
│   ├── utils/
│   ├── constants/
│   ├── hooks/
│   └── package.json
├── backend/               # Node.js + PostgreSQL API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── utils/
│   ├── migrations/
│   ├── seeds/
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Expo CLI
- React Native development environment

### Installation

1. Clone the repository
```bash
git clone https://github.com/cazgheib/performix-app.git
cd performix-app
```

2. Set up the backend
```bash
cd backend
npm install
# Set up environment variables
cp .env.example .env
# Run migrations
npm run migrate
npm run dev
```

3. Set up the mobile app
```bash
cd mobile
npm install
expo start
```

## API Endpoints

### Authentication
- POST /auth/signup
- POST /auth/login
- GET /auth/me

### Gyms
- POST /gyms (create gym + admin)
- GET /gyms/:id
- PUT /gyms/:id

### Users
- GET /users (admin only)
- POST /users/invite
- PUT /users/:id
- DELETE /users/:id

### Classes
- GET /classes?gymId=
- POST /classes
- PUT /classes/:id
- DELETE /classes/:id

### Bookings
- POST /bookings
- GET /bookings?userId=&gymId=
- DELETE /bookings/:id

### Workouts
- POST /workouts
- GET /workouts
- GET /workouts/:id

### Logs
- POST /logs
- GET /logs?userId=&workoutId=

### Payments (Stripe)
- POST /billing/create-session
- GET /billing/status

### Notifications
- POST /notifications
- GET /notifications?userId=

## License

MIT License
