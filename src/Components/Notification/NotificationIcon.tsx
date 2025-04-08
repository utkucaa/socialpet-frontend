import React, { useState, useEffect, useCallback } from 'react';
import notificationService from '../../services/notificationService';
import NotificationDropdown from './NotificationDropdown';

interface NotificationIconProps {
  userId: string | undefined;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ userId }) => {
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const fetchUnreadCount = useCallback(async () => {
    if (!userId) return;
    
    try {
      const data = await notificationService.getUnreadCount();
      setUnreadCount(data.count);
    } catch (error) {
      console.error('Error fetching unread notification count:', error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUnreadCount();
      // Set up polling to check for new notifications every minute
      const intervalId = setInterval(fetchUnreadCount, 60000);
      return () => clearInterval(intervalId);
    }
  }, [userId, fetchUnreadCount]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="relative p-1 text-gray-700 hover:text-purple-600 transition-colors duration-200 focus:outline-none"
        aria-label="Bildirimler"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          ></path>
        </svg>
        
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      <NotificationDropdown 
        isOpen={isDropdownOpen} 
        onClose={closeDropdown} 
      />
    </div>
  );
};

export default NotificationIcon;
