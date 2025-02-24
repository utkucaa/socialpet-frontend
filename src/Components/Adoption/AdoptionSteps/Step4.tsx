import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdoptionSteps.css";
import axiosInstance from "../../../services/axios";
import { AdoptionData } from '../types';

interface Step {
  number: number;
  title: string;
}

interface RequiredFields {
  [key: string]: string;
}

interface AdData {
  animalType: string;
  petName: string;
  breed: string;
  age: number;
  gender: string;
  size: string;
  title: string;
  description: string;
  source: string;
  city: string;
  district: string;
  fullName: string;
  phone: string;
  userId: number;
  status: string;
  location: string;
  user: {
    id: number;
  };
}

interface Step4Props {
  adoptionData: Partial<AdoptionData>;
}

const Step4: React.FC<Step4Props> = ({ adoptionData }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const steps: Step[] = [
    { number: 1, title: "BİLGİLENDİRME" },
    { number: 2, title: "İLAN DETAYI" },
    { number: 3, title: "FOTOĞRAFLAR" },
    { number: 4, title: "İLANI YAYINLA" },
  ];

  const handlePublishAd = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");

      // Zorunlu alanları kontrol et
      const requiredFields: RequiredFields = {
        animalType: "Hayvan türü",
        petName: "Pet adı",
        breed: "Cinsi",
        age: "Yaşı",
        gender: "Cinsiyeti",
        size: "Boyutu",
        title: "İlan başlığı",
        description: "Açıklama",
        city: "Şehir",
        district: "İlçe",
        fullName: "Ad Soyad",
        phone: "Telefon"
      };

      const missingFields: string[] = [];
      for (const [field, label] of Object.entries(requiredFields)) {
        if (!adoptionData[field]) {
          missingFields.push(label);
        }
      }

      if (missingFields.length > 0) {
        setError(`Lütfen şu alanları doldurun: ${missingFields.join(", ")}`);
        return;
      }

      const adData: AdData = {
        animalType: adoptionData.animalType || "",
        petName: adoptionData.petName || "",
        breed: adoptionData.breed || "",
        age: Number(adoptionData.age) || 0,
        gender: adoptionData.gender || "",
        size: adoptionData.size || "",
        title: adoptionData.title || "",
        description: adoptionData.description || "",
        source: adoptionData.source || "WEB",
        city: adoptionData.city || "",
        district: adoptionData.district || "",
        fullName: adoptionData.fullName || "",
        phone: adoptionData.phone || "",
        userId: 12,
        status: "ACTIVE",
        location: `${adoptionData.city || ""}, ${adoptionData.district || ""}`,
        user: { id: 12 }
      };

      // Detaylı hata ayıklama için veriyi konsola yazdır
      console.log("Gönderilecek ilan verisi (JSON):", JSON.stringify(adData, null, 2));

      try {
        const response = await axiosInstance.post<{ id: string }>(
          "/v1/adoption/create",
          adData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        );

        console.log("Sunucudan gelen yanıt:", response.data);

        if (adoptionData.photo && response.data.id) {
          const photoFormData = new FormData();
          photoFormData.append('file', adoptionData.photo as File);

          try {
            const photoResponse = await axiosInstance.post(
              `/v1/adoption/${response.data.id}/upload-photo`,
              photoFormData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
            );

            if (!photoResponse.data) {
              console.error("Fotoğraf yükleme başarısız");
              alert("İlan kaydedildi fakat fotoğraf yüklenemedi. Daha sonra düzenleyebilirsiniz.");
            }
          } catch (error: any) {
            console.error("Fotoğraf yüklenirken hata:", error.response?.data || error);
            alert("İlan kaydedildi fakat fotoğraf yüklenemedi. Daha sonra düzenleyebilirsiniz.");
          }
        }

        alert("İlanınız başarıyla yayınlandı!");
        navigate("/adopt");

      } catch (error: any) {
        console.error("İlan kaydedilirken hata detayı:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
          request: adData
        });
        
        if (error.response?.data?.message) {
          setError(`Sunucu Hatası: ${error.response.data.message}`);
        } else if (error.response?.status === 400) {
          setError("Veri formatında bir hata var. Lütfen tüm alanları kontrol edin.");
          console.log("Gönderilen veriler:", adData);
        } else {
          setError("Sunucu hatası: İlan kaydedilemedi. Lütfen daha sonra tekrar deneyin.");
        }
      } finally {
        setLoading(false);
      }
    } catch (error: any) {
      console.error("İlan kaydedilirken hata detayı:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers
      });
      
      if (error.response?.data?.message) {
        setError(`Sunucu Hatası: ${error.response.data.message}`);
      } else if (error.response?.status === 400) {
        // Tüm form verilerini kontrol et ve eksik/hatalı alanları göster
        const formData = {
          animalType: adoptionData.animalType,
          petName: adoptionData.petName,
          breed: adoptionData.breed,
          age: adoptionData.age,
          gender: adoptionData.gender,
          size: adoptionData.size,
          title: adoptionData.title,
          description: adoptionData.description,
          city: adoptionData.city,
          district: adoptionData.district,
          fullName: adoptionData.fullName,
          phone: adoptionData.phone
        };

        const emptyFields = Object.entries(formData)
          .filter(([_, value]) => !value)
          .map(([key]) => key);

        if (emptyFields.length > 0) {
          setError(`Lütfen şu alanları doldurun: ${emptyFields.join(", ")}`);
        } else {
          setError("Veri formatında bir hata var. Lütfen tüm alanları kontrol edin.");
        }
        
        console.log("Form verileri:", formData);
      } else {
        setError("Sunucu hatası: İlan kaydedilemedi. Lütfen daha sonra tekrar deneyin.");
      }
    }
  };

  return (
    <div className="step step4">
      <div className="step-indicator">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`step ${step.number === 4 ? "active" : "inactive"}`}
          >
            <div className={`step-box ${step.number === 4 ? "active-box" : "inactive-box"}`}>
              {step.number}
            </div>
            <div
              className={`step-text ${step.number === 4 ? "active-text" : "inactive-text"}`}
            >
              {step.title}
            </div>
          </div>
        ))}
      </div>

      <h3>4. Adım: İlanı Yayınla</h3>

      <div className="ad-summary">
        <h4>İlan Özeti</h4>
        <p>Hayvan Türü: {adoptionData.animalType}</p>
        <p>Pet Adı: {adoptionData.petName}</p>
        <p>İlan Başlığı: {adoptionData.title}</p>
        <p>Şehir: {adoptionData.city}</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <button 
        onClick={handlePublishAd} 
        disabled={loading}
        className={loading ? "loading" : ""}
      >
        {loading ? "Yayınlanıyor..." : "İlanı Yayınla"}
      </button>
    </div>
  );
};

export default Step4;