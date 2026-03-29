import { useMemo, useState } from "react";
import MapView from "../components/dashboard/MapView";
import KPICard from "../components/dashboard/KPICard";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import Topbar from "../components/layout/Topbar";
import { useAppContext } from "../context/AppContext";

const detailTexts = {
  traffic:
    "Current congestion is elevated in central corridors. Recommended action: prioritize dynamic signal timing and reroute heavy freight.",
  aqi: "AQI is in moderate range citywide, with warning pockets in East Ring. Suggested action: monitor school zones and issue targeted advisories.",
  energy:
    "Energy demand is below critical threshold but climbing. Maintain reserve margin and monitor substation E2 for anomaly progression.",
  incidents:
    "Three incidents active across transport and environment. One critical incident requires cross-department coordination.",
  health:
    "Composite health balances mobility, environment, utilities, and response posture. Monitor trend changes for proactive interventions.",
};

const Dashboard = () => {
  const { data, setSelectedIncident } = useAppContext();
  const [drawerType, setDrawerType] = useState(null);

  const kpis = useMemo(
    () => [
      {
        key: "traffic",
        type: "traffic",
        title: "Traffic Congestion",
        subtitle: "Citywide avg. delay",
        value: data.metrics.trafficCongestion,
      },
      {
        key: "aqi",
        type: "aqi",
        title: "AQI Level",
        subtitle: "Moderate air quality",
        value: data.metrics.aqi,
      },
      {
        key: "energy",
        type: "energy",
        title: "Energy Usage",
        subtitle: "Current demand",
        value: data.metrics.energyGw,
      },
      {
        key: "incidents",
        type: "incidents",
        title: "Active Incidents",
        subtitle: "Operational queue",
        value: data.metrics.incidents,
      },
      {
        key: "health",
        type: "health",
        title: "Health Index",
        subtitle: "Composite resilience score",
        value: Math.round(
          (data.metrics.subscores.traffic +
            data.metrics.subscores.environment +
            data.metrics.subscores.utilities +
            data.metrics.subscores.incidents) /
            4,
        ),
      },
    ],
    [data.metrics],
  );

  return (
    <>
      <section className="view active dashboard-root">
        <div className="topbar-container">
          <Topbar />
        </div>
        <MapView
          mode="dashboard"
          title="City Operations Map"
          incidents={data.incidents}
          selectedIncident={null}
          onSelectIncident={setSelectedIncident}
        />

        <AlertsPanel alerts={data.alerts} onOpenIncident={setSelectedIncident} />

        <section className="kpi-container">
          {kpis.map((kpi) => (
            <KPICard
              key={kpi.key}
              type={kpi.type}
              title={kpi.title}
              subtitle={kpi.subtitle}
              value={kpi.value}
              onClick={() => setDrawerType(kpi.type)}
            />
          ))}
        </section>
      </section>

      <aside className={`detail-drawer ${drawerType ? "" : "hidden"}`.trim()}>
        <div className="drawer-head">
          <h3>{drawerType ? drawerType.toUpperCase() : "Detail"}</h3>
          <button className="btn btn-ghost" onClick={() => setDrawerType(null)}>
            Close
          </button>
        </div>
        <p className="muted">{drawerType ? detailTexts[drawerType] : ""}</p>
      </aside>
    </>
  );
};

export default Dashboard;
