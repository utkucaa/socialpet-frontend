import React from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const userData = {
    name: "Utku",
    memberType: "BİREYSEL ÜYE",
    membershipDate: "29 Ekim 2024",
    stats: {
      totalAds: 0,
      activeAds: 0,
      views: 0
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          <img src="/default-avatar.png" alt="Profile" />
        </div>
        <div className="profile-info">
          <div className="user-details">
            <h2>{userData.name}</h2>
            <span className="member-type">{userData.memberType}</span>
            <span className="membership-status">ÜCRETSİZ START</span>
          </div>
          <div className="membership-date">
            Üyelik Tarihi: {userData.membershipDate}
          </div>
        </div>
        <div className="profile-actions">
          <button className="profile-update">Profil Güncelle</button>
          <button className="add-listing">İlan Ekle</button>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-label">Toplam İlan</span>
          <span className="stat-value">{userData.stats.totalAds}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Aktif İlan</span>
          <span className="stat-value">{userData.stats.activeAds}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Görüntülenme</span>
          <span className="stat-value">{userData.stats.views}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Üyelik Tarihi</span>
          <span className="stat-value">{userData.membershipDate}</span>
        </div>
      </div>

      <div className="profile-menu">
        <h3>Size Özel Menü</h3>
        <ul>
          <li>Profilim</li>
          <li>Paket Satın Al</li>
          <li>Mesajlarım</li>
          <li>Bildirimlerim</li>
        </ul>
      </div>

      <div className="listings-section">
        <div className="no-listings">
          İlan bulunamadı.
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;