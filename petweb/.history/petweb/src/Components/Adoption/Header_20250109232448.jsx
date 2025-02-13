import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      {/* Navigasyon Menüsü */}
      <nav className="nav">
        <ul>
          <li>•Barınaklara Bağış</li>
          <li>•Veteriner Klinikleri</li>
          <li>•PetShop</li>
          <li>•Yardım ve Bilgi</li>
          <li>•Fotoğraf Yarışması</li>
        </ul>
      </nav>

      <img src="/sahiplen.jpg" alt="Sahiplen Arka Plan" className="header-image" />
      <div className="header-content">
        <h1 className="title">Yuva Arayanlar</h1>
        <p className="subtitle">
          Onlar aşk, dost, arkadaş, mutluluk. Siz de onların şansı
          olabilirsiniz.
        </p>
        <div className="search-container">
          <div className="search-field">
            <select id="pet">
              <option>Hangi Pet?</option>
              <option>Kedi</option>
              <option>Köpek</option>
            </select>
          </div>
          <div className="search-field">
            <select>
              <option>Hangi Şehir?</option>
              <option>İstanbul</option>
              <option>Ankara</option>
            </select>
          </div>
          <button className="ara">Ara</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
