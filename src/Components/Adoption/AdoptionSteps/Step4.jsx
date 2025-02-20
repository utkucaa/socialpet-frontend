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

  const handlePublishAd = async () => {
    try {
      setLoading(true);
      setError("");

      const adData = {
        animalType: adoptionData.animalType,
        petName: adoptionData.petName,
        breed: adoptionData.breed,
        age: Number(adoptionData.age),
        gender: adoptionData.gender,
        size: adoptionData.size,
        title: adoptionData.title,
        description: adoptionData.description,
        source: adoptionData.source,
        city: adoptionData.city,
        district: adoptionData.district,
        fullName: adoptionData.fullName,
        phone: adoptionData.phone,
        userId: 12,
        status: "ACTIVE"
      };

      console.log("Gönderilecek ilan verisi:", adData);

      // Önce ilan verilerini JSON olarak gönder
      const response = await axios.post(
        "http://localhost:8080/api/adoption/create",
        adData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Sunucudan gelen yanıt:", response.data);

      // Eğer fotoğraf varsa ve ilan başarıyla oluşturulduysa, fotoğrafı ayrı bir request ile gönder
      if (adoptionData.photo && response.data.id) {
        const photoFormData = new FormData();
        photoFormData.append('photo', adoptionData.photo);

        console.log("Fotoğraf yükleniyor, ilan ID:", response.data.id);

        const photoResponse = await axios.post(
          `http://localhost:8080/api/adoption/${response.data.id}/upload-photo`,
          photoFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        console.log("Fotoğraf yükleme yanıtı:", photoResponse.data);
      }

      console.log("İlan başarıyla kaydedildi", response.data);
      alert("İlanınız başarıyla yayınlandı!");
      navigate("/adopt");

    } catch (error) {
      console.error("İlan kaydedilirken hata detayı:", error.response?.data);
      console.error("Tam hata:", error);
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

      <div className="ad-summary">
        <h4>İlan Özeti</h4>
        <p>Hayvan Türü: {adoptionData.animalType}</p>
        <p>Pet Adı: {adoptionData.petName}</p>
        <p>İlan Başlığı: {adoptionData.title}</p>
        <p>Şehir: {adoptionData.city}</p>
      </div>

      {error && <div className="error-message">{error}</div>}

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