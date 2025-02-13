import React, { useState } from "react";
import "./AdoptionSteps.css";

const Step1 = ({ onNext }) => {
  const [animalType, setAnimalType] = useState("");

  const steps = [
    { number: 1, title: "BİLGİLENDİRME" },
    { number: 2, title: "İLAN DETAYI" },
    { number: 3, title: "FOTOĞRAFLAR" },
    { number: 4, title: "İLANI YAYINLA" },
  ];

  // Hayvan türünü seçme ve geçerli kontrol
  const handleNext = () => {
    if (animalType) {
      onNext({ animalType }); // Seçilen hayvan türü üst bileşene gönderiliyor
    } else {
      alert("Lütfen hayvan türünü seçin!");
    }
  };

  const handleAnimalTypeChange = (event) => {
    setAnimalType(event.target.value);
  };

  return (
    <div className="step step1">
      {/* Adım göstergesi */}
      <div className="step-indicator">
        {steps.map((step) => (
          <div key={step.number} className="step">
            <div
              className={`step-box ${step.number === 1 ? "active" : "inactive"}`}
            >
              {step.number}
            </div>
            <div
              className={`step-text ${
                step.number === 1 ? "active-text" : "inactive-text"
              }`}
            >
              {step.title}
            </div>
          </div>
        ))}
      </div>

      {/* Hayvan türü seçimi */}
      <select
        onChange={handleAnimalTypeChange}
        value={animalType}
        className="form-select"
      >
        <option value="">Hayvan Türünü Seçin</option>
        <option value="cat">Kedi</option>
        <option value="dog">Köpek</option>
        <option value="bird">Muhabbet Kuşu</option>
        <option value="parrot">Papağan</option>
      </select>

      <button className="btn-primary" onClick={handleNext}>
        Devam Et
      </button>

      {/* Bilgilendirme metni */}
      <p>
        Sadece ücretsiz sahiplendirmeler için ilan verilebilir. Evcil hayvan
        arıyorsanız "arıyorum" içerikli ilanlar açmak yerine sahiplendirme
        ilanlarına bakabilirsiniz. Böylelikle yuva arayan dostlarımıza daha
        kolay ulaşmış olursunuz. <a href="/sahiplendirme-ilanlari">Sahiplendirme ilanları için tıklayınız.</a>
      </p>
      <p>
        Sahiplendirmek istediğiniz her evsiz hayvan için ayrı ayrı ilan
        vermelisiniz. Bu sayede daha da hızlı yuva bulabilirsiniz.
      </p>
      <p>
        Sahiplendirme ilanlarının doğruluğu, dostlarımıza en hızlı şekilde yuva
        bulabilmek adına bizim için çok değerli.
      </p>
      <p>
        Bu nedenle kurallara uygun olmayan ilanlar veren üyelerin üyelikleri
        yeniden açılmamak üzere iptal edilir.
      </p>
    </div>
  );
};

export default Step1;
