import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import lostPetService from '../../services/lostPetService';
import axiosInstance from '../../services/axios';
import './CreateListingPage.css';

interface FormData {
  title: string;
  details: string;
  location: string;
  category: string;
  status: string;
  additionalInfo: string;
  contactInfo: string;
  lastSeenDate: string;
  lastSeenLocation: string;
  imageUrl: string;
  animalType: string;
  image: string;
}

const CreateListingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    details: '',
    location: '',
    category: '',
    status: 'Kayıp',
    additionalInfo: '',
    contactInfo: '',
    lastSeenDate: '',
    lastSeenLocation: '',
    imageUrl: '',
    animalType: '',
    image: ''
  });

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Sadece önizleme için base64 kullanıyoruz
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Dosyayı hemen sunucuya yükle
      uploadImage(file);
    }
  };

  const uploadImage = async (file: File): Promise<void> => {
    try {
      setIsUploading(true);
      console.log("Starting image upload for file:", file.name, file.type, file.size);
      
      // FormData oluştur
      const formData = new FormData();
      formData.append('file', file);
      
      // Dosyayı sunucuya yükle
      console.log("Sending request to /api/v1/files/upload");
      const response = await axiosInstance.post('/api/v1/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Image upload response:', response.data);
      
      // Sunucudan dönen fileUrl'i kullan
      if (response.data && response.data.fileUrl) {
        console.log("Using fileUrl from response:", response.data.fileUrl);
        
        // API'den dönen fileUrl'i doğrudan kullan
        setFormData(prev => ({
          ...prev,
          imageUrl: response.data.fileUrl,
          image: response.data.fileUrl
        }));
      } else if (response.data && response.data.fileName) {
        // Eğer fileUrl yoksa fileName ile URL oluştur
        // AdDetail'deki gibi tam URL oluştur
        const fileUrl = `http://localhost:8080/api/v1/files/${response.data.fileName}`;
        console.log("Using fileName to create URL:", fileUrl);
        setFormData(prev => ({
          ...prev,
          imageUrl: fileUrl,
          image: fileUrl
        }));
      } else {
        console.error("No fileUrl or fileName in response:", response.data);
        throw new Error('File URL or name not received from server');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Resim yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      // Resim yükleme işlemi devam ediyorsa bekle
      if (isUploading) {
        alert('Resim yükleniyor, lütfen bekleyin...');
        return;
      }
      
      const user = localStorage.getItem("user");
      const userData = user ? JSON.parse(user) : null;
      
      if (!userData) {
        console.error("User data is missing in localStorage");
        return;
      }
      
      const userId = userData.id;
      
      // Form verilerini logla
      console.log("Submitting form data:", formData);
      
      // Resim URL'lerini kontrol et
      if (!formData.imageUrl && !formData.image) {
        console.warn("No image URL provided");
      }
      
      // API'ye gönderilecek veriyi hazırla
      const lostPetData = {
        ...formData,
        timestamp: Date.now(),
        viewCount: 0,
        // Hem image hem de imageUrl alanlarını gönder
        image: formData.image || formData.imageUrl || "",
        imageUrl: formData.imageUrl || formData.image || "",
        animalType: formData.animalType || formData.category || "Unknown"
      };
      
      console.log("Sending data to API:", lostPetData);
      
      await lostPetService.createLostPet(userId, lostPetData);

      alert("İlan başarıyla oluşturuldu");
      navigate('/lost');
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('İlan oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
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
            <h3>Son Görüldüğü Konum</h3>
            <input 
              type="text"
              name="lastSeenLocation"
              value={formData.lastSeenLocation}
              onChange={handleInputChange}
              placeholder="Son görüldüğü konum"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <h3>Son Görüldüğü Tarih</h3>
            <input 
              type="date"
              name="lastSeenDate"
              value={formData.lastSeenDate}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <h3>İletişim Bilgileri</h3>
            <input 
              type="text"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleInputChange}
              placeholder="İletişim bilgileri"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <h3>İlan kategorisi</h3>
            <select 
              name="category"
              value={formData.category}
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
              <option value="Kayıp">Kayıp</option>
              <option value="Bulundu">Bulundu</option>
            </select>
          </div>

          <div className="form-group">
            <h3>İlan ek bilgi</h3>
            <select 
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Boş</option>
              <option value="Bulana ödül verilecektir">Ödüllü</option>
              <option value="Acil">Acil</option>
            </select>
          </div>
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
                disabled={isUploading}
              />
              <label htmlFor="file-input" className="file-label">
                {previewUrl ? (
                  <img src={previewUrl} alt="Önizleme" className="preview-image" />
                ) : (
                  <div className="upload-placeholder">
                    {isUploading ? 'YÜKLENIYOR...' : 'İLAN GÖRSELİ YÜKLE'}
                  </div>
                )}
              </label>
              <p className="upload-note">
                {isUploading 
                  ? 'Resim yükleniyor, lütfen bekleyin...' 
                  : 'İnternet hızınıza bağlı olarak yükleme işlemi uzun sürebilir.'}
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