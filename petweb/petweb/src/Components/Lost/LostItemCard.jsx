import React from 'react';
import './LostItemCard.css';

const LostItemCard = ({ title, image, location, daysAgo, animalType }) => {
  return (
    <div className="lost-item-card">
      <img src={image} alt={title} className="item-image" />
      <div className="item-info">
        <h3>{title}</h3>
        <p>{animalType}</p>
        <p>{location}</p>
        <p>{daysAgo} gün önce ilan verildi</p>
        <button className="cta-button">İlanı Görüntüle</button>
      </div>
    </div>
  );
};

export default LostItemCard;
