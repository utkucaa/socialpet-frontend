import React, { useState } from "react";
import "./CreateListingPage.css";

const CreateListingPage = () => {
  const [listingData, setListingData] = useState({
    title: "",
    details: "",
    location: "",
    category: "",
    status: "",
    additionalInfo: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setListingData({ ...listingData, [name]: value });
  };

  const handleFileChange = (e) => {
    setListingData({ ...listingData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", listingData);
  };

  return (
    <div className="create-listing-container">
  <div className="left-section">
    <form onSubmit={handleSubmit}>
      {/* Kutu 1: İlan Başlığı */}
      <div className="container-box">
        <h2>İlan Gönder</h2>
        <div className="form-group">
          <label htmlFor="title">İlan Başlığı</label>
          <input
            type="text"
            id="title"
            name="title"
            value={listingData.title}
            onChange={handleInputChange}
            placeholder="İlan başlığını girin"
          />
        </div>
      </div>

      {/* Kutu 2: İlan Detayları, Konum, Kategori, Durum ve Ek Bilgi */}
      <div className="container-box">
        <div className="form-group">
          <label htmlFor="details">İlan Detayları</label>
          <textarea
            id="details"
            name="details"
            value={listingData.details}
            onChange={handleInputChange}
            placeholder="Detaylı açıklamanızı girin"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">İlan Konumu</label>
          <input
            type="text"
            id="location"
            name="location"
            value={listingData.location}
            onChange={handleInputChange}
            placeholder="Konum girin"
          />
        </div>
      </div>
    </form>
  </div>

  <div className="right-section">
    {/* Kutu 3: İlan Görseli ve Yayınla Butonları */}
    <div className="container-box">
      <div className="form-group">
        <label htmlFor="image">İlan Görseli</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
        />
        <div className="image-preview">
          {listingData.image && (
            <img
              src={URL.createObjectURL(listingData.image)}
              alt="İlan Görseli"
            />
          )}
        </div>
      </div>
      <button type="submit" className="publish-button">
        Yayınla
      </button>
      <button type="button" className="delete-button">
        Sil
      </button>
    </div>
  </div>
</div>
  );
};

export default CreateListingPage;
