import React from 'react';
import './CategoryBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw , faDove , faCrow} from '@fortawesome/free-solid-svg-icons';


const CategoryBar = () => {
  return (
    <div className="category-bar">
      <span className="category-text">
        <FontAwesomeIcon icon={faPaw} style={{ marginRight: '8px' }} />
        Kedi
      </span>
      <span className="category-text">
        <FontAwesomeIcon icon={faPaw} style={{ marginRight: '8px' }} />
        Köpek
      </span>
      <span className="category-text">
        <FontAwesomeIcon icon={faCrow} style={{ marginRight: '8px' }} />
        Papağan
      </span>
      <span className="category-text">
        <FontAwesomeIcon icon={faDove} style={{ marginRight: '8px' }} />
        Muhabbet Kuşu
      </span>
      <button className="lost-button"> + Kayıp İlanı Ver</button>
    </div>
  );
};

export default CategoryBar;