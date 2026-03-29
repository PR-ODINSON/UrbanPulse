export const severityRank = {
  critical: 3,
  warning: 2,
  normal: 1,
};

export const sortAlertsBySeverity = (alerts) =>
  [...alerts].sort(
    (a, b) => (severityRank[b.severity] || 0) - (severityRank[a.severity] || 0),
  );

export const getIncidentForAlert = (incidents, incidentId) =>
  incidents.find((incident) => incident.id === incidentId) || null;
