import React from 'react';
import './Donate.css';

const Donate = () => {
  return (
    <div className="donate-container">
      <div className="donate-overlay">
        <div className="donate-content">
          <h1 className="donate-title">Barınaklara Bağış</h1>
          <h2 className="donate-subtitle">HAYTAP & Petlebi İş Birliğiyle</h2>
          <select className="donate-select">
            <option>Ocak 2025 Bağış Kampanyası</option>
          </select>
        </div>
      </div>
      <h1 className="info-title">ÖNEMLİ BİLGİLENDİRME</h1>
    </div>
  );
};

export default Donate;