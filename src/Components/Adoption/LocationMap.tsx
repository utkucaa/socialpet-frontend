import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
// Define a custom icon for the marker
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface LocationMapProps {
  city: string;
  district: string;
  className?: string;
}

// This is a simple mapping of some Turkish cities to their approximate coordinates
// In a real application, you would use a geocoding service or a more complete database
type CityKey = 'İstanbul' | 'istanbul' | 'Ankara' | 'ankara' | 'İzmir' | 'izmir' | 'Antalya' | 'antalya' | 
  'Bursa' | 'bursa' | 'Adana' | 'adana' | 'Konya' | 'konya' | 'Gaziantep' | 'gaziantep' | 
  'Şanlıurfa' | 'şanlıurfa' | 'Kocaeli' | 'kocaeli' | 'Mersin' | 'mersin' | 'Diyarbakır' | 'diyarbakır' | 
  'Hatay' | 'hatay' | 'Manisa' | 'manisa' | 'Kayseri' | 'kayseri' | 'Samsun' | 'samsun' | 
  'Balıkesir' | 'balıkesir' | 'Kahramanmaraş' | 'kahramanmaraş' | 'Van' | 'van' | 'Aydın' | 'aydın' | 'default';

const CITY_COORDINATES: Record<CityKey, [number, number]> = {
  'İstanbul': [41.0082, 28.9784],
  'istanbul': [41.0082, 28.9784],
  'Ankara': [39.9334, 32.8597],
  'ankara': [39.9334, 32.8597],
  'İzmir': [38.4237, 27.1428],
  'izmir': [38.4237, 27.1428],
  'Antalya': [36.8969, 30.7133],
  'antalya': [36.8969, 30.7133],
  'Bursa': [40.1885, 29.0610],
  'bursa': [40.1885, 29.0610],
  'Adana': [37.0000, 35.3213],
  'adana': [37.0000, 35.3213],
  'Konya': [37.8714, 32.4846],
  'konya': [37.8714, 32.4846],
  'Gaziantep': [37.0662, 37.3833],
  'gaziantep': [37.0662, 37.3833],
  'Şanlıurfa': [37.1591, 38.7969],
  'şanlıurfa': [37.1591, 38.7969],
  'Kocaeli': [40.7654, 29.9408],
  'kocaeli': [40.7654, 29.9408],
  'Mersin': [36.8000, 34.6333],
  'mersin': [36.8000, 34.6333],
  'Diyarbakır': [37.9144, 40.2306],
  'diyarbakır': [37.9144, 40.2306],
  'Hatay': [36.2025, 36.1606],
  'hatay': [36.2025, 36.1606],
  'Manisa': [38.6191, 27.4289],
  'manisa': [38.6191, 27.4289],
  'Kayseri': [38.7205, 35.4826],
  'kayseri': [38.7205, 35.4826],
  'Samsun': [41.2867, 36.3300],
  'samsun': [41.2867, 36.3300],
  'Balıkesir': [39.6484, 27.8826],
  'balıkesir': [39.6484, 27.8826],
  'Kahramanmaraş': [37.5753, 36.9228],
  'kahramanmaraş': [37.5753, 36.9228],
  'Van': [38.4942, 43.3800],
  'van': [38.4942, 43.3800],
  'Aydın': [37.8560, 27.8416],
  'aydın': [37.8560, 27.8416],
  // Default coordinates for Turkey if city is not found
  'default': [39.9334, 32.8597], // Ankara (center of Turkey)
};

// Add some random offset to the coordinates to simulate district-level precision
// This is just for demonstration purposes
const getDistrictOffset = (district: string): [number, number] => {
  // Use the district name to generate a consistent offset
  const hash = district.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const latOffset = (hash % 20) * 0.01 - 0.1; // -0.1 to 0.1 degrees
  const lngOffset = ((hash * 31) % 20) * 0.01 - 0.1; // -0.1 to 0.1 degrees
  return [latOffset, lngOffset];
};

const LocationMap: React.FC<LocationMapProps> = ({ city, district, className = '' }) => {
  const defaultPosition: [number, number] = [39.9334, 32.8597]; // Ankara coordinates
  const [position, setPosition] = useState<[number, number]>(defaultPosition);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Get the base coordinates for the city
      const normalizedCity = city as CityKey;
      const cityCoords = CITY_COORDINATES[normalizedCity] || CITY_COORDINATES[normalizedCity.toLowerCase() as CityKey] || CITY_COORDINATES['default'];
      
      if (!city || !district) {
        setError('Konum bilgisi eksik');
        setIsLoading(false);
        return;
      }
      
      // Add a small offset based on the district name to simulate more precise location
      const [latOffset, lngOffset] = getDistrictOffset(district);
      const adjustedCoords: [number, number] = [
        cityCoords[0] + latOffset,
        cityCoords[1] + lngOffset
      ];
      
      setPosition(adjustedCoords);
      setError(null);
    } catch (err) {
      console.error('Error setting map position:', err);
      setError('Harita yüklenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  }, [city, district]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-full bg-gray-100 rounded-lg ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center h-full bg-gray-100 rounded-lg ${className}`}>
        <div className="text-gray-500">{error}</div>
      </div>
    );
  }

  return (
    <div className={`${className} overflow-hidden rounded-lg`}>
      <MapContainer 
        center={position} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            {district}, {city}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap; 