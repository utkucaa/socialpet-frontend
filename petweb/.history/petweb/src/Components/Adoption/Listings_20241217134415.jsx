import React from "react";
import "./Listings.css";

const Listings = () => {
  return (
    <section className="listings">
      <h2>Yeni İlanlar</h2>
      <div className="listing-item">
        <img src="cat1.jpg" alt="Kediler" className="listing-img" />
        <p>Şirin Kedi</p>
      </div>
      <div className="listing-item">
        <img src="cat2.jpg" alt="Kediler" className="listing-img" />
        <p>Sevimli Kedi</p>
      </div>
      <div className="listing-item">
        <img src="dog1.jpg" alt="Köpekler" className="listing-img" />
        <p>Mutlu Köpek</p>
      </div>
    </section>
  );
};

export default Listings;
