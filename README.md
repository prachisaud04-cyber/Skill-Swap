# SkillSwap - Full-Stack Skill Exchange Platform

This project was created using `Arkain Snap`.

---

## Environment & Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Operating System** | Ubuntu 22.04 | - |
| **Runtime** | Node.js | 20.18.3 |
| **Package Manager** | npm | 10.8.2 |
| **Frontend Framework** | React | Latest |
| **Frontend Build Tool** | Vite | Latest |
| **Backend Framework** | Express.js | Latest |
| **Database** | PostgreSQL | Latest |
| **Authentication** | JWT (JSON Web Tokens) | - |
| **Password Hashing** | bcryptjs | Latest |
| **File Upload** | Multer | Latest |
| **HTTP Client** | Axios | Latest |
| **Routing** | React Router DOM | Latest |
| **CORS** | cors middleware | Latest |
| **Environment Variables** | dotenv | Latest |

---

## Project Overview

### What SkillSwap Does

SkillSwap is a modern, full-stack web platform that enables users to exchange skills with each other in a peer-to-peer marketplace. Users create detailed profiles showcasing their expertise and learning goals, then discover and connect with other users who have complementary skills. The platform facilitates skill-sharing through a structured request system, direct messaging, and community-driven ratings.

### Key Features & Functionalities

- **User Authentication**: Secure signup and login with email/password, JWT-based session management
- **User Profiles**: Comprehensive profiles with picture, name, university, bio, skills offered/wanted, and skill level badges (Beginner, Intermediate, Expert)
- **Dashboard**: Clean, responsive card-based layout displaying all users with their details, skills, badges, and average ratings
- **Skill Swap Requests**: Send, accept, and reject skill exchange requests with other users
- **Messaging System**: Basic text-based chat for accepted skill swaps
- **Rating System**: 1-5 star rating system with average rating display on profiles and user cards
- **Custom Skill Requests**: Post custom skill requests if desired skills aren't found in the user base
- **Theme Support**: Light and dark mode toggle with persistent preference storage
- **Responsive Design**: Optimized for desktop and mobile devices
- **Profile Management**: Edit profile information and upload profile pictures

### Purpose

SkillSwap democratizes skill-sharing by creating a community-driven platform where knowledge and expertise are exchanged directly between peers, eliminating barriers to learning and professional development.

---

## How the Project Was Created

- Initialized a Node.js backend with Express.js framework and configured PostgreSQL database connection
- Set up JWT-based authentication middleware with bcryptjs password hashing for secure user credentials
- Created RESTful API endpoints for authentication (signup/login), user profile management, and profile picture uploads via Multer
- Implemented skill swap request system with endpoints for sending, accepting, and rejecting requests
- Built messaging system with endpoints for sending and retrieving text messages between matched users
- Developed rating system with endpoints for submitting ratings and calculating average ratings per user
- Created custom skill request feature allowing users to post and browse skill requests
- Initialized React frontend with Vite build tool for fast development and optimized production builds
- Set up React Router for client-side navigation across all application pages
- Implemented authentication context for managing user login state and JWT token persistence
- Created theme context for light/dark mode toggle with localStorage persistence
- Configured Axios HTTP client with automatic JWT token injection in request headers
- Built responsive UI components including Navbar, UserCard, StarRating, and ProtectedRoute
- Designed and implemented all pages: Login, Signup, Dashboard, Profile, EditProfile, SwapRequests, Chat, and CustomRequests
- Created global CSS styling with responsive breakpoints, light/dark mode theming, and modern design patterns
- Set up Vite development server with proxy configuration to backend API
- Configured PostgreSQL database with comprehensive schema including users, skills, requests, messages, and ratings tables
- Implemented file serving for uploaded profile pictures from the backend

---

## Instructions to Run the Project

### Prerequisites

