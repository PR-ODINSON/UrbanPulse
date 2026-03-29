import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import MapView from "../components/dashboard/MapView";
import { useAppContext } from "../context/AppContext";

const Emergency = () => {
  const { data, selectedIncident, setSelectedIncident } = useAppContext();
  const incident =
    data.incidents.find((item) => item.id === selectedIncident) || data.incidents[0];

  return (
    <section className="view active">
      <div className="module-grid emergency-layout">
        <Card>
          <div className="panel-head">
            <h3>Active Incidents</h3>
            <Badge className="critical">Critical Priority</Badge>
          </div>
          <ul className="incident-list">
            {data.incidents.map((item) => (
              <li
                key={item.id}
                className={`incident-item ${item.severity}`}
                onClick={() => setSelectedIncident(item.id)}
              >
                <strong>
                  {item.id} - {item.title}
                </strong>
                <div className="incident-meta">
                  <span>{item.location}</span>
                  <span>{item.status.toUpperCase()}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <MapView
          mode="emergency"
          title="Incident Map View"
          incidents={data.incidents}
          selectedIncident={incident?.id}
          onSelectIncident={setSelectedIncident}
        />

        <Card>
          <h3>
            {incident.id} - {incident.title}
          </h3>
          <p className="muted" style={{ marginTop: 6 }}>
            {incident.location}
          </p>
          <div className="transport-list" style={{ marginTop: 12 }}>
            <div>
              <span>Status</span>
              <strong>{incident.status.toUpperCase()}</strong>
            </div>
            <div>
              <span>Assigned Unit</span>
              <strong>{incident.owner}</strong>
            </div>
            <div>
              <span>ETA</span>
              <strong>{incident.eta}</strong>
            </div>
          </div>
          <p style={{ marginTop: 10 }}>{incident.description}</p>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button className="btn btn-primary">Dispatch Response</button>
            <button className="btn">Request Field Update</button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Emergency;
