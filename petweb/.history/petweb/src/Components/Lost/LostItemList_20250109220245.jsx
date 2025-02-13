import React from 'react';
import LostItemCard from './LostItemCard';
import './LostItemList.css';

const LostItemList = () => {
  const lostCats = [
    { id: 1, title: 'Kayıp Kedi 1', image: '/cat1.jpg', location: 'Konya', daysAgo: 5, animalType: 'Kedi' },
    // Diğer kediler...
  ];

  const lostDogs = [
    { id: 1, title: 'Kayıp Köpek 1', image: '/dog1.jpg', location: 'Bursa', daysAgo: 4, animalType: 'Köpek' },
    // Diğer köpekler...
  ];

  const lostParrots = [
    { id: 1, title: 'Kayıp Papağan 1', image: '/parrot1.jpg', location: 'Bolu', daysAgo: 7, animalType: 'Papağan' },
    // Diğer papağanlar...
  ];

  const lostBudgies = [
    { id: 1, title: 'Kayıp Muhabbet Kuşu 1', image: '/budgie1.jpg', location: 'Tekirdağ', daysAgo: 4, animalType: 'Muhabbet Kuşu' },
    // Diğer muhabbet kuşları...
  ];

  return (
    <div className="lost-item-list">
      <h1>Son Kayıp İlanlar</h1>

      <div className="category" id="cats">
        <h2>Son Kayıp Kediler</h2>
        <button className="view-all-btn">Bütün Kedi İlanlarını Görüntüle</button>
        <div className="item-cards">
          {lostCats.map((item) => (
            <LostItemCard key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div className="category" id="dogs">
        <h2>Son Kayıp Köpekler</h2>
        <button className="view-all-btn">Bütün Köpek İlanlarını Görüntüle</button>
        <div className="item-cards">
          {lostDogs.map((item) => (
            <LostItemCard key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div className="category" id="parrots">
        <h2>Son Kayıp Papağanlar</h2>
        <button className="view-all-btn">Bütün Papağan İlanlarını Görüntüle</button>
        <div className="item-cards">
          {lostParrots.map((item) => (
            <LostItemCard key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div className="category" id="budgies">
        <h2>Son Kayıp Muhabbet Kuşları</h2>
        <button className="view-all-btn">Bütün Muhabbet Kuşu İlanlarını Görüntüle</button>
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

