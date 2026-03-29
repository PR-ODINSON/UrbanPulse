import { useEffect, useState } from "react";
import { formatLiveTimestamp } from "../services/simulation";

export const useLiveData = (lastUpdatedTs) => {
  const [label, setLabel] = useState(() => formatLiveTimestamp(lastUpdatedTs));

  useEffect(() => {
    setLabel(formatLiveTimestamp(lastUpdatedTs));
    const timer = window.setInterval(() => {
      setLabel(formatLiveTimestamp(lastUpdatedTs));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [lastUpdatedTs]);

  return label;
};
