import axiosInstance from './axios';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  status?: string;
  createdAt?: string;
}

const userService = {
  // Get all users (admin only)
  getUsers: async () => {
    try {
      const response = await axiosInstance.get('/api/v1/admin/users');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching users:', error);
      throw new Error(error.response?.data?.message || 'Kullanıcılar yüklenirken bir hata oluştu');
    }
  },

  // Get user by ID
  getUserById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/api/v1/users/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching user:', error);
      throw new Error(error.response?.data?.message || 'Kullanıcı bilgileri yüklenirken bir hata oluştu');
    }
  },

  // Get current user profile
  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get('/api/v1/users/me');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching current user:', error);
      throw new Error(error.response?.data?.message || 'Kullanıcı profili yüklenirken bir hata oluştu');
    }
  }
};

export default userService; 