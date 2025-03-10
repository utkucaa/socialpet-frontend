import React from 'react';
import { Link } from 'react-router-dom';
import './LostItemCard.css';

interface LostItemCardProps {
  id: string | number;
  title: string;
  image: string;
  location: string;
  timeAgo: string;
  animalType: string;
}

const LostItemCard: React.FC<LostItemCardProps> = ({ 
  id,
  title, 
  image, 
  location, 
  timeAgo, 
  animalType 
}) => {
  return (
    <div className="lost-item-card">
      <div className="listing-image">
        <img src={image} alt={title} className="item-image" />
      </div>
      <div className="item-info">
        <h3>{title}</h3>
        <p className="pet-type">{animalType}</p>
        <p className="location">{location}</p>
        <p className="time-ago">{timeAgo} ilan verildi</p>
        <Link to={`/lost/${id}`} className="cta-button">
          İlanı Görüntüle
        </Link>
      </div>
    </div>
  );
};

export default LostItemCard;
