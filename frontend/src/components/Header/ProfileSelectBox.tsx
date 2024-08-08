import React, { useEffect, useRef } from 'react';
import useAuthStore from '@store/useAuthStore';

// interface Notification {
//   content: string;
//   targetUrl: string;
//   isRead: boolean;
//   createdDate: string;
// }

interface ProfileSelectBoxProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const ProfileSelectBox: React.FC<ProfileSelectBoxProps> = ({ className, isOpen, onClose }) => {
  const { sseNotifications, isLoggedIn, accessToken, connectEventSource, disconnectEventSource } =
    useAuthStore((state) => ({
      sseNotifications: state.sseNotifications,
      isLoggedIn: state.isLoggedIn,
      accessToken: state.accessToken,
      connectEventSource: state.connectEventSource,
      disconnectEventSource: state.disconnectEventSource,
    }));
  console.log(sseNotifications);

  useEffect(() => {
    if (isLoggedIn && accessToken) {
      connectEventSource();
    }

    return () => {
      disconnectEventSource();
    };
  }, [isLoggedIn, accessToken, connectEventSource, disconnectEventSource]);

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
      <div className="absolute top-[30px] right-0 w-[281px] bg-white p-4 rounded-2xl shadow-lg">
        <div className="space-y-4">
          <div className="text-gray-900 text-base font-semibold font-['Space Grotesk'] leading-normal hover:bg-gray-100 p-2 rounded-md cursor-pointer mb-[16px]">
            {sseNotifications.length === 0 ? (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelectBox;
