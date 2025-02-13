import React, { useState } from "react";
import './CreateListingPage.css';

const CreateListingPage = () => {
  const [image, setImage] = useState(null);
  
  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  
  return (
    <div className="create-listing-container">
      <div className="left-section">
        <h1>İlan Gönder</h1>
        
        <div className="form-group">
          <label htmlFor="title">İlan Başlığı</label>
          <input type="text" id="title" placeholder="İlan başlığınızı buraya girin" />
        </div>

        <div className="form-group">
          <label htmlFor="details">İlan Detayları</label>
          <textarea
            id="details"
            placeholder="İlan detay bölümüne girdiğiniz her detay, kaybolduğu yer ve zaman gibi her detayı buraya girmelisiniz."
          ></textarea>
          <small>
            İlan detay bölümüne girdiğiniz her detay bulunma olasılığını artıracaktır. Kaybolduğu yer ve zaman gibi her detayı buraya girmelisiniz.
            <br />
            Not: Buraya girdiğiniz açıklama oluşturulacak afişte yer alacaktır. O nedenle kısa bir açıklama girmeyiniz.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="location">İlan Konumu</label>
          <div className="map-container">
            <p>Lütfen haritayı sürükleyerek yaklaşık olarak kaybolduğu konumunu belirleyin.</p>
            {/* Harita buraya gelecek */}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">İlan Kategorisi</label>
          <select id="category">
            <option value="cat">Kedi</option>
            <option value="dog">Köpek</option>
            <option value="parrot">Papağan</option>
            <option value="budgie">Muhabbet Kuşu</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">İlan Kayıp Durumu</label>
          <select id="status">
            <option value="lost">Kayıp</option>
            <option value="seeking-owner">Sahibi Aranıyor</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="additional-info">İlan Ek Bilgi</label>
          <select id="additional-info">
            <option value="empty">Boş</option>
            <option value="reward">Ödüllü</option>
            <option value="urgent">Acil</option>
          </select>
        </div>
      </div>

      <div className="right-section">
        <div className="form-group">
          <label htmlFor="image">İlan Görseli</label>
          <input type="file" id="image" onChange={handleImageChange} />
          <div className="image-preview">
            {image && <img src={image} alt="preview" />}
          </div>
          <small>İnternet hızınıza bağlı olarak yükleme işlemi uzun sürebilir.</small>
        </div>

        <div className="terms">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">Şartlar ve Koşullar'ı okumuş ve kabul etmiş sayılırsınız.</label>
        </div>

        <div className="button-group">
          <button className="publish-button">Yayınla</button>
          <button className="delete-button">Sil</button>
        </div>
      </div>
    </div>
  );
};

export default CreateListingPage;

