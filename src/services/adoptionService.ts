import { AdoptionData } from '../components/Adoption/types';
import axiosInstance from './axios';

const API_BASE_URL = 'http://localhost:8080';

export interface AdoptionListingDetail {
  id: string;
  title: string;
  petName: string;
  breed: string;
  age: string | number;
  gender: string;
  size: string;
  description: string;
  city: string;
  district: string;
  fullName: string;
  phone: string;
  imageUrl: string;
  createdAt: string;
  status: string;
  slug?: string;
}

const adoptionService = {
  // Get all adoption listings
  getAdoptionListings: async () => {
    try {
      console.log('API isteği başlatılıyor:', `${API_BASE_URL}/api/v1/adoption/recent`);
      const response = await axiosInstance.get('/api/v1/adoption/recent');
      console.log('API yanıtı:', response);
      
      if (!response.data) {
        throw new Error('Sunucudan veri alınamadı');
      }

      // Add base URL to image URLs if they don't start with http
      const processedData = response.data.map((listing: AdoptionListingDetail) => ({
        ...listing,
        imageUrl: listing.imageUrl ? 
          (listing.imageUrl.startsWith('http') ? listing.imageUrl : `${API_BASE_URL}${listing.imageUrl}`) 
          : null
      }));

      console.log('İşlenmiş veri:', processedData);
      return processedData;
    } catch (error: any) {
      console.error('API Hatası:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      
      if (error.response?.status === 404) {
        throw new Error('İlan bulunamadı');
      } else if (!navigator.onLine) {
        throw new Error('İnternet bağlantınızı kontrol ediniz');
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Sunucu yanıt vermedi, lütfen daha sonra tekrar deneyiniz');
      }
      
      throw new Error(error.response?.data?.message || 'İlanlar yüklenirken bir hata oluştu');
    }
  },

  // Get a specific adoption listing by slug
  getAdoptionListingById: async (slug: string) => {
    try {
      console.log('Fetching adoption listing with slug:', slug);
      const response = await axiosInstance.get(`/api/v1/adoption/${slug}`);
      console.log('Listing detail response:', response.data);

      if (!response.data) {
        throw new Error('İlan bulunamadı');
      }

      const listing = response.data;
      return {
        ...listing,
        imageUrl: listing.imageUrl ? 
          (listing.imageUrl.startsWith('http') ? listing.imageUrl : `${API_BASE_URL}${listing.imageUrl}`)
          : null
      };
    } catch (error: any) {
      console.error('Error fetching listing detail:', error);
      throw new Error(error.response?.data?.message || 'İlan detayları yüklenirken bir hata oluştu');
    }
  },

  // Create a new adoption listing
  createAdoptionListing: async (data: AdoptionData) => {
    try {
      const response = await axiosInstance.post('/api/v1/adoption/create', data);
      console.log('Create listing response:', response.data);

      if (!response.data) {
        throw new Error('İlan oluşturulamadı');
      }

      const listing = response.data;
      return {
        ...listing,
        imageUrl: listing.imageUrl ? 
          (listing.imageUrl.startsWith('http') ? listing.imageUrl : `${API_BASE_URL}${listing.imageUrl}`)
          : null
      };
    } catch (error: any) {
      console.error('Error creating listing:', error);
      throw new Error(error.response?.data?.message || 'İlan oluşturulurken bir hata oluştu');
    }
  },

  // Upload photo for an adoption listing
  uploadPhoto: async (id: string, photo: File) => {
    try {
      const formData = new FormData();
      formData.append('file', photo);
      
      const response = await axiosInstance.post(`/api/v1/adoption/${id}/upload-photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Photo upload response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error uploading photo:', error);
      throw new Error(error.response?.data?.message || 'Fotoğraf yüklenirken bir hata oluştu');
    }
  }
};

export default adoptionService; 