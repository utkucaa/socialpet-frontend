import React from 'react';
import './CallToAction.css';

const CallToAction = () => {
  return (
    <div 
    className="call-to-action"
    style={{
        backgroundImage: 'url(/buton.jpg)', // Arka plan resmi burada ayarlanıyor
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
    <h2>Tıkla ve SocialPet'e İlan Gönder!</h2>
    <p>
      Hemen şimdi, "kayıp" veya "sahibi aranıyor" etiketi ile ilan gönder, 
      binlerce kişiye ücretsiz ulaşsın!
    </p>
    <button className="cta-button">
      Tıkla İlan Gönder
    </button>
    </div>
  );
};

export default CallToAction;