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
    return (
      <div className="create-listing-container">
        <div className="left-section">
          <div className="mobile-notice">
            İlanınızı mobil uygulamamız üzerinden gönderin. 
            <a href="#"> Tıklayın ve hemen indirin</a>.
          </div>
  
          <h2>İlan Gönder</h2>
          
          {/* Sol taraftaki form elemanları */}
          <div className="form-group">
            <input type="text" placeholder="İlan başlığı" />
          </div>
  
          <div className="form-group">
            <h3>İlan detayları</h3>
            <p>TELEFON NUMARASI GİRMEYİNİZ!</p>
            <textarea placeholder="İlan detayları..." />
          </div>
  
          {/* Diğer form elemanları */}
        </div>
  
        <div className="right-section">
          <h3>İlan görseli</h3>
          <div className="image-upload-section">
            <input
              type="file"
              accept="image/*"
              id="file-upload"
              style={{ display: 'none' }}
            />
            <label htmlFor="file-upload">
              <div className="image-preview">
                <div className="upload-text">
                  İLAN GÖRSELİ YÜKLE
                </div>
              </div>
            </label>
            <p className="upload-note">
              İnternet hızınıza bağlı olarak yükleme işlemi uzun sürebilir.
            </p>
          </div>
  
          <div className="button-group">
            <button className="publish-button">Yayımla</button>
            <button className="delete-button">Sil</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CreateListingPage;