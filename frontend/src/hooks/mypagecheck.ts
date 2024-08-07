import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const APPLICATION_SERVER_URL = 'http://localhost:8080';

const fetchMemberId = async () => {
  const response = await axios.get(`${APPLICATION_SERVER_URL}/members`);
  return response.data.id;
};

const fetchSessionIdByMember = async (memberId: number) => {
  const response = await axios.get(
    `${APPLICATION_SERVER_URL}/meeting-notifications/sessions/member/${memberId}`
  );
  return response.data;
};

const checkNotificationStatus = async (sessionId: string, memberId: number) => {
  const response = await axios.get(
    `${APPLICATION_SERVER_URL}/meeting-notifications/sessions/${sessionId}/members/${memberId}`
  );
  return response.data;
};

export const useMemberId = () => {
  return useQuery(['memberId'], fetchMemberId, {
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

export const useSessionId = (memberId: number) => {
  return useQuery(['sessionId', memberId], () => fetchSessionIdByMember(memberId), {
    enabled: !!memberId,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useNotificationStatus = (sessionId: string, memberId: number) => {
  return useQuery(
    ['notificationStatus', sessionId, memberId],
    () => checkNotificationStatus(sessionId, memberId),
    {
      enabled: !!sessionId && !!memberId,
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};
