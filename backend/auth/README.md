# 🔐 FairGig Auth Service

Independent microservice for authentication, role management, and secure session rotation.

## 🚀 Start Command
```bash
npm run dev
```

## 🛠️ Features (SOFTEC Requirement)
- **JWT Authentication**: Secure stateless access.
- **Token Refresh**: Persistence layer with rotating refresh tokens for 7-day sessions.
- **Role Verification**: Middleware for Worker, Verifier, and Advocate boundaries.
- **Dynamic Database**: Automatically syncs schema to SQLite (Dev) or PostgreSQL (Prod).

## 📡 Port
Running on: `5001`
