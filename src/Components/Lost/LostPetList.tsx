import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import lostPetService from '../../services/lostPetService';
import axiosInstance from '../../services/axios';

const API_BASE_URL = 'http://localhost:8080';

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
          
          // AdDetail'deki gibi resim URL'lerini düzenliyoruz
          if (processedPet.imageUrl) {
            processedPet.imageUrl = processedPet.imageUrl.startsWith('http') 
              ? processedPet.imageUrl 
              : `${API_BASE_URL}${processedPet.imageUrl}`;
          }
          
          if (processedPet.image) {
            processedPet.image = processedPet.image.startsWith('http') 
              ? processedPet.image 
              : `${API_BASE_URL}${processedPet.image}`;
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
    // Önce imageUrl'i kontrol et
    if (pet.imageUrl) {
      return pet.imageUrl;
    }
    
    // Sonra image'i kontrol et
    if (pet.image) {
      return pet.image;
    }
    
    // Hiçbiri yoksa placeholder kullan
    return '/placeholder-pet.jpg';
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || lostPets.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-md">
          <p className="font-medium">{error || "Henüz ilan bulunmamaktadır."}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      {/* İlan listesi render edilir */}
      {lostPets.map((pet) => (
        <div key={pet.id} className="pet-card">
          <img 
            src={getImageUrl(pet)} 
            alt={pet.title} 
            className="pet-image" 
            onError={(e) => {
              console.error(`Error loading image for pet ${pet.id}:`, e);
              console.log("Failed image URL:", getImageUrl(pet));
              (e.target as HTMLImageElement).src = '/placeholder-pet.jpg';
            }}
          />
          {/* Diğer ilan bilgileri */}
        </div>
      ))}
    </div>
  );
};

export default LostPetList; 