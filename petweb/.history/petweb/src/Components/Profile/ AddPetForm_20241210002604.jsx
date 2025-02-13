import React, { useState } from "react";
import "./AddPetForm.css";

const AddPetForm = ({ onAddPet }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPet(formData); 
    setFormData({ name: "", type: "", breed: "", age: "" }); 
  };

  return (
    <form className="add-pet-form" onSubmit={handleSubmit}>
      <h3>Yeni Evcil Hayvan Ekle</h3>
      <label>
        Adı:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Tür:
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Seçiniz</option>
          <option value="Kedi">Kedi</option>
          <option value="Köpek">Köpek</option>
          <option value="Kuş">Kuş</option>
        </select>
      </label>
      <label>
        Cins:
        <input
          type="text"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Yaşı:
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Kaydet</button>
    </form>
  );
};

export default AddPetForm;
