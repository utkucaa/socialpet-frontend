import React, { useState, ChangeEvent } from "react";
import "./AdoptionSteps.css";
import { AdoptionData } from '../types';

interface Step {
  number: number;
  title: string;
}

interface Step3Props {
  onNext: (data: Partial<AdoptionData>) => void;
  onAdDataChange: (data: Partial<AdoptionData>) => void;
  adoptionData: Partial<AdoptionData>;
}

const Step3: React.FC<Step3Props> = ({ onNext, onAdDataChange, adoptionData }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const steps: Step[] = [
    { number: 1, title: "BİLGİLENDİRME" },
    { number: 2, title: "İLAN DETAYI" },
    { number: 3, title: "FOTOĞRAFLAR" },
    { number: 4, title: "İLANI YAYINLA" },
  ];

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
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
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onAdDataChange({ ...adoptionData, photo: file });
      setError("");
    }
  };

  const handleNextStep = (): void => {
    if (!selectedFile) {
      setError("Lütfen bir fotoğraf seçin");
      return;
    }
    setLoading(true);
    onNext({ ...adoptionData, photo: selectedFile });
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
