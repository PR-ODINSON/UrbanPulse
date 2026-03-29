 export const createPulseMarkerElement = (severity) => {
  const marker = document.createElement("span");
  marker.className = `pulse-marker ${severity}`;
  return marker;
};
