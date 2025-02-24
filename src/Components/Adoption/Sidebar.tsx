import React from "react";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Üyeliğim</h2>
      <ul className="sidebar-menu">
        <li>Bildirimlerim</li>
        <li>Mesajlarım</li>
        <li>Petlerim</li>
        <li>Sahiplendirme İlanlarım</li>
        <li>Üyelik Bilgilerim</li>
      </ul>
    </div>
  );
};

export default Sidebar;