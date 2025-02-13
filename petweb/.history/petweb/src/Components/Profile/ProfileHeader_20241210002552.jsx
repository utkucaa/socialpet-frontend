import React from "react";
import "./ProfileHeader.css";

const ProfileHeader = ({ user }) => {
  return (
    <div className="profile-header">
      <div className="profile-picture-section">
        <div className="profile-picture-box">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profil Resmi"
              className="profile-picture"
            />
          ) : (
            <div className="placeholder-text">Profil Resmi Ekle</div>
          )}
        </div>
      </div>

      <div className="profile-info">
        <div className="profile-stats">
          <div className="stat-box">
            <h4>Toplam İlan</h4>
            <p>{user.totalAds}</p>
          </div>
          <div className="stat-box">
            <h4>Aktif İlan</h4>
            <p>{user.activeAds}</p>
          </div>
          <div className="stat-box">
            <h4>Görüntülenme</h4>
            <p>{user.views}</p>
          </div>
          <div className="stat-box">
            <h4>Üyelik Tarihi</h4>
            <p>{user.membershipDate}</p>
          </div>
        </div>
        <div className="user-name">{user.name}</div>
      </div>

      <div className="profile-actions">
        <button className="action-button">+ İlan Ekle</button>
        <button className="action-button">Profil Güncelle</button>
      </div>
    </div>
  );
};

export default ProfileHeader;





