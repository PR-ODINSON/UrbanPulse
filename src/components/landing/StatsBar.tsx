import React from "react";

const stats = [
  { value: "2.4 GW", label: "Energy load" },
  { value: "AQI 38", label: "Air quality index" },
  { value: "84%", label: "Traffic flow" },
  { value: "3", label: "Active incidents" },
  { value: "99.97%", label: "Platform uptime" },
];

export default function StatsBar() {
  return (
    <section className="lp-statsbar">
      <div className="lp-statsbar__inner lp-section">
        {stats.map(({ value, label }, index) => (
          <div key={`${label}-${index}`} className="lp-statsbar__item lp-reveal">
            <span className="lp-statsbar__value">{value}</span>
            <span className="lp-statsbar__label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
