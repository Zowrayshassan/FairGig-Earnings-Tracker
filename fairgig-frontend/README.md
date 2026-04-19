# FairGig — Gig Worker Income & Rights Platform

##  What is this?

FairGig is a simple web platform built for gig workers like riders from apps such as Foodpanda and Careem.

These workers earn daily, but they face real problems:

* No official proof of income
* Earnings spread across multiple platforms
* No way to know if platforms are being unfair
* No proper place to raise complaints

 FairGig solves this by helping workers **track, verify, and understand their earnings**.

---

##  The Idea (In Simple Words)

Instead of complicated systems or integrations, FairGig works like this:

1. Worker enters their earnings manually
2. Worker uploads a screenshot as proof (from their phone)
3. A verifier checks if the screenshot matches the entered data
4. Once approved → it becomes **trusted income**

That’s it. Simple and practical.

---

##  User Roles

###  Worker

* Logs daily earnings
* Uploads screenshot proof
* Views income analytics
* Generates income report (for bank/landlord)
* Posts complaints

---
### Verifier

* Reviews submitted earnings
* Compares data with screenshot
* Approves / Rejects / Flags entries

---

### 🧑‍💼 Advocate (Admin)

* Views overall trends
* Monitors income drops and anomalies
* Analyzes complaints
* Identifies unfair patterns across platforms

---

##  Core Features

###  Earnings Tracker

* Add platform, date, hours, earnings, deductions
* Simple form-based input

---

###  Screenshot Verification

* Upload proof image
* Human verification system
* Status:

  * Verified 
  * Rejected 
  * Unverifiable 

---

###  Analytics Dashboard

* Weekly / Monthly income trends
* Hourly earning rate
* Commission tracking
* City-wide comparison

---

### Income Certificate

* Generate printable income report
* Useful for banks / landlords

---

### Grievance Board

* Workers can post complaints
* Advocates can:

  * tag
  * group
  * resolve issues

---

### Anomaly Detection

* Detect unusual income drops
* Detect high deductions
* Returns simple human-readable alerts

---

##Tech Stack

### Frontend

* React.js

### Backend

* FastAPI (Python) → anomaly detection
* Node.js → grievance system
* REST APIs

### Database

* MongoDB (or any DB)

---

## 🧩 Architecture (Simple Overview)

* Auth Service → login & roles
* Earnings Service → store income data
* Verification Flow → human-based validation
* Grievance Service → complaints system
* Analytics Service → trends & insights
* Anomaly Service → detect unusual patterns

---

##  How It Works (Flow)

1. Worker logs earnings
2. Uploads screenshot
3. Verifier checks and approves/rejects
4. Verified data is used for:

   * analytics
   * reports
5. Advocate monitors overall system

---

##  Important Note

This system does NOT connect to platforms like Foodpanda.

 All data is:

* manually entered
* manually verified

This is intentional to keep the system simple and realistic.

---

##  Goal

To create a **transparent and fair ecosystem** where gig workers:

* can prove their income
* understand their earnings
* and raise their voices

---

## Future Improvements

* OCR-based screenshot reading
* Mobile app version
* Automated anomaly detection with ML
* Platform integrations (if available)

---

##  Built For

SOFTEC 2026 — Web Development Competition

---

##  Final Thought

FairGig is not just a project — it’s a step toward giving gig workers the visibility and fairness they deserve.
