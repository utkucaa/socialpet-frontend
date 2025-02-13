import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './ProfilePage.css';

const ProfilePage = ({ setUser }) => {
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate(); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); 
    }
  };

  const handleLogout = () => {
    setUser(null); 
    navigate('/'); 
  };

  const user = {
    name: "Utku Çolak",
    membershipDate: "06/11/2024",
    totalAds: 5,
    activeAds: 3,
    views: 120
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <div className="profile-header">
          <div className="profile-picture">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-img" />
            ) : (
              <div className="profile-picture-placeholder">
                <img src="avatar-.png" alt="Avatar" className="avatar" />
                <p>Görsel Ekle</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
          </div>
          <div className="profile-info">
            <h2>{user.name}</h2>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-box">Toplam İlan: {user.totalAds}</div>
          <div className="stat-box">Aktif İlan: {user.activeAds}</div>
          <div className="stat-box">Görüntülenme: {user.views}</div>
          <div className="stat-box">Üyelik Tarihi: {user.membershipDate}</div>
        </div>
      </div>
      ...
      <div className="profile-body">
        <div className="custom-menu">
          <h3>Size Özel Menü</h3>
          <ul>
            <li>Profil Ayarları</li>
            <li>Hayvanlarım</li>
            <li>İlanlarım</li>
            <li onClick={handleLogout}>
              Çıkış Yap
            </li>
          </ul>
        </div>
        <div className="profile-content">
          <h3>Burada başka içerikler olabilir.</h3>
          <p>Bu alanda kullanıcıya özel bilgiler, grafikler veya sağlık takibi eklenebilir.</p>
        </div>
      </div>
    </div>
  );
};