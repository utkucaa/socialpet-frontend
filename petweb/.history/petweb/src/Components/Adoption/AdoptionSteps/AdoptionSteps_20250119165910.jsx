import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import "./AdoptionSteps.css"; // İhtiyacınız varsa stil dosyasını da ekleyebilirsiniz

const AdoptionSteps = () => {
  const [adData, setAdData] = useState({
    title: "",
    description: "",
    photo: null,
  });

  const handleAdDataChange = (newData) => {
    setAdData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const handleNextStep = () => {
    // Burada bir sonraki adım için yapılacak işlem tanımlanabilir
    console.log(adData);
  };

  return (
    <div className="adoption-steps">
      <Step1 onAdDataChange={handleAdDataChange} />
      <Step2 onAdDataChange={handleAdDataChange} />
      <Step3 onAdDataChange={handleAdDataChange} onNext={handleNextStep} />
    </div>
  );
};

export default AdoptionSteps;