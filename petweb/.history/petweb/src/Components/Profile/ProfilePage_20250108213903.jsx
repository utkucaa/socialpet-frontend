import React from 'react';
import './ProfilePage.css';

const ProfilePage = ({ user }) => {
  return (
    <div className="profile-container">
      {/* Top Profile Section */}
      <div className="profile-header-section">
        <div className="profile-left">
          <img src="/avatar-placeholder.png" alt="Profile" className="profile-image" />
        </div>
        <div className="profile-info">
          <div className="user-name-section">
            <h2>Utku</h2>
            <span className="user-type">BİREYSEL ÜYE</span>
            <span className="membership-status">ÜCRETSİZ START</span>
          </div>
          <p className="membership-date">Üyelik Tarihi: 29 Ekim 2024</p>
          <div className="action-buttons">
            <button className="update-profile-btn">Profil Güncelle</button>
            <button className="add-listing-btn">+ İlan Ekle</button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-container">
        <div className="stat-box blue">
          <h3>Toplam İlan</h3>
          <span className="stat-number">0</span>
        </div>
        <div className="stat-box green">
          <h3>Aktif İlan</h3>
          <span className="stat-number">0</span>
        </div>
        <div className="stat-box orange">
          <h3>Görüntülenme</h3>
          <span className="stat-number">0</span>
        </div>
        <div className="stat-box teal">
          <h3>Üyelik Tarihi</h3>
          <span className="stat-date">29 Ekim 2024</span>
        </div>
      </div>

      {/* User Limits Section */}
      <div className="limits-container">
        <div className="limit-box red">
          <h3>Üye İlan Kredisi:</h3>
        </div>
        <div className="limit-box blue">
          <h3>Fotoğraf Limiti:</h3>
          <span>5</span>
        </div>
        <div className="limit-box orange">
          <h3>Anında Onay:</h3>
          <span>Hayır</span>
        </div>
        <div className="limit-box yellow">
          <h3>Kategori Limiti:</h3>
          <span>10000</span>
        </div>
        <div className="limit-box teal">
          <h3>Üyelik Tarihi:</h3>
          <span>29 Ekim 2024</span>
        </div>
      </div>

      {/* Alert Message */}
      <div className="alert-message">
        <span>İlan krediniz tükendi. Yeni bir ilan eklemek için öncelikle ilan paketi satın almalısınız. Paket satın almak için </span>
        <a href="#">Buraya</a>
        <span> tıklayın.</span>
      </div>

      {/* Content Area */}
      <div className="content-area">
        <div className="sidebar">
          <h3>Size Özel Menü</h3>
          <ul>
            <li>Profilim</li>
            <li>Paket Satın Al</li>
            <li>Mesajlarım</li>
            <li>Bildirimlerim</li>
          </ul>
        </div>
        <div className="main-content">
          <div className="no-listings">
            İlan bulunamadı.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;