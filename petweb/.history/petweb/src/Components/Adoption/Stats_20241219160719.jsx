import React from "react";
import { useNavigate } from "react-router-dom";
import "./Stats.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faShareNodes, faChartSimple} from '@fortawesome/free-solid-svg-icons';

const Stats = () => {
  const navigate = useNavigate(); // useNavigate kullanımı

  const handleCreateAdClick = () => {
    navigate("/create-ad"); // /create-ad rotasına yönlendirme
  };
  return (
    <>
    <section className="stats">
      <div className="stat-item">
  <h3><FontAwesomeIcon icon={faHouseChimney} style={{ marginRight: '10px' }} /> {/* İkon ve sağda boşluk */}
        163.959 YUVA</h3>
  <p>163.959 PATİLİ DOSTUMUZ, SOCIALPET'DE YUVA BULDU ÇOK MUTLUYUZ!</p>
</div>
<div className="stat-item">
  <h3> <FontAwesomeIcon icon={faShareNodes} /> 94.568 PAYLAŞIM</h3>
  <p>İLANLARIMIZ SOSYAL MEDYADA 94.568 KERE PAYLAŞILDI.</p>
</div>
<div className="stat-item">
  <h3><FontAwesomeIcon icon={faChartSimple} /> 23.345.678 GÖSTERİM</h3>
  <p>İLANLARIMIZ 23.345.678 KERE GÖRÜNTÜLENDİ, MİLYONLARA ULAŞTI.</p>
</div>
    </section>
    {/* Yeni Sahiplendirme İlanı Kısmı */}
    <div className="adoption-section">
        {/* Sol Taraf */}
        <div className="new-adoption">
          <h2 className="adoption-title">Yeni Sahiplendirme İlanı</h2>
          <p className="adoption-text">
            Sahipsiz, yeni bir yuvaya ihtiyaç duyan kedi ve köpeklerin ilanlarını siz de petlebi.com'da ücretsiz yayınlayabilirsiniz.
          </p>
          <button className="adoption-button" onClick={() => navigate('/create-ad')}>+ Sahiplendirme İlanı Ver</button>
        </div>

         {/* Sağ Taraf */}
      <div className="recent-ads">
        <h2 className="recent-ads-title">Yeni İlanlar</h2>
        <ul className="ads-list">
          <li>
            <img src="https://via.placeholder.com/150" alt="Pet" />
            <div className="ad-info">Sevimli Kedi</div>
            <div className="ad-breed">Cinsi: British Shorthair</div>
          </li>
          <li>
            <img src="https://via.placeholder.com/150" alt="Pet" />
            <div className="ad-info">Tatlı Köpek</div>
            <div className="ad-breed">Cinsi: Golden Retriever</div>
          </li>
          <li>
            <img src="https://via.placeholder.com/150" alt="Pet" />
            <div className="ad-info">Yavru Kedi</div>
            <div className="ad-breed">Cinsi: Tekir</div>
          </li>
          <li>
            <img src="https://via.placeholder.com/150" alt="Pet" />
            <div className="ad-info">Enerjik Köpek</div>
            <div className="ad-breed">Cinsi: Husky</div>
          </li>
        </ul>
      </div>
      </div>
    </>
  );
};

export default Stats;
