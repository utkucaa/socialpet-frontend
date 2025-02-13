import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // axios import'u eklendi
import "./AdoptionSteps.css";

const Step4 = () => {
  const [activeStep] = useState(4);
  const navigate = useNavigate();

  const steps = [
    { number: 1, title: "BİLGİLENDİRME" },
    { number: 2, title: "İLAN DETAYI" },
    { number: 3, title: "FOTOĞRAFLAR" },
    { number: 4, title: "İLANI YAYINLA" },
  ];

  // Kullanıcının girdiği bilgileri saklamak için state
  const [adoptionData, setAdoptionData] = useState({
    animalType: "",
    petName: "",
    breed: "",
    age: "",
    gender: "",
    size: "",
    title: "",
    description: "",
    source: "",
    city: "",
    district: "",
    fullName: "",
    phone: "",
  });

  // State güncelleme fonksiyonu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdoptionData({ ...adoptionData, [name]: value });
  };

  // İlanı backend'e gönderme
  const handlePublishAd = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/adoption/create", adoptionData);
      console.log("İlan başarıyla kaydedildi", response.data);
      navigate("/adopt"); // Başka bir sayfaya yönlendirme
    } catch (error) {
      console.log("İlan kaydedilirken bir hata oluştu", error);
    }
  };

  return (
    <div className="step step4">
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
      <input
        type="text"
        name="animalType"
        value={adoptionData.animalType}
        onChange={handleInputChange}
        placeholder="Hayvan Türü"
      />
      {/* Diğer input alanları burada olmalı */}
      <button onClick={handlePublishAd}>İlanı Yayınla</button>
    </div>
  );
};

export default Step4;
