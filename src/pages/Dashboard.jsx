import { useMemo, useState } from "react";
import CityHealth from "../components/dashboard/CityHealth";
import MapView from "../components/dashboard/MapView";
import KPICard from "../components/dashboard/KPICard";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import AIInsightPanel from "../components/dashboard/AIInsightPanel";
import { useAppContext } from "../context/AppContext";

const detailTexts = {
  traffic:
    "Current congestion is elevated in central corridors. Recommended action: prioritize dynamic signal timing and reroute heavy freight.",
  aqi: "AQI is in moderate range citywide, with warning pockets in East Ring. Suggested action: monitor school zones and issue targeted advisories.",
  energy:
    "Energy demand is below critical threshold but climbing. Maintain reserve margin and monitor substation E2 for anomaly progression.",
  incidents:
    "Three incidents active across transport and environment. One critical incident requires cross-department coordination.",
};

const Dashboard = () => {
  const { data, setSelectedIncident, insightText } = useAppContext();
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
        subtitle: "1 critical, 2 warning",
        value: data.metrics.incidents,
      },
    ],
    [data.metrics],
  );

  return (
    <>
      <section className="view active">
        <AIInsightPanel insightText={insightText} />
        <div className="dashboard-grid">
          <CityHealth />
          <MapView
            mode="dashboard"
            title="City Operations Map"
            incidents={data.incidents}
            selectedIncident={null}
            onSelectIncident={setSelectedIncident}
          />

          <AlertsPanel alerts={data.alerts} onOpenIncident={setSelectedIncident} />

          <section className="kpi-grid">
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
        </div>
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
