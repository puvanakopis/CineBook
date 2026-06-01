# 🎬 CineBook - Movie Ticket Booking Platform

A full-stack web application for browsing movies, selecting seats in real time, and booking tickets online — with secure authentication, payment integration, and admin management.

---

## ✨ Features

**👤 User** — Browse/filter movies, view showtimes, interactive seat selection, online payments, QR ticket generation, booking history, reviews, profile management.

**🛠️ Admin** — Manage movies, theaters, screens, showtimes, bookings, and user accounts.

**🎟️ Booking** — Real-time seat availability, dynamic pricing (VIP/standard), automated email confirmations, convenience fee calculation.

---

## 🧰 Tech Stack

| Layer       | Technologies                                                                 |
|-------------|------------------------------------------------------------------------------|
| **Frontend**| Next.js 14 (App Router), TypeScript, Tailwind CSS, Context API, React Hot Toast |
| **Backend** | Node.js, Express.js, MongoDB + Mongoose, JWT, bcryptjs, Passport.js (Google OAuth), Multer, Nodemailer, Stripe |
| **Security**| JWT auth, bcrypt hashing, OAuth 2.0, OTP verification, Role-based access control |

---

## 🚀 Installation

**Prerequisites:** Node.js v18+, MongoDB, npm or yarn

```bash
# Backend
git clone <your-repo-url>
cd backend && npm install
mkdir -p uploads/movies uploads/theaters
npm run dev

# Frontend (new terminal)
cd frontend && npm install && npm run dev
```

---

## ⚙️ Environment Variables

**Backend (`.env`)**
```bash
PORT=4000
BACKEND_URL=http://localhost:4000
FRONTEND_URL=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/cinebook
JWT_SECRET=your_jwt_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

**Frontend (`.env.local`)**
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## 📁 Folder Structure

```
cinebook/
├── backend/
│   ├── controllers/     # authController, movieController, theaterController, bookingController, paymentController
│   ├── models/          # userModel, movieModel, theaterModel, bookingModel, adminModel
│   ├── routes/          # authRoutes, movieRoutes, theaterRoutes, bookingRoutes, paymentRoutes
│   ├── middlewares/     # authMiddleware, uploadMiddleware
│   ├── config/          # db.js, passport.js
│   ├── utils/           # emailUtil.js
│   ├── uploads/         # movies/, theaters/
│   └── server.js
├── frontend/
│   ├── app/             # Pages: about, admin, login, movies, my-bookings, payment, profile, select-seats, theaters, tickets…
│   ├── components/      # Sidebar.tsx
│   ├── contexts/        # AuthContext, MovieContext, TheaterContext
│   ├── interfaces/
│   ├── route/           # RouteGuard.tsx
│   ├── services/        # movieApi, theaterApi, bookingApi
│   └── utils/
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup/request-otp` | Request OTP |
| POST | `/api/auth/signup/verify-otp` | Verify signup OTP |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/google` | Google OAuth login |
| GET | `/api/auth/me` | Get current user |
| GET/POST | `/api/movies` | Get all / Create movie |
| GET/PUT/DELETE | `/api/movies/:id` | Get / Update / Delete movie |
| GET/POST | `/api/theaters` | Get all / Create theater |
| GET/PUT/DELETE | `/api/theaters/:id` | Get / Update / Delete theater |
| POST | `/api/payments` | Process payment & create booking |
| POST | `/api/payments/intent` | Create Stripe payment intent |

---

## 👤 Author

**Name:** Puvanakopis  
**GitHub:** [@puvanakopis](https://github.com/puvanakopis)  
**LinkedIn:** [Puvanakopis](https://www.linkedin.com/in/puvanakopis/)  
**Email:** puvanakopis@gamil.com

---

**CineBook - Book Your Movie Experience 🎬**
