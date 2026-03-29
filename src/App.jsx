import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Loader from "./components/common/Loader";
import Dashboard from "./pages/Dashboard";
import Traffic from "./pages/Traffic";
import Environment from "./pages/Environment";
import Utilities from "./pages/Utilities";
import Emergency from "./pages/Emergency";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { loading, error, retry } = useAppContext();
  const { pathname } = useLocation();
  const isDashboard = pathname === "/dashboard";

  return (
    <>
      {(loading || error) && <Loader error={error} onRetry={retry} />}
      <div className={`app-layout ${isDashboard ? "dashboard-shell" : ""}`.trim()}>
        {!isDashboard && <Sidebar />}
        <main className="main-content">
          {!isDashboard && <Topbar />}
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/traffic" element={<Traffic />} />
            <Route path="/environment" element={<Environment />} />
            <Route path="/utilities" element={<Utilities />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
