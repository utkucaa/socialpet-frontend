import React from 'react';
import './LostIntro.css';

const LostIntro = () => {
  return (
    <div className="lost-intro">
      <img src="/kayıp.jpg" alt="Kaybolan Evcil Hayvan" className="introImage" />
      <h1>Kaybolan Evcil Hayvanınızı Bulun</h1>
      <h1>Kayıp Hayvanlarınızı Hızla Bulun!</h1>
      <p>SocialPet kayıp hayvanlarınızın bulunmasına yardımcı olur.</p>
    </div>
  );
};

export default LostIntro;