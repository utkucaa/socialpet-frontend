import React from "react";
import './ProfileHeader.css'; // Gerekli CSS dosyasını dahil et

function ProfileHeader() {
  return (
    <div className="profile-header">
      <div className="profile-header-left">
        <img
          src="https://via.placeholder.com/100" // Profil fotoğrafı için placeholder kullanabilirsiniz
          alt="Profile"
          className="profile-photo"
        />
        <div className="profile-info">
          <h2>Utku</h2>
          <p>Üyelik Tarihi: 29 Ekim 2024</p>
        </div>
      </div>
      <div className="profile-header-right">
        <div className="stat-box">
          <h3>Toplam İlan</h3>
          <p>0</p>
        </div>
        <div className="stat-box">
          <h3>Aktif İlan</h3>
          <p>0</p>
        </div>
        <div className="stat-box">
          <h3>Görüntülenme</h3>
          <p>0</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
