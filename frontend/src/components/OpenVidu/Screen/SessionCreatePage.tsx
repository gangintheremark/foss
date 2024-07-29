import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import VideoModal from './VideoModal';
import useMeetingStore from '@store/meeting';
import useNotificationStore from '@/store/notificationParticipant';
import apiClient from '../../../utils/util';

const SessionCreatePage: React.FC = () => {
  // const [mySessionId, setMySessionId] = useState<string>('');
  // const [myUserName, setMyUserName] = useState<string>(
  //   'Participant' + Math.floor(Math.random() * 100)
  // );
  const { meetingDetails, setMeetingDetails, startMeeting } = useMeetingStore();
  const { setNotification, checkNotification } = useNotificationStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const generateSessionId = () => `Session_${Math.floor(Math.random() * 10000)}`;

  // const handleChangeSessionId = (e: ChangeEvent<HTMLInputElement>) => {
  //   setMySessionId(e.target.value);
  // };

  // const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
  //   setMyUserName(e.target.value);
  // };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const startMeetingOnServer = async (sessionId: string) => {
    try {
      await apiClient.post(`/meeting/sessions/${sessionId}/start`, {});
    } catch (error) {
      console.error('미팅 시작 중 오류 발생:', error);
      throw error;
    }
  };

  const saveMeeting = async () => {
    try {
      const { sessionId, startTime, status, endTime } = meetingDetails;
      await apiClient.post(`/meeting/sessions`, {
        sessionId,
        status,
        startTime,
        endTime,
      });
    } catch (error) {
      console.error('Error saving meeting:', error);
      throw error;
    }
  };

  const notifyMembers = async (sessionId: string, members: number[]) => {
    try {
      await Promise.all(
        members.map(async (memberId) => {
          try {
            await apiClient.post(
              `/meeting-notifications/participants/meetings/${sessionId}/notify`,
              { memberId }
            );

            setNotification(sessionId, memberId, true);
            await checkNotification(sessionId, memberId);
          } catch (error) {
            console.error(`User ${memberId}에게 알림 전송 중 오류 발생:`, error);
          }
        })
      );
    } catch (error) {
      console.error('알림 전송 중 전체 오류 발생:', error);
      throw error;
    }
  };

  const handleConfirm = async (selectedMeeting: any) => {
    const newSessionId = generateSessionId();

    startMeeting(newSessionId);

    try {
      const token = await handleCreateSession(newSessionId);
      await saveMeeting();
      await startMeetingOnServer(newSessionId);
      await notifyMembers(newSessionId, selectedMeeting.respondents);
      setIsModalOpen(false);

      navigate('/video-chat', {
        state: { newSessionId, token, userName: '구승석' },
      });
    } catch (error) {
      console.error('세션 생성 중 오류 발생:', error);
    }
  };

  // const saveMeeting = async (sessionId: string, userName: string, token: string) => {
  //   try {
  //     const meetingDto = {
  //       sessionId,
  //       userName,
  //       token,
  //     };
  //     const response = await axios.post(`${APPLICATION_SERVER_URL}/meeting/save`, meetingDto, {
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error saving meeting:', error);
  //     throw error;
  //   }
  // };

  const getToken = async (sessionId: string) => {
    try {
      const tokenResponse = await apiClient.post(`/meeting/sessions/${sessionId}/connections`);
      return tokenResponse.data;
    } catch (error) {
      console.error('Error creating token:', error);
      throw error;
    }
  };

  const handleCreateSession = async (sessionId: string) => {
    try {
      await apiClient.post(`/meeting/sessions`, { customSessionId: sessionId });

      const token = await getToken(sessionId);
      return token;
    } catch (error) {
      console.error('세션 생성 중 오류 발생:', error);
    }
  };

  return (
    <div className="container">
      <div className="jumbotron vertical-center">
        <p className="text-center">
          <button
            className="bg-[#88b4f5] text-white px-4 py-2 rounded w-[210px] h-[50px]"
            type="button"
            onClick={handleOpenModal}
          >
            방 만들기
          </button>
        </p>
      </div>
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default SessionCreatePage;
