import React, { useState, useEffect, ChangeEvent } from "react";
import "./AdoptionSteps.css";
import { AdoptionData } from '../types';

interface Step {
  number: number;
  title: string;
}

interface Step2Props {
  onNext: (data: Partial<AdoptionData>) => void;
  onDataChange: (data: Partial<AdoptionData>) => void;
  adoptionData: Partial<AdoptionData>;
}

const Step2: React.FC<Step2Props> = ({ onNext, onDataChange, adoptionData }) => {
  const [petName, setPetName] = useState<string>(adoptionData?.petName || "");
  const [breed, setBreed] = useState<string>(adoptionData?.breed || "");
  const [age, setAge] = useState<string | number>(adoptionData?.age || "");
  const [gender, setGender] = useState<string>(adoptionData?.gender || "");
  const [size, setSize] = useState<string>(adoptionData?.size || "");
  const [title, setTitle] = useState<string>(adoptionData?.title || "");
  const [description, setDescription] = useState<string>(adoptionData?.description || "");
  const [source, setSource] = useState<string>(adoptionData?.source || "");
  const [city, setCity] = useState<string>(adoptionData?.city || "");
  const [district, setDistrict] = useState<string>(adoptionData?.district || "");
  const [fullName, setFullName] = useState<string>(adoptionData?.fullName || "");
  const [phone, setPhone] = useState<string>(adoptionData?.phone || "");

  const steps: Step[] = [
    { number: 1, title: "BİLGİLENDİRME" },
    { number: 2, title: "İLAN DETAYI" },
    { number: 3, title: "FOTOĞRAFLAR" },
    { number: 4, title: "İLANI YAYINLA" },
  ];

  const handleNext = (): void => {
    const updatedAdData: Partial<AdoptionData> = {
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

    onDataChange(updatedAdData);
    onNext(updatedAdData); 
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPetName(e.target.value)}
          />
        </div>
        <div>
          <label>Cins:</label>
          <input
            type="text"
            placeholder="Pet cinsi"
            value={breed}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setBreed(e.target.value)}
          />
        </div>
        <div>
          <label>Yaş:</label>
          <input
            type="number"
            placeholder="Yaş"
            value={age}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label>Cinsiyet:</label>
          <input
            type="text"
            placeholder="Cinsiyet"
            value={gender}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setGender(e.target.value)}
          />
        </div>
        <div>
          <label>Boyut:</label>
          <input
            type="text"
            placeholder="Boyut"
            value={size}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSize(e.target.value)}
          />
        </div>
        <div>
          <label>İlan Başlığı:</label>
          <input
            type="text"
            placeholder="İlan başlığı"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
        </div>
        <div className="description">
          <label>İlan Açıklaması:</label>
          <textarea
            className="small-textarea"
            placeholder="İlan açıklaması"
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Kimden:</label>
          <input
            type="text"
            placeholder="Kimden"
            value={source}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSource(e.target.value)}
          />
        </div>
        <div>
          <label>Şehir:</label>
          <input
            type="text"
            placeholder="Şehir"
            value={city}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label>İlçe:</label>
          <input
            type="text"
            placeholder="İlçe"
            value={district}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDistrict(e.target.value)}
          />
        </div>
        <div>
          <label>Ad Soyad:</label>
          <input
            type="text"
            placeholder="Ad Soyad"
            value={fullName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>Telefon:</label>
          <input
            type="text"
            placeholder="Telefon"
            value={phone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
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
