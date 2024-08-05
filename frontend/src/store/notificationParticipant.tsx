import { create } from 'zustand';
import apiClient from './../utils/util';

interface NotificationState {
  notifications: { [key: string]: boolean };
  setNotification: (sessionId: string, memberId: string, status: boolean) => void;
  checkNotification: (sessionId: string, memberId: string) => Promise<boolean>;
  clearNotifications: (sessionId: string) => Promise<void>;
  resetState: (sessionId: string) => void;
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
  clearNotifications: async (sessionId) => {
    try {
      await apiClient.delete(`/meeting-notifications/sessions/${sessionId}/notifications`);

      set((state) => ({
        notifications: Object.keys(state.notifications)
          .filter((key) => key.startsWith(`${sessionId}_`))
          .reduce(
            (acc, key) => {
              const { [key]: removed, ...rest } = acc;
              return rest;
            },
            { ...state.notifications }
          ),
      }));
    } catch (error) {
      console.error('알림 삭제 중 오류 발생:', error);
    }
  },
  resetState: (sessionId) => {
    set((state) => ({
      notifications: Object.keys(state.notifications)
        .filter((key) => !key.startsWith(`${sessionId}_`))
        .reduce((acc, key) => {
          const value = state.notifications[key];
          return { ...acc, [key]: value };
        }, {}),
    }));
  },
}));

export default useNotificationStore;
