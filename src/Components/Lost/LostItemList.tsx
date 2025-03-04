import React, { useState, useEffect } from 'react';
import LostItemCard from './LostItemCard';
import lostPetService from '../../services/lostPetService';
import './LostItemList.css';

interface LostAnimal {
  id: number | string;
  title: string;
  image: string;
  location: string;
  timestamp: number;
  timeAgo: string;
  animalType: string;
  details: string;
  status: string;
  additionalInfo: string;
}

interface ApiListing {
  id?: number;
  title?: string;
  image?: string;
  location?: string;
  timestamp?: number;
  animalType?: string;
  details?: string;
  status?: string;
  additionalInfo?: string;
}

const LostItemList: React.FC = () => {
  const [lostAnimals, setLostAnimals] = useState<LostAnimal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} gün önce`;
    if (hours > 0) return `${hours} saat önce`;
    if (minutes > 0) return `${minutes} dakika önce`;
    return 'Az önce';
  };

  useEffect(() => {
    // localStorage'dan ilanları al
    const savedListings = JSON.parse(localStorage.getItem('lostAnimals') || '[]') as LostAnimal[];
    
    // API'den ilanları çek
    const fetchListings = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const apiListings = await lostPetService.getLostPets();
        
        // API'den gelen ilanları formatlayarak birleştir
        const formattedApiListings: LostAnimal[] = apiListings.map((listing: ApiListing) => ({
          id: listing.id || Date.now(),
          title: listing.title || 'İsimsiz İlan',
          image: listing.image || '/default-image.jpg',
          location: listing.location || 'Konum belirtilmedi',
          timestamp: listing.timestamp || Date.now(),
          timeAgo: getTimeAgo(listing.timestamp || Date.now()),
          animalType: listing.animalType || 'Belirtilmedi',
          details: listing.details || '',
          status: listing.status || 'kayip',
          additionalInfo: listing.additionalInfo || 'bos'
        }));

        // localStorage'daki ilanları formatla
        const formattedLocalListings: LostAnimal[] = savedListings.map(listing => ({
          ...listing,
          timestamp: listing.timestamp || Date.now(),
          timeAgo: getTimeAgo(listing.timestamp || Date.now())
        }));

        // localStorage ve API'den gelen ilanları birleştir
        const allListings = [...formattedLocalListings, ...formattedApiListings];
        
        // Tarihe göre sırala (en yeniler üstte)
        const sortedListings = allListings.sort((a, b) => b.timestamp - a.timestamp);
        
        setLostAnimals(sortedListings);
        setError(null);
      } catch (error) {
        console.error('Error fetching lost pets:', error);
        setError('İlanlar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (isLoading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="lost-item-list">
      <div className="category" id="all-animals">
        <h2>Son Kayıp Hayvanlar</h2>
        <button className="view-all-btn">Bütün İlanları Görüntüle</button>
        <div className="item-cards">
          {lostAnimals.map((item) => (
            <LostItemCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LostItemList;

