import React, { useState } from "react";
import "./AdoptionSteps.css";

const Step2 = ({ onNext }) => {
  // Form verilerini state'te tutma
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

  const steps = [
    { number: 1, title: "BİLGİLENDİRME" },
    { number: 2, title: "İLAN DETAYI" },
    { number: 3, title: "FOTOĞRAFLAR" },
    { number: 4, title: "İLANI YAYINLA" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const adData = {
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

    try {
      // Axios ile POST isteği gönder
      const response = await axios.post(
        "http://localhost:8080/api/adoption/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // Başarılı yanıt
      console.log("Veritabanına kaydedildi:", response.data);
      setCurrentStep(3); // Step 3'e geçiş
    } catch (error) {
      // Hata durumunda kullanıcıya mesaj göster
      console.error("Hata oluştu:", error);
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    }
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
        <button type="submit">Devam Et</button>
      </form>
    </div>
  );
};

export default Step2;
