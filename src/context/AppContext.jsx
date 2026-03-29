import { createContext, useContext, useMemo, useState } from "react";
import { useSimulation } from "../hooks/useSimulation";
import {
  buildInsightText,
  calculateCityHealth,
  getSeverityLabel,
} from "../services/simulation";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const { data, loading, error, retry } = useSimulation();
  const [selectedIncident, setSelectedIncident] = useState("IN-931");

  const value = useMemo(() => {
    const cityHealthScore = calculateCityHealth(data.metrics.subscores);
    return {
      data,
      loading,
      error,
      retry,
      selectedIncident,
      setSelectedIncident,
      cityHealthScore,
      cityHealthSeverity: getSeverityLabel(cityHealthScore),
      insightText: buildInsightText(data),
    };
  }, [data, loading, error, retry, selectedIncident]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return ctx;
};
