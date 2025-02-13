import React, { useState } from 'react';
import './CreateListingPage.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const CreateListingPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Dosya önizlemesi için
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 41.0082,
    lng: 28.9784
  };

  const handleMapClick = (event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  };

  return (
    <div className="create-listing-container">

      <div className="listing-form">
        <h2>İlan Gönder</h2>

        <div className="form-group">
          <input type="text" placeholder="İlan başlığı" className="form-input" />
        </div>

        <div className="form-group">
          <h3>İlan detayları</h3>
          <p className="phone-warning">TELEFON NUMARASI GİRMEYİNİZ!</p>
          <textarea 
            className="form-textarea"
            placeholder="İlan detay bölümüne girdiğiniz her detay bulunma olasılığını artıracaktır. Kaybolduğu yer ve zaman gibi her detayı buraya girmelisiniz."
          />
          <p className="detail-note">
            Not: buraya girdiğiniz açıklama oluşturulacak afişte yer alacaktır. O nedenle kısa bir açıklama girmeyiniz.
          </p>
        </div>

        <div className="form-group">
          <h3>İlan Konumu</h3>
          <p>Lütfen haritayı sürükleyerek yaklaşık olarak kaybolduğu konumunu belirleyin.</p>
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={10}
              onClick={handleMapClick}
            >
              {selectedLocation && <Marker position={selectedLocation} />}
            </GoogleMap>
          </LoadScript>
        </div>

        <div className="form-group">
          <h3>İlan kategorisi</h3>
          <select className="form-select">
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
                <img src={previewUrl} alt="Preview" className="image-preview" />
              ) : (
                <div className="upload-placeholder">
                  İLAN GÖRSELİ YÜKLE
                </div>
              )}
            </label>
            <p className="upload-note">İnternet hızınıza bağlı olarak yükleme işlemi uzun sürebilir.</p>
          </div>
        </div>

        <div className="form-actions">
          <button className="publish-button">Yayımla</button>
          <button className="delete-button">Sil</button>
        </div>

        <p className="terms-notice">
          Yayımla butonuna bastığınızda 
          <a href="#" className="terms-link">Şartlar ve Koşullar</a>'ı
          okumuş ve kabul etmiş sayılırsınız.
        </p>
      </div>
    </div>
  );
};

export default CreateListingPage;