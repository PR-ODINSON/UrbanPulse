import useAnimatedNumber from "./useAnimatedNumber";
import useValueFlash from "./useValueFlash";

const deltaByType = {
  traffic: "-1.8%",
  aqi: "+2.2%",
  energy: "-0.4%",
  incidents: "+1",
  health: "+2",
};

const deltaDirectionByType = {
  traffic: "up",
  aqi: "down",
  energy: "up",
  incidents: "down",
  health: "up",
};

const statusByType = (type, value) => {
  if (type === "traffic") {
    return value >= 65 ? "critical" : value >= 45 ? "warning" : "nominal";
  }
  if (type === "aqi") {
    return value >= 120 ? "critical" : value >= 90 ? "warning" : "nominal";
  }
  if (type === "energy") {
    return value >= 1.7 ? "warning" : "nominal";
  }
  if (type === "incidents") {
    return value >= 5 ? "critical" : value >= 3 ? "warning" : "nominal";
  }
  return value >= 80 ? "nominal" : value >= 60 ? "warning" : "critical";
};

const formatByType = (type, value) => {
  if (type === "traffic") {
    return `${Math.round(value)}%`;
  }
  if (type === "energy") {
    return `${value.toFixed(2)} GW`;
  }
  if (type === "health") {
    return `${Math.round(value)}`;
  }
  return `${Math.round(value)}`;
};

const Sparkline = ({ data }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 60;
  const h = 20;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} className="kpi-sparkline">
      <polyline
        points={pts}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const KPICard = ({ type, title, subtitle, value, onClick }) => {
  const animatedValue = useAnimatedNumber(value, type === "energy" ? 2 : 0);
  const status = statusByType(type, animatedValue);
  const valueRef = useValueFlash(animatedValue);
  const base = Number(animatedValue) || 0;
  const sparkData = [
    base * 0.94,
    base * 0.96,
    base * 0.93,
    base * 0.98,
    base * 1.02,
    base * 0.99,
    base,
  ];

  return (
    <article className={`kpi-card ${status}`} onClick={onClick}>
      <p className="kpi-label">{title}</p>
      <p ref={valueRef} className={`kpi-value ${status}`}>
        {formatByType(type, animatedValue)}
      </p>
      <p className="kpi-delta-wrap">
        <span className={`kpi-delta ${deltaDirectionByType[type] || "up"}`}>
          {deltaByType[type] || "+0.0%"}
        </span>
        <span className="kpi-delta">{subtitle}</span>
      </p>
      <Sparkline data={sparkData} />
    </article>
  );
};

export default KPICard;
