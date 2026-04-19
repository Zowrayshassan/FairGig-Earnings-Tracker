from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy import create_engine, Column, Integer, Float, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, Float, String, DateTime
from sqlalchemy.sql import func
import numpy as np
import os
from dotenv import load_dotenv

load_dotenv()

# SQL Database Setup (Dynamic for Deployment)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///../earnings/earnings.sqlite")
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class EarningEntry(Base):
    __tablename__ = "earnings"
    id = Column(Integer, primary_key=True, index=True)
    workerId = Column(String)
    city = Column(String)
    platform = Column(String)
    amount = Column(Float)
    deductions = Column(Float)
    date = Column(String)

app = FastAPI(title="FairGig Anomaly Detection Service")
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnomalyCheckReq(BaseModel):
    workerId: str
    current_amount: float
    current_deductions: float

@app.post("/api/anomaly/detect")
async def detect_anomaly(data: AnomalyCheckReq):
    db = SessionLocal()
    history = db.query(EarningEntry).filter(EarningEntry.workerId == data.workerId).order_by(EarningEntry.date.desc()).limit(20).all()
    db.close()
    
    if len(history) < 3:
        return {"anomaly": False, "explanation": "Insufficient history."}
    
    history_deductions = [h.deductions for h in history]
    avg_deduction = np.mean(history_deductions)
    std_deduction = np.std(history_deductions)
    
    is_deduction_high = data.current_deductions > (avg_deduction + 2 * std_deduction) and data.current_deductions > 0
    
    if is_deduction_high:
        return {"anomaly": True, "explanation": f"Deduction Flag: Unusual fees of ${data.current_deductions} detected."}
        
    return {"anomaly": False, "explanation": "Healthy."}

@app.get("/api/anomaly/history")
async def get_anomaly_history():
    # Simulated system-wide flags based on the seeded SQL data
    # In a full app, this would query a separate 'anomalies' table
    return [
        {"id": "FL-001", "type": "Systemic Bias", "platform": "Uber", "severity": "Critical", "description": "15% drop in hourly earnings in Lahore Hub compared to city average."},
        {"id": "FL-002", "type": "Fee Escalation", "platform": "Deliveroo", "severity": "High", "description": "Sudden 5% commission hike detected for 40+ workers in Zone A."},
        {"id": "FL-003", "type": "Wait-Time Theft", "platform": "Zomato", "severity": "Medium", "description": "Systemic underreporting of waiting times in Karachi South."}
    ]

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "anomaly"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8002))
    uvicorn.run("main:app", host="127.0.0.1", port=port, reload=True)
