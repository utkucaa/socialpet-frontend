import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Stats.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faShareNodes, faChartSimple } from '@fortawesome/free-solid-svg-icons';

const Stats = () => {
  const navigate = useNavigate();
  const [recentAds, setRecentAds] = useState([]);

  // Backend'den ilanları al
  useEffect(() => {
    fetch("http://localhost:8080/api/ads/recent")
      .then((response) => response.json())
      .then((data) => setRecentAds(data))
      .catch((error) => console.error("Hata:", error));
  }, []);

  // İlana tıklandığında detay sayfasına yönlendir
  const handleAdClick = (adId) => {
    navigate(`/adopt/${adId}`);
  };

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
        <div className="recent-ads">
          <h2 className="recent-ads-title">Yeni İlanlar</h2>
          <ul className="ads-list">
            {recentAds.length > 0 ? (
              recentAds.map((ad) => (
                <li key={ad.id} onClick={() => handleAdClick(ad.id)} className="ad-item">
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
