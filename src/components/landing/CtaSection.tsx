import React from "react";
import { Link } from "react-router-dom";

export default function CtaSection() {
  return (
    <section className="lp-cta">
      <div className="lp-cta__inner lp-section">
        <span className="lp-cta__eyebrow lp-reveal">Ready to deploy</span>
        <h2 className="lp-cta__headline lp-reveal">
          Your city is speaking.
          <br />
          <em>Are you listening?</em>
        </h2>
        <Link to="/dashboard" className="lp-btn lp-btn--primary lp-reveal">
          Enter the Command Center →
        </Link>
      </div>
    </section>
  );
}
