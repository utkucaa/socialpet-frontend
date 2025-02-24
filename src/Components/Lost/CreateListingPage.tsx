import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateListingPage.css';

interface FormData {
  title: string;
  details: string;
  location: string;
  animalType: string;
  status: string;
  additionalInfo: string;
}

interface NewListing extends FormData {
  id: number;
  image: string;
  timestamp: number;
}

const CreateListingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    details: '',
    location: '',
    animalType: '',
    status: 'kayip',
    additionalInfo: '',
  });

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (): void => {
    const newListing: NewListing = {
      id: Date.now(),
      title: formData.title,
      image: previewUrl || '/default-image.jpg',
      location: formData.location || 'Konum belirtilmedi',
      timestamp: Date.now(),
      animalType: formData.animalType,
      details: formData.details,
      status: formData.status,
      additionalInfo: formData.additionalInfo
    };

    // Mevcut ilanları localStorage'dan al
    const existingListings = JSON.parse(localStorage.getItem('lostAnimals') || '[]') as NewListing[];
    
    // Yeni ilanı listeye ekle
    const updatedListings = [newListing, ...existingListings];
    
    // Güncellenmiş listeyi localStorage'a kaydet
    localStorage.setItem('lostAnimals', JSON.stringify(updatedListings));

    // Ana sayfaya yönlendir
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="create-listing-container">
        <div className="left-section">
          <h2>İlan Gönder</h2>
          
          <div className="form-group">
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="İlan başlığı" 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <h3>İlan detayları</h3>
            <textarea 
              name="details"
              value={formData.details}
              onChange={handleInputChange}
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
            <input 
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Konum giriniz"
              className="form-input"
            />
            <p>Lütfen kaybolduğu konumu belirtin.</p>
          </div>

          <div className="form-group">
            <h3>İlan kategorisi</h3>
            <select 
              name="animalType"
              value={formData.animalType}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Seçiniz</option>
              <option value="Kedi">Kedi</option>
              <option value="Köpek">Köpek</option>
              <option value="Papağan">Papağan</option>
              <option value="Muhabbet Kuşu">Muhabbet Kuşu</option>
            </select>
          </div>

          <div className="form-group">
            <h3>İlan durumu</h3>
            <select 
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="kayip">Kayıp</option>
              <option value="bulundu">Bulundu</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <h3>İlan ek bilgi</h3>
          <select 
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            className="form-select"
          >
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
            <button className="publish-button" onClick={handleSubmit}>Yayımla</button>
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