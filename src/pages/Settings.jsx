import Card from "../components/common/Card";

const Settings = () => {
  return (
    <section className="view active">
      <div className="module-grid">
        <Card>
          <h3>API Integrations</h3>
          <ul className="simple-list">
            <li>Open-Meteo: Connected</li>
            <li>Mapbox / OSM: Connected</li>
            <li>GTFS Feed: Connected</li>
          </ul>
        </Card>
        <Card>
          <h3>Notification Preferences</h3>
          <div className="toggle-list">
            <label>
              <input type="checkbox" defaultChecked /> Critical alerts (SMS + Email)
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Warning alerts (In-app)
            </label>
            <label>
              <input type="checkbox" /> Daily summary digest
            </label>
          </div>
        </Card>
        <Card>
          <h3>System Settings</h3>
          <ul className="simple-list">
            <li>Refresh interval: 5 seconds</li>
            <li>Timezone: Local municipal timezone</li>
            <li>Data retention: 12 months</li>
          </ul>
        </Card>
      </div>
    </section>
  );
};

export default Settings;
