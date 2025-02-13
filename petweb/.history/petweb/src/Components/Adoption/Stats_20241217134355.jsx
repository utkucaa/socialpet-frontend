import React from "react";
import "./Stats.css";

const Stats = () => {
  return (
    <section className="stats">
      <div className="stat-item">
        <h3>163.959 Yuva</h3>
        <p>163.959 Patili Dostumuz, Petlebi'de yuva buldu çok mutluyuz!</p>
      </div>
      <div className="stat-item">
        <h3>10.055.225 Paylaşım</h3>
        <p>İlanlarımız sosyal medyada 10.055.225 kere paylaşıldı.</p>
      </div>
      <div className="stat-item">
        <h3>121.694.029 Gösterim</h3>
        <p>İlanlarımız 121.694.029 kere görüntülendi, milyonlara ulaştı.</p>
      </div>
    </section>
  );
};

export default Stats;
