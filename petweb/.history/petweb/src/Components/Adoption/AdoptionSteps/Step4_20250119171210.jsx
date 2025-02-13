import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdoptionSteps.css";

const Step4 = ({ adoptionData }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const steps = [
    { number: 1, title: "BİLGİLENDİRME" },
    { number: 2, title: "İLAN DETAYI" },
    { number: 3, title: "FOTOĞRAFLAR" },
    { number: 4, title: "İLANI YAYINLA" },
  ];

  // İlanı backend'e gönderme
  const handlePublishAd = async () => {
    try {
      setLoading(true);
      setError("");

      // FormData oluştur
      const formData = new FormData();
      
      // Temel bilgileri ekle
      formData.append("animalType", adoptionData.animalType);
      formData.append("petName", adoptionData.petName);
      formData.append("breed", adoptionData.breed);
      formData.append("age", adoptionData.age);
      formData.append("gender", adoptionData.gender);
      formData.append("size", adoptionData.size);
      formData.append("title", adoptionData.title);
      formData.append("description", adoptionData.description);
      formData.append("source", adoptionData.source);
      formData.append("city", adoptionData.city);
      formData.append("district", adoptionData.district);
      formData.append("fullName", adoptionData.fullName);
      formData.append("phone", adoptionData.phone);

      // Fotoğraf varsa ekle
      if (adoptionData.photo) {
        formData.append("photo", adoptionData.photo);
      }

      // API isteği yap
      const response = await axios.post(
        "http://localhost:8080/api/adoption/create",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log("İlan başarıyla kaydedildi", response.data);
      alert("İlanınız başarıyla yayınlandı!");
      navigate("/adopt"); // Başarılı kayıttan sonra sahiplendirme sayfasına yönlendir

    } catch (error) {
      console.error("İlan kaydedilirken hata:", error.response?.data || error.message);
      setError(error.response?.data?.message || "İlan kaydedilirken bir hata oluştu");
      alert("İlan kaydedilirken bir hata oluştu. Lütfen tüm alanları kontrol edip tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="step step4">
      <div className="step-indicator">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`step ${step.number === 4 ? "active" : "inactive"}`}
          >
            <div className={`step-box ${step.number === 4 ? "active-box" : "inactive-box"}`}>
              {step.number}
            </div>
            <div
              className={`step-text ${step.number === 4 ? "active-text" : "inactive-text"}`}
            >
              {step.title}
            </div>
          </div>
        ))}
      </div>

      <h3>4. Adım: İlanı Yayınla</h3>

      {/* İlan Özeti */}
      <div className="ad-summary">
        <h4>İlan Özeti</h4>
        <p>Hayvan Türü: {adoptionData.animalType}</p>
        <p>Pet Adı: {adoptionData.petName}</p>
        <p>İlan Başlığı: {adoptionData.title}</p>
        <p>Şehir: {adoptionData.city}</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* İlanı yayınlama butonu */}
      <button 
        onClick={handlePublishAd} 
        disabled={loading}
        className={loading ? "loading" : ""}
      >
        {loading ? "Yayınlanıyor..." : "İlanı Yayınla"}
      </button>
    </div>
  );
};

export default Step4;