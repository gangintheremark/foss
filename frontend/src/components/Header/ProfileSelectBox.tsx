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
    setSelectedNotification(notification);
    setDetailModalOpen(true);
    if (!notification.isRead) {
      await markNotificationAsRead(notification.id);
      await fetchNotifications();
    }
  };

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
    setSelectedNotification(null);
  };

  // const { sseNotifications, isLoggedIn, accessToken, connectEventSource, disconnectEventSource } =
  //   useAuthStore((state) => ({
  //     // sseNotifications: state.sseNotifications,
  //     isLoggedIn: state.isLoggedIn,
  //     accessToken: state.accessToken,
  //     // connectEventSource: state.connectEventSource,
  //     // disconnectEventSource: state.disconnectEventSource,
  //   }));
  // console.log(sseNotifications);

  // useEffect(() => {
  //   if (isLoggedIn && accessToken) {
  //     connectEventSource();
  //   }

  //   return () => {
  //     disconnectEventSource();
  //   };
  // }, [isLoggedIn, accessToken, connectEventSource, disconnectEventSource]);

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
      <div className="absolute top-[30px] right-0 w-[350px] bg-white p-4 rounded-2xl shadow-lg">
        <div className="space-y-4">
          <div className="text-gray-900 text-base font-semibold font-['Space Grotesk'] leading-normal hover:bg-gray-100 p-2 rounded-md cursor-pointer mb-[16px] max-h-[calc(5*48px)] overflow-y-auto  w-[350px]">
            {notifications.length === 0 ? (
              <p className="text-gray-500">새로운 알림이 없습니다</p>
            ) : (
              notifications.slice(0, 10).map((notification) => (
                <div
                  key={notification.id}
                  className={`cursor-pointer p-2 rounded-md `}
                  style={{
                    color: notification.isRead ? '#e9ecef' : '#000', // 텍스트 색상
                    backgroundColor: notification.isRead ? '#f5f5f5' : '#fff', // 배경 색상
                  }}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <p className="text-gray-900 text-base font-semibold">{notification.content}</p>
                  <small className="text-gray-600">{notification.createdDate}</small>
                </div>
              ))
            )}
          </div>
          <NotificationDetailModal
            isOpen={isDetailModalOpen}
            onClose={handleCloseDetailModal}
            notification={selectedNotification}
          />

          {/* {sseNotifications.length === 0 ? (
              <p>새로운 알람이 없습니다</p>
            ) : (
              sseNotifications.map((notification, index) =>
                notification ? (
                  <div key={index}>
                    <p>{notification.content}</p>
                    <small>{notification.createdDate}</small>
                  </div>
                ) : null
              )
            )} */}
        </div>
      </div>
    </div>
  );
};

export default ProfileSelectBox;
