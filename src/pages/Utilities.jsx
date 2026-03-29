import Card from "../components/common/Card";

const Utilities = () => {
  return (
    <section className="view active">
      <div className="module-grid">
        <Card>
          <h3>Energy Consumption</h3>
          <div className="mock-chart line-chart" />
        </Card>
        <Card>
          <h3>Water Usage</h3>
          <div className="mock-chart bar-chart" />
        </Card>
        <Card>
          <h3>Demand vs Supply</h3>
          <div className="demand-bars">
            <div>
              <span>Energy</span>
              <progress value="82" max="100" />
            </div>
            <div>
              <span>Water</span>
              <progress value="73" max="100" />
            </div>
          </div>
        </Card>
        <Card>
          <h3>Outages</h3>
          <ul className="simple-list">
            <li>
              Grid Sector E2: <strong>Warning</strong>
            </li>
            <li>
              Water Pump Z4: <strong>Stable</strong>
            </li>
          </ul>
        </Card>
      </div>
    </section>
  );
};

export default Utilities;
