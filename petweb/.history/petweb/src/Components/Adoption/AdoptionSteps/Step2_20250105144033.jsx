import React, { useState } from "react";
import "./AdoptionSteps.css";

const Step2 = ({ onNext }) => {
  // Form verilerini state'te tutma
  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");
  const [adTitle, setAdTitle] = useState("");
  const [adDescription, setAdDescription] = useState("");
  const [from, setFrom] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");

  // Formu göndermek için fonksiyon
  const handleSubmit = async (event) => {
    event.preventDefault();

    const adData = {
      petName,
      breed,
      age,
      gender,
      size,
      adTitle,
      adDescription,
      from,
      city,
      district,
      ownerName,
      phone,
    };

    // Backend'e POST isteği gönderme
    const response = await fetch("localhost:8080/api/ads/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adData),
    });

    if (response.ok) {
      console.log("İlan başarıyla eklendi");
      onNext(); // Bir sonraki adıma geç
    } else {
      console.error("İlan eklenemedi");
    }
  };

  return (
    <div className="step2">
      <h3>Pet Bilgileri</h3>
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
            value={adTitle}
            onChange={(e) => setAdTitle(e.target.value)}
          />
        </div>
        <div>
          <label>İlan Açıklaması:</label>
          <textarea
            placeholder="İlan açıklaması"
            value={adDescription}
            onChange={(e) => setAdDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Kimden:</label>
          <input
            type="text"
            placeholder="Kimden"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
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
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
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
