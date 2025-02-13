import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdoptionSteps.css";

const Step4 = ({ adoptionData }) => {
  const navigate = useNavigate();

  const steps = [
    { number: 1, title: "BİLGİLENDİRME" },
    { number: 2, title: "İLAN DETAYI" },
    { number: 3, title: "FOTOĞRAFLAR" },
    { number: 4, title: "İLANI YAYINLA" },
  ];

  // İlanı backend'e gönderme
  const handlePublishAd = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/adoption/create", adoptionData);
      console.log("İlan başarıyla kaydedildi", response.data);
      // İlan başarılı şekilde kaydedildikten sonra create-ad sayfasına yönlendir
      navigate("/create-ad"); // Burada yönlendirme yapıyoruz
    } catch (error) {
      console.log("İlan kaydedilirken bir hata oluştu", error);
      alert("İlan kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.");
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

      {/* İlanı yayınlama butonu */}
      <button onClick={handlePublishAd}>İlanı Yayınla</button>
    </div>
  );
};

export default Step4;
