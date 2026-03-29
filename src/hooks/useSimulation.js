import { useCallback, useEffect, useRef, useState } from "react";
import { initialSimulationState, nextSimulationState } from "../services/simulation";

const STARTUP_DELAY_MS = 1200;
const TICK_MS = 5000;

export const useSimulation = () => {
  const [data, setData] = useState(initialSimulationState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const simulationRef = useRef(null);
  const bootRef = useRef(null);

  const clearTimers = useCallback(() => {
    if (bootRef.current) {
      window.clearTimeout(bootRef.current);
      bootRef.current = null;
    }
    if (simulationRef.current) {
      window.clearInterval(simulationRef.current);
      simulationRef.current = null;
    }
  }, []);

  const startSimulation = useCallback(() => {
    clearTimers();
    setLoading(true);
    setError(false);

    bootRef.current = window.setTimeout(() => {
      if (Math.random() < 0.1) {
        setLoading(false);
        setError(true);
        return;
      }

      setData((prev) => ({
        ...prev,
        lastUpdatedTs: Date.now(),
      }));
      setLoading(false);
      setError(false);

      simulationRef.current = window.setInterval(() => {
        setData((prev) => nextSimulationState(prev));
      }, TICK_MS);
    }, STARTUP_DELAY_MS);
  }, [clearTimers]);

  useEffect(() => {
    startSimulation();
    return clearTimers;
  }, [startSimulation, clearTimers]);

  return {
    data,
    loading,
    error,
    retry: startSimulation,
    setData,
  };
};
