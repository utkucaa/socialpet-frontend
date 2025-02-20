import React, { useState, useEffect } from 'react';
import LostItemCard from './LostItemCard';
import './LostItemList.css';

const LostItemList = () => {
  const [lostAnimals, setLostAnimals] = useState([]);

  // Zaman farkını hesaplayan yardımcı fonksiyon
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const postedTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - postedTime) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
      return 'Az önce';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} dakika önce`;
    } else if (diffInHours < 24) {
      return `${diffInHours} saat önce`;
    } else if (diffInDays < 7) {
      return `${diffInDays} gün önce`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} hafta önce`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} ay önce`;
    } else {
      const years = Math.floor(diffInDays / 365);
      return `${years} yıl önce`;
    }
  };

  useEffect(() => {
    // localStorage'dan ilanları al
    const savedListings = JSON.parse(localStorage.getItem('lostAnimals')) || [];
    
    // API'den ilanları çek
    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/lost-pets');
        if (!response.ok) {
          throw new Error('API isteği başarısız oldu');
        }
        const apiListings = await response.json();
        
        // API'den gelen ilanları formatlayarak birleştir
        const formattedApiListings = apiListings.map(listing => ({
          id: listing.id || Date.now(),
          title: listing.title || 'İsimsiz İlan',
          image: listing.image || '/default-image.jpg',
          location: listing.location || 'Konum belirtilmedi',
          timestamp: listing.timestamp || Date.now(), // Zaman damgası eklendi
          timeAgo: getTimeAgo(listing.timestamp || Date.now()), // Zaman farkı hesaplanıyor
          animalType: listing.animalType || 'Belirtilmedi',
          details: listing.details || '',
          status: listing.status || 'kayip',
          additionalInfo: listing.additionalInfo || 'bos'
        }));

        // localStorage'daki ilanları formatla
        const formattedLocalListings = savedListings.map(listing => ({
          ...listing,
          timestamp: listing.timestamp || Date.now(),
          timeAgo: getTimeAgo(listing.timestamp || Date.now())
        }));

        // localStorage ve API'den gelen ilanları birleştir
        const allListings = [...formattedLocalListings, ...formattedApiListings];
        
        // Tarihe göre sırala (en yeniler üstte)
        const sortedListings = allListings.sort((a, b) => b.timestamp - a.timestamp);
        
        setLostAnimals(sortedListings);
      } catch (error) {
        console.error('İlanlar çekilirken hata oluştu:', error);
        // Hata durumunda sadece localStorage'daki ilanları göster
        const formattedLocalListings = savedListings.map(listing => ({
          ...listing,
          timestamp: listing.timestamp || Date.now(),
          timeAgo: getTimeAgo(listing.timestamp || Date.now())
        }));
        setLostAnimals(formattedLocalListings);
      }
    };

    fetchListings();

    // Her dakika zaman bilgisini güncelle
    const interval = setInterval(() => {
      setLostAnimals(prevListings => 
        prevListings.map(listing => ({
          ...listing,
          timeAgo: getTimeAgo(listing.timestamp)
        }))
      );
    }, 60000); // 60 saniye

    return () => clearInterval(interval);
  }, []);

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

