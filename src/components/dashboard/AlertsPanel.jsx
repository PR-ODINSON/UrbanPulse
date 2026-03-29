import { useNavigate } from "react-router-dom";

const AlertsPanel = ({ alerts, onOpenIncident }) => {
  const navigate = useNavigate();
  const severityOrder = { critical: 0, warning: 1, info: 2 };
  const normalizedSeverity = (severity) => (severity === "normal" ? "info" : severity);
  const sorted = [...alerts].sort(
    (a, b) =>
      (severityOrder[normalizedSeverity(a.severity)] ?? 99) -
      (severityOrder[normalizedSeverity(b.severity)] ?? 99),
  );

  const openEmergency = (incidentId) => {
    onOpenIncident(incidentId);
    navigate("/emergency");
  };

  return (
    <aside className="alerts-container">
      <div className="alerts-header">
        <span>Real-Time Alerts</span>
        <button className="btn btn-ghost" onClick={() => navigate("/emergency")}>
          Open Queue
        </button>
      </div>
      <ul className="alerts-list">
        {sorted.map((alert) => (
          <li
            key={alert.id}
            className={`alert-card ${normalizedSeverity(alert.severity)}`}
            onClick={() => openEmergency(alert.incidentId)}
          >
            <span className={`alert-badge ${normalizedSeverity(alert.severity)}`}>
              {normalizedSeverity(alert.severity)}
            </span>
            <p className="alert-title">{alert.title}</p>
            <div className="alert-meta">
              <span>{alert.area}</span>
              <span>{alert.timestamp}</span>
            </div>
            {normalizedSeverity(alert.severity) === "critical" && (
              <button
                className="btn btn-primary"
                onClick={(event) => {
                  event.stopPropagation();
                  openEmergency(alert.incidentId);
                }}
              >
                🚨 ESCALATE NOW
              </button>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AlertsPanel;
