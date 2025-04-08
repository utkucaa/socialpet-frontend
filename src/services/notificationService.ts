import axiosInstance from './axios';

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  relatedEntityId?: number;
  relatedEntityType?: string;
}

export enum NotificationType {
  NEW_FOLLOWER = 'NEW_FOLLOWER',
  LIKE = 'LIKE',
  COMMENT = 'COMMENT',
  ADOPTION_REQUEST = 'ADOPTION_REQUEST',
  ADOPTION_STATUS_CHANGE = 'ADOPTION_STATUS_CHANGE',
  PET_HEALTH_REMINDER = 'PET_HEALTH_REMINDER',
  SYSTEM_NOTIFICATION = 'SYSTEM_NOTIFICATION',
  LOST_PET_MATCH = 'LOST_PET_MATCH',
  QUESTION_ANSWER = 'QUESTION_ANSWER',
  APPOINTMENT_REMINDER = 'APPOINTMENT_REMINDER'
}

export interface PaginatedResponse<T> {
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

const notificationService = {
  // Get all notifications for the current user
  getNotifications: async () => {
    try {
      const response = await axiosInstance.get('/api/notifications');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching notifications:', error);
      throw new Error(error.response?.data?.message || 'Bildirimler yüklenirken bir hata oluştu');
    }
  },

  // Get unread notifications
  getUnreadNotifications: async () => {
    try {
      const response = await axiosInstance.get('/api/notifications/unread');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching unread notifications:', error);
      throw new Error(error.response?.data?.message || 'Okunmamış bildirimler yüklenirken bir hata oluştu');
    }
  },

  // Get unread notification count
  getUnreadCount: async () => {
    try {
      const response = await axiosInstance.get('/api/notifications/unread/count');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching unread notification count:', error);
      throw new Error(error.response?.data?.message || 'Okunmamış bildirim sayısı alınırken bir hata oluştu');
    }
  },

  // Mark a notification as read
  markAsRead: async (notificationId: number) => {
    try {
      const response = await axiosInstance.put(`/api/notifications/${notificationId}/read`);
      return response.data;
    } catch (error: any) {
      console.error('Error marking notification as read:', error);
      throw new Error(error.response?.data?.message || 'Bildirim okundu olarak işaretlenirken bir hata oluştu');
    }
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    try {
      const response = await axiosInstance.put('/api/notifications/read-all');
      return response.data;
    } catch (error: any) {
      console.error('Error marking all notifications as read:', error);
      throw new Error(error.response?.data?.message || 'Tüm bildirimler okundu olarak işaretlenirken bir hata oluştu');
    }
  },

  // Delete a notification
  deleteNotification: async (notificationId: number) => {
    try {
      const response = await axiosInstance.delete(`/api/notifications/${notificationId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error deleting notification:', error);
      throw new Error(error.response?.data?.message || 'Bildirim silinirken bir hata oluştu');
    }
  },

  // Delete all notifications
  deleteAllNotifications: async () => {
    try {
      const response = await axiosInstance.delete('/api/notifications/all');
      return response.data;
    } catch (error: any) {
      console.error('Error deleting all notifications:', error);
      throw new Error(error.response?.data?.message || 'Tüm bildirimler silinirken bir hata oluştu');
    }
  },

  // Get paginated notifications
  getPaginatedNotifications: async (page: number = 0, size: number = 10, sort: string = 'createdAt,desc') => {
    try {
      const response = await axiosInstance.get(`/api/notifications/paginated?page=${page}&size=${size}&sort=${sort}`);
      return response.data as PaginatedResponse<Notification>;
    } catch (error: any) {
      console.error('Error fetching paginated notifications:', error);
      throw new Error(error.response?.data?.message || 'Sayfalanmış bildirimler yüklenirken bir hata oluştu');
    }
  },

  // Create a notification (admin only)
  createNotification: async (notification: {
    userId: number;
    title: string;
    message: string;
    type: NotificationType;
  }) => {
    try {
      const response = await axiosInstance.post('/api/notifications', notification);
      return response.data;
    } catch (error: any) {
      console.error('Error creating notification:', error);
      throw new Error(error.response?.data?.message || 'Bildirim oluşturulurken bir hata oluştu');
    }
  }
};

export default notificationService;
