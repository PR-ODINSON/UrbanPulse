import { useEffect, useMemo, useState } from "react";
import MapView from "../components/dashboard/MapView";
import { useAppContext } from "../context/AppContext";

const Dashboard = () => {
  const {
    data,
    setSelectedIncident,
    cityHealthScore,
    cityOptions,
    selectedCityId,
    switchCity,
  } = useAppContext();
  const [cityQuery, setCityQuery] = useState("");

  useEffect(() => {
    const active = cityOptions.find((city) => city.id === selectedCityId);
    setCityQuery(active ? active.name : "");
  }, [cityOptions, selectedCityId]);

  const matchingCities = useMemo(() => {
    const query = cityQuery.trim().toLowerCase();
    if (!query) {
      return cityOptions;
    }
    return cityOptions.filter(
      (city) =>
        city.name.toLowerCase().includes(query) ||
        city.state.toLowerCase().includes(query),
    );
  }, [cityOptions, cityQuery]);

  const applyCitySearch = () => {
    if (!cityQuery.trim()) {
      return;
    }
    const exactMatch = cityOptions.find(
      (city) =>
        city.name.toLowerCase() === cityQuery.trim().toLowerCase() ||
        `${city.name}, ${city.state}`.toLowerCase() === cityQuery.trim().toLowerCase(),
    );
    const nextCity = exactMatch || matchingCities[0];
    if (nextCity) {
      switchCity(nextCity.id);
      setCityQuery(nextCity.name);
    }
  };

  const kpis = useMemo(
    () => [
      {
        key: "traffic",
        type: "traffic",
        title: "Traffic Congestion",
        subtitle: "Citywide avg. delay",
        value: data.metrics.trafficCongestion,
        delta: "-1.8% avg delay",
        tone: "down",
      },
      {
        key: "aqi",
        type: "aqi",
        title: "AQI Level",
        subtitle: "Moderate air quality",
        value: data.metrics.aqi,
        delta: "+2.2% moderate",
        tone: "warn",
      },
      {
        key: "energy",
        type: "energy",
        title: "Energy Usage",
        subtitle: "Current demand",
        value: data.metrics.energyGw,
        delta: "-0.4% current demand",
        tone: "up",
      },
      {
        key: "incidents",
        type: "incidents",
        title: "Active Incidents",
        subtitle: "Operational queue",
        value: data.metrics.incidents,
        delta: "+1 operational queue",
        tone: "warn",
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
        delta: "+2 composite score",
        tone: "up",
      },
    ],
    [data.metrics],
  );

  return (
    <section className="view active page-root" data-page="dashboard">
      <div className="page-hero">
        <div className="page-hero__left">
          <span className="page-hero__eyebrow" style={{ color: "#38BDF8" }}>
            City Operations Overview
          </span>
          <h1 className="page-hero__title">Command Center · {data.cityName}</h1>
        </div>
        <div className="stat-cell" style={{ background: "transparent", padding: 0 }}>
          <span className="stat-cell__label">City Health</span>
          <span className="stat-cell__value val--warning" style={{ fontSize: 42 }}>
            {cityHealthScore}
          </span>
          <span className="stat-cell__delta up">↑ +2 pts</span>
        </div>
      </div>

      <div className="page-body">
        <div className="pcard">
          <div className="stat-row" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
            {kpis.map((kpi) => (
              <div key={kpi.key} className="stat-cell">
                <span className="stat-cell__label">{kpi.title}</span>
                <span
                  className={`stat-cell__value ${
                    kpi.type === "incidents"
                      ? "val--critical"
                      : kpi.type === "energy"
                        ? "val--ok"
                        : "val--warning"
                  }`}
                >
                  {kpi.type === "energy"
                    ? `${Number(kpi.value).toFixed(2)} GW`
                    : `${Math.round(kpi.value)}${kpi.type === "traffic" ? "%" : ""}`}
                </span>
                <span className={`stat-cell__delta ${kpi.tone}`}>{kpi.delta}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="page-row page-row--6535" style={{ flex: 1, minHeight: 0 }}>
          <div className="pcard">
            <div className="pcard__header">
              <span className="pcard__title">Live City Map</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span className="pcard__badge pcard__badge--ok">Live</span>
                <input
                  list="dashboard-city-options"
                  value={cityQuery}
                  onChange={(event) => setCityQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      applyCitySearch();
                    }
                  }}
                  placeholder="Search city..."
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.16)",
                    color: "rgba(255,255,255,0.85)",
                    borderRadius: 4,
                    padding: "5px 8px",
                    fontFamily: "JetBrains Mono",
                    fontSize: 11,
                    minWidth: 170,
                  }}
                />
                <datalist id="dashboard-city-options">
                  {cityOptions.map((city) => (
                    <option key={city.id} value={`${city.name}, ${city.state}`} />
                  ))}
                </datalist>
                <button className="btn btn-ghost" onClick={applyCitySearch}>
                  Search
                </button>
              </div>
            </div>
            <div className="pcard__body--noPad" style={{ flex: 1, minHeight: 300 }}>
              <MapView
                mode="dashboard"
                title="City Operations Map"
                incidents={data.incidents}
                selectedIncident={null}
                onSelectIncident={setSelectedIncident}
                cityCenter={data.cityCenter}
                cityOptions={cityOptions}
                selectedCityId={selectedCityId}
                onSelectCity={switchCity}
              />
            </div>
          </div>

          <div className="pcard">
            <div className="pcard__header">
              <span className="pcard__title">Real-Time Alerts</span>
              <span className="pcard__badge pcard__badge--critical">2 Critical</span>
            </div>
            <div className="pcard__body--noPad" style={{ flex: 1, overflowY: "auto" }}>
              {data.alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`incident-row ${
                    alert.severity === "critical"
                      ? "critical"
                      : alert.severity === "warning"
                        ? "warning"
                        : "resolved"
                  }`}
                  onClick={() => setSelectedIncident(alert.incidentId)}
                >
                  <div className="incident-row__id">{alert.id}</div>
                  <div className="incident-row__title">{alert.title}</div>
                  <div className="incident-row__meta">
                    <span>{alert.area}</span>
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
