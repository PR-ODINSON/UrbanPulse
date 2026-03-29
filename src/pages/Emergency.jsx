import { useState } from "react";
import MapView from "../components/dashboard/MapView";
import { useAppContext } from "../context/AppContext";

const Emergency = () => {
  const { data, selectedIncident, setSelectedIncident } = useAppContext();
  const [actionStatus, setActionStatus] = useState("Awaiting operator action.");
  const incident =
    data.incidents.find((item) => item.id === selectedIncident) || data.incidents[0];

  const handleDispatch = () => {
    setActionStatus(`Response dispatched for ${incident.id}. Field teams notified.`);
  };

  const handleRequestUpdate = () => {
    setActionStatus(`Update requested from ${incident.owner}. Awaiting response.`);
  };

  return (
    <section className="view active page-root" data-page="emergency">
      <div className="page-hero">
        <div className="page-hero__left">
          <span className="page-hero__eyebrow" style={{ color: "#EF4444" }}>
            Emergency Alerts & Incident Management
          </span>
          <h1 className="page-hero__title">Critical Response Desk</h1>
        </div>
        <div className="page-hero__stat">
          <strong className="val--critical">{data.incidents.length}</strong> tracked incidents
        </div>
      </div>

      <div className="page-body">
        <div className="page-row page-row--3col" style={{ flex: 1, minHeight: 0 }}>
          <div className="pcard">
            <div className="pcard__header">
              <span className="pcard__title">Active Incidents</span>
              <div style={{ display: "flex", gap: 8 }}>
                <span className="pcard__badge pcard__badge--critical">2 Active</span>
                <span className="pcard__badge pcard__badge--ok">1 Resolved</span>
              </div>
            </div>
            <div className="pcard__body--noPad">
              {data.incidents.map((item) => (
                <div
                  key={item.id}
                  className={`incident-row ${
                    item.severity === "critical"
                      ? "critical"
                      : item.severity === "warning"
                        ? "warning"
                        : "resolved"
                  }`}
                  onClick={() => setSelectedIncident(item.id)}
                >
                  <div className="incident-row__id">{item.id}</div>
                  <div className="incident-row__title">{item.title}</div>
                  <div className="incident-row__meta">
                    <span>{item.location}</span>
                    <span>{item.status.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pcard">
            <div className="pcard__header">
              <span className="pcard__title">Incident Map</span>
            </div>
            <div className="pcard__body--noPad" style={{ minHeight: 360 }}>
              <MapView
                mode="emergency"
                title="Incident Map View"
                incidents={data.incidents}
                selectedIncident={incident?.id}
                onSelectIncident={setSelectedIncident}
              />
            </div>
          </div>

          <div className="pcard" style={{ height: "100%" }}>
            <div
              className="pcard__header"
              style={{
                background: "rgba(239,68,68,0.08)",
                borderBottom: "1px solid rgba(239,68,68,0.15)",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#EF4444",
                  fontFamily: "JetBrains Mono",
                  letterSpacing: "0.06em",
                }}
              >
                {incident.id} - ACTIVE
              </span>
              <span className="pcard__badge pcard__badge--critical">Critical Priority</span>
            </div>
            <div className="pcard__body">
              <h3 style={{ fontSize: 16, fontWeight: 500, color: "rgba(255,255,255,0.9)", margin: "0 0 4px 0" }}>
                {incident.title}
              </h3>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.4)",
                  margin: "0 0 20px 0",
                  fontFamily: "JetBrains Mono",
                }}
              >
                {incident.location}
              </p>

              {[
                { label: "Status", value: incident.status.toUpperCase(), color: "#EF4444" },
                { label: "Assigned Unit", value: incident.owner },
                { label: "ETA", value: incident.eta, color: "#F59E0B" },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.35)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontFamily: "JetBrains Mono",
                    }}
                  >
                    {label}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: color || "rgba(255,255,255,0.8)" }}>
                    {value}
                  </span>
                </div>
              ))}

              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: "16px 0 20px" }}>
                {incident.description}
              </p>
              <div
                style={{
                  marginBottom: 14,
                  padding: "10px 12px",
                  borderRadius: 6,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(56,189,248,0.08)",
                  fontSize: 12,
                  color: "rgba(220,236,255,0.88)",
                }}
              >
                {actionStatus}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={handleDispatch}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    background: "#EF4444",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "JetBrains Mono",
                    letterSpacing: "0.06em",
                    cursor: "pointer",
                  }}
                >
                  Dispatch Response
                </button>
                <button
                  onClick={handleRequestUpdate}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    background: "transparent",
                    color: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 4,
                    fontSize: 12,
                    fontFamily: "JetBrains Mono",
                    cursor: "pointer",
                  }}
                >
                  Request Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Emergency;
