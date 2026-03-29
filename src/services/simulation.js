export const CITY_SEEDS = {
  delhi: { name: "Delhi", state: "Delhi", lat: 28.6139, lng: 77.209, traffic: 41, aqi: 89, energyGw: 1.3 },
  mumbai: { name: "Mumbai", state: "Maharashtra", lat: 19.076, lng: 72.8777, traffic: 58, aqi: 96, energyGw: 1.82 },
  bengaluru: { name: "Bengaluru", state: "Karnataka", lat: 12.9716, lng: 77.5946, traffic: 52, aqi: 68, energyGw: 1.55 },
  hyderabad: { name: "Hyderabad", state: "Telangana", lat: 17.385, lng: 78.4867, traffic: 47, aqi: 81, energyGw: 1.48 },
  chennai: { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, traffic: 46, aqi: 76, energyGw: 1.51 },
  kolkata: { name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, traffic: 54, aqi: 103, energyGw: 1.42 },
  pune: { name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, traffic: 44, aqi: 84, energyGw: 1.12 },
  ahmedabad: { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, traffic: 43, aqi: 92, energyGw: 1.06 },
  jaipur: { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, traffic: 39, aqi: 98, energyGw: 0.94 },
  indore: { name: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577, traffic: 36, aqi: 79, energyGw: 0.88 },
  bhopal: { name: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126, traffic: 34, aqi: 82, energyGw: 0.83 },
  lucknow: { name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, traffic: 42, aqi: 109, energyGw: 0.97 },
  surat: { name: "Surat", state: "Gujarat", lat: 21.1702, lng: 72.8311, traffic: 37, aqi: 85, energyGw: 0.91 },
  nagpur: { name: "Nagpur", state: "Maharashtra", lat: 21.1458, lng: 79.0882, traffic: 35, aqi: 81, energyGw: 0.86 },
  patna: { name: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376, traffic: 40, aqi: 112, energyGw: 0.89 },
  kanpur: { name: "Kanpur", state: "Uttar Pradesh", lat: 26.4499, lng: 80.3319, traffic: 43, aqi: 118, energyGw: 0.93 },
  chandigarh: { name: "Chandigarh", state: "Chandigarh", lat: 30.7333, lng: 76.7794, traffic: 31, aqi: 74, energyGw: 0.76 },
  kochi: { name: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673, traffic: 33, aqi: 58, energyGw: 0.71 },
};

const safeText = (value, fallback) =>
  typeof value === "string" && value.trim() ? value.trim() : fallback;

const safeNumber = (value, fallback, min, max) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, parsed));
};

const normalizeCitySeed = (id, seed) => ({
  id,
  name: safeText(seed?.name, "Unknown City"),
  state: safeText(seed?.state, "Unknown State"),
  lat: safeNumber(seed?.lat, 28.6139, -90, 90),
  lng: safeNumber(seed?.lng, 77.209, -180, 180),
  traffic: safeNumber(seed?.traffic, 40, 10, 90),
  aqi: safeNumber(seed?.aqi, 90, 10, 300),
  energyGw: Number(safeNumber(seed?.energyGw, 1.0, 0.3, 4).toFixed(2)),
});

const NORMALIZED_CITY_SEEDS = Object.fromEntries(
  Object.entries(CITY_SEEDS).map(([id, seed]) => [id, normalizeCitySeed(id, seed)]),
);

export const CITY_OPTIONS = Object.values(NORMALIZED_CITY_SEEDS).sort((a, b) =>
  a.name.localeCompare(b.name),
);

const incidentTitles = {
  critical: [
    "Hazmat response near logistics corridor",
    "Grid instability at primary substation",
    "Flooded arterial underpass impacting emergency lanes",
  ],
  warning: [
    "AQI hotspot detected by sensor cluster",
    "Transit headway instability on major route",
    "Localized power load nearing threshold",
  ],
  normal: [
    "Traffic bottleneck cleared by field unit",
    "Water pressure returned to nominal",
    "Minor service anomaly resolved",
  ],
};

