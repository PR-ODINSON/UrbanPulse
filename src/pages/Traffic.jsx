import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import MapView from "../components/dashboard/MapView";
import { useAppContext } from "../context/AppContext";

const congestionTrend = [
  { time: "00:00", congestion: 28 },
  { time: "04:00", congestion: 22 },
  { time: "08:00", congestion: 56 },
  { time: "12:00", congestion: 48 },
  { time: "16:00", congestion: 61 },
  { time: "20:00", congestion: 44 },
];

const transitRoutes = [
  { id: "M-A", name: "Metro Line A", status: "On Time", delay: 0 },
  { id: "B-7", name: "Bus Rapid 7", status: "Delayed", delay: 6 },
  { id: "T-3", name: "Tram T3", status: "On Time", delay: 0 },
];

const zones = [
  { name: "North", congestion: 32, delay: 3 },
  { name: "Central", congestion: 58, delay: 8 },
  { name: "South", congestion: 44, delay: 4 },
];

const Traffic = () => {
  const { data, setSelectedIncident } = useAppContext();

  return (
    <section className="view active page-root" data-page="traffic">
      <div className="page-hero">
        <div className="page-hero__left">
          <span className="page-hero__eyebrow" style={{ color: "#F59E0B" }}>
            Traffic & Transport
          </span>
          <h1 className="page-hero__title">Live Movement Intelligence</h1>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <div className="stat-cell" style={{ background: "transparent", padding: 0 }}>
            <span className="stat-cell__label">Citywide Congestion</span>
            <span className="stat-cell__value val--warning" style={{ fontSize: 32 }}>
              42%
            </span>
          </div>
          <div className="stat-cell" style={{ background: "transparent", padding: 0 }}>
            <span className="stat-cell__label">Avg Delay</span>
            <span className="stat-cell__value" style={{ fontSize: 32 }}>
              +6 min
            </span>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="page-row page-row--6535" style={{ flex: 1, minHeight: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, minHeight: 0 }}>
            <div className="pcard" style={{ flex: 2, minHeight: 0 }}>
              <div className="pcard__header">
                <span className="pcard__title">Live Traffic Heatmap</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                  High congestion: Central Spine, East Ring
                </span>
              </div>
              <div className="pcard__body--noPad" style={{ flex: 1, minHeight: 220 }}>
                <MapView
                  mode="dashboard"
                  incidents={data.incidents}
                  selectedIncident={null}
                  onSelectIncident={setSelectedIncident}
                />
              </div>
            </div>

            <div className="pcard">
              <div className="pcard__header">
                <span className="pcard__title">Congestion Trend - 24h</span>
              </div>
              <div className="pcard__body">
                <div className="chart-wrap chart-wrap--short">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={congestionTrend}>
                      <defs>
                        <linearGradient id="cgGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                        </linearGradient>
                      </defs>
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
                        width={30}
                        unit="%"
                      />
                      <Tooltip
                        contentStyle={{
                          background: "#1A2235",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 6,
                          fontSize: 12,
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="congestion"
                        stroke="#F59E0B"
                        strokeWidth={1.5}
                        fill="url(#cgGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, minHeight: 0 }}>
            <div className="pcard">
              <div className="pcard__header">
                <span className="pcard__title">Public Transport (GTFS)</span>
              </div>
              <div className="pcard__body--noPad">
                <table className="ptable">
                  <thead>
                    <tr>
                      <th>Route</th>
                      <th>Status</th>
                      <th>Delay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transitRoutes.map((route) => (
                      <tr key={route.id}>
                        <td style={{ fontFamily: "JetBrains Mono", fontSize: 12 }}>
                          {route.name}
                        </td>
                        <td>
                          <span
                            className={`pcard__badge pcard__badge--${
                              route.status === "On Time" ? "ok" : "warning"
                            }`}
                          >
                            {route.status}
                          </span>
                        </td>
                        <td
                          style={{
                            color: route.delay > 0 ? "#F59E0B" : "#10B981",
                            fontFamily: "JetBrains Mono",
                            fontSize: 12,
                          }}
                        >
                          {route.delay > 0 ? `+${route.delay} min` : "On time"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pcard" style={{ flex: 1 }}>
              <div className="pcard__header">
                <span className="pcard__title">Zone Drill-Down</span>
              </div>
              <div className="pcard__body--noPad">
                {zones.map((zone) => (
                  <div
                    key={zone.name}
                    style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                      {zone.name}
                    </span>
                    <div style={{ display: "flex", gap: 24 }}>
                      <span
                        style={{
                          fontFamily: "JetBrains Mono",
                          fontSize: 13,
                          color:
                            zone.congestion > 50
                              ? "#EF4444"
                              : zone.congestion > 35
                                ? "#F59E0B"
                                : "#10B981",
                        }}
                      >
                        {zone.congestion}%
                      </span>
                      <span
                        style={{
                          fontFamily: "JetBrains Mono",
                          fontSize: 13,
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        +{zone.delay} min
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Traffic;
