import React, { useEffect, useRef, useState } from 'react';
import useAuthStore from '@store/useAuthStore';
import NotificationDetailModal from './NotificationDetatil';

interface Notification {
  id: string;
  content: string;
  targetUrl: string;
  isRead: boolean;
  createdDate: string;
}

interface ProfileSelectBoxProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const ProfileSelectBox: React.FC<ProfileSelectBoxProps> = ({ className, isOpen, onClose }) => {
  const { notifications, fetchNotifications, markNotificationAsRead } = useAuthStore((state) => ({
    notifications: state.notifications,
    fetchNotifications: state.fetchNotifications,
    markNotificationAsRead: state.markNotificationAsRead,
  }));

  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      useAuthStore.setState({
        notifications: notifications.map((notif) =>
          notif.id === notification.id ? { ...notif, isRead: true } : notif
        ),
      });

      await markNotificationAsRead(notification.id);
    }

    setSelectedNotification(notification);
    setDetailModalOpen(true);

    await fetchNotifications();
  };

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
    setSelectedNotification(null);
  };

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`relative z-50 ${className}`} ref={modalRef}>
      <div className="absolute top-[30px] right-0 w-[400px] bg-white p-4 rounded-2xl shadow-lg">
        <div className="space-y-4">
          <div className="text-gray-900 text-base font-semibold font-['Space Grotesk'] leading-normal hover:bg-gray-100 p-2 rounded-md cursor-pointer mb-[16px] max-h-[calc(5*48px)] overflow-y-auto w-[380px]">
            {notifications.length === 0 ? (
              <p className="text-gray-500">새로운 알림이 없습니다</p>
            ) : (
              notifications.slice(0, 10).map((notification) => (
                <div
                  key={notification.id}
                  className={`cursor-pointer p-2 rounded-md ${
                    notification.isRead ? 'text-blue-400' : 'text-red-200'
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  {/* 일단 읽은 것 blue로 처리 나중에 회색으로  */}
                  <p
                    className={`text-base font-semibold ${
                      notification.isRead
                        ? 'text-blue-400'
                        : 'hover:text-main-color transition-colors duration-300'
                    }`}
                  >
                    {notification.content}
                  </p>
                  <small className="text-slate-600">{notification.createdDate}</small>
                </div>
              ))
            )}
          </div>
          <NotificationDetailModal
            isOpen={isDetailModalOpen}
            onClose={handleCloseDetailModal}
            notification={selectedNotification}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSelectBox;
