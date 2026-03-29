import React from "react";

const features = [
  {
    number: "01",
    title: "Live City Map",
    description:
      "A real-time geospatial canvas. Every district, every sensor, every incident - mapped and monitored as it happens. Heatmaps, district overlays, and instant alert pins.",
  },
  {
    number: "02",
    title: "Intelligent Alerts",
    description:
      "Multi-severity incident tracking with automatic severity ranking. Critical events surface immediately. The alert rail is always visible - you never hunt for emergencies.",
  },
  {
    number: "03",
    title: "Urban KPI Command Strip",
    description:
      "Traffic flow, air quality, energy load, water systems, and public safety - each with live trend sparklines and threshold-aware color coding. Data at rest, not in motion.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="lp-features" id="features">
      <div className="lp-features__inner lp-section">
        <div className="lp-features__header lp-reveal">
          <span className="lp-features__eyebrow">Platform capabilities</span>
          <h2 className="lp-features__title">
            Built for the
            <br />
            operators of
            <br />
            <em>tomorrow's cities.</em>
          </h2>
          <p className="lp-features__summary">
            The dashboard acts as a single city operations layer: map context, live
            alert prioritization, and KPI health tracking for faster operational
            decisions.
          </p>
        </div>

        <div className="lp-features__list">
          {features.map(({ number, title, description }) => (
            <div key={number} className="lp-feature-row lp-reveal">
              <span className="lp-feature-number">{number}</span>
              <div className="lp-feature-body">
                <h3 className="lp-feature-title">{title}</h3>
                <p className="lp-feature-desc">{description}</p>
              </div>
              <div className="lp-feature-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
