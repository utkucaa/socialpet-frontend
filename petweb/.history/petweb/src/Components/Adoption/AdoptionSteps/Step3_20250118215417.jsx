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
    if (!file) {
      alert("Lütfen bir dosya seçin");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`http://localhost:8080/api/adoption/${adId}/upload-photo`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Fotoğraf başarıyla yüklendi");
      } else {
        console.error("Fotoğraf yüklenemedi");
      }
    } catch (error) {
      console.error("Bir hata oluştu:", error);
    }
  };

  const handleNextStep = async () => {
    // Fotoğraf yükleme işlemi önce yapılacak
    await handleFileUpload();
    // Yükleme tamamlandığında Step4'e geçiş
    onNext();
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

      <input type="file" onChange={handleFileChange} />
      {fileName && <p>Seçilen dosya: {fileName}</p>}

      {/* Fotoğraf yükleme butonu */}
      <button onClick={handleNextStep}>Devam Et</button>
    </div>
  );
};

export default Step3;
