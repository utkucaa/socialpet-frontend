import React from 'react';
import './CategoryBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw , faDove} from '@fortawesome/free-solid-svg-icons';


const CategoryBar = () => {
  return (
    <div className="category-bar">
      <button>
      <FontAwesomeIcon icon={faPaw} style={{ marginRight: '8px' }} />
        Kedi
      </button>
      <button>
      <FontAwesomeIcon icon={faPaw} style={{ marginRight: '8px' }} />  
        Köpek
      </button>
      <button>
      <FontAwesomeIcon icon={faDove} style={{ marginRight: '8px' }} />
      Papağan
      </button>
      <button>
        Muhabbet Kuşu
      </button>
      <button className="lost-button">Kayıp İlanı Ver</button>
    </div>
  );
};

export default CategoryBar;