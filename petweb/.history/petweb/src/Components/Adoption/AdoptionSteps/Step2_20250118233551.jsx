import React, { useState } from "react";
import "./AdoptionSteps.css";

const Step2 = ({ onNext, adData, setAdData }) => {
  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Step2'deki verileri mevcut adData ile birleştirerek güncelle
    setAdData((prevData) => ({
      ...prevData,
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
    }));

    onNext(); // Step3'e geçiş
  };

  return (
    <div>
      <h3>Step 2: İlan Detayı</h3>
      <form onSubmit={handleSubmit}>
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
        <div>
          <label>İlan Açıklaması:</label>
          <textarea
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
        <button type="submit">Devam Et</button>
      </form>
    </div>
  );
};

export default Step2;