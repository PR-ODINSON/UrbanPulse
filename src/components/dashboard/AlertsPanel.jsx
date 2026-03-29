import { useNavigate } from "react-router-dom";
import Card from "../common/Card";
import { sortAlertsBySeverity } from "../../services/alertService";

const AlertsPanel = ({ alerts, onOpenIncident }) => {
  const navigate = useNavigate();
  const sorted = sortAlertsBySeverity(alerts);

  const openEmergency = (incidentId) => {
    onOpenIncident(incidentId);
    navigate("/emergency");
  };

  return (
    <Card className="alerts-panel">
      <div className="panel-head">
        <h3>Real-Time Alerts</h3>
        <button className="btn btn-ghost" onClick={() => navigate("/emergency")}>
          View in Emergency
        </button>
      </div>
      <ul className="alert-list">
        {sorted.map((alert) => (
          <li key={alert.id} className={`alert-item ${alert.severity}`}>
            <strong>{alert.title}</strong>
            <div className="alert-meta">
              <span>{alert.area}</span>
              <span>{alert.timestamp}</span>
            </div>
            {alert.severity === "critical" && (
              <button
                className="btn btn-primary"
                onClick={() => openEmergency(alert.incidentId)}
              >
                ESCALATE / OPEN INCIDENT
              </button>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default AlertsPanel;
