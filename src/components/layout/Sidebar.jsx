import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/traffic", label: "Traffic & Transport" },
  { to: "/environment", label: "Environment" },
  { to: "/utilities", label: "Utilities" },
  { to: "/emergency", label: "Emergency Alerts" },
  { to: "/reports", label: "Citizen Reports" },
  { to: "/analytics", label: "Analytics" },
  { to: "/admin", label: "User Management" },
  { to: "/settings", label: "Settings & Integrations" },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">UP</div>
        <div>
          <h1>UrbanPulse</h1>
          <p>Municipal Ops Center</p>
        </div>
      </div>
      <nav className="nav-list">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`.trim()
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
