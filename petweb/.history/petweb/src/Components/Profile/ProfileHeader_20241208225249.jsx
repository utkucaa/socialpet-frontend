import React from "react";
import "./ProfileHeader.css";

const ProfileHeader = ({ user }) => {
  return (
    <div className="profile-header">
      <div className="profile-picture-section">
        <img
          src={user.profilePicture || "default-profile.png"}
          alt="Profil Resmi"
          className="profile-picture"
        />
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
        <div className="user-name">
          <h2>{user.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;



