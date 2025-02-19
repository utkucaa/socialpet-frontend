import React from 'react';
import './CategorySection.css';

const CategorySections = () => {
  const categories = [
    { id: 1, name: 'Kediler', background: '/assets/cat-bg.jpg' },
    { id: 2, name: 'Köpekler', background: '/assets/dog-bg.jpg' },
  ];

  return (
    <div className="category-sections">
      {categories.map((category) => (
        <div
          key={category.id}
          className="category-section"
          style={{ backgroundImage: `url(${category.background})` }}
        >
          <h2>{category.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default CategorySections;
