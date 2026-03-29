import React from "react";

export default function LandingFooter() {
  return (
    <footer className="lp-footer">
      <div className="lp-footer__inner lp-section">
        <div className="lp-footer__brand">
          <span className="lp-nav__logo">
            <span className="lp-nav__logo-dot" />
            URBAN<span className="lp-nav__logo-accent">PULSE</span>
          </span>
          <p>Smart city intelligence. Real time.</p>
        </div>
        <div className="lp-footer__links">
          <a href="#features">Features</a>
          <a href="#metrics">City Health</a>
        </div>
      </div>
    </footer>
  );
}
