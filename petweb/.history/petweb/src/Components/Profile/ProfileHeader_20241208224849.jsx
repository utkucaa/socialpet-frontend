import React from 'react';
import './ProfileHeader.css'; // Css dosyasını ekleyebilirsiniz

function ProfileHeader({ username, bio, profileImage }) {
  return (
    <div className="profile-header">
      <div className="profile-image">
        <img src={profileImage} alt="Profile" />
      </div>
      <div className="profile-info">
        <h2>{username}</h2>
        <p>{bio}</p>
      </div>
    </div>
  );
}
export default ProfileHeader;


