import React from 'react';
import './LostItemList.css';

const LostItemsList = () => {
  const lostItems = [
    { id: 1, name: 'Minnoş', type: 'Kedi', location: 'İstanbul' },
    { id: 2, name: 'Karabaş', type: 'Köpek', location: 'Ankara' },
  ];

  return (
    <div className="lost-items-list">
      <h2>Kayıp Hayvanlar</h2>
      <ul>
        {lostItems.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.type} - {item.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LostItemsList;