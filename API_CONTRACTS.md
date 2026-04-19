# 📘 FairGig API Contracts (Inter-Service Documentation)

This document fulfills the **SOFTEC Technical Constraint** regarding inter-service API contract documentation.

## 🏛️ Architecture Overview
FairGig uses a **distributed microservices architecture**. Each service is independently runnable and communicates via RESTful boundaries.

---

## 🔐 Auth Service (Node.js/Express - Port 5001)
Responsible for JWT issuance, role management, and token refresh logic.

| Endpoints | Method | Payload | Description |
|-----------|--------|---------|-------------|
| `/api/auth/register` | `POST` | `{ name, email, password, role }` | Registers a new user. |
| `/api/auth/login` | `POST` | `{ email, password }` | Authenticates and returns JWT + Refresh Token. |
| `/api/auth/refresh` | `POST` | `{ refreshToken }` | Issues a new Access Token. |
| `/api/auth/forgot-password` | `POST` | `{ email }` | Triggers recovery link (Real Email/Log). |
| `/api/auth/health` | `GET` | - | Service health check. |

---

## 💰 Earnings Service (Python/FastAPI - Port 8001)
Persistent ledger for worker earnings and verification status.

| Endpoints | Method | Payload | Description |
|-----------|--------|---------|-------------|
| `/api/earnings` | `POST` | `{ workerId, city, platform, amount, deductions, date }` | Log a new shift manually. |
| `/api/earnings` | `GET` | `?workerId=ID` | Fetch history for a specific worker. |
| `/api/earnings/import` | `POST` | `formData: { workerId, file: CSV }` | **(SOFTEC Req)** Bulk Import from CSV. |
| `/api/earnings/stats/city-median` | `GET` | `?city=Name` | **(SOFTEC Req)** Real aggregated median income. |

---

## ⚖️ Grievance Service (Node.js - Port 5002)
Complaint management, systemic clustering, and escalate workflow.

| Endpoints | Method | Payload | Description |
|-----------|--------|---------|-------------|
| `/api/grievances` | `POST` | `{ workerId, platform, description, ... }` | Create a new worker dispute. |
| `/api/grievances` | `GET` | - | List all grievances. |
| `/api/grievances/clusters` | `GET` | - | **(SOFTEC Req)** Get grouped systemic issues. |
| `/api/grievances/:id` | `PATCH` | `{ status: "Escalated" }` | Update complaint status (Workflow). |

---

## 🔍 Anomaly Service (Python/FastAPI - Port 8002)
Detection engine for unusual fee deductions and income drops.

| Endpoints | Method | Payload | Description |
|-----------|--------|---------|-------------|
| `/api/anomaly/detect` | `POST` | `{ workerId, current_amount, current_deductions }` | **(Judge Payloads)** Returns flag + explanation. |
| `/api/anomaly/history` | `GET` | - | Returns system-wide vulnerability flags. |

---

## 📊 Analytics Service (Python/FastAPI - Port 8003)
Aggregated KPIs and market trends for Advocate dashboard.

| Endpoint | Method | Response | Description |
|----------|--------|----------|-------------|
| `/api/analytics/kpis` | `GET` | `{ total_workers, total_earnings, ... }` | Core metrics from cross-service data. |
| `/api/analytics/trends/commission` | `GET` | `[MarketTrends]` | Platform-wide pricing trends. |

---

## 📄 Certificate Renderer (Node.js - Port 5003)
Print-optimized HTML generation for worker financial proofs.

| Endpoint | Method | Payload | Response |
|----------|--------|---------|----------|
| `/api/render/certificate` | `POST` | `{ workerName, totalEarnings, period }` | **(SOFTEC Req)** Returns full HTML template. |
