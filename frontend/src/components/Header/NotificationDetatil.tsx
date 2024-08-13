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
  isRead: boolean;
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
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-2">{notification.content}</h2>
        <p className="text-gray-600 mb-4">{notification.createdDate}</p>
        <p>{notification.targetUrl}</p>
      </div>
    </div>
  );
};

export default NotificationDetailModal;
