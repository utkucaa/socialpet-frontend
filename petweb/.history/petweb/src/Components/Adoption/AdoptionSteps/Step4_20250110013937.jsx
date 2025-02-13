import React, { useState } from "react";
import "./AdoptionSteps.css";

const Step4 = () => {
  const [activeStep] = useState(4); // Aktif adımı belirtiyor
  const steps = [
    { number: 1, title: "BİLGİLENDİRME" },
    { number: 2, title: "İLAN DETAYI" },
    { number: 3, title: "FOTOĞRAFLAR" },
    { number: 4, title: "İLANI YAYINLA" },
  ];

  return (
    <div className=" step4">
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
      <button>İlanı Yayınla</button>
    </div>
  );
};

export default Step4;

