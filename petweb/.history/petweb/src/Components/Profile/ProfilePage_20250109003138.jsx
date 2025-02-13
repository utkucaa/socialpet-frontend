import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {

  const [avatar, setAvatar] = useState('/avatar.png');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const userStats = {
    totalAds: 0,
    activeAds: 0,
    views: 0,
    membershipDate: '29 Ekim 2024'
  };

  const userInfo = {
    name: 'Utku',
    memberType: 'BİREYSEL ÜYE',
    memberStatus: 'ÜCRETSİZ START'
  };

  const handleLogout = () => {
    // localStorage'dan kullanıcıyı sil
    localStorage.removeItem('user');
    // Çıkış işlemi sonrası kullanıcıyı anasayfaya yönlendir
    navigate('/');
  };

  return (
    <div className="profile-container">
      <div className="profile-header-section">
        <div className="profile-left">
          <div className="profile-avatar">
          <img src={avatar} alt="Profile"/>
          <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="avatar-input"
            />
          </div>
          <div className="profile-info">
            <h2>{userInfo.name}</h2>
            <div className="member-tags">
              <span className="tag blue">{userInfo.memberType}</span>
              <span className="tag cyan">{userInfo.memberStatus}</span>
            </div>
            <div className="membership-date">Üyelik Tarihi: {userStats.membershipDate}</div>
          </div>
        </div>
        <div className="profile-actions">
          <button className="btn-update">Profil Güncelle</button>
          <button className="btn-add">İlan Ekle</button>
          <button className="btn-logout" onClick={handleLogout}>Çıkış Yap</button>
        </div>
      </div>
      <div className="stats-section">
        <div className="stat-card blue">
          <h3>Toplam İlan</h3>
          <span>{userStats.totalAds}</span>
        </div>
        <div className="stat-card green">
          <h3>Aktif İlan</h3>
          <span>{userStats.activeAds}</span>
        </div>
        <div className="stat-card orange">
          <h3>Görüntülenme</h3>
          <span>{userStats.views}</span>
        </div>
        <div className="stat-card cyan">
          <h3>Üyelik Tarihi</h3>
          <span>{userStats.membershipDate}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        <div className="side-menu">
          <h3>Size Özel Menü</h3>
          <ul>
            <li>Profilim</li>
            <li>Mesajlarım</li>
            <li>Bildirimlerim</li>
          </ul>
        </div>
        <div className="main-content">
          <div className="no-ads">İlan bulunamadı.</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;