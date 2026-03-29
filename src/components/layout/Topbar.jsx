import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLiveData } from "../../hooks/useLiveData";
import { useAppContext } from "../../context/AppContext";

const titleByPath = {
  "/dashboard": "City Operations Overview",
  "/traffic": "Traffic & Transport",
  "/environment": "Environmental Monitoring",
  "/utilities": "Utilities Management",
  "/emergency": "Emergency Alerts & Incident Management",
  "/reports": "Citizen Feedback & Reports",
  "/analytics": "Historical Data & Analytics",
  "/admin": "User Management & Access Control",
  "/settings": "Settings & Integrations",
};

const Topbar = () => {
  const { pathname } = useLocation();
  const { data, cityHealthScore, theme, toggleTheme } = useAppContext();
  const liveLabel = useLiveData(data.lastUpdatedTs);
  const [clockLabel, setClockLabel] = useState(() =>
    new Date().toLocaleTimeString([], { hour12: false }),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClockLabel(new Date().toLocaleTimeString([], { hour12: false }));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const healthClass =
    cityHealthScore >= 80 ? "nominal" : cityHealthScore >= 60 ? "warning" : "critical";

  return (
    <header className="top-bar">
      <div className="topbar-brand">
        URBANPULSE // {titleByPath[pathname] || "CITY GRID"} · {data.cityName || "Delhi"}
      </div>

      <div className="health-score-display">
        <span className="health-label">City Health</span>
        <span className={`health-value ${healthClass}`} data-score={cityHealthScore}>
          {cityHealthScore}
        </span>
        <span className="health-trend">↑ +2 pts</span>
      </div>

      <div className="live-indicator">
        <span className="live-dot" />
        <span>{liveLabel}</span>
        <span>{clockLabel}</span>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
};

export default Topbar;
