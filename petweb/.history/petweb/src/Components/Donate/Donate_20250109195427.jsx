import React from 'react';
import './Donate.css';

const Donate = () => {
  return (
    <div className="donate-container">
      <nav className="nav-menu">
        <ul>
          <li>Günün Fırsatları</li>
          <li>Barınaklara Bağış</li>
          <li>Veteriner Klinikleri</li>
          <li>Soru Cevap</li>
          <li>Fotoğraf Yarışması</li>
          <li>Blog</li>
        </ul>
      </nav>
      <div className="donate-content">
        <div className="title-box">
          <h1>Barınaklara Bağış</h1>
        </div>
        <div className="subtitle-box">
          <h2>HAYTAP & Petlebi İş Birliğiyle</h2>
        </div>
        
      </div>
      <div className="info-section">
        <h2>BAĞIŞ ALAN KURUMLAR</h2>
      </div>
    </div>
  );
};

export default Donate;