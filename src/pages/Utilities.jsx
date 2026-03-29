import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const energyData = [
  { hour: "00", demand: 1.1, supply: 1.4 },
  { hour: "06", demand: 1.2, supply: 1.4 },
  { hour: "12", demand: 1.43, supply: 1.5 },
  { hour: "18", demand: 1.38, supply: 1.5 },
  { hour: "23", demand: 1.24, supply: 1.4 },
];

const waterData = [
  { zone: "N", usage: 48, capacity: 70 },
  { zone: "C", usage: 62, capacity: 70 },
  { zone: "S", usage: 53, capacity: 70 },
  { zone: "E", usage: 59, capacity: 70 },
];

const outages = [
  { id: "UT-101", location: "Grid Sector E2", type: "Power", status: "Warning" },
  { id: "UT-102", location: "Water Pump Z4", type: "Water", status: "Stable" },
];

const Utilities = () => {
  return (
    <section className="view active page-root" data-page="utilities">
      <div className="page-hero">
        <div className="page-hero__left">
          <span className="page-hero__eyebrow" style={{ color: "#8B5CF6" }}>
            Utilities Management
          </span>
          <h1 className="page-hero__title">Infrastructure Load & Reliability</h1>
        </div>
        <div className="page-hero__stat">
          <strong>1.43 GW</strong> city demand
        </div>
      </div>

      <div className="page-body">
        <div className="page-row page-row--2col">
          <div className="pcard">
            <div className="pcard__header">
              <span className="pcard__title">Energy Consumption</span>
            </div>
            <div className="pcard__body">
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={energyData}>
                    <defs>
                      <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="hour"
                      tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      unit=" GW"
                      width={44}
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
                      dataKey="demand"
                      stroke="#8B5CF6"
                      strokeWidth={1.5}
                      fill="url(#energyGrad)"
                      name="Demand"
                    />
                    <Area
                      type="monotone"
                      dataKey="supply"
                      stroke="#10B981"
                      strokeWidth={1}
                      fill="none"
                      strokeDasharray="4 4"
                      name="Supply"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="pcard">
            <div className="pcard__header">
              <span className="pcard__title">Water Usage</span>
            </div>
            <div className="pcard__body">
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={waterData} barSize={20}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="zone"
                      tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      unit=" ML"
                      width={40}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#1A2235",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 6,
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="usage" fill="#38BDF8" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="capacity" fill="rgba(255,255,255,0.08)" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="page-row page-row--2col" style={{ flex: 1 }}>
          <div className="pcard">
            <div className="pcard__header">
              <span className="pcard__title">Demand vs Supply</span>
            </div>
            <div className="pcard__body--noPad">
              {["Energy", "Water"].map((util) => (
                <div
                  key={util}
                  style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{util}</span>
                    <span style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "#8B5CF6" }}>
                      {util === "Energy" ? "78%" : "65%"}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: util === "Energy" ? "78%" : "65%",
                        background: "linear-gradient(90deg, #8B5CF6, #A78BFA)",
                        borderRadius: 2,
                        transition: "width 1s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pcard">
            <div className="pcard__header">
              <span className="pcard__title">Outages</span>
            </div>
            <div className="pcard__body--noPad">
              {outages.map((outage) => (
                <div
                  key={outage.id}
                  className={`incident-row ${outage.status === "Warning" ? "warning" : "resolved"}`}
                >
                  <div className="incident-row__id">{outage.id}</div>
                  <div className="incident-row__title">{outage.location}</div>
                  <div className="incident-row__meta">
                    <span>{outage.type}</span>
                    <span
                      className={`pcard__badge pcard__badge--${
                        outage.status === "Warning" ? "warning" : "ok"
                      }`}
                    >
                      {outage.status}
                    </span>
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

export default Utilities;
