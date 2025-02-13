import React from "react";
import "./Stats.css";

const Stats = () => {
  return (
    <section className="stats">
      <div className="stat-item">
        <h3>163.959 Yuva</h3>
        <p>163.959 Patili Dostumuz, SocialPet'de yuva buldu çok mutluyuz!</p>
      </div>
      <div className="stat-item">
        <h3>94.568 Paylaşım</h3>
        <p>İlanlarımız sosyal medyada 94.568 kere paylaşıldı.</p>
      </div>
      <div className="stat-item">
        <h3>23.345.678 Gösterim</h3>
        <p>İlanlarımız 23.345.678 kere görüntülendi, milyonlara ulaştı.</p>
      </div>
    </section>
  );
};

export default Stats;
