import axios from 'axios';

const UnreadNotificationCount = async (): Promise<number> => {
  try {
    const response = await axios.get('/notifications/unreadCounts');
    return response.data.unreadCount;
  } catch (error) {
    console.error('Failed to fetch unread notifications count:', error);
    throw error;
  }
};

export default UnreadNotificationCount;
