import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import Card from "../common/Card";
import {
  createPulseMarkerElement,
  getMapboxToken,
  MAPBOX_STYLE,
} from "../../services/mapService";

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

  useEffect(() => {
    if (mapRef.current) {
      return;
    }
    const token = getMapboxToken();
    if (!token) {
      return;
    }
    mapboxgl.accessToken = token;

    const defaults = mapDefaults[mode];
    const map = new mapboxgl.Map({
      container: mapId,
      style: MAPBOX_STYLE,
      center: [defaults.center[1], defaults.center[0]],
      zoom: defaults.zoom,
      pitch: 56,
      bearing: -14,
      antialias: true,
    });

    map.on("load", () => {
      map.addLayer({
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 12,
        paint: {
          "fill-extrusion-color": "#24324c",
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            12,
            0,
            15.5,
            ["get", "height"],
          ],
          "fill-extrusion-base": ["coalesce", ["get", "min_height"], 0],
          "fill-extrusion-opacity": 0.6,
        },
      });
    });

    mapRef.current = map;

    return () => {
      markersRef.current.forEach((entry) => {
        entry.marker.remove();
        entry.popup.remove();
      });
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, [mapId, mode]);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    markersRef.current.forEach((entry) => {
      entry.marker.remove();
      entry.popup.remove();
    });
    markersRef.current = [];

    incidents.forEach((incident) => {
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 14,
      })
        .setLngLat([incident.lng, incident.lat])
        .setHTML(
          `<strong>${incident.id}</strong> · ${incident.status.toUpperCase()}<br/>${incident.location}<br/>Owner: ${incident.owner}<br/>ETA: ${incident.eta}`,
        );
      const markerEl = createPulseMarkerElement(incident.severity);
      markerEl.title = `${incident.id}: ${incident.title}`;

      const marker = new mapboxgl.Marker({
        element: markerEl,
        anchor: "center",
      });
      marker.setLngLat([incident.lng, incident.lat]).addTo(mapRef.current);

      markerEl.addEventListener("mouseenter", () => popup.addTo(mapRef.current));
      markerEl.addEventListener("mouseleave", () => popup.remove());
      markerEl.addEventListener("click", () => {
        onSelectIncident?.(incident.id);
      });

      markersRef.current.push({ marker, popup });
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
    mapRef.current.flyTo({
      center: [incident.lng, incident.lat],
      zoom: 13.5,
      pitch: 60,
      speed: 0.9,
      curve: 1.2,
    });
  }, [selectedIncident, incidents]);

  if (mode === "dashboard") {
    return (
      <section className="map-container">
        <div id={mapId} className="map-canvas" />
        <div className="map-controls">
          <button className="map-control-btn" type="button">
            +
          </button>
          <button className="map-control-btn" type="button">
            -
          </button>
          <button className="map-control-btn" type="button">
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
        {!getMapboxToken() && (
          <div className="mapbox-missing-token">
            Add <code>VITE_MAPBOX_TOKEN</code> in your <code>.env</code> file to
            enable the 3D Mapbox map.
          </div>
        )}
      </section>
    );
  }

  return (
    <Card>
      <div className="panel-head">
        <h3>{title}</h3>
      </div>
      <div id={mapId} className="map map-small" />
      {!getMapboxToken() && (
        <div className="mapbox-missing-token">
          Add <code>VITE_MAPBOX_TOKEN</code> in your <code>.env</code> file to
          enable the 3D Mapbox map.
        </div>
      )}
    </Card>
  );
};

export default MapView;
