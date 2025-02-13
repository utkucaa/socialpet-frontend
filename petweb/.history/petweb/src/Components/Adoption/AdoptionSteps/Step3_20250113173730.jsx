import React, { useState } from "react";
import "./AdoptionSteps.css";

const Step3 = ({ onNext, adId }) => {
  const [activeStep, setActiveStep] = useState(3);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const steps = [
    { number: 1, title: "BİLGİLENDİRME" },
    { number: 2, title: "İLAN DETAYI" },
    { number: 3, title: "FOTOĞRAFLAR" },
    { number: 4, title: "İLANI YAYINLA" },
  ];

 
  return (
    <div className="step step3">
      <div className="step-indicator">
        {steps.map((step) => (
          <div key={step.number} className="step">
            <div
              className={`step-box ${
                activeStep === step.number ? "active" : "inactive"
              }`}
            >
              {step.number}
            </div>
            <div
              className={`step-text ${
                activeStep === step.number ? "active-text" : "inactive-text"
              }`}
            >
              {step.title}
            </div>
          </div>
        ))}
      </div>
      <h3> 3. Adım: Fotoğraflar</h3>
      <p>
        Fotoğraflı ilanlar daha hızlı yuva bulduruyor! Ona biran önce yeni yuvasını bulmak için,
        güzel mi güzel fotoğraflarını da ilana eklemelisiniz.
      </p>

      
      <input type="file" onChange={handleFileChange} />
      {fileName && <p>Seçilen dosya: {fileName}</p>} 

      {/* Fotoğraf yükleme butonu 
      <button onClick={handleFileUpload}>Fotoğraf Yükle</button> */}

      <button onClick={onNext}>Devam Et</button>
    </div>
  );
};

export default Step3;