const pickTitle = (severity, index) =>
  incidentTitles[severity][index % incidentTitles[severity].length];

const toSubscores = ({ traffic, aqi, energyGw, incidents }) => ({
  traffic: Math.max(35, 100 - traffic),
  environment: Math.max(35, 110 - aqi),
  utilities: Math.max(50, 100 - Math.round((energyGw - 1) * 18)),
  incidents: Math.max(40, 100 - incidents * 12),
});

const buildCityIncidents = (citySeed) => {
  const cityCode = citySeed.name.slice(0, 3).toUpperCase();
  const points = [
    { lat: citySeed.lat + 0.01, lng: citySeed.lng - 0.01, severity: "critical", status: "active", owner: "Emergency Ops Unit", eta: "Containment in 18 min", location: `${citySeed.name} Central Grid C4` },
    { lat: citySeed.lat + 0.018, lng: citySeed.lng + 0.014, severity: "warning", status: "active", owner: "Environmental Command", eta: "Mitigation in 24 min", location: `${citySeed.name} East Sector E2` },
    { lat: citySeed.lat - 0.012, lng: citySeed.lng - 0.006, severity: "normal", status: "resolved", owner: "Transport Control", eta: "Closed", location: `${citySeed.name} North Corridor N1` },
  ];

  return points.map((point, index) => {
    const id = `IN-${cityCode}-${index + 1}`;
    return {
      id,
      severity: point.severity,
      title: pickTitle(point.severity, index),
      location: point.location,
      status: point.status,
      owner: point.owner,
      eta: point.eta,
      description: `${citySeed.name} control room flagged ${point.severity} operational conditions. Cross-team monitoring remains active.`,
      lat: Number(point.lat.toFixed(4)),
      lng: Number(point.lng.toFixed(4)),
    };
  });
};

const buildCityAlerts = (citySeed, incidents) => {
  const cityCode = citySeed.name.slice(0, 3).toUpperCase();
  return [
    {
      id: `AL-${cityCode}-1`,
      severity: "critical",
      title: `${citySeed.name} priority incident requires escalation`,
      area: `${citySeed.name} Central Zone`,
      timestamp: "10 sec ago",
      incidentId: incidents[0].id,
    },
    {
      id: `AL-${cityCode}-2`,
      severity: "warning",
      title: `AQI warning pocket detected in ${citySeed.name} East Ring`,
      area: `${citySeed.name} East Ring`,
      timestamp: "35 sec ago",
      incidentId: incidents[1].id,
    },
    {
      id: `AL-${cityCode}-3`,
      severity: "normal",
      title: `Transit baseline restored in ${citySeed.name} North Corridor`,
      area: `${citySeed.name} North Corridor`,
      timestamp: "1 min ago",
      incidentId: incidents[2].id,
    },
  ];
};

const normalizeIncidents = (citySeed, incidents) =>
  incidents.map((incident, index) => ({
    id: safeText(incident?.id, `IN-${citySeed.name.slice(0, 3).toUpperCase()}-${index + 1}`),
    severity: ["critical", "warning", "normal"].includes(incident?.severity)
      ? incident.severity
      : "warning",
    title: safeText(incident?.title, `${citySeed.name} operational event`),
    location: safeText(incident?.location, `${citySeed.name} Core Zone`),
    status: safeText(incident?.status, "active"),
    owner: safeText(incident?.owner, "Operations Command"),
    eta: safeText(incident?.eta, "TBD"),
    description: safeText(
      incident?.description,
      `${citySeed.name} command center monitoring this event.`,
    ),
    lat: Number(safeNumber(incident?.lat, citySeed.lat, -90, 90).toFixed(4)),
    lng: Number(safeNumber(incident?.lng, citySeed.lng, -180, 180).toFixed(4)),
  }));

