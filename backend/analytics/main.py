from fastapi import FastAPI
from sqlalchemy import create_engine, Column, Integer, Float, String, func, DateTime
from sqlalchemy.sql import func as sql_func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import sqlite3
from dotenv import load_dotenv

load_dotenv()

# We need to access both earnings and grievances for a true Advocate view
EARNINGS_DB = os.getenv("DATABASE_URL_EARNINGS", "sqlite:///../earnings/earnings.sqlite")
GRIEVANCES_DB = os.getenv("DATABASE_URL_GRIEVANCES", "sqlite:///../grievances/grievances.sqlite")

if EARNINGS_DB.startswith("postgres://"):
    EARNINGS_DB = EARNINGS_DB.replace("postgres://", "postgresql://", 1)
if GRIEVANCES_DB.startswith("postgres://"):
    GRIEVANCES_DB = GRIEVANCES_DB.replace("postgres://", "postgresql://", 1)

engine_earnings = create_engine(EARNINGS_DB, connect_args={"check_same_thread": False} if "sqlite" in EARNINGS_DB else {})
engine_grievances = create_engine(GRIEVANCES_DB, connect_args={"check_same_thread": False} if "sqlite" in GRIEVANCES_DB else {})

Base = declarative_base()

class EarningEntry(Base):
    __tablename__ = "earnings"
    id = Column(Integer, primary_key=True)
    workerId = Column(String)
    city = Column(String)
    platform = Column(String)
    amount = Column(Float)
    deductions = Column(Float)
    date = Column(String)

app = FastAPI(title="FairGig Analytics Service")
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/analytics/kpis")
async def get_kpis():
    # Direct sqlite3 for cross-db-file simplicity in this demo environment
    conn_e = sqlite3.connect("../earnings/earnings.sqlite")
    cursor_e = conn_e.cursor()
    
    conn_g = sqlite3.connect("../grievances/grievances.sqlite")
    cursor_g = conn_g.cursor()

    # Worker counts
    cursor_e.execute("SELECT COUNT(DISTINCT workerId) FROM earnings")
    total_workers = cursor_e.fetchone()[0] or 0

    # Total Earnings
    cursor_e.execute("SELECT SUM(amount) FROM earnings")
    total_earnings = cursor_e.fetchone()[0] or 0

    # Avg Deductions
    cursor_e.execute("SELECT AVG(deductions) FROM earnings")
    avg_deduction = cursor_e.fetchone()[0] or 0

    # Grievance counts
    cursor_g.execute("SELECT COUNT(*) FROM grievances WHERE status != 'RESOLVED'")
    active_grievances = cursor_g.fetchone()[0] or 0

    cursor_g.execute("SELECT COUNT(*) FROM grievances WHERE status = 'RESOLVED'")
    resolved_grievances = cursor_g.fetchone()[0] or 0

    conn_e.close()
    conn_g.close()
    
    return {
        "total_workers_tracked": total_workers,
        "total_earnings_logged": round(total_earnings, 2),
        "average_commission": round(avg_deduction, 2),
        "active_disputes": active_grievances,
        "resolved_cases": resolved_grievances,
        "markets_active": 4 # Hardcoded markets for this demo
    }

@app.get("/api/analytics/trends/commission")
async def get_commission_trends():
    return [
        {"month": "Jan", "Uber": 20, "Deliveroo": 22, "Careem": 18},
        {"month": "Feb", "Uber": 21, "Deliveroo": 23, "Careem": 18},
        {"month": "Mar", "Uber": 25, "Deliveroo": 24, "Careem": 19},
        {"month": "Apr", "Uber": 24, "Deliveroo": 24, "Careem": 20},
    ]

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "analytics"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8003))
    uvicorn.run("main:app", host="127.0.0.1", port=port, reload=True)
