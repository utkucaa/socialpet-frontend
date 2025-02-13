import React, { useState } from "react";
import "./PetForm.css";

function AddPetForm() {
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form verilerini backend'e gönder
    console.log({
      petName,
      petType,
      petBreed,
      age,
      gender,
      description,
      photo,
    });
  };

  return (
    <div className="pet-form-container">
      <h2>Evcil Hayvan Ekle</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Adı:</label>
          <input
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Türü:</label>
          <select value={petType} onChange={(e) => setPetType(e.target.value)} required>
            <option value="">Seçiniz</option>
            <option value="Kedi">Kedi</option>
            <option value="Köpek">Köpek</option>
            <option value="Kuş">Kuş</option>
          </select>
        </div>

        <div className="form-group">
          <label>Cinsi:</label>
          <input
            type="text"
            value={petBreed}
            onChange={(e) => setPetBreed(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Yaşı:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Cinsiyeti:</label>
          <div>
            <input
              type="radio"
              value="Erkek"
              checked={gender === "Erkek"}
              onChange={(e) => setGender(e.target.value)}
            />{" "}
            Erkek
            <input
              type="radio"
              value="Dişi"
              checked={gender === "Dişi"}
              onChange={(e) => setGender(e.target.value)}
            />{" "}
            Dişi
          </div>
        </div>

        <div className="form-group">
          <label>Açıklama:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Fotoğraf:</label>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className="btn-submit">Kaydet</button>
      </form>
    </div>
  );
}

export default PetForm;
