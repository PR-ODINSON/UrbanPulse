import Card from "../components/common/Card";
import { useAppContext } from "../context/AppContext";

const Environment = () => {
  const {
    data: {
      metrics: { aqi },
    },
  } = useAppContext();

  return (
    <section className="view active">
      <div className="module-grid">
        <Card>
          <h3>AQI Index</h3>
          <p className="kpi-value">{aqi}</p>
          <div className="aqi-scale">
            <span className="aqi-good">Good</span>
            <span className="aqi-moderate active">Moderate</span>
            <span className="aqi-bad">Unhealthy</span>
          </div>
        </Card>
        <Card>
          <h3>Weather Snapshot</h3>
          <div className="weather">
            <div>
              <span>Temp</span>
              <strong>31C</strong>
            </div>
            <div>
              <span>Humidity</span>
              <strong>61%</strong>
            </div>
            <div>
              <span>Wind</span>
              <strong>13 km/h</strong>
            </div>
          </div>
        </Card>
        <Card>
          <h3>Pollution Trend</h3>
          <div className="mock-chart line-chart" />
        </Card>
        <Card>
          <h3>Zone-Level Breakdown</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Zone</th>
                <th>AQI</th>
                <th>PM2.5</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>North</td>
                <td>72</td>
                <td>19 ug/m3</td>
              </tr>
              <tr>
                <td>Central</td>
                <td>96</td>
                <td>35 ug/m3</td>
              </tr>
              <tr>
                <td>South</td>
                <td>88</td>
                <td>29 ug/m3</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </section>
  );
};

export default Environment;
