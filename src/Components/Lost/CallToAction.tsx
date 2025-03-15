import React from 'react';
import './CallToAction.css';
import { Link } from 'react-router-dom';
import { FaPaw, FaArrowRight } from 'react-icons/fa';

const CallToAction: React.FC = () => {
  return (
    <div className="cta-container">
      <div className="cta-card">
        <div className="cta-content">
          <div className="cta-icon">
            <FaPaw />
          </div>
          <h2>Kayıp Dostunuzu Bulalım!</h2>
          <p>
            Evcil hayvanınızı mı kaybettiniz? Hemen ücretsiz ilan verin ve binlerce SocialPet kullanıcısına ulaşın. Kayıp dostunuzu bulmanıza yardımcı olalım!
          </p>
          <Link to="/lost/create" className="cta-button-link">
            <span>İlan Oluştur</span>
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;