Ensure you have the following installed:
- Node.js 20.18.3
- npm 10.8.2
- PostgreSQL (will be installed during setup)
- Ubuntu 22.04 or compatible Linux environment

### Step-by-Step Setup

#### 1. **Install System Dependencies**

```bash
apt-get update
DEBIAN_FRONTEND=noninteractive apt-get install -y postgresql postgresql-contrib
service postgresql start
```

#### 2. **Create PostgreSQL User and Database**

```bash
su - postgres -c "psql -c \"CREATE USER root WITH SUPERUSER PASSWORD 'root';\""
su - postgres -c "psql -c \"CREATE DATABASE skillswap;\""
```

#### 3. **Initialize Database Schema**

```bash
PGPASSWORD=root psql -h localhost -U root -d skillswap -f /workspace/skillswap-fullstac/backend/src/schema.sql
```

#### 4. **Install Backend Dependencies**

```bash
cd /workspace/skillswap-fullstac/backend
npm install
cd /workspace/skillswap-fullstac/
```

#### 5. **Install Frontend Dependencies**

```bash
cd /workspace/skillswap-fullstac/frontend
npm install
cd /workspace/skillswap-fullstac/
```

#### 6. **Start the Backend Server**

```bash
cd /workspace/skillswap-fullstac/backend
nohup node src/index.js > /workspace/skillswap-fullstac/backend/backend.log 2>&1 &
```

The backend will start on `http://localhost:5000`

#### 7. **Start the Frontend Development Server**

```bash
cd /workspace/skillswap-fullstac/frontend
npm run dev
```

The frontend will start on `http://localhost:3000`

### Accessing the Application

From the top menu, navigate to **Container → Execution URL and Port → Registered URL and Port → Click the shortcut button on the selected row** to access the application in your browser.

---

## Potential Errors & Solutions

### Error: PostgreSQL Connection Refused

**Solution:**
```bash
service postgresql start
# Verify PostgreSQL is running
sudo -u postgres psql -c "SELECT version();"
```

### Error: Database "skillswap" does not exist

**Solution:**
```bash
su - postgres -c "psql -c \"CREATE DATABASE skillswap;\""
PGPASSWORD=root psql -h localhost -U root -d skillswap -f /workspace/skillswap-fullstac/backend/src/schema.sql
```

### Error: Port 5000 or 3000 already in use

