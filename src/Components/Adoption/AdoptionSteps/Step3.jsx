import React, { useState } from "react";
import "./AdoptionSteps.css";

const Step3 = ({ onNext, adoptionData, onAdDataChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const steps = [
    { number: 1, title: "BİLGİLENDİRME" },
    { number: 2, title: "İLAN DETAYI" },
    { number: 3, title: "FOTOĞRAFLAR" },
    { number: 4, title: "İLANI YAYINLA" },
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("Dosya boyutu 5MB'dan küçük olmalıdır.");
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError("Lütfen geçerli bir resim dosyası seçin.");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      onAdDataChange({ ...adoptionData, photo: file });
      setError("");
    }
  };

  const handleNextStep = () => {
    if (!selectedFile) {
      setError("Lütfen bir fotoğraf seçin");
      return;
    }
    setLoading(true);
    onNext();
  };

  return (
    <div className="step step3">
      <div className="step-indicator">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`step ${step.number === 3 ? "active" : "inactive"}`}
          >
            <div className={`step-box ${step.number === 3 ? "active-box" : "inactive-box"}`}>
              {step.number}
            </div>
            <div
              className={`step-text ${step.number === 3 ? "active-text" : "inactive-text"}`}
            >
              {step.title}
            </div>
          </div>
        ))}
      </div>

      <h3>3. Adım: Fotoğraflar</h3>
      
      <div className="image-upload-container">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          id="file-input"
          className="file-input"
        />
        <label htmlFor="file-input" className="file-label">
          {previewUrl ? (
            <img src={previewUrl} alt="Önizleme" className="preview-image" />
          ) : (
            <div className="upload-placeholder">
              İLAN GÖRSELİ YÜKLE
            </div>
          )}
        </label>
        <p className="upload-note">
          İnternet hızınıza bağlı olarak yükleme işlemi uzun sürebilir.
        </p>
        {error && <p className="error-message">{error}</p>}
      </div>

      <button 
        onClick={handleNextStep}
        disabled={loading || !selectedFile}
        className={loading ? "loading" : ""}
      >
        {loading ? "Yükleniyor..." : "Devam Et"}
      </button>
    </div>
  );
};

export default Step3;
