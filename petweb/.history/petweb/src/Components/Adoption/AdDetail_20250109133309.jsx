import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './AdDetail.css';

const AdDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the ad from the location state
  const ad = location.state?.ad;
  
  // If no ad is found, return an error message
  if (!ad) {
    return <p>İlan bulunamadı.</p>;
  }

  const handleBack = () => {
    navigate(-1);  // Navigate to the previous page
  };

  return (
    <div className="ad-detail-container">
      <button onClick={handleBack}>Geri</button>

      <div className="ad-images">
        <div className="main-image">
          <img src={ad.images[0]} alt={ad.title} />
        </div>
        <div className="thumbnail-images">
          {ad.images.map((image, index) => (
            <img key={index} src={image} alt={`Thumbnail ${index + 1}`} />
          ))}
        </div>
      </div>

      <div className="ad-info-container">
        <div className="ad-header">
          <h1>{ad.title}</h1>
          <div className="location-info">
            {ad.location.city} / {ad.location.district} / {ad.location.neighborhood}
          </div>
        </div>

        <div className="ad-details">
          <div className="detail-row">
            <span className="label">Türü:</span>
            <span className="value">{ad.type}</span>
          </div>
          <div className="detail-row">
            <span className="label">Cinsi:</span>
            <span className="value">{ad.breed}</span>
          </div>
          <div className="detail-row">
            <span className="label">İlan No:</span>
            <span className="value">{ad.adNumber}</span>
          </div>
          <div className="detail-row">
            <span className="label">İlan Tarihi:</span>
            <span className="value">{ad.adDate}</span>
          </div>
          <div className="detail-row">
            <span className="label">Yaş:</span>
            <span className="value">{ad.age}</span>
          </div>
          <div className="detail-row">
            <span className="label">Cinsiyet:</span>
            <span className="value">{ad.gender}</span>
          </div>
          <div className="detail-row">
            <span className="label">Durum:</span>
            <span className="value">{ad.status}</span>
          </div>
          <div className="detail-row">
            <span className="label">Aşı:</span>
            <span className="value">{ad.vaccination}</span>
          </div>
          <div className="detail-row">
            <span className="label">İç Parazit:</span>
            <span className="value">{ad.internalParasite}</span>
          </div>
          <div className="detail-row">
            <span className="label">Dış Parazit:</span>
            <span className="value">{ad.externalParasite}</span>
          </div>
          <div className="detail-row">
            <span className="label">Kredi Kartına Ödeme:</span>
            <span className="value">{ad.creditCardPayment}</span>
          </div>
          <div className="detail-row">
            <span className="label">Şehir Dışına Gönderim:</span>
            <span className="value">{ad.shipping}</span>
          </div>
        </div>

        <div className="contact-info">
          <button className="phone-button">0530 457 52 32</button>
          <button className="whatsapp-button">
            <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
          </button>
          <button className="message-button">
            <FontAwesomeIcon icon={faEnvelope} /> İlan Sahibine Mesaj Gönder
          </button>
        </div>

        <div className="ad-stats">
          <div>İlan WhatsApp'tan {ad.whatsappRequests} istek aldı</div>
          <div>{ad.views} kez görüntülendi</div>
        </div>
      </div>
    </div>
  );
};

export default AdDetail;
