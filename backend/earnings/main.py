from fastapi import FastAPI, HTTPException, UploadFile, File, Query
from fastapi.staticfiles import StaticFiles
import shutil
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy import Column, Integer, Float, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, Float, String, DateTime
from sqlalchemy.sql import func
import os
import csv
import io
from dotenv import load_dotenv

load_dotenv()

# SQL Database Setup (Dynamic for Deployment)
DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "earnings.sqlite"))
DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{DB_PATH}")
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

print(f"--- EARNINGS SERVICE STARTING ---")
print(f"DB Path: {DB_PATH}")
print(f"DB URL: {DATABASE_URL}")
if not os.path.exists(DB_PATH):
    print(f"WARNING: Database file NOT FOUND at {DB_PATH}")
else:
    print(f"Database file located successfully.")

class EarningEntry(Base):
    __tablename__ = "earnings"
    id = Column(Integer, primary_key=True, index=True)
    workerId = Column(String)
    city = Column(String)
    platform = Column(String)
    amount = Column(Float)
    deductions = Column(Float)
    hoursWorked = Column(Float, default=0)
    date = Column(String)
    status = Column(String, default="Pending") # Pending, Verified, Rejected
    screenshotUrl = Column(String, nullable=True)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="FairGig Earnings Service")

# CORS - Corrected configuration for Windows stability
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory if not exists
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

class EarningLog(BaseModel):
    workerId: str
    city: str
    platform: str
    amount: float
    deductions: float
    hoursWorked: float = 0.0
    date: str
    status: Optional[str] = "Pending"
    screenshotUrl: Optional[str] = None

@app.post("/api/earnings")
async def create_earning(log: EarningLog):
    db = SessionLocal()
    try:
        new_entry = EarningEntry(**log.dict())
        db.add(new_entry)
        db.commit()
        db.refresh(new_entry)
        return {"id": new_entry.id, "workerId": new_entry.workerId, "city": new_entry.city,
                "platform": new_entry.platform, "amount": new_entry.amount,
                "deductions": new_entry.deductions, "hoursWorked": new_entry.hoursWorked, "date": new_entry.date}
    except Exception as e:
        db.rollback()
        print(f"ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

@app.post("/api/earnings/upload")
async def upload_screenshot(file: UploadFile = File(...)):
    """Upload Shift Evidence — SOFTEC Requirement"""
    import uuid
    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"url": f"http://127.0.0.1:8001/uploads/{filename}"}

@app.patch("/api/earnings/{earning_id}/status")
async def update_earning_status(earning_id: int, status: str = Query(...)):
    """Update status via Query param — SOFTEC compliance"""
    db = SessionLocal()
    try:
        entry = db.query(EarningEntry).filter(EarningEntry.id == earning_id).first()
        if not entry:
            raise HTTPException(status_code=404, detail="Earning not found")
        entry.status = status
        db.commit()
        return {"id": earning_id, "status": status}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

@app.get("/api/earnings")
async def get_earnings(
    workerId: Optional[str] = Query(None), 
    status: Optional[str] = Query(None)
):
    try:
        db = SessionLocal()
        query = db.query(EarningEntry)
        if workerId:
            query = query.filter(EarningEntry.workerId == workerId)
        if status:
            # Case-insensitive match for robustness
            query = query.filter(func.lower(EarningEntry.status) == status.lower())
        results = query.order_by(EarningEntry.date.desc()).all()
        db.close()
        return [{"id": e.id, "workerId": e.workerId, "city": e.city,
                 "platform": e.platform, "amount": e.amount,
                 "deductions": e.deductions, "hoursWorked": e.hoursWorked, "date": e.date,
                 "status": e.status, "screenshotUrl": e.screenshotUrl} for e in results]
    except Exception as e:
        print(f"CRITICAL ERROR in get_earnings: {str(e)}")
        raise HTTPException(status_code=500, detail=f"BACKEND ERROR: {str(e)}")

@app.post("/api/earnings/import")
async def import_csv(file: UploadFile = File(...), workerId: str = Query("W-001")):
    """Bulk CSV import — SOFTEC Requirement"""
    content = await file.read()
    text = content.decode("utf-8")
    reader = csv.DictReader(io.StringIO(text))
    db = SessionLocal()
    imported = 0
    for row in reader:
        try:
            entry = EarningEntry(
                workerId=workerId,
                city=row.get("city", "Karachi"),
                platform=row.get("platform", "Unknown"),
                amount=float(row.get("amount", 0)),
                deductions=float(row.get("deductions", 0)),
                date=row.get("date", "2026-01-01")
            )
            db.add(entry)
            imported += 1
        except Exception:
            continue
    db.commit()
    db.close()
    return {"imported": imported, "workerId": workerId}

@app.get("/api/earnings/stats/city-median")
async def get_city_median(city: str):
    db = SessionLocal()
    entries = db.query(EarningEntry).filter(EarningEntry.city.ilike(city)).all()
    db.close()
    
    if not entries:
        return {"city": city, "median": 0, "count": 0}
    
    amounts = sorted([e.amount for e in entries])
    n = len(amounts)
    median = (amounts[n//2 - 1] + amounts[n//2]) / 2 if n % 2 == 0 else amounts[n//2]
    return {"city": city, "median": median, "count": n}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "earnings"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8001))
    uvicorn.run("main:app", host="127.0.0.1", port=port, reload=True)
