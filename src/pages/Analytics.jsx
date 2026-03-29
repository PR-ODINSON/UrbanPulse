import Card from "../components/common/Card";

const Analytics = () => {
  return (
    <section className="view active">
      <div className="module-grid">
        <Card>
          <h3>Trend Analytics</h3>
          <div className="mock-chart line-chart" />
        </Card>
        <Card>
          <h3>Zone Comparison</h3>
          <div className="mock-chart bar-chart" />
        </Card>
        <Card>
          <h3>Data Visualization Standards</h3>
          <ul className="simple-list">
            <li>
              <strong>Line charts:</strong> time-based trends (traffic, AQI, utility
              load).
            </li>
            <li>
              <strong>Bar charts:</strong> zone and category comparisons.
            </li>
            <li>
              <strong>Heatmaps:</strong> density and hotspot overlays on map.
            </li>
            <li>
              <strong>Color encoding:</strong> green normal, amber warning, red
              critical; neutral grays for context.
            </li>
            <li>
              <strong>Labels:</strong> units always visible; short axis titles;
              readable tick intervals.
            </li>
            <li>
              <strong>Legends:</strong> top-right, consistent ordering and thresholds.
            </li>
          </ul>
        </Card>
      </div>
    </section>
  );
};

export default Analytics;
