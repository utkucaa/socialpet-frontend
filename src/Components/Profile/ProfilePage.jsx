import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axios'; // Assuming axiosInstance is imported from this file
import moment from 'moment'
import 'moment/locale/tr'  
moment.locale('tr')

const ProfilePage = () => {

  const [avatar, setAvatar] = useState('/avatar.png');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const _userData = JSON.parse(localStorage.getItem('user'));
    setUserData(_userData)
    if (_userData && _userData.avatar) {
      setAvatar("http://localhost:8080" + _userData.avatar);
    }
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axiosInstance.post('/v1/users/profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const imageUrl = URL.createObjectURL(file);
        setAvatar(imageUrl);

        // Update user data in localStorage with new avatar
        const userData = JSON.parse(localStorage.getItem('user'));
        userData.avatar = response.data.data;
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  const userStats = {
    totalAds: 0,
    activeAds: 0,
    views: 0,
    membershipDate: moment(userData?.joinDate).format('LL')
  };

  const userInfo = {
    name: userData?.firstName + ' ' + userData?.lastName
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
            <div className="membership-date">Üyelik Tarihi: {userStats.membershipDate}</div>
          </div>
        </div>
        <div className="profile-actions">
          <button className="btn-update">Profil Güncelle</button>
          <button className="btn-logout" onClick={handleLogout}>Çıkış Yap</button>
        </div>
      </div>
      <div className="stats-section">
        <div className="stat-card blue">
          <h3>Toplam İlan</h3>
          <span>{userStats.totalAds}</span>
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
      <div className="content">
        <div className="side">
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