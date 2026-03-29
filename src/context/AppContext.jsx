import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useSimulation } from "../hooks/useSimulation";
import {
  buildInsightText,
  calculateCityHealth,
  CITY_OPTIONS,
  getSeverityLabel,
  initialSimulationState,
} from "../services/simulation";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const { data, loading, error, retry, setData } = useSimulation();
  const [selectedIncident, setSelectedIncident] = useState("IN-931");
  const [selectedCityId, setSelectedCityId] = useState("delhi");

  const switchCity = useCallback((cityId) => {
    const nextState = initialSimulationState(cityId);
    setSelectedCityId(cityId);
    setData(nextState);
    setSelectedIncident(nextState.incidents[0]?.id || null);
  }, [setData]);

  const value = useMemo(() => {
    const cityHealthScore = calculateCityHealth(data.metrics.subscores);
    return {
      data,
      loading,
      error,
      retry,
      selectedIncident,
      setSelectedIncident,
      selectedCityId,
      selectedCityName: data.cityName,
      cityOptions: CITY_OPTIONS,
      switchCity,
      cityHealthScore,
      cityHealthSeverity: getSeverityLabel(cityHealthScore),
      insightText: buildInsightText(data),
    };
  }, [data, loading, error, retry, selectedIncident, selectedCityId, switchCity]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return ctx;
};
