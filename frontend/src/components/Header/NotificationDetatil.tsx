import React from 'react';

interface NotificationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: Notification | null;
}

interface Notification {
  id: string;
  content: string;
  targetUrl: string;
  read: boolean;
  createdDate: string;
}

const NotificationDetailModal: React.FC<NotificationDetailModalProps> = ({
  isOpen,
  onClose,
  notification,
}) => {
  if (!isOpen || !notification) return null;

  return (
    <div className="fixed inset-0 z-70 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-2">{notification.content}</h2>
        <p className="text-gray-600 mb-4">{notification.createdDate}</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 mt-4">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetailModal;
