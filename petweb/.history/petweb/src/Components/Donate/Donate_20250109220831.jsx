import React from 'react';
import './Donate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faUniversity } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

const Donate = () => {
  const donationCards = [
    {
      name: "HAYTAP",
      image: "/haytap.png",
      phone: "0212 xxx xx xx",
      iban: "TR xx xxxx xxxx xxxx xxxx",
      instagram: "@haytap"
    },
    {
      name: "Petlebi Derneği",
      image: "/hayvan2.jpg",
      phone: "0216 xxx xx xx",
      iban: "TR xx xxxx xxxx xxxx xxxx",
      instagram: "@petlebi"
    },
    {
      name: "Pati Dostları",
      image: "/hayvan3.jpg",
      phone: "0232 xxx xx xx",
      iban: "TR xx xxxx xxxx xxxx xxxx",
      instagram: "@patidostlari"
    }
  ];

  return (
    <div className="main-container">
      {/* Üst Kısım - Resimli Alan */}
      <div className="hero-section">
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
        <div className="hero-content">
          <div className="title-box">
            <h1>Barınaklara Bağış</h1>
          </div>
          <div className="subtitle-box">
            <h2>Bağışınızla Umut Işığı Olun</h2>
          </div>
          <div className="select-container">
            <select>
              <option>Ocak 2025 Bağış Kampanyası</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alt Kısım - Bilgilendirme ve Kartlar */}
      <div className="content-section">
        <div className="info-section">
          <h2>BAĞIŞ ALAN KURUMLAR</h2>
        </div>
        
        <div className="donation-cards-container">
          {donationCards.map((card, index) => (
            <div key={index} className="donation-card">
              <h3 className="card-title">{card.name}</h3>
              <div className="card-image">
                <img src={card.image} alt={card.name} />
              </div>
              <div className="card-info">
                <p> <FontAwesomeIcon icon={faPhone} /> {card.phone}</p>
                <p><FontAwesomeIcon icon={faUniversity} /> {card.iban}</p>
                <p><FontAwesomeIcon icon={faInstagram} /> {card.instagram}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Donate;