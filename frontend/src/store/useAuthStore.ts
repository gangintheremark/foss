import { create } from 'zustand';
import { useUserStore, UserState } from './useUserStore';
import apiClient from '@/utils/util';
import UnreadNotificationCount from '@/components/Notification/UnreadNotification';
import AllNotification from '@/components/Notification/AllNotification';

interface NotificationResponse {
  id: string;
  content: string;
  targetUrl: string;
  read: boolean;
  createdDate: string;
}

interface NotificationData {
  notificationResponse: NotificationResponse;
  unreadCount: number;
}

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  unreadCount: number;
  notifications: NotificationResponse[];
  // eventSource: EventSourcePolyfill | null;
  // sseNotifications: NotificationResponse[];
  // unreadCount: number;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  login: (userData: Partial<UserState>) => void;
  logout: () => void;
  fetchUnreadCount: () => void;
  fetchNotifications: () => void;
  markNotificationAsRead: (notificationId: string) => Promise<void>;
  // connectEventSource: () => void;
  // disconnectEventSource: () => void;
  // addNotification: (notification: NotificationResponse, unreadCount: number) => void;
}

const useAuthStore = create<AuthState>((set, get) => {
  const accessToken = localStorage.getItem('accessToken') || '';
  const refreshToken = localStorage.getItem('refreshToken') || '';
  const storedNotifications = localStorage.getItem('notifications');

  const { setUser, clearUser } = useUserStore.getState();

  const fetchUnreadCount = async () => {
    try {
      if (accessToken) {
        const count = await UnreadNotificationCount(accessToken);
        set({ unreadCount: count });
      }
    } catch (error) {
      console.error('Failed to fetch unread notifications count:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      if (accessToken) {
        const notifications = await AllNotification(accessToken);
        localStorage.setItem('notifications', JSON.stringify(notifications));
        set({ notifications });
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    const { accessToken, notifications } = get();

    try {
      await apiClient.put(`/notifications/${notificationId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const updatedNotifications = notifications.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      );

      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
      set({ notifications: updatedNotifications });
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };
  // const connectEventSource = () => {
  //   const { accessToken } = get();
  //   const url = 'https://i11a705.p.ssafy.io/api/sse/subscribe';
  //   const eventSource = new EventSourcePolyfill(url, {
  //     headers: { Authorization: `Bearer ${accessToken}` },
  //     withCredentials: true,
  //   });

  //   eventSource.onopen = () => {
  //     console.log('EventSource connection opened');
  //   };

  //   eventSource.addEventListener('notification', (event) => {
  //     console.log('Notification event received:', (event as MessageEvent).data);
  //     try {
  //       const data: NotificationData = JSON.parse((event as MessageEvent).data);
  //       get().addNotification(data.notificationResponse, data.unreadCount);
  //     } catch (error) {
  //       console.error('Failed to parse notification:', error);
  //     }
  //   });

  //   eventSource.onerror = (event) => {
  //     console.error('EventSource error:', event);
  //     if (event instanceof Event) {
  //       if (!event.target) return;
  //       const es = event.target as EventSourcePolyfill;
  //       if (es.readyState === EventSource.CLOSED) {
  //         es.close();
  //       }
  //     }
  //   };

  //   set({ eventSource });
  // };

  // const disconnectEventSource = () => {
  //   const { eventSource } = get();
  //   if (eventSource) {
  //     eventSource.close();
  //     set({ eventSource: null });
  //   }
  // };

  // const addNotification = (notification: NotificationResponse, unreadCount: number) => {
  //   set((state) => ({
  //     sseNotifications: [...state.sseNotifications, notification],
  //     unreadCount,
  //   }));
  // };

  return {
    isLoggedIn: !!accessToken,
    accessToken,
    refreshToken,
    // eventSource: null,
    // sseNotifications: [],
    notifications: storedNotifications ? JSON.parse(storedNotifications) : [],
    unreadCount: 0,
    setTokens: (accessToken, refreshToken) => {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      set({ accessToken, refreshToken, isLoggedIn: true });
      fetchUnreadCount();
      fetchNotifications();
      // get().connectEventSource();
    },
    clearTokens: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('notifications');
      set({
        accessToken: '',
        refreshToken: '',
        isLoggedIn: false,
        unreadCount: 0,
        notifications: [],
      });
      // get().disconnectEventSource();
    },
    login: (userData: Partial<UserState>) => {
      setUser(userData);
      set({ isLoggedIn: true });
      fetchUnreadCount();
      fetchNotifications();
    },
    logout: async () => {
      const { refreshToken } = get();

      try {
        await apiClient.post(
          '/members/logout',
          {},
          {
            headers: {
              'X-Refresh-Token': refreshToken,
            },
          }
        );
      } catch (error) {
        console.error('로그아웃 요청 실패:', error);
      }

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('notifications');
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('submittedReview_')) {
          localStorage.removeItem(key);
        }
      });
      clearUser();
      set({ accessToken: '', refreshToken: '', isLoggedIn: false, unreadCount: 0 });
      // get().disconnectEventSource();
    },
    // connectEventSource,
    // disconnectEventSource,
    // addNotification,
    fetchUnreadCount,
    fetchNotifications,
    markNotificationAsRead,
  };
});

export default useAuthStore;
