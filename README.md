# 🌿 FairGig: The Ethical Ledger for Gig Workers

**FairGig** is a decentralized, microservices-driven platform designed to fight algorithmic bias and wage theft in the gig economy. Reclaimed for worker equity.

---

## 🏛️ Architecture (SOFTEC Requirement)
This project is built using a **distributed microservice architecture**. Every service follows a strict API boundary and is independently scalable.

### 🧩 Services Dashboard
| Service | Tech Stack | Port | Description |
|---------|------------|------|-------------|
| **Auth** | Node.js / Express | 5001 | JWT, Role Management, **Token Refresh**. |
| **Earnings** | Python / FastAPI | 8001 | Shift Ledger, **CSV Import**, City Medians. |
| **Grievances** | Node.js / Express | 5002 | Dispute CRUD, **Systemic Clustering**. |
| **Anomaly** | Python / FastAPI | 8002 | Statistical Bias & Deduction Detection. |
| **Analytics** | Python / FastAPI | 8003 | Market KPIs & Cross-Service Trends. |
| **Renderer** | Node.js / Express | 5003 | Dedicated **Certificate Renderer**. |

---

## 🚀 Getting Started (Single Start Commands)

### 1. Root Setup
Copy `.env.example` to `.env` in the root and configure your credentials.

### 2. Start Microservices
Open a terminal for each service and run the mandatory start command:
- **Auth**: `cd backend/auth && npm run dev`
- **Grievances**: `cd backend/grievances && npm run dev`
- **Renderer**: `cd backend/renderer && npm run dev`
- **Earnings**: `cd backend/earnings && python main.py`
- **Anomaly**: `cd backend/anomaly && python main.py`
- **Analytics**: `cd backend/analytics && python main.py`

### 3. Start Frontend
- `cd fairgig-frontend && npm run dev`

---

## 📗 Documentation
- **API Contracts**: See `API_CONTRACTS.md` for full inter-service payload documentation.
- **Database**: Standardized for **SQLite** (local) and **PostgreSQL** (production).
- **Compliance**: Fully compliant with SOFTEC Hackathon manual requirements.
