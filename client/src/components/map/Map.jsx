import { MapContainer, TileLayer } from 'react-leaflet';
import './map.scss';
import 'leaflet/dist/leaflet.css';
import Pin from '../pin/Pin';

function Map({ items }) {
  const calculateCenter = (items) => {
    if (items.length === 0) {
      return [20.5937, 78.9629]; // Default center for India
    }

    if (items.length === 1) {
      return [items[0].latitude, items[0].longitude];
    }

    let latSum = 0;
    let lngSum = 0;

    items.forEach((item) => {
      latSum += item.latitude;
      lngSum += item.longitude;
    });

    const avgLat = latSum / items.length;
    const avgLng = lngSum / items.length;

    return [avgLat, avgLng];
  };

  const center = calculateCenter(items);

  return (
    <MapContainer center={center} zoom={7} scrollWheelZoom={false} className="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;