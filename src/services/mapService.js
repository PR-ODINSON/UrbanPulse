export const MAPBOX_STYLE = "mapbox://styles/mapbox/dark-v11";

export const getMapboxToken = () => import.meta.env.VITE_MAPBOX_TOKEN || "";

export const createPulseMarkerElement = (severity) => {
  const marker = document.createElement("span");
  marker.className = `pulse-marker ${severity}`;
  return marker;
};
