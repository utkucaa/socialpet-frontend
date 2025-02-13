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
          <small>
            İlan detay bölümüne girdiğiniz her detay bulunma olasılığını
            artıracaktır. Kaybolduğu yer ve zaman gibi her detayı buraya
            girmelisiniz. Not: buraya girdiğiniz açıklama oluşturulacak
            afişte yer alacaktır. O nedenle kısa bir açıklama girmeyiniz.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="location">İlan Konumu</label>
          <div className="map-container">
            {/* Burada bir harita komponenti kullanılabilir */}
            <p>Lütfen haritayı sürükleyerek yaklaşık olarak kaybolduğu konumunu belirleyin.</p>
          </div>
          <input
            type="text"
            id="location"
            name="location"
            value={listingData.location}
            onChange={handleInputChange}
            placeholder="Konum girin"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">İlan Kategorisi</label>
          <select
            id="category"
            name="category"
            value={listingData.category}
            onChange={handleInputChange}
          >
            <option value="">Seçin</option>
            <option value="kedi">Kedi</option>
            <option value="köpek">Köpek</option>
            <option value="papağan">Papağan</option>
            <option value="muhabbet kuşu">Muhabbet Kuşu</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">İlan Durumu</label>
          <select
            id="status"
            name="status"
            value={listingData.status}
            onChange={handleInputChange}
          >
            <option value="">Seçin</option>
            <option value="kayip">Kayıp</option>
            <option value="sahibi aranıyor">Sahibi Aranıyor</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="additionalInfo">İlan Ek Bilgi</label>
          <select
            id="additionalInfo"
            name="additionalInfo"
            value={listingData.additionalInfo}
            onChange={handleInputChange}
          >
            <option value="">Seçin</option>
            <option value="boş">Boş</option>
            <option value="ödüllü">Ödüllü</option>
            <option value="acil">Acil</option>
          </select>
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
        <small>
          İnternet hızınıza bağlı olarak yükleme işlemi uzun sürebilir.
        </small>
      </div>

      <div className="form-group terms">
        <input type="checkbox" id="terms" required />
        <label htmlFor="terms">
          Şartlar ve Koşullar'ı okumuş ve kabul etmiş sayılırsınız.
        </label>
      </div>

      <button type="submit" className="publish-button">
        Yayınla
      </button>
      <button  className="delete-button">
        Sil
      </button>
    </div>
  </div>
</div>

  );
};

export default CreateListingPage;
