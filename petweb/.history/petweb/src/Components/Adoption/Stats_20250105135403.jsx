import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Stats.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faShareNodes, faChartSimple } from '@fortawesome/free-solid-svg-icons';

const Stats = () => {
  const navigate = useNavigate();

  // Dinamik ilanlar için state
  const [recentAds, setRecentAds] = useState([]);
  const [adDetails, setAdDetails] = useState({
    petName: "",
    breed: "",
    imageUrl: "",
  });

  // Backend'den ilanları al
  useEffect(() => {
    // Yeni ilanları al
    fetch("localhost:8080/api/ads/recent")  // URL'e http:// eklemeyi unutma
      .then((response) => response.json())
      .then((data) => setRecentAds(data))  // İlanları state'e kaydet
      .catch((error) => console.error("Hata:", error));
  }, []);

  // Yeni ilan eklemek için fonksiyon
  const handleCreateAdClick = async (event) => {
    event.preventDefault();

    // POST isteği ile ilanı backend'e gönder
    const response = await fetch("localhost:8080/api/ads/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adDetails),
    });

    if (response.ok) {
      // İlan başarıyla kaydedildiyse, yeni ilanları almak için yeniden fetch et
      fetchRecentAds(); // Yeni ilanları al
      navigate("/adopt");  // Yönlendirme işlemi
    } else {
      console.error("İlan eklenemedi");
    }
  };

  // Yeni ilanları almak için fonksiyon
  const fetchRecentAds = () => {
    fetch("localhost:8080/api/ads/recent")
      .then((response) => response.json())
      .then((data) => setRecentAds(data))
      .catch((error) => console.error("Hata:", error));
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
        <div className="new-adoption">
          <h2 className="adoption-title">Yeni Sahiplendirme İlanı</h2>
          <p className="adoption-text">
            Sahipsiz, yeni bir yuvaya ihtiyaç duyan kedi ve köpeklerin ilanlarını siz de petlebi.com'da ücretsiz yayınlayabilirsiniz.
          </p>
          <button className="adoption-button" onClick={handleCreateAdClick}>+ Sahiplendirme İlanı Ver</button>
        </div>

        <div className="recent-ads">
          <h2 className="recent-ads-title">Yeni İlanlar</h2>
          <ul className="ads-list">
            {recentAds.length > 0 ? (
              recentAds.map((ad) => (
                <li key={ad.id}>
                  <img src={ad.imageUrl || "https://via.placeholder.com/150"} alt={ad.petName} />
                  <div className="ad-info">{ad.petName}</div>
                  <div className="ad-breed">Cinsi: {ad.breed}</div>
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
