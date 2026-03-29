export const initialSimulationState = () => ({
  metrics: {
    trafficCongestion: 41,
    aqi: 89,
    energyGw: 1.3,
    incidents: 3,
    subscores: {
      traffic: 82,
      environment: 74,
      utilities: 88,
      incidents: 91,
    },
  },
  alerts: [
    {
      id: "AL-901",
      severity: "critical",
      title: "Chemical spill near Central Station",
      area: "Central Zone",
      timestamp: "10 sec ago",
      incidentId: "IN-931",
    },
    {
      id: "AL-902",
      severity: "warning",
      title: "AQI rising above threshold in East Ring",
      area: "East Ring",
      timestamp: "35 sec ago",
      incidentId: "IN-932",
    },
    {
      id: "AL-903",
      severity: "normal",
      title: "Transit line recovered to baseline",
      area: "North Corridor",
      timestamp: "1 min ago",
      incidentId: "IN-933",
    },
  ],
  incidents: [
    {
      id: "IN-931",
      severity: "critical",
      title: "Hazmat response - chemical spill",
      location: "Central Station, Grid C4",
      status: "active",
      owner: "Emergency Ops Unit",
      eta: "Containment in 18 min",
      description:
        "Leak reported from industrial tanker. Route diversions active. Medical standby dispatched.",
      lat: 28.614,
      lng: 77.209,
    },
    {
      id: "IN-932",
      severity: "warning",
      title: "AQI hotspot - particulate spike",
      location: "East Ring Sector E2",
      status: "active",
      owner: "Environmental Command",
      eta: "Air scrubber units in 25 min",
      description:
        "Sensor cluster E2 reports sustained PM2.5 spikes. Advisory issued for schools and clinics.",
      lat: 28.623,
      lng: 77.248,
    },
    {
      id: "IN-933",
      severity: "normal",
      title: "Bus lane blockage cleared",
      location: "North Corridor N1",
      status: "resolved",
      owner: "Transport Control",
      eta: "Closed",
      description:
        "Obstruction removed and route timing normalized. Monitoring for residual delays.",
      lat: 28.642,
      lng: 77.197,
    },
  ],
  lastUpdatedTs: Date.now(),
});

const bumpMetric = (value, min, max, step = 3) => {
  const delta = Math.round((Math.random() - 0.5) * step * 2);
  return Math.min(max, Math.max(min, value + delta));
};

export const calculateCityHealth = (subscores) => {
  const { traffic, environment, utilities, incidents } = subscores;
  return Math.round((traffic + environment + utilities + incidents) / 4);
};

export const getSeverityLabel = (score) => {
  if (score >= 80) {
    return { label: "STABLE", className: "status-online" };
  }
  if (score >= 60) {
    return { label: "AT RISK", className: "warning" };
  }
  return { label: "CRITICAL", className: "critical" };
};

export const formatLiveTimestamp = (ts) => {
  const sec = Math.max(1, Math.floor((Date.now() - ts) / 1000));
  return `LIVE · Updated ${sec}s ago`;
};

export const buildInsightText = (state) => {
  const severity = state.incidents[0]?.severity || "normal";
  const trend = state.metrics.trafficCongestion > 50 ? "rising" : "stable";
  const tone =
    severity === "critical"
      ? "Cross-agency coordination is recommended."
      : "Monitor routing and response lanes.";
  return `Traffic congestion is ${trend} in Zone 3 due to incident activity. ${tone}`;
};

export const nextSimulationState = (current) => {
  const next = structuredClone(current);
  next.metrics.trafficCongestion = bumpMetric(next.metrics.trafficCongestion, 25, 72, 4);
  next.metrics.aqi = bumpMetric(next.metrics.aqi, 48, 160, 6);
  next.metrics.energyGw = Number(
    (bumpMetric(next.metrics.energyGw * 100, 95, 190, 4) / 100).toFixed(2),
  );
  next.metrics.incidents = Math.max(
    1,
    Math.min(
      6,
      next.metrics.incidents +
        (Math.random() > 0.75 ? 1 : 0) -
        (Math.random() > 0.87 ? 1 : 0),
    ),
  );

  next.metrics.subscores.traffic = 100 - next.metrics.trafficCongestion;
  next.metrics.subscores.environment = Math.max(35, 110 - next.metrics.aqi);
  next.metrics.subscores.utilities = Math.max(
    50,
    100 - Math.round((next.metrics.energyGw - 1) * 18),
  );
  next.metrics.subscores.incidents = Math.max(
    40,
    100 - next.metrics.incidents * 12,
  );

  if (Math.random() > 0.7) {
    const critical = next.alerts.find((alert) => alert.id === "AL-901");
    if (critical) {
      critical.timestamp = "just now";
    }
  }
  next.lastUpdatedTs = Date.now();
  return next;
};
