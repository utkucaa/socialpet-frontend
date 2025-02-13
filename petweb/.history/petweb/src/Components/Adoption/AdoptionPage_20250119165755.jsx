import React, { useState } from "react";
import Header from "./Header";
import Stats from "./Stats";
import AdoptionSteps from "../AdoptionStep";  // AdoptionSteps'i import edin
import "./AdoptionPage.css";

const AdoptionPage = () => {
  const [adData, setAdData] = useState({}); // AdData state'i

  // Veriyi güncelleyen fonksiyon
  const handleAdDataChange = (updatedData) => {
    setAdData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
  };

  // Sonraki adıma geçiş için fonksiyon
  const handleNextStep = () => {
    console.log(adData);  // Burada adData'yı console.log ile kontrol edebilirsiniz
    // Bu adımda başka işlemler yapabilirsiniz (örneğin, formu göndermek vs.)
  };

  return (
    <div className="adoption-page">
      <Header />
      <Stats />

      {/* AdoptionSteps bileşenini burada çağırıyoruz */}
      <AdoptionSteps 
        onAdDataChange={handleAdDataChange}  // Veriyi güncellemek için bu fonksiyonu geçiriyoruz
        onNext={handleNextStep}  // Bir sonraki adıma geçmek için bu fonksiyonu geçiriyoruz
      />
    </div>
  );
};

export default AdoptionPage;
