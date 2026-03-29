import Card from "../common/Card";
import Badge from "../common/Badge";
import { useAppContext } from "../../context/AppContext";
import useAnimatedNumber from "./useAnimatedNumber";

const CityHealth = () => {
  const { data, cityHealthScore, cityHealthSeverity } = useAppContext();
  const animatedScore = useAnimatedNumber(cityHealthScore, 0);
  const angle = `${Math.round(animatedScore * 3.6)}deg`;

  return (
    <Card className="city-health-panel">
      <div className="panel-head">
        <h3>City Health Status</h3>
        <Badge className={cityHealthSeverity.className}>{cityHealthSeverity.label}</Badge>
      </div>
      <div className="health-summary">
        <div className="score-wrap">
          <div className="score-ring" style={{ "--score-angle": angle }}>
            <span>{Math.round(animatedScore)}</span>
          </div>
          <p>Composite score from traffic, AQI, utilities, and incidents</p>
        </div>
        <div className="health-breakdown">
          <div className="mini-stat">
            <span>Traffic</span>
            <strong>{data.metrics.subscores.traffic}</strong>
          </div>
          <div className="mini-stat">
            <span>Environment</span>
            <strong>{data.metrics.subscores.environment}</strong>
          </div>
          <div className="mini-stat">
            <span>Utilities</span>
            <strong>{data.metrics.subscores.utilities}</strong>
          </div>
          <div className="mini-stat">
            <span>Incidents</span>
            <strong>{data.metrics.subscores.incidents}</strong>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CityHealth;
