import React, { useState } from "react";
import "./AdoptionSteps.css";


const Step1 = ({ onNext }) => {
  const [activeStep, setActiveStep] = useState(1); 
  const [animalType, setAnimalType] = useState(""); 

 
  const steps = [
    { number: 1, title: "BİLGİLENDİRME" },
    { number: 2, title: "İLAN DETAYI" },
    { number: 3, title: "FOTOĞRAFLAR" },
    { number: 4, title: "İLANI YAYINLA" },
  ];

  const handleNext = () => {
    if (activeStep < steps.length) {
      onNext({ animalType });
      setActiveStep(activeStep + 1);
    } else {
      handleCreateAdClick(); 
    }
  };

  const handleAnimalTypeChange = (event) => {
    setAnimalType(event.target.value);
  };


  return (
    <div className="step step1">
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

      <select onChange={handleAnimalTypeChange} value={animalType}>
        <option value="">Hayvan Türünü Seçin</option>
        <option value="cat">Kedi</option>
        <option value="dog">Köpek</option>
        <option value="bird">Muhabbet Kuşu</option>
        <option value="parrot">Papağan</option>
      </select>

      <button onClick={handleNext}>Devam Et</button>

      <p>
        Sadece ücretsiz sahiplendirmeler için ilan verilebilir. Evcil hayvan
        arıyorsanız "arıyorum" içerikli ilanlar açmak yerine sahiplendirme
        ilanlarına bakabilirsiniz. Böylelikle yuva arayan dostlarımıza daha
        kolay ulaşmış olursunuz. Sahiplendirme ilanları için tıklayınız.
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
