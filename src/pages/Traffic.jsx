import Card from "../components/common/Card";

const Traffic = () => {
  return (
    <section className="view active">
      <div className="module-grid">
        <Card>
          <h3>Live Traffic Heatmap</h3>
          <div className="mock-chart heatmap" />
          <p className="muted">High congestion: Central Spine, East Ring</p>
        </Card>
        <Card>
          <h3>Public Transport Tracking (GTFS)</h3>
          <div className="transport-list">
            <div>
              <span>Metro Line A</span>
              <strong>On Time</strong>
            </div>
            <div>
              <span>Bus Rapid 7</span>
              <strong>+6 min</strong>
            </div>
            <div>
              <span>Tram T3</span>
              <strong>On Time</strong>
            </div>
          </div>
        </Card>
        <Card>
          <h3>Congestion Trend</h3>
          <div className="mock-chart line-chart" />
        </Card>
        <Card>
          <h3>Zone Drill-Down</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Zone</th>
                <th>Congestion</th>
                <th>Transit Delay</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>North</td>
                <td>32%</td>
                <td>+3 min</td>
              </tr>
              <tr>
                <td>Central</td>
                <td>58%</td>
                <td>+8 min</td>
              </tr>
              <tr>
                <td>South</td>
                <td>44%</td>
                <td>+4 min</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </section>
  );
};

export default Traffic;
