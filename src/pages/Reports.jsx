import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import MapView from "../components/dashboard/MapView";
import { useAppContext } from "../context/AppContext";

const reports = [
  {
    id: "CR-301",
    category: "Road",
    description: "Signal outage causing lane block",
    location: "Central Spine",
    time: "10 min ago",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "CR-302",
    category: "Water",
    description: "Leak near public park",
    location: "North Block",
    time: "22 min ago",
    priority: "Medium",
    status: "Open",
  },
  {
    id: "CR-303",
    category: "Safety",
    description: "Fire alarm in civic center",
    location: "East Ring",
    time: "5 min ago",
    priority: "Critical",
    status: "Escalated",
  },
];

const categoryData = [
  { name: "Road", count: 36 },
  { name: "Water", count: 22 },
  { name: "Safety", count: 18 },
  { name: "Waste", count: 12 },
];

const Reports = () => {
  const { data, setSelectedIncident } = useAppContext();
  const [selectedReportId, setSelectedReportId] = useState(reports[0]?.id || "");
  const selectedReport = reports.find((item) => item.id === selectedReportId) || reports[0];

  return (
    <section className="view active page-root" data-page="reports">
      <div className="page-hero">
        <div className="page-hero__left">
          <span className="page-hero__eyebrow" style={{ color: "#F97316" }}>
            Citizen Feedback & Reports
          </span>
          <h1 className="page-hero__title">Community Signal Desk</h1>
        </div>
      </div>

      <div className="page-body">
        <div className="page-row page-row--6535" style={{ flex: 1, minHeight: 0 }}>
          <div className="pcard">
            <div className="pcard__header">
              <span className="pcard__title">Complaint Queue</span>
              <span className="pcard__badge pcard__badge--warning">
                Focus: {selectedReport?.id}
              </span>
            </div>
            <div className="pcard__body--noPad">
              {reports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => setSelectedReportId(report.id)}
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    cursor: "pointer",
                    background:
                      selectedReportId === report.id
                        ? "rgba(249,115,22,0.1)"
                        : "transparent",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
                        {report.id}
                      </span>
                      <span
                        className={`pcard__badge pcard__badge--${
                          report.priority === "Critical"
                            ? "critical"
                            : report.priority === "High"
                              ? "warning"
                              : "ok"
                        }`}
                      >
                        {report.priority}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginBottom: 2 }}>
                      {report.category} - {report.description}
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                      {report.location} · {report.time}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "3px 8px",
                      borderRadius: 3,
                      background:
                        report.status === "In Progress"
                          ? "rgba(56,189,248,0.12)"
                          : report.status === "Open"
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(239,68,68,0.12)",
                      color:
                        report.status === "In Progress"
                          ? "#38BDF8"
                          : report.status === "Open"
                            ? "rgba(255,255,255,0.4)"
                            : "#EF4444",
                    }}
                  >
                    {report.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="pcard">
              <div className="pcard__header">
                <span className="pcard__title">Category Mix</span>
              </div>
              <div className="pcard__body">
                <div className="chart-wrap">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData} layout="vertical" barSize={12}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.05)"
                        horizontal={false}
                      />
                      <XAxis
                        type="number"
                        tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        width={60}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "#1A2235",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 6,
                          fontSize: 12,
                        }}
                      />
                      <Bar dataKey="count" fill="#F97316" radius={[0, 3, 3, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="pcard" style={{ flex: 1 }}>
              <div className="pcard__header">
                <span className="pcard__title">Map-Linked Reports</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
                  {selectedReport?.category} · {selectedReport?.location}
                </span>
              </div>
              <div className="pcard__body--noPad" style={{ minHeight: 220 }}>
                <MapView
                  mode="emergency"
                  incidents={data.incidents}
                  selectedIncident={null}
                  onSelectIncident={setSelectedIncident}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reports;
