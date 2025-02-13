import React from 'react';
import './CategoryBar.css';

const CategoryBar = () => {
  return (
    <div className="category-bar">
      <button>Kedi</button>
      <button>Köpek</button>
      <button>Papağan</button>
      <button>Muhabbet Kuşu</button>
      <button className="lost-button">Kayıp İlanı Ver</button>
    </div>
  );
};

export default CategoryBar;