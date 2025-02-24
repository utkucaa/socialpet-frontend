import React from "react";
import Header from "./Header";
import Stats from "./Stats";
import "./AdoptionPage.css";

const AdoptionPage: React.FC = () => {
  return (
    <div className="adoption-page">
      <Header />
      <Stats />
    </div>
  );
};

export default AdoptionPage;
