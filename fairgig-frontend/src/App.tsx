import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';

import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import WorkerDashboard from './pages/worker/WorkerDashboard';
import EarningsLogger from './pages/worker/EarningsLogger';
import GrievanceForm from './pages/worker/GrievanceForm';
import VerifierDashboard from './pages/verifier/VerifierDashboard';
import AdvocateDashboard from './pages/advocate/AdvocateDashboard';

// Generated Auto-ports
import AdvocateDashboardHome from './pages/advocate/AdvocateDashboardHome';
import CommissionTrendsChart from './pages/advocate/CommissionTrendsChart';
import EarningsHistoryList from './pages/worker/EarningsHistoryList';
import EarningsLoggerForm from './pages/worker/EarningsLoggerForm';
import EmptyStateEarnings from './pages/worker/EmptyStateEarnings';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import GenerateCertificateScreen from './pages/worker/GenerateCertificateScreen';
import GrievancesBoard from './pages/advocate/GrievancesBoard';
import GrievanceDetail from './pages/advocate/GrievanceDetail';
import IncomeAnalyticsDetail from './pages/worker/IncomeAnalyticsDetail';
import IncomeDistributionMap from './pages/advocate/IncomeDistributionMap';
import LoginScreen from './pages/auth/LoginScreen';
import MyGrievancesList from './pages/worker/MyGrievancesList';
import OnboardingTourSlide1 from './pages/common/OnboardingTourSlide1';
import PendingReviewsList from './pages/verifier/PendingReviewsList';
import PostGrievanceForm from './pages/worker/PostGrievanceForm';
import ReviewScreenshotDetail from './pages/verifier/ReviewScreenshotDetail';
import ScreenshotDetailWorkerView from './pages/worker/ScreenshotDetailWorkerView';
import SettingsAccount from './pages/common/SettingsAccount';
import SignUpScreen from './pages/auth/SignUpScreen';
import VerifierDashboardHome from './pages/verifier/VerifierDashboardHome';
import VerifierHistory from './pages/verifier/VerifierHistory';
import VulnerabilityFlagsList from './pages/advocate/VulnerabilityFlagsList';
import WorkerDashboardHome from './pages/worker/WorkerDashboardHome';
import WorkerProfile from './pages/worker/WorkerProfile';

import LandingPage from './pages/common/LandingPage';

