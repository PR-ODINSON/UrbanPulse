import { useEffect, useRef } from "react";
import L from "leaflet";
import Card from "../common/Card";
import { createPulseMarkerElement } from "../../services/mapService";

const mapDefaults = {
  dashboard: {
    center: [28.6139, 77.209],
    zoom: 11,
  },
  emergency: {
    center: [28.6139, 77.229],
    zoom: 12,
  },
};

const MapView = ({
  mode = "dashboard",
  title = "City Operations Map",
  incidents = [],
  selectedIncident,
  onSelectIncident,
}) => {
  const mapId = `${mode}-map`;
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const defaults = mapDefaults[mode];

  useEffect(() => {
    if (mapRef.current) {
      return;
    }

    const map = L.map(mapId, {
      zoomControl: false,
      preferCanvas: true,
    }).setView(defaults.center, defaults.zoom);

    const tileUrl =
      mode === "emergency"
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const attribution =
      mode === "emergency"
        ? '&copy; <a href="https://carto.com/">CARTO</a>'
        : "&copy; OpenStreetMap contributors";

    L.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution,
    }).addTo(map);

    map.eachLayer((layer) => {
      if (layer?.options?.attribution) {
        layer.getContainer?.()?.setAttribute?.("aria-hidden", "true");
      }
    });

    mapRef.current = map;

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, [mapId, mode]);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    incidents.forEach((incident) => {
      const markerEl = createPulseMarkerElement(incident.severity);
      markerEl.title = `${incident.id}: ${incident.title}`;
      const markerIcon = L.divIcon({
        html: markerEl.outerHTML,
        className: "pulse-marker-wrapper",
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      const marker = L.marker([incident.lat, incident.lng], {
        icon: markerIcon,
      })
        .addTo(mapRef.current)
        .bindPopup(
          `<strong>${incident.id}</strong> · ${incident.status.toUpperCase()}<br/>${incident.location}<br/>Owner: ${incident.owner}<br/>ETA: ${incident.eta}`,
          { closeButton: false, autoClose: false, closeOnClick: false, offset: [0, -12] },
        );

      marker.on("mouseover", () => marker.openPopup());
      marker.on("mouseout", () => marker.closePopup());
      marker.on("click", () => onSelectIncident?.(incident.id));

      markersRef.current.push(marker);
    });
  }, [incidents, onSelectIncident]);

  useEffect(() => {
    if (!selectedIncident || !mapRef.current) {
      return;
    }
    const incident = incidents.find((item) => item.id === selectedIncident);
    if (!incident) {
      return;
    }
    mapRef.current.flyTo([incident.lat, incident.lng], 13.5, {
      duration: 1.1,
    });
  }, [selectedIncident, incidents]);

  if (mode === "dashboard") {
    return (
      <section className="map-container">
        <div id={mapId} className="map-canvas" />
        <div className="map-controls">
          <button
            className="map-control-btn"
            type="button"
            onClick={() => mapRef.current?.zoomIn()}
          >
            +
          </button>
          <button
            className="map-control-btn"
            type="button"
            onClick={() => mapRef.current?.zoomOut()}
          >
            -
          </button>
          <button
            className="map-control-btn"
            type="button"
            onClick={() => mapRef.current?.setView(defaults.center, defaults.zoom)}
          >
            ◎
          </button>
        </div>
        {incidents.slice(0, 5).map((incident, index) => {
          const left = 22 + index * 14;
          const top = 24 + (index % 3) * 18;
          return (
            <button
              key={`sensor-${incident.id}`}
              type="button"
              className={`sensor-pin ${incident.severity}`}
              style={{ left: `${left}%`, top: `${top}%` }}
              onClick={() => onSelectIncident?.(incident.id)}
              aria-label={`Sensor ${incident.id}`}
            />
          );
        })}
      </section>
    );
  }

  return (
    <Card>
      <div className="panel-head">
        <h3>{title}</h3>
      </div>
      <div id={mapId} className="map map-small" />
    </Card>
  );
};

export default MapView;
