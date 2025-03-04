import React from 'react';
import './CallToAction.css';
import { Link } from 'react-router-dom';

const CallToAction: React.FC = () => {
  return (
    <div 
    className="call-to-action"
    style={{
        backgroundImage: 'url(/buton.jpg)', // Arka plan resmi burada ayarlanıyor
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      }}
    >
    <h2>Tıkla ve SocialPet'e İlan Gönder!</h2>
    <p>
      Hemen şimdi, "kayıp" veya "sahibi aranıyor" etiketi ile ilan gönder, 
      binlerce kişiye ücretsiz ulaşsın!
    </p>
    <Link to="/lost/create">
    <button className="cta-button">
      Tıkla İlan Gönder
    </button>
    </Link>
    </div>
  );
};

export default CallToAction;