"""
FairGig Seed Script - Populates the Earnings DB with realistic demo data
Run ONCE after starting the earnings service:  python seed_earnings.py
"""
import requests
import random
from datetime import datetime, timedelta

BASE = "http://localhost:8001"

PLATFORMS = ["Uber", "Careem", "Foodpanda", "Bykea", "Deliveroo"]
CITIES = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad"]
WORKER_IDS = ["W-001", "W-002", "W-003", "W-004"]

def random_date(days_back=90):
    d = datetime.now() - timedelta(days=random.randint(0, days_back))
    return d.strftime("%Y-%m-%d")

def seed():
    print("🌱 Seeding FairGig Earnings Database...")
    count = 0
    for worker in WORKER_IDS:
        shifts = random.randint(15, 30)
        city = random.choice(CITIES)
        for _ in range(shifts):
            amount = round(random.uniform(800, 4500), 2)
            deductions = round(amount * random.uniform(0.12, 0.25), 2)
            payload = {
                "workerId": worker,
                "city": city,
                "platform": random.choice(PLATFORMS),
                "amount": amount,
                "deductions": deductions,
                "date": random_date()
            }
            try:
                r = requests.post(f"{BASE}/api/earnings", json=payload, timeout=3)
                if r.ok:
                    count += 1
            except Exception as e:
                print(f"  ⚠️  Skipped: {e}")
    print(f"✅ Seeded {count} shifts across {len(WORKER_IDS)} workers!")
    print(f"   Workers: {', '.join(WORKER_IDS)}")
    print(f"   Log in as any user and you'll see live data on the dashboard.")

if __name__ == "__main__":
    seed()
