import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import notificationService, { Notification, NotificationType } from '../../services/notificationService';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationService.getNotifications();
      setNotifications(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Bildirimler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => 
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
    } catch (err: any) {
      console.error('Error marking notification as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => ({ ...notification, read: true }))
      );
    } catch (err: any) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  const handleDeleteNotification = async (id: number) => {
    try {
      await notificationService.deleteNotification(id);
      setNotifications(prevNotifications => 
        prevNotifications.filter(notification => notification.id !== id)
      );
    } catch (err: any) {
      console.error('Error deleting notification:', err);
    }
  };

  const getNotificationLink = (notification: Notification) => {
    switch (notification.relatedEntityType) {
      case 'Post':
        return `/posts/${notification.relatedEntityId}`;
      case 'Pet':
        return `/pets/${notification.relatedEntityId}`;
      case 'User':
        return `/profile/${notification.relatedEntityId}`;
      default:
        return '#';
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.NEW_FOLLOWER:
        return (
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
          </svg>
        );
      case NotificationType.LIKE:
        return (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
          </svg>
        );
      case NotificationType.COMMENT:
        return (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"></path>
          </svg>
        );
      case NotificationType.ADOPTION_REQUEST:
        return (
          <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
          </svg>
        );
      case NotificationType.LOST_PET_MATCH:
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"></path>
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
          </svg>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 max-h-96 overflow-y-auto"
      style={{ top: '100%' }}
    >
      <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-700">Bildirimler</h3>
        {notifications.length > 0 && (
          <button 
            onClick={handleMarkAllAsRead}
            className="text-xs text-purple-600 hover:text-purple-800"
          >
            Tümünü Okundu İşaretle
          </button>
        )}
      </div>

      {loading ? (
        <div className="px-4 py-3 text-center text-gray-500">
          Yükleniyor...
        </div>
      ) : error ? (
        <div className="px-4 py-3 text-center text-red-500">
          {error}
        </div>
      ) : notifications.length === 0 ? (
        <div className="px-4 py-3 text-center text-gray-500">
          Henüz bildiriminiz bulunmamaktadır.
        </div>
      ) : (
        <div>
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-purple-50' : ''}`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-grow">
                  <Link 
                    to={getNotificationLink(notification)}
                    onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                    className="block"
                  >
                    <p className="text-xs font-medium text-gray-500 mb-1">{notification.title}</p>
                    <p className={`text-sm ${!notification.read ? 'font-semibold' : 'text-gray-700'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true, locale: tr })}
                    </p>
                  </Link>
                </div>
                <div className="flex-shrink-0 ml-2">
                  <button
                    onClick={() => handleDeleteNotification(notification.id)}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Delete notification"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
