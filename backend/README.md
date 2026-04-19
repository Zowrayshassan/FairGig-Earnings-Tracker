# FairGig Backend - Microservices Ecosystem

This directory contains the logically separated microservices for the Ethical Ledger (SOFTEC 26).

## 🚀 One-Click Start (Services)

### 1. Database & Seeding (Run First)
Make sure MongoDB is running on `localhost:27017`.
```bash
node seed.js
```

### 2. Microservices
Each service is independently runnable. Open 6 terminals:

| Service | Language | Command | Port |
|---------|----------|---------|------|
| **Auth** | Node.js | `cd auth && npm run dev` | 5001 |
| **Grievances** | Node.js | `cd grievances && npm run dev` | 5002 |
| **Renderer** | Node.js | `cd renderer && npm run dev` | 5003 |
| **Earnings** | FastAPI | `cd earnings && python main.py` | 8001 |
| **Anomaly** | FastAPI | `cd anomaly && python main.py` | 8002 |
| **Analytics** | FastAPI | `cd analytics && python main.py` | 8003 |

## 🛠️ Technical Constraints Fulfilled
- **Anomaly Detection**: FastAPI (Port 8002). Logic documented at `/api/anomaly/logic`.
- **Grievance Service**: Node.js (Port 5002). Support for status escalation and keyword clustering.
- **Aggregation**: Real seeded data used for all median/KPI calculations.
- **Microservices**: Every service has its own `src` and dependencies.

## 📄 API Documentation
- **Auth**: POST `/api/auth/login`, `/api/auth/register`
- **Grievance**: POST `/api/grievances`, PATCH `/api/grievances/:id`
- **Anomaly**: POST `/api/anomaly/detect` (Payload: `{workerId, current_amount, current_deductions}`)
- **Earnings**: GET `/api/earnings/stats/city-median?city=London`
