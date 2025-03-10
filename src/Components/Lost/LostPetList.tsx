import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import lostPetService from '../../services/lostPetService';
import axiosInstance from '../../services/axios';

const LostPetList: React.FC = () => {
  const [lostPets, setLostPets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLostPets = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Doğrudan axios instance kullanarak API çağrısı yapıyoruz
        const response = await axiosInstance.get('/api/lostpets');
        console.log("Received lost pets list:", response.data);
        
        if (!response.data) {
          setError("İlanlar yüklenemedi.");
          return;
        }
        
        // API'den gelen veriyi işliyoruz ve resim URL'lerini düzenliyoruz
        const processedData = response.data.map((pet: any) => {
          const processedPet = { ...pet };
          
          // Resim URL'ini düzenliyoruz
          if (processedPet.image) {
            // Base64 kontrolü
            if (processedPet.image.startsWith('data:image')) {
              console.log('Base64 image detected, this should be handled on the server side');
              // Base64 resimler sunucu tarafında işlenmeli, burada sadece log
            } 
            // Tam URL kontrolü (http veya https ile başlayan)
            else if (processedPet.image.startsWith('http')) {
              // URL zaten tam, değişiklik yapmaya gerek yok
              console.log('Full URL detected:', processedPet.image);
            }
            // FileController URL formatı kontrolü
            else if (processedPet.image.includes('/api/v1/files/')) {
              // URL zaten doğru formatta, değişiklik yapmaya gerek yok
              console.log('File controller URL detected:', processedPet.image);
            }
            // Göreceli URL kontrolü
            else {
              // Dosya adı olabilir, FileController URL'ine dönüştür
              processedPet.image = `/api/v1/files/${processedPet.image}`;
            }
          }
          
          // ImageUrl kontrolü
          if (processedPet.imageUrl) {
            // Base64 kontrolü
            if (processedPet.imageUrl.startsWith('data:image')) {
              console.log('Base64 imageUrl detected, this should be handled on the server side');
              // Base64 resimler sunucu tarafında işlenmeli, burada sadece log
            } 
            // Tam URL kontrolü (http veya https ile başlayan)
            else if (processedPet.imageUrl.startsWith('http')) {
              // URL zaten tam, değişiklik yapmaya gerek yok
              console.log('Full URL detected:', processedPet.imageUrl);
            }
            // FileController URL formatı kontrolü
            else if (processedPet.imageUrl.includes('/api/v1/files/')) {
              // URL zaten doğru formatta, değişiklik yapmaya gerek yok
              console.log('File controller URL detected:', processedPet.imageUrl);
            }
            // Göreceli URL kontrolü
            else {
              // Dosya adı olabilir, FileController URL'ine dönüştür
              processedPet.imageUrl = `/api/v1/files/${processedPet.imageUrl}`;
            }
          }
          
          return processedPet;
        });
        
        setLostPets(processedData);
      } catch (err: any) {
        console.error('Error fetching lost pets:', err);
        setError(err.response?.data?.message || 'İlanlar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLostPets();
  }, []);

  // Resim URL'ini güvenli bir şekilde al
  const getImageUrl = (pet: any): string => {
    // Önce image alanını kontrol et
    if (pet.image && !pet.image.startsWith('data:image')) {
      return pet.image;
    }
    
    // Sonra imageUrl alanını kontrol et
    if (pet.imageUrl && !pet.imageUrl.startsWith('data:image')) {
      return pet.imageUrl;
    }
    
    // Hiçbiri yoksa veya base64 ise placeholder kullan
    return '/placeholder-pet.jpg';
  };
  
  return (
    <div>
      {/* İlan listesi render edilir */}
      {lostPets.map((pet) => (
        <div key={pet.id} className="pet-card">
          <img 
            src={getImageUrl(pet)} 
            alt={pet.title} 
            className="pet-image" 
          />
          {/* Diğer ilan bilgileri */}
        </div>
      ))}
    </div>
  );
};

export default LostPetList; 