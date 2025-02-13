import React from 'react';
import './Donate.css';

const Donate = () => {
    const donationCards = [
        {
          name: "HAYTAP",
          image: "/hayvan1.jpg",
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
    <div className="donate-container">
      <nav className="nav-menu">
        <ul>
          <li>Barınaklara Bağış</li>
          <li>Veteriner Klinikleri</li>
          <li>Soru Cevap</li>
          <li>Fotoğraf Yarışması</li>
        </ul>
      </nav>
      <div className="donate-content">
        <div className="title-box">
          <h1>Barınaklara Bağış</h1>
        </div>
        <div className="subtitle-box">
          <h2>Bağışınızla Umut Işığı Olun</h2>
        </div>
      </div>
      <div className="donation-cards-container">
        {donationCards.map((card, index) => (
          <div key={index} className="donation-card">
            <h3 className="card-title">{card.name}</h3>
            <div className="card-image">
              <img src={card.image} alt={card.name} />
            </div>
            <div className="card-info">
              <p><i className="fas fa-phone"></i> {card.phone}</p>
              <p><i className="fas fa-university"></i> {card.iban}</p>
              <p><i className="fab fa-instagram"></i> {card.instagram}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Donate;