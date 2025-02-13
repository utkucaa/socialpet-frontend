import React from 'react';
import './CategoryBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faDove, faCrow } from '@fortawesome/free-solid-svg-icons';

const CategoryBar = () => {
  return (
    <div className="category-bar">
      <span className="category-text">
        <a href="#lost-cats">
          <FontAwesomeIcon icon={faPaw} style={{ marginRight: '8px' }} />
          Kedi
        </a>
      </span>
      <span className="category-text">
        <a href="#lost-dogs">
          <FontAwesomeIcon icon={faPaw} style={{ marginRight: '8px' }} />
          Köpek
        </a>
      </span>
      <span className="category-text">
        <a href="#lost-parrots">
          <FontAwesomeIcon icon={faCrow} style={{ marginRight: '8px' }} />
          Papağan
        </a>
      </span>
      <span className="category-text">
        <a href="#lost-lovebirds">
          <FontAwesomeIcon icon={faDove} style={{ marginRight: '8px' }} />
          Muhabbet Kuşu
        </a>
      </span>
      <button className="lost-button"> + Kayıp İlanı Ver</button>
    </div>
  );
};

export default CategoryBar;
