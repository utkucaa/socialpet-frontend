import React, { useState, useEffect } from "react";
import "./AdoptionSteps.css";

const Step2 = ({ onNext, onDataChange, adoptionData }) => {
  // Step1'den gelen veriler ile başlangıç değerleri
  const [petName, setPetName] = useState(adoptionData?.petName || "");
  const [breed, setBreed] = useState(adoptionData?.breed || "");
  const [age, setAge] = useState(adoptionData?.age || "");
  const [gender, setGender] = useState(adoptionData?.gender || "");
  const [size, setSize] = useState(adoptionData?.size || "");
  const [title, setTitle] = useState(adoptionData?.title || "");
  const [description, setDescription] = useState(adoptionData?.description || "");
  const [source, setSource] = useState(adoptionData?.source || "");
  const [city, setCity] = useState(adoptionData?.city || "");
  const [district, setDistrict] = useState(adoptionData?.district || "");
  const [fullName, setFullName] = useState(adoptionData?.fullName || "");
  const [phone, setPhone] = useState(adoptionData?.phone || "");

  const steps = [
    { number: 1, title: "BİLGİLENDİRME" },
    { number: 2, title: "İLAN DETAYI" },
    { number: 3, title: "FOTOĞRAFLAR" },
    { number: 4, title: "İLANI YAYINLA" },
  ];

  const handleNext = () => {
    // Step1 ve Step2'deki verileri birleştiriyoruz
    const updatedAdData = {
      ...adoptionData,
      petName,
      breed,
      age,
      gender,
      size,
      title,
      description,
      source,
      city,
      district,
      fullName,
      phone,
    };

    // Veriyi güncelliyoruz
    onDataChange(updatedAdData);
    onNext(); // Step3'e geçişi sağlıyoruz
  };

  return (
    <div className="step2">
      <div className="step-indicator">
        {steps.map((step) => (
          <div key={step.number} className="step">
            <div
              className={`step-box ${
                step.number === 2 ? "active" : "inactive"
              }`}
            >
              {step.number}
            </div>
            <div
              className={`step-text ${
                step.number === 2 ? "active-text" : "inactive-text"
              }`}
            >
              {step.title}
            </div>
          </div>
        ))}
      </div>

      <h3>Pet Bilgileri</h3>
      <form>
        <div>
          <label>Pet Adı:</label>
          <input
            type="text"
            placeholder="Pet adı"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
        </div>
        <div>
          <label>Cins:</label>
          <input
            type="text"
            placeholder="Pet cinsi"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </div>
        <div>
          <label>Yaş:</label>
          <input
            type="number"
            placeholder="Yaş"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label>Cinsiyet:</label>
          <input
            type="text"
            placeholder="Cinsiyet"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <div>
          <label>Boyut:</label>
          <input
            type="text"
            placeholder="Boyut"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
        <div>
          <label>İlan Başlığı:</label>
          <input
            type="text"
            placeholder="İlan başlığı"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="description">
          <label>İlan Açıklaması:</label>
          <textarea
            className="small-textarea"
            placeholder="İlan açıklaması"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Kimden:</label>
          <input
            type="text"
            placeholder="Kimden"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
        <div>
          <label>Şehir:</label>
          <input
            type="text"
            placeholder="Şehir"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label>İlçe:</label>
          <input
            type="text"
            placeholder="İlçe"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </div>
        <div>
          <label>Ad Soyad:</label>
          <input
            type="text"
            placeholder="Ad Soyad"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>Telefon:</label>
          <input
            type="text"
            placeholder="Telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleNext}>
          Devam Et
        </button>
      </form>
    </div>
  );
};

export default Step2;
