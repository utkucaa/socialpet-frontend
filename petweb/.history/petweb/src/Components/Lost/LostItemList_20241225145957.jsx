import React from 'react';
import LostItemCard from './LostItemCard';
import './LostItemList.css';

const LostItemList = () => {
  const lostCats = [
    { id: 1, title: 'Kayıp Kedi 1', image: '/cat1.jpg', location: 'Konya', daysAgo: 5, animalType: 'Kedi' },
    { id: 2, title: 'Kayıp Kedi 2', image: '/cat2.jpg', location: 'İstanbul', daysAgo: 3, animalType: 'Kedi' },
    { id: 3, title: 'Kayıp Kedi 3', image: '/cat3.jpg', location: 'Ankara', daysAgo: 2, animalType: 'Kedi' },
    { id: 4, title: 'Kayıp Kedi 4', image: '/cat4.jpg', location: 'İzmir', daysAgo: 1, animalType: 'Kedi' },
  ];

  const lostDogs = [
    { id: 1, title: 'Kayıp Köpek 1', image: '/dog1.jpg', location: 'Bursa', daysAgo: 4, animalType: 'Köpek' },
    { id: 2, title: 'Kayıp Köpek 2', image: '/dog2.jpg', location: 'Adana', daysAgo: 6, animalType: 'Köpek' },
    { id: 3, title: 'Kayıp Köpek 3', image: '/dog3.jpg', location: 'Mersin', daysAgo: 2, animalType: 'Köpek' },
    { id: 4, title: 'Kayıp Köpek 4', image: '/dog4.jpg', location: 'Antalya', daysAgo: 5, animalType: 'Köpek' },
  ];

  const lostParrots = [
    { id: 1, title: 'Kayıp Papağan 1', image: '/parrot1.jpg', location: 'Bolu', daysAgo: 7, animalType: 'Papağan' },
    { id: 2, title: 'Kayıp Papağan 2', image: '/parrot2.jpg', location: 'Bursa', daysAgo: 3, animalType: 'Papağan' },
    { id: 3, title: 'Kayıp Papağan 3', image: '/parrot3.jpg', location: 'Muğla', daysAgo: 1, animalType: 'Papağan' },
    { id: 4, title: 'Kayıp Papağan 4', image: '/parrot4.jpg', location: 'Aydın', daysAgo: 6, animalType: 'Papağan' },
  ];

  const lostBudgies = [
    { id: 1, title: 'Kayıp Muhabbet Kuşu 1', image: '/budgie1.jpg', location: 'Tekirdağ', daysAgo: 4, animalType: 'Muhabbet Kuşu' },
    { id: 2, title: 'Kayıp Muhabbet Kuşu 2', image: '/budgie2.jpg', location: 'Edirne', daysAgo: 3, animalType: 'Muhabbet Kuşu' },
    { id: 3, title: 'Kayıp Muhabbet Kuşu 3', image: '/budgie3.jpg', location: 'Sakarya', daysAgo: 2, animalType: 'Muhabbet Kuşu' },
    { id: 4, title: 'Kayıp Muhabbet Kuşu 4', image: '/budgie4.jpg', location: 'Kocaeli', daysAgo: 5, animalType: 'Muhabbet Kuşu' },
  ];

  return (
    <div className="lost-item-list">
      <h1>Son Kayıp İlanlar</h1>
      
      <div className="category">
        <h2>Son Kayıp Kediler</h2>
        <div className="item-cards">
          {lostCats.map((item) => (
            <LostItemCard key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div className="category">
        <h2>Son Kayıp Köpekler</h2>
        <div className="item-cards">
          {lostDogs.map((item) => (
            <LostItemCard key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div className="category">
        <h2>Son Kayıp Papağanlar</h2>
        <div className="item-cards">
          {lostParrots.map((item) => (
            <LostItemCard key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div className="category">
        <h2>Son Kayıp Muhabbet Kuşları</h2>
        <div className="item-cards">
          {lostBudgies.map((item) => (
            <LostItemCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LostItemList;
