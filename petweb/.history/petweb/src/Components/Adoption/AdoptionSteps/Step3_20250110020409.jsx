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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); 
      setFileName(selectedFile.name); 
    } else {
      setFile(null); 
      setFileName(""); 
    }
  };

  const handleFileUpload = async () => {
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    } else {
      formData.append("file", null);
    }
    formData.append("adId", adId); 

    try {
      const response = await fetch("http://localhost:8080/api/ads/upload-photo", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Fotoğraf yüklenirken bir hata oluştu.");
      }

      alert("Fotoğraf başarıyla yüklendi!");
      onNext(); // Sonraki adıma geç
    } catch (error) {
      console.error(error);
      alert("Fotoğraf yüklenirken bir hata oluştu.");
    }
  };

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

      {/* Dosya seçme input */}
      <input type="file" onChange={handleFileChange} />
      {fileName && <p>Seçilen dosya: {fileName}</p>} {/* Dosya adı */}

      {/* Fotoğraf yükleme butonu 
      <button onClick={handleFileUpload}>Fotoğraf Yükle</button> */}

      <button onClick={onNext}>Devam Et</button>
    </div>
  );
};

export default Step3;
