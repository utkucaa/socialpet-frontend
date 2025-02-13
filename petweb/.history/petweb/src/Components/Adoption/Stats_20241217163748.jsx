import React from "react";
import "./Stats.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faShareNodes} from '@fortawesome/free-solid-svg-icons';

const Stats = () => {
  return (
    <section className="stats">
      <div className="stat-item">
  <h3><FontAwesomeIcon icon={faHouseChimney} style={{ marginRight: '10px' }} /> {/* İkon ve sağda boşluk */}
        163.959 YUVA</h3>
  <p>163.959 PATİLİ DOSTUMUZ, SOCIALPET'DE YUVA BULDU ÇOK MUTLUYUZ!</p>
</div>
<div className="stat-item">
  <h3>94.568 PAYLAŞIM</h3>
  <p>İLANLARIMIZ SOSYAL MEDYADA 94.568 KERE PAYLAŞILDI.</p>
</div>
<div className="stat-item">
  <h3>23.345.678 GÖSTERİM</h3>
  <p>İLANLARIMIZ 23.345.678 KERE GÖRÜNTÜLENDİ, MİLYONLARA ULAŞTI.</p>
</div>
    </section>
  );
};

export default Stats;