**Solution:**
```bash
# Find and kill process using port 5000
lsof -ti:5000 | xargs kill -9

# Find and kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Error: npm dependencies not installing

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Error: Backend logs show "Cannot find module"

**Solution:**
```bash
# Ensure all dependencies are installed
cd /workspace/skillswap-fullstac/backend
npm install express pg bcryptjs jsonwebtoken multer cors dotenv uuid
```

### Error: Profile picture upload fails

**Solution:**
- Ensure the `backend/uploads` directory exists and is writable:
```bash
mkdir -p /workspace/skillswap-fullstac/backend/uploads
chmod 755 /workspace/skillswap-fullstac/backend/uploads
```

### Error: JWT token not being sent with requests

**Solution:**
- Clear browser localStorage and log in again
- Check that the token is being stored in localStorage after login
- Verify the Axios interceptor is properly configured in `frontend/src/api/axios.js`

---

## Directory Structure

```
skillswap-fullstac/
│
├── backend/
│   ├── src/
│   │   ├── index.js                 # Express app entry point
│   │   ├── db.js                    # PostgreSQL connection pool
│   │   ├── schema.sql               # Database schema
│   │   ├── middleware/
│   │   │   └── auth.js              # JWT authentication middleware
│   │   └── routes/
│   │       ├── auth.js              # Authentication endpoints
│   │       ├── users.js             # User profile endpoints
│   │       ├── swaps.js             # Skill swap request endpoints
│   │       ├── messages.js          # Chat message endpoints
│   │       ├── ratings.js           # Rating endpoints
│   │       └── customRequests.js    # Custom skill request endpoints
│   ├── uploads/                     # Profile picture storage
│   ├── package.json                 # Backend dependencies
│   └── backend.log                  # Server logs
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx                 # React entry point
│   │   ├── App.jsx                  # Root component with routing
│   │   ├── index.css                # Global styles
│   │   ├── api/
│   │   │   └── axios.js             # Configured Axios instance
│   │   ├── context/
│   │   │   ├── AuthContext.jsx      # Authentication state
│   │   │   └── ThemeContext.jsx     # Light/dark mode state
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── UserCard.jsx         # User card component
│   │   │   ├── StarRating.jsx       # Star rating display
│   │   │   └── ProtectedRoute.jsx   # Route guard
│   │   └── pages/
│   │       ├── Login.jsx            # Login page
│   │       ├── Signup.jsx           # Signup page
│   │       ├── Dashboard.jsx        # User dashboard
│   │       ├── Profile.jsx          # User profile page
│   │       ├── EditProfile.jsx      # Edit profile page
│   │       ├── SwapRequests.jsx     # Swap requests page
│   │       ├── Chat.jsx             # Chat page
│   │       └── CustomRequests.jsx   # Custom requests page
│   ├── index.html                   # HTML entry point
│   ├── vite.config.js               # Vite configuration
│   ├── package.json                 # Frontend dependencies
│   └── node_modules/                # Installed packages
│
└── README.md                        # This file
```

---

## Quick Start Summary

```bash
# 1. Setup database
service postgresql start
su - postgres -c "psql -c \"CREATE USER root WITH SUPERUSER PASSWORD 'root';\""
su - postgres -c "psql -c \"CREATE DATABASE skillswap;\""
PGPASSWORD=root psql -h localhost -U root -d skillswap -f /workspace/skillswap-fullstac/backend/src/schema.sql

# 2. Install dependencies
cd /workspace/skillswap-fullstac/backend && npm install
cd /workspace/skillswap-fullstac/frontend && npm install

# 3. Start servers
cd /workspace/skillswap-fullstac/backend && nohup node src/index.js > backend.log 2>&1 &
cd /workspace/skillswap-fullstac/frontend && npm run dev

# 4. Access application
# Open browser to http://localhost:3000
```

---

## Features Walkthrough

### User Registration & Authentication
1. Navigate to signup page
2. Enter name, email, password, university, bio, skill level, and skills
3. Account is created with hashed password
4. Redirected to login page
5. Login with email/password to receive JWT token

### Dashboard & Discovery
1. After login, view all users in card layout
2. Each card shows profile picture, name, university, badge, skills, and average rating
3. Click "View Profile" to see full details
4. Click "Request Swap" to initiate skill exchange

### Skill Swap Requests
1. Send requests to other users
2. View incoming and outgoing requests
3. Accept or reject incoming requests
4. Accepted requests unlock chat functionality

### Messaging
1. Open chat for accepted swap requests
2. Send and receive text messages
3. View message history
4. Rate the other user after interaction

### Rating System
1. Rate users 1-5 stars after skill swap
2. Average rating displayed on profile and cards
3. Ratings help build community trust

### Custom Skill Requests
1. Post custom skill requests if desired skill not found
2. Browse all custom requests from community
3. Connect with users interested in your request

---

## Development Notes

- **Frontend Port**: 3000 (Vite dev server)
- **Backend Port**: 5000 (Express API)
- **Database**: PostgreSQL on localhost:5432
- **Profile Pictures**: Stored in `backend/uploads/` directory
- **Authentication**: JWT tokens stored in localStorage
- **Theme**: Preference stored in localStorage

---

## Support & Troubleshooting

For detailed logs, check:
- Backend logs: `/workspace/skillswap-fullstac/backend/backend.log`
- Frontend console: Browser DevTools (F12)
- Database logs: PostgreSQL system logs

---

**SkillSwap** - Connecting learners and experts, one skill at a time. 🚀
