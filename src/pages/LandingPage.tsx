import React, { useEffect } from "react";
import LandingNav from "../components/landing/LandingNav";
import HeroSection from "../components/landing/HeroSection";
import StatsBar from "../components/landing/StatsBar";
import FeaturesSection from "../components/landing/FeaturesSection";
import CtaSection from "../components/landing/CtaSection";
import LandingFooter from "../components/landing/LandingFooter";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "../styles/landing/landing.css";

export default function LandingPage() {
  useScrollReveal();

  useEffect(() => {
    document.body.classList.add("lp-page");
    return () => {
      document.body.classList.remove("lp-page");
    };
  }, []);

  return (
    <main className="lp-root">
      <LandingNav />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <CtaSection />
      <LandingFooter />
    </main>
  );
}
