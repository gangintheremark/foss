import { create } from 'zustand';
import { EventSourcePolyfill } from 'event-source-polyfill';

interface NotificationResponse {
  content: string;
  targetUrl: string | null;
  createdDate: string;
  read: boolean;
}

interface NotificationData {
  notificationResponse: NotificationResponse;
  unreadCount: number;
}

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  eventSource: EventSourcePolyfill | null;
  sseNotifications: NotificationResponse[];
  unreadCount: number;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  login: () => void;
  logout: () => void;

  connectEventSource: () => void;
  disconnectEventSource: () => void;
  addNotification: (notification: NotificationResponse, unreadCount: number) => void;
}

const useAuthStore = create<AuthState>((set, get) => {
  const accessToken = localStorage.getItem('accessToken') || '';
  const refreshToken = localStorage.getItem('refreshToken') || '';

  const connectEventSource = () => {
    const { accessToken } = get();
    const url = 'http://localhost:8080/sse/subscribe';
    const eventSource = new EventSourcePolyfill(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    });

    eventSource.onopen = () => {
      console.log('EventSource connection opened');
    };

    eventSource.addEventListener('notification', (event) => {
      console.log('Notification event received:', event.data);
      try {
        const data: NotificationData = JSON.parse(event.data);

        get().addNotification(data.notificationResponse, data.unreadCount);
      } catch (error) {
        console.error('Failed to parse notification:', error);
      }
    });

    eventSource.onerror = (event) => {
      console.error('EventSource error:', event);
      if (event instanceof Event) {
        if (!event.target) return;
        const es = event.target as EventSourcePolyfill;
        if (es.readyState === EventSource.CLOSED) {
          es.close();
        }
      }
    };

    set({ eventSource });
  };

  const disconnectEventSource = () => {
    const { eventSource } = get();
    if (eventSource) {
      eventSource.close();
      set({ eventSource: null });
    }
  };

  const addNotification = (notification: NotificationResponse, unreadCount: number) => {
    set((state) => ({
      sseNotifications: [...state.sseNotifications, notification],
      unreadCount,
    }));
  };

  return {
    isLoggedIn: !!accessToken,
    accessToken,
    refreshToken,
    eventSource: null,
    sseNotifications: [],
    setTokens: (accessToken, refreshToken) => {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      set({ accessToken, refreshToken, isLoggedIn: true });
      get().connectEventSource();
    },
    clearTokens: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      set({ accessToken: '', refreshToken: '', isLoggedIn: false });
      get().disconnectEventSource();
    },
    login: () => set({ isLoggedIn: true }),
    logout: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      set({ accessToken: '', refreshToken: '', isLoggedIn: false });
      get().disconnectEventSource();
    },
    connectEventSource,
    disconnectEventSource,
    addNotification,
  };
});

export default useAuthStore;