const normalizeAlerts = (citySeed, alerts, incidents) =>
  alerts.map((alert, index) => ({
    id: safeText(alert?.id, `AL-${citySeed.name.slice(0, 3).toUpperCase()}-${index + 1}`),
    severity: ["critical", "warning", "normal"].includes(alert?.severity)
      ? alert.severity
      : "warning",
    title: safeText(alert?.title, `${citySeed.name} operational alert`),
    area: safeText(alert?.area, `${citySeed.name} Core Zone`),
    timestamp: safeText(alert?.timestamp, "just now"),
    incidentId:
      safeText(alert?.incidentId, "") ||
      incidents[index]?.id ||
      incidents[0]?.id ||
      "IN-UNKNOWN-1",
  }));

const ensureCompleteState = (state) => {
  const city = NORMALIZED_CITY_SEEDS[state.cityId] || NORMALIZED_CITY_SEEDS.delhi;
  const incidents = normalizeIncidents(city, state.incidents || buildCityIncidents(city));
  const alerts = normalizeAlerts(city, state.alerts || buildCityAlerts(city, incidents), incidents);
  const activeCount = Math.max(
    1,
    incidents.filter((item) => item.status.toLowerCase() === "active").length,
  );

  const traffic = safeNumber(state.metrics?.trafficCongestion, city.traffic, 10, 95);
  const aqi = safeNumber(state.metrics?.aqi, city.aqi, 10, 300);
  const energyGw = Number(safeNumber(state.metrics?.energyGw, city.energyGw, 0.3, 4).toFixed(2));

  return {
    cityId: city.id,
    cityName: city.name,
    stateName: city.state,
    cityCenter: { lat: city.lat, lng: city.lng },
    metrics: {
      trafficCongestion: traffic,
      aqi,
      energyGw,
      incidents: safeNumber(state.metrics?.incidents, activeCount, 1, 12),
      subscores: toSubscores({
        traffic,
        aqi,
        energyGw,
        incidents: safeNumber(state.metrics?.incidents, activeCount, 1, 12),
      }),
    },
    incidents,
    alerts,
    lastUpdatedTs: Number(state.lastUpdatedTs) || Date.now(),
  };
};

export const initialSimulationState = (cityId = "delhi") => {
  const city = NORMALIZED_CITY_SEEDS[cityId] || NORMALIZED_CITY_SEEDS.delhi;
  const incidents = buildCityIncidents(city);
  const incidentsCount = incidents.filter((item) => item.status === "active").length;
  const metrics = {
    trafficCongestion: city.traffic,
    aqi: city.aqi,
    energyGw: city.energyGw,
    incidents: incidentsCount,
    subscores: toSubscores({
      traffic: city.traffic,
      aqi: city.aqi,
      energyGw: city.energyGw,
      incidents: incidentsCount,
    }),
  };

  return ensureCompleteState({
    cityId,
    cityName: city.name,
    stateName: city.state,
    cityCenter: { lat: city.lat, lng: city.lng },
    metrics,
    alerts: buildCityAlerts(city, incidents),
    incidents,
    lastUpdatedTs: Date.now(),
  });
};

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
  return `LIVE SYSTEM ACTIVE · Updated ${sec}s ago`;
};

export const buildInsightText = (state) => {
  const severity = state.incidents[0]?.severity || "normal";
  const trend = state.metrics.trafficCongestion > 50 ? "spike" : "steady";
  const zone =
    state.metrics.trafficCongestion > 55
      ? "Zone 4"
      : state.metrics.aqi > 100
        ? "Zone 2"
        : "Zone 3";
  const tone =
    severity === "critical"
      ? "Cross-agency coordination recommended."
      : "Routing optimization in progress.";
  return `${state.cityName || "City"} traffic ${trend} detected in ${zone} due to incident activity. ${tone}`;
};

export const nextSimulationState = (current) => {
  const next = structuredClone(ensureCompleteState(current));
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
    const critical = next.alerts.find((alert) => alert.severity === "critical");
    if (critical) {
      critical.timestamp = "just now";
    }
  }
  next.lastUpdatedTs = Date.now();
  return ensureCompleteState(next);
};
