import React from "react";
import "./Stats.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faShareNodes, faChartSimple} from '@fortawesome/free-solid-svg-icons';

const Stats = () => {
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
          <button className="adoption-button">+ Sahiplendirme İlanı Ver</button>
        </div>

        {/* Sağ Taraf */}
        <div className="recent-ads">
          <h2 className="recent-ads-title">Yeni İlanlar</h2>
          <ul className="ads-list">
            <li>İlan 1: Sevimli bir kedi yavrusu</li>
            <li>İlan 2: Oyuncu köpek arıyor</li>
            <li>İlan 3: Yavru kedi yuva arıyor</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Stats;
