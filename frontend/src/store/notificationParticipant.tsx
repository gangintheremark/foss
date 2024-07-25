import axios from 'axios';
import { create } from 'zustand';

const APPLICATION_SERVER_URL = 'http://localhost:8080';

interface NotificationState {
  notifications: { [key: string]: boolean };
  setNotification: (sessionId: string, memberId: string, status: boolean) => void;
  checkNotification: (sessionId: string, memberId: string) => Promise<void>;
}

const useNotificationStore = create<NotificationState>((set) => ({
  notifications: {},
  setNotification: (sessionId, memberId, status) =>
    set((state) => ({
      notifications: { ...state.notifications, [`${sessionId}_${memberId}`]: status },
    })),
  checkNotification: async (sessionId, memberId) => {
    try {
      const response = await axios.get(
        `${APPLICATION_SERVER_URL}/meeting-notifications/sessions/${sessionId}/members/${memberId}`
      );
      set((state) => ({
        notifications: { ...state.notifications, [`${sessionId}_${memberId}`]: response.data },
      }));
    } catch (error) {
      console.error('알림 상태 조회 중 오류 발생:', error);
    }
  },
}));

export default useNotificationStore;
