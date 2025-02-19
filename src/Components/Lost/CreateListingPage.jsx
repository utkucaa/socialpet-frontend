import React, { useState } from 'react';
import './CreateListingPage.css';

const CreateListingPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="page-container">
      

      <div className="create-listing-container">
        <div className="left-section">
          <h2>İlan Gönder</h2>
          
          <div className="form-group">
            <input 
              type="text" 
              placeholder="İlan başlığı" 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <h3>İlan detayları</h3>
            
            <textarea 
              className="form-textarea"
              placeholder="İlan detay bölümüne girdiğiniz her detay bulunma olasılığını artıracaktır. Kaybolduğu yer ve zaman gibi her detayı buraya girmelisiniz."
            />
            <p className="note-text">
              Not: buraya girdiğiniz açıklama oluşturulacak afişte yer alacaktır. 
              O nedenle kısa bir açıklama girmeyiniz.
            </p>
          </div>

          <div className="form-group">
            <h3>İlan Konumu</h3>
            <p>Lütfen haritayı sürükleyerek yaklaşık olarak kaybolduğu konumunu belirleyin.</p>
            <div className="map-container">
              <p>Harita yükleniyor...</p>
            </div>
          </div>

          <div className="form-group">
            <h3>İlan kategorisi</h3>
            <select className="form-select">
              <option value="">Seçiniz</option>
              <option value="kedi">Kedi</option>
              <option value="kopek">Köpek</option>
              <option value="papagan">Papağan</option>
              <option value="muhabbet-kusu">Muhabbet Kuşu</option>
            </select>
          </div>

          <div className="form-group">
            <h3>İlan durumu</h3>
            <select className="form-select">
              <option value="kayip">Kayıp</option>
              <option value="bulundu">Bulundu</option>
            </select>
          </div>
        </div>

        <div className="form-group">
            <h3>İlan ek bilgi</h3>
            <select className="form-select">
              <option value="bos">Boş</option>
              <option value="odullu">Ödüllü</option>
              <option value="acil">Acil</option>
            </select>
          </div>

        <div className="right-section">
          <div className="form-group">
            <h3>İlan görseli</h3>
            <div className="image-upload-container">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                id="file-input"
                className="file-input"
              />
              <label htmlFor="file-input" className="file-label">
                {previewUrl ? (
                  <img src={previewUrl} alt="Önizleme" className="preview-image" />
                ) : (
                  <div className="upload-placeholder">
                    İLAN GÖRSELİ YÜKLE
                  </div>
                )}
              </label>
              <p className="upload-note">
                İnternet hızınıza bağlı olarak yükleme işlemi uzun sürebilir.
              </p>
            </div>
          </div>

          <div className="button-container">
            <button className="publish-button">Yayımla</button>
            <button className="delete-button">Sil</button>
            <p className="terms-text">
              Yayımla butonuna bastığınızda 
              <a href="#"> Şartlar ve Koşullar</a>'ı
              okumuş ve kabul etmiş sayılırsınız.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListingPage;