import axios from 'axios';

interface NotificationResponse {
  content: string;
  targetUrl: string;
  isRead: boolean;
  createdDate: string;
}

const AllNotification = async (): Promise<NotificationResponse[]> => {
  try {
    const response = await axios.get('http://localhost:8080/notifications');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    throw error;
  }
};

export default AllNotification;
