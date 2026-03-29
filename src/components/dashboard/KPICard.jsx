import Card from "../common/Card";
import useAnimatedNumber from "./useAnimatedNumber";

const iconByType = {
  traffic: "△",
  aqi: "◌",
  energy: "⚡",
  incidents: "!",
};

const trendByType = {
  traffic: { text: "+3.1%", className: "up" },
  aqi: { text: "+1.2%", className: "up" },
  energy: { text: "-0.7%", className: "down" },
  incidents: { text: "+1", className: "up" },
};

const formatByType = (type, value) => {
  if (type === "traffic") {
    return `${Math.round(value)}%`;
  }
  if (type === "energy") {
    return `${value.toFixed(2)} GW`;
  }
  return `${Math.round(value)}`;
};

const KPICard = ({ type, title, subtitle, value, onClick }) => {
  const animatedValue = useAnimatedNumber(value, type === "energy" ? 2 : 0);
  const trend = trendByType[type];

  return (
    <Card className="kpi-card interactive" onClick={onClick}>
      <div className="kpi-head">
        <h4>{title}</h4>
        <span className="kpi-icon">{iconByType[type]}</span>
      </div>
      <p className="kpi-value">{formatByType(type, animatedValue)}</p>
      <p className="muted">
        {subtitle} <span className={`trend ${trend.className}`}>{trend.text}</span>
      </p>
      <div className="sparkline" />
    </Card>
  );
};

export default KPICard;
