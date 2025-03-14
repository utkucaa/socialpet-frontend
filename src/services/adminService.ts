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

export interface User {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  status: string;
  createdAt: string;
}

export interface PendingUser {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  requestDate: string;
}

export interface CreateUserRequest {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
}

export interface UpdateUserRequest {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phoneNumber: string;
  role: string;
}

export interface DonationOrganization {
  id: number;
  name: string;
  description: string;
  phoneNumber: string;
  iban: string;
  imageUrl?: string;
  address: string;
  website?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  active: boolean;
  createdAt: string;
}

export interface CreateDonationOrganizationRequest {
  name: string;
  description: string;
  phoneNumber: string;
  iban: string;
  address: string;
  website?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  active?: boolean;
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
  },

  // User Management API Endpoints

  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await axiosInstance.get('/api/v1/admin/users');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching users:', error);
      throw new Error(error.response?.data?.message || 'Kullanıcılar alınamadı');
    }
  },

  // Get pending users
  getPendingUsers: async (): Promise<PendingUser[]> => {
    try {
      const response = await axiosInstance.get('/api/v1/admin/users/pending');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching pending users:', error);
      throw new Error(error.response?.data?.message || 'Onay bekleyen kullanıcılar alınamadı');
    }
  },

  // Get user details
  getUserDetails: async (userId: number): Promise<User> => {
    try {
      const response = await axiosInstance.get(`/api/v1/admin/users/${userId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching user details:', error);
      throw new Error(error.response?.data?.message || 'Kullanıcı detayları alınamadı');
    }
  },

  // Create new user
  createUser: async (userData: CreateUserRequest): Promise<User> => {
    try {
      const response = await axiosInstance.post('/api/v1/admin/users', userData);
      return response.data;
    } catch (error: any) {
      console.error('Error creating user:', error);
      throw new Error(error.response?.data?.message || 'Kullanıcı oluşturulamadı');
    }
  },

  // Update user
  updateUser: async (userId: number, userData: UpdateUserRequest): Promise<User> => {
    try {
      const response = await axiosInstance.put(`/api/v1/admin/users/${userId}`, userData);
      return response.data;
    } catch (error: any) {
      console.error('Error updating user:', error);
      throw new Error(error.response?.data?.message || 'Kullanıcı güncellenemedi');
    }
  },

  // Delete user
  deleteUser: async (userId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/api/v1/admin/users/${userId}`);
    } catch (error: any) {
      console.error('Error deleting user:', error);
      throw new Error(error.response?.data?.message || 'Kullanıcı silinemedi');
    }
  },

  // Change user role
  changeUserRole: async (userId: number, role: string): Promise<User> => {
    try {
      const response = await axiosInstance.put(`/api/v1/admin/users/${userId}/role?role=${role}`);
      return response.data;
    } catch (error: any) {
      console.error('Error changing user role:', error);
      throw new Error(error.response?.data?.message || 'Kullanıcı rolü değiştirilemedi');
    }
  },

  // Approve user
  approveUser: async (userId: number): Promise<User> => {
    try {
      const response = await axiosInstance.put(`/api/v1/admin/users/${userId}/approve`);
      return response.data;
    } catch (error: any) {
      console.error('Error approving user:', error);
      throw new Error(error.response?.data?.message || 'Kullanıcı onaylanamadı');
    }
  },

  // Reject user
  rejectUser: async (userId: number): Promise<User> => {
    try {
      const response = await axiosInstance.put(`/api/v1/admin/users/${userId}/reject`);
      return response.data;
    } catch (error: any) {
      console.error('Error rejecting user:', error);
      throw new Error(error.response?.data?.message || 'Kullanıcı reddedilemedi');
    }
  },

  // Donation Organizations API Endpoints

  // Get all donation organizations (admin)
  getAllDonationOrganizations: async (): Promise<DonationOrganization[]> => {
    try {
      const response = await axiosInstance.get('/api/v1/donation-organizations/admin');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching donation organizations:', error);
      throw new Error(error.response?.data?.message || 'Bağış kurumları alınamadı');
    }
  },

  // Get active donation organizations (public)
  getActiveDonationOrganizations: async (): Promise<DonationOrganization[]> => {
    try {
      const response = await axiosInstance.get('/api/v1/donation-organizations');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching active donation organizations:', error);
      throw new Error(error.response?.data?.message || 'Aktif bağış kurumları alınamadı');
    }
  },

  // Get donation organization details
  getDonationOrganizationDetails: async (id: number): Promise<DonationOrganization> => {
    try {
      const response = await axiosInstance.get(`/api/v1/donation-organizations/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching donation organization details:', error);
      throw new Error(error.response?.data?.message || 'Bağış kurumu detayları alınamadı');
    }
  },

  // Create new donation organization
  createDonationOrganization: async (data: CreateDonationOrganizationRequest): Promise<DonationOrganization> => {
    try {
      const response = await axiosInstance.post('/api/v1/donation-organizations', data);
      return response.data;
    } catch (error: any) {
      console.error('Error creating donation organization:', error);
      throw new Error(error.response?.data?.message || 'Bağış kurumu oluşturulamadı');
    }
  },

  // Update donation organization
  updateDonationOrganization: async (id: number, data: CreateDonationOrganizationRequest): Promise<DonationOrganization> => {
    try {
      const response = await axiosInstance.put(`/api/v1/donation-organizations/${id}`, data);
      return response.data;
    } catch (error: any) {
      console.error('Error updating donation organization:', error);
      throw new Error(error.response?.data?.message || 'Bağış kurumu güncellenemedi');
    }
  },

  // Delete donation organization
  deleteDonationOrganization: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/api/v1/donation-organizations/${id}`);
    } catch (error: any) {
      console.error('Error deleting donation organization:', error);
      throw new Error(error.response?.data?.message || 'Bağış kurumu silinemedi');
    }
  },

  // Upload donation organization image
  uploadDonationOrganizationImage: async (id: number, imageFile: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await axiosInstance.post(
        `/api/v1/donation-organizations/${id}/image`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data.imageUrl;
    } catch (error: any) {
      console.error('Error uploading donation organization image:', error);
      throw new Error(error.response?.data?.message || 'Bağış kurumu resmi yüklenemedi');
    }
  },

  // Toggle donation organization active status
  toggleDonationOrganizationStatus: async (id: number): Promise<DonationOrganization> => {
    try {
      const response = await axiosInstance.put(`/api/v1/donation-organizations/${id}/toggle-status`);
      return response.data;
    } catch (error: any) {
      console.error('Error toggling donation organization status:', error);
      throw new Error(error.response?.data?.message || 'Bağış kurumu durumu değiştirilemedi');
    }
  },
};

export default adminService; 