import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <img src="/foto.jpg" alt="Sahiplen Arka Plan" className="header-image" />
      <div className="header-content">
        <h1 className="title">Yuva Arayanlar</h1>
        <p className="subtitle">
          Onlar aşk, dost, arkadaş, mutluluk. Siz de onların şansı
          olabilirsiniz.
        </p>
        <div className="search-container">
          <div className="search-field">
            <label>Hangi Pet?</label>
            <select>
              <option>Seçiniz</option>
              <option>Kedi</option>
              <option>Köpek</option>
            </select>
          </div>
          <div className="search-field">
            <label>Hangi Şehir?</label>
            <select>
              <option>Seçiniz</option>
              <option>İstanbul</option>
              <option>Ankara</option>
            </select>
          </div>
          <button className="search-button">Ara</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
