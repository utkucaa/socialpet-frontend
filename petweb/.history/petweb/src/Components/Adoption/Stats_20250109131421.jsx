import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Stats.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faShareNodes, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import AdDetail from "./AdDetail";

const Stats = () => {
  const navigate = useNavigate();
  const [recentAds, setRecentAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [showAdDetail, setShowAdDetail] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/ads/recent")
      .then((response) => response.json())
      .then((data) => setRecentAds(data))
      .catch((error) => console.error("Hata:", error));
  }, []);

  const handleAdClick = (ad) => {
    setSelectedAd(ad);
    setShowAdDetail(true);
  };

  const handleBackToList = () => {
    setShowAdDetail(false);
    setSelectedAd(null);
  };

  // Detay gösterme
  if (showAdDetail && selectedAd) {
    return <AdDetail ad={selectedAd} onBack={handleBackToList} />;
  }

  return (
    <>
      <section className="stats">
        <div className="stat-item">
          <h3>
            <FontAwesomeIcon icon={faHouseChimney} style={{ marginRight: '10px' }} />
            163.959 YUVA
          </h3>
          <p>163.959 PATİLİ DOSTUMUZ, SOCIALPET'DE YUVA BULDU ÇOK MUTLUYUZ!</p>
        </div>
        <div className="stat-item">
          <h3>
            <FontAwesomeIcon icon={faShareNodes} />
            94.568 PAYLAŞIM
          </h3>
          <p>İLANLARIMIZ SOSYAL MEDYADA 94.568 KERE PAYLAŞILDI.</p>
        </div>
        <div className="stat-item">
          <h3>
            <FontAwesomeIcon icon={faChartSimple} />
            23.345.678 GÖSTERİM
          </h3>
          <p>İLANLARIMIZ 23.345.678 KERE GÖRÜNTÜLENDİ, MİLYONLARA ULAŞTI.</p>
        </div>
      </section>

      <div className="adoption-section">
        <div className="new-adoption">
          <h2 className="adoption-title">Yeni Sahiplendirme İlanı</h2>
          <p className="adoption-text">
            Sahipsiz, yeni bir yuvaya ihtiyaç duyan kedi ve köpeklerin ilanlarını siz de socialpet.com'da ücretsiz yayınlayabilirsiniz.
          </p>
          <button className="adoption-button">+ Sahiplendirme İlanı Ver</button>
        </div>

        <div className="recent-ads">
          <h2 className="recent-ads-title">Yeni İlanlar</h2>
          <ul className="ads-list">
            {recentAds.length > 0 ? (
              recentAds.map((ad) => (
                <li key={ad.id} onClick={() => handleAdClick(ad)} className="ad-item">
                  {ad.imageUrl && <img src={ad.imageUrl} alt={ad.petName} />}
                  <div className="ad-info">
                    <h3>{ad.petName}</h3>
                    <p className="ad-breed">Cinsi: {ad.breed}</p>
                    <p className="ad-location">{ad.location}</p>
                    <p className="ad-date">{new Date(ad.createdAt).toLocaleDateString()}</p>
                  </div>
                </li>
              ))
            ) : (
              <p>Yeni ilan bulunamadı.</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Stats;
