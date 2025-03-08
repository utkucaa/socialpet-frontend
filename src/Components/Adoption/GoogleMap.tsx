import React from 'react';

interface GoogleMapProps {
  city: string;
  district: string;
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ city, district, className = '' }) => {
  // Şehir ve ilçe bilgilerini birleştirerek arama sorgusu oluştur
  const query = encodeURIComponent(`${district}, ${city}, Turkey`);
  
  // API anahtarını çevre değişkeninden al veya varsayılan değeri kullan
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8';
  
  // Google Maps embed URL'ini oluştur
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}&zoom=13&language=tr`;
  
  return (
    <div className={`${className} overflow-hidden rounded-lg`}>
      <iframe
        title="Google Maps"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={mapUrl}
        allowFullScreen
      />
    </div>
  );
};

export default GoogleMap; 