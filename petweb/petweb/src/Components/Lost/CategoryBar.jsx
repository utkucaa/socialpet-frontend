import React from 'react';
import './CategoryBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faDove, faCrow } from '@fortawesome/free-solid-svg-icons';

const CategoryBar = () => {
  const scrollToCategory = (category) => {
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="category-bar">
      <span className="category-text" onClick={() => scrollToCategory('cats')}>
        <FontAwesomeIcon icon={faPaw} style={{ marginRight: '8px' }} />
        Kedi
      </span>
      <span className="category-text" onClick={() => scrollToCategory('dogs')}>
        <FontAwesomeIcon icon={faPaw} style={{ marginRight: '8px' }} />
        Köpek
      </span>
      <span className="category-text" onClick={() => scrollToCategory('parrots')}>
        <FontAwesomeIcon icon={faCrow} style={{ marginRight: '8px' }} />
        Papağan
      </span>
      <span className="category-text" onClick={() => scrollToCategory('budgies')}>
        <FontAwesomeIcon icon={faDove} style={{ marginRight: '8px' }} />
        Muhabbet Kuşu
      </span>
      <button className="lost-button"> + Kayıp İlanı Ver</button>
    </div>
  );
};

export default CategoryBar;
