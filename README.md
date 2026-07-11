# Capstone Project: Airbnb Clone

A fully responsive, full-stack Airbnb clone application built with **React** (Frontend) and **Express/Node.js/TypeScript** (Backend). This application allows guests to search for properties, check details, view dynamic pricing breakdowns, and book reservations, while admins/hosts can manage properties and view all bookings.

## 🚀 Features

- **User Authentication**: Secure JWT-based registration, login, and roles (Guest vs. Host/Admin).
- **Listing Management**: Hosts can create, read, update, and delete property listings with image uploads.
- **Dynamic Bookings**:
  - Guests can reserve properties for specific date ranges.
  - Interactive calendar date selectors (preventing booking in the past or checkout before check-in).
  - Dynamic price calculations including nightly rates, weekly discounts, cleaning fees, service fees, and occupancy taxes.
  - Full CRUD functionality for reservations (view, create, delete, and **edit reservation dates**).
- **Responsive Web Design**: A fully mobile-responsive interface optimized for mobile, tablet, and desktop viewports.

---

## 📁 Project Structure

```text
CapStone_Project/
├── CapStone/                  # React Frontend (Vite)
│   ├── src/
│   │   ├── action/            # Redux Actions (API requests via Axios)
│   │   ├── api/               # Axios Instance & Base Configuration
│   │   ├── components/        # Reusable UI Components (Navbar, Cards, etc.)
│   │   ├── Pages/             # Application Page Views
│   │   ├── reducers/          # Redux Reducers
│   │   ├── style/             # Component CSS Styles
│   │   └── types/             # Redux Action Types
│   └── package.json
│
└── CapStone_BackEnd/          # Express Backend (TypeScript)
    ├── src/
    │   ├── controllers/       # Route Controller Logics
    │   ├── middlewares/       # Authentication & Error Middlewares
    │   ├── models/            # Mongoose Schemas (User, Hotel, Reservation)
    │   ├── routers/           # Express Routers
    │   ├── uploads/           # Ephemeral Upload Folder for Images
    │   ├── utils/             # Helper Utilities (JWT, Multer Storage Config)
    │   ├── validators/        # Express Validator Rules
    │   └── index.ts           # Server Initialization
    └── package.json
```

---

## 🛠️ Tech Stack

### Frontend:
- **Core**: React 19, JavaScript, HTML5, CSS3
- **Build Tool**: Vite
- **State Management**: Redux, Redux Toolkit
- **Routing**: React Router DOM (v7)
- **HTTP Client**: Axios
- **Calendar Support**: React Calendar

### Backend:
- **Language**: TypeScript
- **Runtime**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **File Uploads**: Multer
- **Validation**: Express-Validator
- **Development Tools**: Nodemon, ts-node

---

## 💻 Getting Started

### Prerequisites
- Node.js installed (v18 or higher recommended)
- MongoDB database (local MongoDB server or MongoDB Atlas cloud connection URI)

---

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd CapStone_BackEnd
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment configuration or environment variables. You can set them via your terminal or a `.env` file:
   - `DB_URI` / `MONGODB_URI`: Your MongoDB database connection string.
   - `JWT_SECRET`: Secret key for JWT signing.
   - `PORT`: Port number the backend server listens on (defaults to `3000` or `10000` on Render).

4. Run in development mode (with hot reloading):
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

6. Start production build:
   ```bash
   npm start
   ```

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd CapStone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   Create a `.env` file in the `CapStone/` folder and specify your backend base URL:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

4. Run the Vite development server:
   ```bash
   npm run dev
   ```
   Open the output URL (usually `http://localhost:5173`) in your browser.

---

## 🌐 Deployment (Render)

### Backend Deployment:
- **Build Command**: `npm run build` (runs `tsc` typescript compiler)
- **Start Command**: `npm start` (runs `node dist/index.js`)
- **Environment Variables**:
  - Add `db_uri` / `DB_URI` (your MongoDB Atlas connection string). Make sure `0.0.0.0/0` is whitelisted in Atlas Network Access.
  - Add `jwt_secret_key` / `JWT_SECRET`.
  - Render automatically sets the uppercase `PORT` variable. The server is configured to bind to `process.env.PORT || 3000`.

### Frontend Deployment:
- Deployed as a Static Site.
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Environment Variables**:
  - Set `VITE_API_URL` to your live backend URL (e.g. `https://your-backend.onrender.com/api`).