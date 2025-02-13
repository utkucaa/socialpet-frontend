import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons';
import './AdDetail.css';

const AdDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/ads/${id}`)
      .then(response => response.json())
      .then(data => {
        setAd(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Hata:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (!ad) {
    return <div>İlan bulunamadı.</div>;
  }

  return (
    <div className="ad-detail-page">
      <div className="ad-detail-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} /> Geri
        </button>

        <div className="ad-content">
          <div className="ad-images">
            <div className="main-image">
              <img src={ad.imageUrl} alt={ad.title} />
            </div>
            {ad.additionalImages && (
              <div className="thumbnail-images">
                {ad.additionalImages.map((img, index) => (
                  <img key={index} src={img} alt={`Görsel ${index + 1}`} />
                ))}
              </div>
            )}
          </div>

          <div className="ad-info-container">
            <div className="ad-header">
              <h1>{ad.title}</h1>
              <div className="location-info">
                {ad.city} / {ad.district} / {ad.neighborhood}
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
      </div>
    </div>
  );
};

export default AdDetail;