import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CityCanvas from "./CityCanvas";

const heroCities = [
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Ahmedabad",
  "Jaipur",
  "Indore",
  "Bhopal",
];

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const words = textRef.current?.querySelectorAll(".lp-hero__word");
    words?.forEach((word, index) => {
      window.setTimeout(() => {
        word.classList.add("lp-hero__word--visible");
      }, 300 + index * 120);
    });
  }, []);

  return (
    <section className="lp-hero" id="metrics">
      <CityCanvas />
      <div className="lp-hero__vignette" />

      <div className="lp-hero__content lp-section" ref={textRef}>
        <div className="lp-hero__grid">
          <div>
            <div className="lp-hero__eyebrow">
              <span className="lp-hero__dot" />
              <span>Smart City Intelligence Platform</span>
            </div>

            <h1 className="lp-hero__headline">
              {["The", "city", "has", "a", "pulse."].map((word, index) => (
                <span key={`a-${index}`} className="lp-hero__word-wrap">
                  <span className="lp-hero__word">{`${word} `}</span>
                </span>
              ))}
              <br />
              {["Now", "you", "can", "feel", "it."].map((word, index) => (
                <span key={`b-${index}`} className="lp-hero__word-wrap">
                  <span
                    className="lp-hero__word"
                    style={{ fontStyle: word === "it." ? "italic" : "normal" }}
                  >
                    {`${word} `}
                  </span>
                </span>
              ))}
            </h1>

            <p className="lp-hero__sub">
              Real-time urban intelligence across traffic, energy,
              <br />
              air quality, and public safety - unified in one command center.
            </p>
            <p className="lp-hero__system-note">
              UrbanPulse is an operations system for city control rooms: it fuses
              live sensor streams, ranks incidents by severity, and guides teams from
              detection to response in one dashboard.
            </p>

            <div className="lp-hero__actions">
              <Link to="/dashboard" className="lp-btn lp-btn--primary">
                Open Command Center
              </Link>
              <a href="#features" className="lp-btn lp-btn--ghost">
                See how it works
              </a>
            </div>
          </div>

          <aside className="lp-hero__briefing">
            <p className="lp-hero__briefing-label">Operational Briefing</p>
            <h3>National Multi-City Monitoring</h3>
            <ul>
              <li>Unified incident prioritization with severity context</li>
              <li>Live city map intelligence with response routing support</li>
              <li>Cross-domain KPIs for traffic, utilities, and environment</li>
            </ul>
            <div className="lp-hero__city-chips">
              {heroCities.map((city) => (
                <span key={city}>{city}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="lp-hero__scroll-hint">
          <span className="lp-hero__scroll-line" />
          <span>Scroll for platform capabilities</span>
        </div>

        <div className="lp-hero__live-strip">
          {[
            { label: "Districts monitored", value: "24" },
            { label: "Active sensors", value: "1,847" },
            { label: "Data points / sec", value: "12.4K" },
            { label: "System uptime", value: "99.97%" },
          ].map(({ label, value }) => (
            <div key={label} className="lp-hero__live-item">
              <span className="lp-hero__live-value">{value}</span>
              <span className="lp-hero__live-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
