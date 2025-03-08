import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export interface LostPet {
  id?: string;
  title: string;
  image: string;
  location: string;
  timestamp: number;
  animalType: string;
  details: string;
  status: string;
  additionalInfo?: string;
  userId?: string;
  viewCount?: number;
  contactInfo?: string;
  lastSeenDate?: string;
  lastSeenLocation?: string;
  imageUrl?: string;
}

const lostPetService = {
  // Tüm kayıp ilanlarını getir
  getLostPets: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lostpets`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lost pets:', error);
      throw error;
    }
  },

  // Belirli bir kayıp ilanını getir
  getLostPetById: async (id: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lostpets/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lost pet:', error);
      throw error;
    }
  },

  // Yeni kayıp ilanı oluştur
  createLostPet: async (userId: string, lostPet: LostPet) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/lostpets/${userId}`, lostPet);
      return response.data;
    } catch (error) {
      console.error('Error creating lost pet listing:', error);
      throw error;
    }
  },

  // Kayıp ilanını güncelle
  updateLostPet: async (id: string, lostPet: LostPet) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/lostpets/${id}`, lostPet);
      return response.data;
    } catch (error) {
      console.error('Error updating lost pet listing:', error);
      throw error;
    }
  },

  // Kayıp ilanını sil
  deleteLostPet: async (id: string, userId: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/lostpets/${id}?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting lost pet listing:', error);
      throw error;
    }
  }
};

export default lostPetService; 