import React, { useState } from 'react';
import './CreateListingPage.css';
import CategoryBar from '../Lost/CategoryBar';

const CreateListingPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    location: '',
    category: '',
    lostStatus: '',
    additionalInfo: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData({ ...formData, image: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada formu gönderme işlemi yapılabilir
    console.log(formData);
  };

  return (
    <CategoryBar />
    <div className="create-listing-page">
      <div className="left-section">
        <h1>İlan Gönder</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">İlan Başlığı</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="İlan başlığını buraya yazın"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="details">İlan Detayları</label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              placeholder="İlan detaylarını buraya yazın"
              required
            />
            <small className="info-text">
              İlan detay bölümüne girdiğiniz her detay bulunma olasılığını artıracaktır. 
              Kaybolduğu yer ve zaman gibi her detayı buraya girmelisiniz. 
              <br />
              Not: Buraya girdiğiniz açıklama oluşturulacak afişte yer alacaktır. O nedenle kısa bir açıklama girmeyiniz.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="location">İlan Konumu</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Konum"
              required
            />
            <small className="info-text">
              Lütfen haritayı sürükleyerek yaklaşık olarak kaybolduğu konumunu belirleyin.
            </small>
            {/* Burada harita bileşenini ekleyebilirsiniz */}
          </div>

          <div className="form-group">
            <label htmlFor="category">İlan Kategorisi</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Kategori seçin</option>
              <option value="cat">Kedi</option>
              <option value="dog">Köpek</option>
              <option value="parrot">Papağan</option>
              <option value="budgie">Muhabbet Kuşu</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="lostStatus">İlan Kayıp Durumu</label>
            <select
              id="lostStatus"
              name="lostStatus"
              value={formData.lostStatus}
              onChange={handleInputChange}
              required
            >
              <option value="">Kayıp durumu seçin</option>
              <option value="lost">Kayıp</option>
              <option value="found">Sahibi Aranıyor</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="additionalInfo">İlan Ek Bilgisi</label>
            <select
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              required
            >
              <option value="">Ek bilgi seçin</option>
              <option value="none">Boş</option>
              <option value="reward">Ödüllü</option>
              <option value="urgent">Acil</option>
            </select>
          </div>
        </form>
      </div>

      <div className="right-section">
        <div className="image-upload">
          <h3>İlan Görseli</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="preview">
            {formData.image && (
              <img src={URL.createObjectURL(formData.image)} alt="İlan Görseli" />
            )}
          </div>
          <small className="info-text">
            İnternet hızınıza bağlı olarak yükleme işlemi uzun sürebilir.
          </small>
        </div>

        <div className="submit-section">
          <label>
            <input type="checkbox" required />
            Şartlar ve Koşullar'ı okudum ve kabul ediyorum.
          </label>
          <button type="submit">Yayımla</button>
          <button type="button">Sil</button>
        </div>
      </div>
    </div>
  );
};

export default CreateListingPage;
