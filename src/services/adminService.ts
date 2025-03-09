import axiosInstance from './axios';

export interface PendingCounts {
  pendingAdoptionsCount: number;
  pendingLostPetsCount: number;
  totalPendingCount: number;
}

export interface PendingAdoption {
  id: number;
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
  imageUrl: string;
  slug: string;
  createdAt: string;
  approvalStatus: string;
  viewCount: number;
  user: {
    id: number;
    userName: string;
  };
}

export interface PendingLostPet {
  id: number;
  title: string;
  details: string;
  location: string;
  category: string;
  status: string;
  additionalInfo: string;
  imageUrl: string;
  contactInfo: string;
  lastSeenDate: string;
  lastSeenLocation: string;
  viewCount: number;
  approvalStatus: string;
  user: {
    id: number;
    userName: string;
  };
}

export interface PendingListings {
  pendingAdoptions: PendingAdoption[];
  pendingLostPets: PendingLostPet[];
}

const adminService = {
  // Get counts of pending ads
  getPendingCounts: async (): Promise<PendingCounts> => {
    try {
      const response = await axiosInstance.get('/api/v1/admin/pending-counts');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching pending counts:', error);
      throw new Error(error.response?.data?.message || 'Onay bekleyen ilan sayıları alınamadı');
    }
  },

  // Get all pending listings
  getPendingListings: async (): Promise<PendingListings> => {
    try {
      const response = await axiosInstance.get('/api/v1/admin/pending-listings');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching pending listings:', error);
      throw new Error(error.response?.data?.message || 'Onay bekleyen ilanlar alınamadı');
    }
  },

  // Get pending adoption listings
  getPendingAdoptions: async (): Promise<PendingAdoption[]> => {
    try {
      const response = await axiosInstance.get('/api/v1/admin/adoptions/pending');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching pending adoptions:', error);
      throw new Error(error.response?.data?.message || 'Onay bekleyen sahiplendirme ilanları alınamadı');
    }
  },

  // Get pending lost pet listings
  getPendingLostPets: async (): Promise<PendingLostPet[]> => {
    try {
      const response = await axiosInstance.get('/api/v1/admin/lostpets/pending');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching pending lost pets:', error);
      throw new Error(error.response?.data?.message || 'Onay bekleyen kayıp ilanları alınamadı');
    }
  },

  // Approve an adoption listing
  approveAdoption: async (id: string): Promise<PendingAdoption> => {
    try {
      const response = await axiosInstance.put(`/api/v1/admin/adoptions/${id}/approve`);
      return response.data;
    } catch (error: any) {
      console.error('Error approving adoption:', error);
      throw new Error(error.response?.data?.message || 'Sahiplendirme ilanı onaylanamadı');
    }
  },

  // Reject an adoption listing
  rejectAdoption: async (id: string): Promise<PendingAdoption> => {
    try {
      const response = await axiosInstance.put(`/api/v1/admin/adoptions/${id}/reject`);
      return response.data;
    } catch (error: any) {
      console.error('Error rejecting adoption:', error);
      throw new Error(error.response?.data?.message || 'Sahiplendirme ilanı reddedilemedi');
    }
  },

  // Approve a lost pet listing
  approveLostPet: async (id: string): Promise<PendingLostPet> => {
    try {
      const response = await axiosInstance.put(`/api/v1/admin/lostpets/${id}/approve`);
      return response.data;
    } catch (error: any) {
      console.error('Error approving lost pet:', error);
      throw new Error(error.response?.data?.message || 'Kayıp ilanı onaylanamadı');
    }
  },

  // Reject a lost pet listing
  rejectLostPet: async (id: string): Promise<PendingLostPet> => {
    try {
      const response = await axiosInstance.put(`/api/v1/admin/lostpets/${id}/reject`);
      return response.data;
    } catch (error: any) {
      console.error('Error rejecting lost pet:', error);
      throw new Error(error.response?.data?.message || 'Kayıp ilanı reddedilemedi');
    }
  }
};

export default adminService; 