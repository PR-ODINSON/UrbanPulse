import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`lp-nav ${scrolled ? "lp-nav--scrolled" : ""}`.trim()}>
      <div className="lp-nav__inner lp-section">
        <span className="lp-nav__logo">
          <span className="lp-nav__logo-dot" />
          URBAN<span className="lp-nav__logo-accent">PULSE</span>
        </span>
        <div className="lp-nav__links">
          <a href="#features">Features</a>
          <a href="#metrics">City Health</a>
          <Link to="/dashboard" className="lp-nav__cta">
            Enter Dashboard →
          </Link>
        </div>
      </div>
    </nav>
  );
}
