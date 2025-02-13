import React from "react";
import "./AdoptionSteps.css";

const Step4 = () => {
  const steps = [
    { number: 1, title: "BİLGİLENDİRME" },
    { number: 2, title: "İLAN DETAYI" },
    { number: 3, title: "FOTOĞRAFLAR" },
    { number: 4, title: "İLANI YAYINLA" },
  ];

  return (
    <div className="step step4">
      <div className="step-indicator">
        {steps.map((step) => (
          <div key={step.number} className="step">
            <div className={`step-box inactive`}>{step.number}</div>
            <div className={`step-text inactive-text`}>{step.title}</div>
          </div>
        ))}
      </div>
      <h3>Sahiplendirme İlanı Ver - 4. Adım: İlanı Yayınla</h3>
      <button>İlanı Yayınla</button>
    </div>
  );
};

export default Step4;