function Directory() {
  const categories = [
    {
      title: "Core Hand-Built Flow",
      description: "Optimized and perfected React components",
      screens: [
        { name: "Landing Page", path: "/", status: "Perfected" },
        { name: "Login Portal", path: "/login", status: "Perfected" },
        { name: "User Sign Up", path: "/signup", status: "Perfected" },
        { name: "Worker Home", path: "/worker", status: "Perfected" },
        { name: "Earnings Logger", path: "/log-earnings", status: "Perfected" },
        { name: "Grievance Form", path: "/post-grievance", status: "Perfected" },
        { name: "Verifier Hub", path: "/verifier", status: "Perfected" },
        { name: "Advocate Portal", path: "/advocate", status: "Perfected" },
      ]
    },
    {
      title: "Worker Ecosystem",
      description: "Auto-converted screens for worker actions",
      screens: [
        { name: "Worker Profile", path: "/worker-profile", status: "Converted" },
        { name: "Earnings History", path: "/earnings-history-list", status: "Converted" },
        { name: "Screenshot Detail", path: "/screenshot-detail", status: "Converted" },
        { name: "My Grievances", path: "/my-grievances", status: "Converted" },
        { name: "Onboarding Flow", path: "/onboarding", status: "Converted" },
        { name: "Certificate Gen", path: "/generate-certificate", status: "Converted" },
      ]
    },
    {
      title: "Verifier & Admin",
      description: "Verification and management tools",
      screens: [
        { name: "Verifier Dashboard", path: "/verifier-dashboard-home", status: "Converted" },
        { name: "Pending Reviews", path: "/pending-reviews", status: "Converted" },
        { name: "Review Detail", path: "/review-screenshot", status: "Converted" },
        { name: "Verifier History", path: "/verifier-history", status: "Converted" },
        { name: "Settings & Account", path: "/settings", status: "Converted" },
      ]
    },
    {
      title: "Advocacy & Oversight",
      description: "Policy and trend monitoring",
      screens: [
        { name: "Advocate Dashboard", path: "/advocate-dashboard-home", status: "Converted" },
        { name: "Grievances Board", path: "/grievances-board", status: "Converted" },
        { name: "Grievance Detail", path: "/grievance-detail", status: "Converted" },
        { name: "Income Map", path: "/income-map", status: "Converted" },
        { name: "Commission Trends", path: "/commission-trends-chart", status: "Converted" },
        { name: "Vulnerability Flags", path: "/vulnerability-flags", status: "Converted" },
        { name: "Income Analytics", path: "/income-analytics", status: "Converted" },
      ]
    }
  ];

  return (
    <div className="bg-background min-h-screen font-body text-on-surface p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-extrabold text-primary font-headline tracking-tight">FairGig Screen Directory</h1>
          <p className="text-on-surface-variant mt-2 text-lg">Central hub for all specialized screens in the Ethical Ledger ecosystem.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-sm border border-outline-variant/10">
              <h2 className="text-2xl font-bold font-headline text-primary mb-1">{cat.title}</h2>
              <p className="text-sm text-on-surface-variant mb-6">{cat.description}</p>
              <div className="space-y-3">
                {cat.screens.map((s, sIdx) => (
                  <Link 
                    key={sIdx} 
                    to={s.path}
                    className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl hover:bg-primary/5 transition-all group border border-transparent hover:border-primary/20"
                  >
                    <span className="font-semibold text-on-surface group-hover:text-primary transition-colors">{s.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest ${
                      s.status === 'Perfected' ? 'bg-primary text-white' : 'bg-secondary-container text-on-secondary-container opacity-60'
                    }`}>
                      {s.status}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <footer className="mt-16 text-center text-on-surface-variant/40 text-xs font-bold uppercase tracking-[0.3em]">
          FairGig Hackathon Platform • Phase 1 UI Finalized
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Core Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/dev" element={<Directory />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Worker Protected Routes */}
        <Route path="/worker" element={<ProtectedRoute allowedRoles={['Worker']}><WorkerDashboard /></ProtectedRoute>} />
        <Route path="/log-earnings" element={<ProtectedRoute allowedRoles={['Worker']}><EarningsLogger /></ProtectedRoute>} />
        <Route path="/post-grievance" element={<ProtectedRoute allowedRoles={['Worker']}><GrievanceForm /></ProtectedRoute>} />
        
        <Route path="/earnings-history-list" element={<ProtectedRoute allowedRoles={['Worker']}><EarningsHistoryList /></ProtectedRoute>} />
        <Route path="/generate-certificate" element={<ProtectedRoute allowedRoles={['Worker']}><GenerateCertificateScreen /></ProtectedRoute>} />
        <Route path="/my-grievances" element={<ProtectedRoute allowedRoles={['Worker']}><MyGrievancesList /></ProtectedRoute>} />
        <Route path="/worker-dashboard-home" element={<ProtectedRoute allowedRoles={['Worker']}><WorkerDashboardHome /></ProtectedRoute>} />
        <Route path="/worker-profile" element={<ProtectedRoute allowedRoles={['Worker']}><WorkerProfile /></ProtectedRoute>} />

        {/* Verifier Protected Routes */}
        <Route path="/verifier" element={<ProtectedRoute allowedRoles={['Verifier']}><VerifierDashboard /></ProtectedRoute>} />
        <Route path="/verifier-dashboard-home" element={<ProtectedRoute allowedRoles={['Verifier']}><VerifierDashboardHome /></ProtectedRoute>} />
        <Route path="/pending-reviews" element={<ProtectedRoute allowedRoles={['Verifier']}><PendingReviewsList /></ProtectedRoute>} />
        <Route path="/verifier-history" element={<ProtectedRoute allowedRoles={['Verifier']}><VerifierHistory /></ProtectedRoute>} />
        
        {/* Advocate Protected Routes */}
        <Route path="/advocate" element={<ProtectedRoute allowedRoles={['Advocate']}><AdvocateDashboard /></ProtectedRoute>} />
        <Route path="/advocate-dashboard-home" element={<ProtectedRoute allowedRoles={['Advocate']}><AdvocateDashboardHome /></ProtectedRoute>} />
        <Route path="/grievances-board" element={<ProtectedRoute allowedRoles={['Advocate']}><GrievancesBoard /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="/onboarding" element={<OnboardingTourSlide1 />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
