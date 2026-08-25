import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons (Vite doesn't resolve leaflet's relative asset paths)
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

function buildIcon(color) {
  return new L.Icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: `marker-${color}`,
  });
}

const ICONS = {
  attraction: buildIcon("blue"),
  safety: buildIcon("red"),
  event: buildIcon("amber"),
  report: buildIcon("green"),
};

export default function IntelligenceMap({ city, markers }) {
  const center = useMemo(
    () => [markers?.[0]?.lat ?? 20.5937, markers?.[0]?.lng ?? 78.9629],
    [markers]
  );

  return (
    <div className="map-wrap">
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="leaflet-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {markers.map((m) => (
          <Marker key={m.id} position={[m.lat, m.lng]} icon={ICONS[m.type] || ICONS.attraction}>
            <Popup>
              <strong>{m.title}</strong>
              <br />
              <span>{m.description}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
