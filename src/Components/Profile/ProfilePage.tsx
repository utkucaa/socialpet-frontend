import React, { useState, useEffect, ChangeEvent } from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';

import moment from 'moment'
import 'moment/locale/tr'  
import axiosInstance from '../../services/axios';
moment.locale('tr')

interface UserData {
  firstName: string;
  lastName: string;
  avatar?: string;
  joinDate: string;
  [key: string]: any; // For other potential properties
}

interface UserStats {
  totalAds: number;
  activeAds: number;
  views: number;
  membershipDate: string;
}

interface UserInfo {
  name: string;
}

interface ProfilePictureResponse {
  data: string;
}

const ProfilePage: React.FC = () => {

  const [avatar, setAvatar] = useState<string>('/avatar.png');
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      const _userData: UserData = JSON.parse(storedUserData);
      setUserData(_userData);
      if (_userData.avatar) {
        setAvatar("http://localhost:8080" + _userData.avatar);
      }
    }
  }, []);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axiosInstance.post<ProfilePictureResponse>('/v1/users/profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const imageUrl = URL.createObjectURL(file);
        setAvatar(imageUrl);

        // Update user data in localStorage with new avatar
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
          const userData: UserData = JSON.parse(storedUserData);
          userData.avatar = response.data.data;
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  const userStats: UserStats = {
    totalAds: 0,
    activeAds: 0,
    views: 0,
    membershipDate: moment(userData?.joinDate).format('LL')
  };

  const userInfo: UserInfo = {
    name: userData ? `${userData.firstName} ${userData.lastName}` : ''
  };

  const handleLogout = (): void => {
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