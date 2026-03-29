import { useLocation } from "react-router-dom";
import Badge from "../common/Badge";
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
  const { data } = useAppContext();
  const liveLabel = useLiveData(data.lastUpdatedTs);

  return (
    <header className="top-bar">
      <div>
        <h2>{titleByPath[pathname] || "UrbanPulse"}</h2>
        <p className="muted" id="last-updated">
          {liveLabel}
        </p>
      </div>
      <div className="top-actions">
        <Badge className="status-online">Live Data</Badge>
        <Badge>Role: Admin</Badge>
      </div>
    </header>
  );
};

export default Topbar;
