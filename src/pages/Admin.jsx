const roles = [
  {
    name: "Admin",
    color: "#EF4444",
    count: 3,
    permissions: ["Full control", "Integrations", "User policy", "Data export"],
  },
  {
    name: "Operator",
    color: "#F59E0B",
    count: 8,
    permissions: ["Live monitoring", "Incident updates", "Alert management"],
  },
  {
    name: "Analyst",
    color: "#38BDF8",
    count: 5,
    permissions: ["Read analytics", "Export reports", "View history"],
  },
];

const users = [
  { name: "A. Shah", role: "Admin", zone: "Central", status: "Active" },
  { name: "R. Das", role: "Operator", zone: "East", status: "Active" },
  { name: "N. Kapoor", role: "Analyst", zone: "North", status: "Active" },
];

const activityLog = [
  { time: "09:24", actor: "Operator R. Das", action: "tagged incident IN-931 as resolved." },
  { time: "09:18", actor: "Admin A. Shah", action: "updated AQI alert threshold." },
  { time: "09:05", actor: "Analyst N. Kapoor", action: "exported congestion report." },
];

const Admin = () => {
  return (
    <section className="view active page-root" data-page="admin">
      <div className="page-hero">
        <div className="page-hero__left">
          <span className="page-hero__eyebrow" style={{ color: "#6366F1" }}>
            User Management & Access Control
          </span>
          <h1 className="page-hero__title">Role Governance</h1>
        </div>
      </div>

      <div className="page-body">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {roles.map((role) => (
            <div key={role.name} className="pcard" style={{ border: `1px solid ${role.color}22` }}>
              <div className="pcard__header" style={{ background: `${role.color}10` }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: role.color }}>{role.name}</span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "JetBrains Mono" }}>
                  {role.count} users
                </span>
              </div>
              <div className="pcard__body">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {role.permissions.map((permission) => (
                    <span
                      key={permission}
                      style={{
                        fontSize: 11,
                        padding: "3px 8px",
                        borderRadius: 3,
                        background: `${role.color}15`,
                        color: role.color,
                        border: `1px solid ${role.color}25`,
                      }}
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="page-row page-row--6535" style={{ flex: 1 }}>
          <div className="pcard">
            <div className="pcard__header">
              <span className="pcard__title">User Directory</span>
            </div>
            <div className="pcard__body--noPad">
              <table className="ptable">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Zone</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.name}>
                      <td>{user.name}</td>
                      <td>{user.role}</td>
                      <td>{user.zone}</td>
                      <td>{user.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pcard">
            <div className="pcard__header">
              <span className="pcard__title">Activity Log</span>
            </div>
            <div className="pcard__body--noPad">
              {activityLog.map((entry, index) => (
                <div
                  key={`${entry.time}-${index}`}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: "10px 16px",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "JetBrains Mono",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.25)",
                      flexShrink: 0,
                      paddingTop: 2,
                    }}
                  >
                    {entry.time}
                  </span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
                    <strong style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
                      {entry.actor}
                    </strong>{" "}
                    {entry.action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
