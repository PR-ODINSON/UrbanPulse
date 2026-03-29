import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const metricData = {
  traffic: [
    { time: "Mon", value: 52, avg: 48 },
    { time: "Tue", value: 57, avg: 49 },
    { time: "Wed", value: 61, avg: 50 },
    { time: "Thu", value: 55, avg: 50 },
    { time: "Fri", value: 64, avg: 51 },
  ],
  environment: [
    { time: "Mon", value: 88, avg: 84 },
    { time: "Tue", value: 92, avg: 84 },
    { time: "Wed", value: 96, avg: 85 },
    { time: "Thu", value: 90, avg: 85 },
    { time: "Fri", value: 94, avg: 86 },
  ],
  utilities: [
    { time: "Mon", value: 1.2, avg: 1.1 },
    { time: "Tue", value: 1.26, avg: 1.12 },
    { time: "Wed", value: 1.31, avg: 1.13 },
    { time: "Thu", value: 1.28, avg: 1.13 },
    { time: "Fri", value: 1.35, avg: 1.14 },
  ],
  safety: [
    { time: "Mon", value: 2, avg: 2.2 },
    { time: "Tue", value: 3, avg: 2.2 },
    { time: "Wed", value: 4, avg: 2.2 },
    { time: "Thu", value: 3, avg: 2.2 },
    { time: "Fri", value: 2, avg: 2.1 },
  ],
};

const zoneComparisonData = [
  { zone: "North", value: 72 },
  { zone: "Central", value: 88 },
  { zone: "South", value: 68 },
  { zone: "East", value: 79 },
];

const getMetricData = (metric) => metricData[metric] || metricData.traffic;

const Analytics = () => {
  const [metric, setMetric] = useState("traffic");
  const [range, setRange] = useState("7d");

  return (
    <section className="view active page-root" data-page="analytics">
      <div className="page-hero">
        <div className="page-hero__left">
          <span className="page-hero__eyebrow" style={{ color: "#38BDF8" }}>
            Historical Data & Analytics
          </span>
          <h1 className="page-hero__title">Trend Intelligence</h1>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {["24h", "7d", "30d", "90d"].map((item) => (
            <button
              key={item}
              onClick={() => setRange(item)}
              style={{
                padding: "6px 14px",
                background: range === item ? "rgba(56,189,248,0.15)" : "transparent",
                border: `1px solid ${
                  range === item ? "rgba(56,189,248,0.4)" : "rgba(255,255,255,0.1)"
                }`,
                borderRadius: 4,
                color: range === item ? "#38BDF8" : "rgba(255,255,255,0.4)",
                fontSize: 12,
                fontFamily: "JetBrains Mono",
                cursor: "pointer",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="page-body">
        <div
          style={{
            display: "flex",
            gap: 2,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            paddingBottom: 0,
          }}
        >
          {["traffic", "environment", "utilities", "safety"].map((item) => (
            <button
              key={item}
              onClick={() => setMetric(item)}
              style={{
                padding: "8px 16px",
                background: "transparent",
                border: "none",
                borderBottom: `2px solid ${metric === item ? "#38BDF8" : "transparent"}`,
                color: metric === item ? "#38BDF8" : "rgba(255,255,255,0.35)",
                fontSize: 11,
                fontFamily: "JetBrains Mono",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                marginBottom: -1,
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="pcard" style={{ flex: 1 }}>
          <div className="pcard__header">
            <span className="pcard__title">
              Trend Analytics - {metric} / {range}
            </span>
          </div>
          <div className="pcard__body">
            <div className="chart-wrap chart-wrap--tall">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getMetricData(metric)}>
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
                  <Legend wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }} />
                  <Line type="monotone" dataKey="value" stroke="#38BDF8" strokeWidth={1.5} dot={false} />
                  <Line
                    type="monotone"
                    dataKey="avg"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="pcard">
          <div className="pcard__header">
            <span className="pcard__title">Zone Comparison</span>
          </div>
          <div className="pcard__body">
            <div className="chart-wrap chart-wrap--short">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={zoneComparisonData} barSize={28}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="zone"
                    tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
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
                  <Bar dataKey="value" fill="#38BDF8" radius={[4, 4, 0, 0]} opacity={0.8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
