import { useMemo, useState } from "react";

const integrations = [
  { name: "Open-Meteo", connected: true, lastSync: "10s ago" },
  { name: "OpenStreetMap", connected: true, lastSync: "12s ago" },
  { name: "GTFS Feed", connected: true, lastSync: "8s ago" },
];

const notificationDefaults = [
  {
    id: "critical",
    label: "Critical alerts",
    description: "SMS + Email notifications for citywide emergencies.",
    enabled: true,
  },
  {
    id: "warning",
    label: "Warning alerts",
    description: "In-app warning notifications for operators.",
    enabled: true,
  },
  {
    id: "digest",
    label: "Daily summary digest",
    description: "End-of-day operational intelligence digest.",
    enabled: false,
  },
];

const systemSettings = [
  { key: "refresh", label: "Refresh interval", value: "5 seconds" },
  { key: "timezone", label: "Timezone", value: "Local municipal timezone" },
  { key: "retention", label: "Data retention", value: "12 months" },
];

const Settings = () => {
  const [notificationState, setNotificationState] = useState(notificationDefaults);

  const enabledCount = useMemo(
    () => notificationState.filter((item) => item.enabled).length,
    [notificationState],
  );

  const handleToggle = (id) => {
    setNotificationState((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  const setAllNotifications = (enabled) => {
    setNotificationState((prev) => prev.map((item) => ({ ...item, enabled })));
  };

  return (
    <section className="view active page-root" data-page="settings">
      <div className="page-hero">
        <div className="page-hero__left">
          <span className="page-hero__eyebrow" style={{ color: "#94A3B8" }}>
            Settings & Integrations
          </span>
          <h1 className="page-hero__title">Platform Configuration</h1>
        </div>
      </div>

      <div className="page-body">
        <div className="page-row page-row--2col" style={{ flex: 1 }}>
          <div className="pcard">
            <div className="pcard__header">
              <span className="pcard__title">API Integrations</span>
            </div>
            <div className="pcard__body--noPad">
              {integrations.map((api) => (
                <div key={api.name} className="integration-item">
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      className={`integration-item__dot ${
                        api.connected ? "connected" : "disconnected"
                      }`}
                    />
                    <div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
                        {api.name}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.3)",
                          fontFamily: "JetBrains Mono",
                        }}
                      >
                        {api.connected ? `Last sync: ${api.lastSync}` : "Disconnected"}
                      </div>
                    </div>
                  </div>
                  <span className={`pcard__badge pcard__badge--${api.connected ? "ok" : "critical"}`}>
                    {api.connected ? "Connected" : "Offline"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="pcard">
              <div className="pcard__header">
                <span className="pcard__title">Notification Preferences</span>
                <span className="pcard__badge pcard__badge--ok">
                  {enabledCount}/{notificationState.length} enabled
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  padding: "10px 16px",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <button className="btn btn-ghost" onClick={() => setAllNotifications(true)}>
                  Enable all
                </button>
                <button className="btn btn-ghost" onClick={() => setAllNotifications(false)}>
                  Disable all
                </button>
              </div>
              <div className="pcard__body--noPad">
                {notificationState.map((notif) => (
                  <div
                    key={notif.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 16px",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
                        {notif.label}
                      </div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>
                        {notif.description}
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        defaultChecked={notif.enabled}
                        onChange={() => handleToggle(notif.id)}
                      />
                      <div className="toggle-switch__track" />
                      <div className="toggle-switch__thumb" />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="pcard">
              <div className="pcard__header">
                <span className="pcard__title">System Settings</span>
              </div>
              <div className="pcard__body--noPad">
                {systemSettings.map((setting) => (
                  <div
                    key={setting.key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 16px",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
                      {setting.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "JetBrains Mono",
                        fontSize: 13,
                        color: "rgba(255,255,255,0.85)",
                      }}
                    >
                      {setting.value}
                    </span>
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

export default Settings;
