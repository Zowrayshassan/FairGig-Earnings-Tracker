# -----------------------------------------------------------------------------
# FairGig Ultimate-Stabilizer Orchestrator - v4.0 (Windows Stable)
# -----------------------------------------------------------------------------

$ports = @(5001, 5002, 5003, 8001, 8002, 8003)
$py_path = "C:\Users\zowra\anaconda3\python.exe"

Write-Host "--- ULTIMATE STABILIZATION STARTING ---" -ForegroundColor Cyan

# 1. CLEANUP: Hard kill everything that could be blocking
Write-Host "Nuclear cleanup: Terminating all Python and Node processes..." -ForegroundColor Yellow
taskkill /F /IM python.exe /T 2>$null
taskkill /F /IM node.exe /T 2>$null
Start-Sleep -Seconds 2

# 2. DEPENDENCIES: Ensure Node services have required packages
Write-Host "Verifying Node.js dependencies (Auth, Grievances, Renderer)..." -ForegroundColor Yellow
$node_dirs = @("backend\auth", "backend\grievances", "backend\renderer")
foreach ($dir in $node_dirs) {
    Write-Host "   Installing for $dir..." -ForegroundColor DarkGray
    Set-Location $dir
    npm install --no-audit --loglevel error
    Set-Location ..\..
}

# 3. SEEDING: Prepare the database completely
Write-Host "Preparing sanitized Pakistani Database (Ledger + Auth)..." -ForegroundColor Yellow
node backend/seed.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Seeding failed." -ForegroundColor Red
    exit
}
Write-Host "Database Ready!" -ForegroundColor Green

# 4. START SERVICES
Write-Host "Launching Microservices (Explicit Binding)..." -ForegroundColor Cyan

# Node.js
Start-Process -FilePath "npm.cmd" -ArgumentList "run dev" -WorkingDirectory "backend\auth" -WindowStyle Normal
Start-Process -FilePath "npm.cmd" -ArgumentList "run dev" -WorkingDirectory "backend\grievances" -WindowStyle Normal
Start-Process -FilePath "npm.cmd" -ArgumentList "run dev" -WorkingDirectory "backend\renderer" -WindowStyle Normal

# Python
Start-Process -FilePath $py_path -ArgumentList "main.py" -WorkingDirectory "backend\earnings" -WindowStyle Normal
Start-Process -FilePath $py_path -ArgumentList "main.py" -WorkingDirectory "backend\anomaly" -WindowStyle Normal
Start-Process -FilePath $py_path -ArgumentList "main.py" -WorkingDirectory "backend\analytics" -WindowStyle Normal

# 5. MONITORING
Write-Host "Waiting for services to bind to ports..." -ForegroundColor Yellow
$max_retries = 20
for ($i = 1; $i -le $max_retries; $i++) {
    $listening = Get-NetTCPConnection -LocalPort $ports -ErrorAction SilentlyContinue | Select-Object -ExpandProperty LocalPort
    $online_count = ($listening | Select-Object -Unique).Count
    if ($online_count -ge $ports.Count) { break }
    Write-Host "   Checking... ($online_count/6)" -ForegroundColor DarkGray
    Start-Sleep -Seconds 2
}

if ($online_count -ge 6) {
    Write-Host "`n✅ SUCCESS: ALL SERVICES ONLINE" -ForegroundColor Green
    Write-Host "Ahmed Khan is ready for login (password123)"
} else {
    Write-Host "`n⚠️  PARTIAL START: Check terminal windows for error messages." -ForegroundColor Yellow
}

Write-Host "`n-------------------------------------------------------------"
Write-Host "Please perform a HARD REFRESH (Ctrl + F5) in your browser now."
Write-Host "-------------------------------------------------------------"
Write-Host "Press any key to exit this monitor..."
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
