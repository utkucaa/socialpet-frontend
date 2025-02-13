import React from 'react';
import './CategoryBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';


const CategoryBar = () => {
  return (
    <div className="category-bar">
      <button>
      <FontAwesomeIcon icon={faCat} style={{ marginRight: '8px' }} />
        Kedi</button>
      <button>Köpek</button>
      <button>Papağan</button>
      <button>Muhabbet Kuşu</button>
      <button className="lost-button">Kayıp İlanı Ver</button>
    </div>
  );
};

export default CategoryBar;