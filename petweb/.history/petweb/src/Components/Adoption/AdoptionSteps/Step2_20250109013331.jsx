import React, { useState } from "react";
import "./AdoptionSteps.css";

const Step2 = ({ onNext }) => {
  const [formData, setFormData] = useState({
    petName: "",
    breed: "",
    age: "",
    gender: "",
    size: "",
    adTitle: "",
    adDescription: "",
    city: "",
    district: "",
    ownerName: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically validate the form data
    onNext(formData);
  };

  return (
    <div className="step2">
      <h3>İlan Detayları</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Pet Adı:</label>
          <input
            type="text"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
            placeholder="Pet adını giriniz"
            required
          />
        </div>

        <div className="form-group">
          <label>Cinsi:</label>
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            placeholder="Pet cinsini giriniz"
            required
          />
        </div>

        <div className="form-group">
          <label>Yaşı:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Yaşını giriniz"
            required
          />
        </div>

        <div className="form-group">
          <label>Cinsiyet:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Seçiniz</option>
            <option value="male">Erkek</option>
            <option value="female">Dişi</option>
          </select>
        </div>

        <div className="form-group">
          <label>İlan Başlığı:</label>
          <input
            type="text"
            name="adTitle"
            value={formData.adTitle}
            onChange={handleChange}
            placeholder="İlan başlığını giriniz"
            required
          />
        </div>

        <div className="form-group">
          <label>İlan Açıklaması:</label>
          <textarea
            name="adDescription"
            value={formData.adDescription}
            onChange={handleChange}
            placeholder="İlan detaylarını giriniz"
            required
          />
        </div>

        <div className="form-group">
          <label>Şehir:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Şehir giriniz"
            required
          />
        </div>

        <div className="form-group">
          <label>İlçe:</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="İlçe giriniz"
            required
          />
        </div>

        <button type="submit">Devam Et</button>
      </form>
    </div>
  );
};

export default Step2;