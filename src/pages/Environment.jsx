import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAppContext } from "../context/AppContext";

const pollutionTrend = [
  { time: "Day 1", aqi: 82, pm25: 24 },
  { time: "Day 2", aqi: 88, pm25: 29 },
  { time: "Day 3", aqi: 94, pm25: 31 },
  { time: "Day 4", aqi: 102, pm25: 35 },
  { time: "Day 5", aqi: 96, pm25: 32 },
  { time: "Day 6", aqi: 91, pm25: 30 },
];

const zoneData = [
  { zone: "North", aqi: 72, pm25: 19 },
  { zone: "Central", aqi: 96, pm25: 35 },
  { zone: "South", aqi: 88, pm25: 29 },
  { zone: "East", aqi: 110, pm25: 41 },
];

function aqiColor(value) {
  if (value <= 50) {
    return "#10B981";
  }
  if (value <= 100) {
    return "#F59E0B";
  }
  if (value <= 150) {
    return "#F97316";
  }
  return "#EF4444";
}

function aqiLabel(value) {
  if (value <= 50) {
    return "Good";
  }
  if (value <= 100) {
    return "Moderate";
  }
  if (value <= 150) {
    return "Unhealthy (Sensitive)";
  }
  return "Unhealthy";
}

const Environment = () => {
  const {
    data: {
      metrics: { aqi },
    },
  } = useAppContext();

  return (
    <section className="view active page-root" data-page="environment">
      <div className="page-hero">
        <div className="page-hero__left">
          <span className="page-hero__eyebrow" style={{ color: "#10B981" }}>
            Environmental Monitoring
          </span>
          <h1 className="page-hero__title">Air Quality & Climate</h1>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              marginBottom: 4,
            }}
          >
            City AQI Index
          </div>
          <div
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: 52,
              fontWeight: 300,
              color: aqiColor(aqi),
              lineHeight: 1,
            }}
          >
            {aqi}
          </div>
          <div style={{ fontSize: 12, color: aqiColor(aqi), marginTop: 4 }}>
            {aqiLabel(aqi)}
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="pcard">
          <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            <div className="stat-cell">
              <span className="stat-cell__label">Temperature</span>
              <span className="stat-cell__value" style={{ fontSize: 32, color: "#F97316" }}>
                31°C
              </span>
              <span className="stat-cell__delta">Feels like 34°C</span>
            </div>
            <div className="stat-cell">
              <span className="stat-cell__label">Humidity</span>
              <span className="stat-cell__value" style={{ fontSize: 32 }}>
                61%
              </span>
              <span className="stat-cell__delta">Moderate</span>
            </div>
            <div className="stat-cell">
              <span className="stat-cell__label">Wind Speed</span>
              <span className="stat-cell__value" style={{ fontSize: 32 }}>
                13 km/h
              </span>
              <span className="stat-cell__delta">NW direction</span>
            </div>
            <div className="stat-cell">
              <span className="stat-cell__label">PM2.5</span>
              <span className="stat-cell__value val--warning" style={{ fontSize: 32 }}>
                35
              </span>
              <span className="stat-cell__delta warn">μg/m³ · Central zone</span>
            </div>
          </div>
        </div>

        <div className="page-row page-row--6535" style={{ flex: 1 }}>
          <div className="pcard">
            <div className="pcard__header">
              <span className="pcard__title">Pollution Trend - 48h</span>
            </div>
            <div className="pcard__body">
              <div className="chart-wrap chart-wrap--tall">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pollutionTrend}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="time"
                      tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      width={36}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#1A2235",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 6,
                        fontSize: 12,
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <ReferenceLine
                      y={100}
                      stroke="rgba(239,68,68,0.4)"
                      strokeDasharray="4 4"
                    />
                    <Line type="monotone" dataKey="aqi" stroke="#10B981" strokeWidth={1.5} dot={false} />
                    <Line type="monotone" dataKey="pm25" stroke="#F59E0B" strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="pcard">
            <div className="pcard__header">
              <span className="pcard__title">Zone-Level Breakdown</span>
            </div>
            <div className="pcard__body--noPad">
              <table className="ptable">
                <thead>
                  <tr>
                    <th>Zone</th>
                    <th>AQI</th>
                    <th>PM2.5</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {zoneData.map((zone) => (
                    <tr key={zone.zone}>
                      <td>{zone.zone}</td>
                      <td style={{ fontFamily: "JetBrains Mono", color: aqiColor(zone.aqi) }}>
                        {zone.aqi}
                      </td>
                      <td style={{ fontFamily: "JetBrains Mono", color: "rgba(255,255,255,0.6)" }}>
                        {zone.pm25} μg/m³
                      </td>
                      <td>
                        <span
                          className={`pcard__badge pcard__badge--${
                            zone.aqi > 100 ? "warning" : "ok"
                          }`}
                        >
                          {aqiLabel(zone.aqi)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Environment;
