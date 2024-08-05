import { create } from 'zustand';
import apiClient from './../utils/util';

interface NotificationState {
  notifications: { [key: string]: boolean };
  setNotification: (sessionId: string, memberId: number, status: boolean) => void;
  checkNotification: (sessionId: string, memberId: number) => Promise<boolean>;
}

const useNotificationStore = create<NotificationState>((set) => ({
  notifications: {},
  setNotification: (sessionId, memberId, status) =>
    set((state) => ({
      notifications: { ...state.notifications, [`${sessionId}_${memberId}`]: status },
    })),
  checkNotification: async (sessionId, memberId) => {
    try {
      const response = await apiClient.get(
        `/meeting-notifications/sessions/${sessionId}/members/${memberId}`
      );
      set((state) => ({
        notifications: { ...state.notifications, [`${sessionId}_${memberId}`]: response.data },
      }));
      return response.data;
    } catch (error) {
      console.error('알림 상태 조회 중 오류 발생:', error);
      return false;
    }
  },
}));

export default useNotificationStore;
