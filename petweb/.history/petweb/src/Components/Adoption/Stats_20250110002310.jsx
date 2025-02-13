import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Stats.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faShareNodes, faChartSimple } from '@fortawesome/free-solid-svg-icons';

const Stats = () => {
  const navigate = useNavigate();
  const [recentAds, setRecentAds] = useState([]);
  const [adDetails, setAdDetails] = useState({
    petName: "",
    breed: "",
    imageUrl: "",
  });

  // Backend'den ilanları al
  useEffect(() => {
    // Yeni ilanları al
    fetch("http://localhost:8080/api/ads/recent")  // URL'e http:// eklemeyi unutma
      .then((response) => response.json())
      .then((data) => setRecentAds(data))  // İlanları state'e kaydet
      .catch((error) => console.error("Hata:", error));
  }, []);

  const handleCreateAdClick = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/api/ads/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...adDetails,
        user: { id:12 },
        createdAt: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      fetchRecentAds(); 
      navigate("/created-ad");  
    } else {
      console.error("İlan eklenemedi");
    }
  };

  const fetchRecentAds = () => {
    fetch("http://localhost:8080/api/ads/recent")
      .then((response) => response.json())
      .then((data) => setRecentAds(data))
      .catch((error) => console.error("Hata:", error));
  };

   const handleAdClick = (ad) => {
    navigate(`/ad-detail/${ad.id}`, { state: { ad } });
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
            Sahipsiz, yeni bir yuvaya ihtiyaç duyan kedi ve köpeklerin ilanlarını siz de socialpet.com'da ücretsiz yayınlayabilirsiniz.
          </p>
          <button className="adoption-button" onClick={handleCreateAdClick}>+ Sahiplendirme İlanı Ver</button>
        </div>
<div className="recent-ads">
  <h2 className="recent-ads-title">Yeni İlanlar</h2>
  <ul className="ads-list">
    {recentAds.length > 0 ? (
      recentAds.map((ad) => (
        <li key={ad.id} className="ad-item">
          <Link to={`/ad/${ad.id}`} className="ad-link">
            {ad.imageUrl && <img src={ad.imageUrl} alt={ad.petName} />}
            <div className="ad-info">
              <h3>{ad.petName}</h3>
              <p className="ad-breed">Cinsi: {ad.breed}</p>
              <p className="ad-location">{ad.location}</p>
              <p className="ad-date">{new Date(ad.createdAt).toLocaleDateString()}</p>
            </div>
          </Link>
        </li>
      ))
    ) : (
      <p>Yeni ilan yok.</p>
    )}
  </ul>
</div>
      </div>
    </>
  );
};

export default Stats;
