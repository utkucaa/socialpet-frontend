import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdoptionSteps.css";

const Step4 = () => {
  const [activeStep] = useState(4); 
  const navigate = useNavigate(); 

  const steps = [
    { number: 1, title: "BİLGİLENDİRME" },
    { number: 2, title: "İLAN DETAYI" },
    { number: 3, title: "FOTOĞRAFLAR" },
    { number: 4, title: "İLANI YAYINLA" },
  ];
  const handlePublishAd = () => {
    // Burada ilanı yayınlama işlemini gerçekleştirebilirsiniz.
    console.log("İlan yayınlandı!");
    navigate("/adopt"); // "adopt" sayfasına yönlendirme
  };

  return (
    <div className="step step4">
      <div className="step-indicator">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`step ${step.number === activeStep ? "active" : "inactive"}`}
          >
            <div className={`step-box ${step.number === activeStep ? "active-box" : "inactive-box"}`}>
              {step.number}
            </div>
            <div
              className={`step-text ${
                step.number === activeStep ? "active-text" : "inactive-text"
              }`}
            >
              {step.title}
            </div>
          </div>
        ))}
      </div>
      <h3>4. Adım: İlanı Yayınla</h3>
      <button onClick={handlePublishAd}>İlanı Yayınla</button>
    </div>
  );
};

export default Step4;

