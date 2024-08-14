import React, { useEffect, useState } from 'react';
import AllNotification from '@components/Notification/AllNotification';

interface NotificationResponse {
  content: string;
  targetUrl: string;
  read: boolean;
  createdDate: string;
}

const NotificationsList: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);

  useEffect(() => {
    const loadAllNotification = async () => {
      try {
        const notificationsData = await AllNotification();
        setNotifications(notificationsData);
      } catch (error) {
        console.error('Failed to load notifications:', error);
      }
    };

    loadAllNotification();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div
            key={notification.createdDate}
            className={`p-4 mb-2 border rounded-lg ${
              notification.read ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            <p className="text-lg font-medium">{notification.content}</p>
            <small className="text-sm text-gray-500">{notification.createdDate}</small>
            <a href={notification.targetUrl} className="block mt-2 text-blue-500 hover:underline">
              View Details
            </a>
          </div>
        ))
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
};

export default NotificationsList;
