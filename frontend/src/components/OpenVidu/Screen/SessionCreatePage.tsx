import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VideoModal from './VideoModal';
import useMeetingStore from '@store/meeting';
import useNotificationStore from '@/store/notificationParticipant';

const APPLICATION_SERVER_URL = 'http://localhost:8080';

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
      await axios.post(
        `${APPLICATION_SERVER_URL}/meeting/sessions/${sessionId}/start`,
        {},
        { headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('미팅 시작 중 오류 발생:', error);
      throw error;
    }
  };

  const saveMeeting = async () => {
    try {
      const { sessionId, startTime, status, endTime } = meetingDetails;
      await axios.post(
        `${APPLICATION_SERVER_URL}/meeting/sessions`,
        {
          sessionId,
          status,
          startTime,
          endTime,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.error('Error saving meeting:', error);
      throw error;
    }
  };

  const notifyMembers = async (sessionId: string, members: any[]) => {
    try {
      await Promise.all(
        members.map(async (member) => {
          await axios.post(
            `${APPLICATION_SERVER_URL}/meeting-notifications/participants/meetings/${sessionId}/notify`,
            { memberId: member.memberId },
            { headers: { 'Content-Type': 'application/json' } }
          );

          setNotification(sessionId, member.memberId.toString(), true);

          await checkNotification(sessionId, member.memberId.toString());
        })
      );
    } catch (error) {
      console.error('세션 정보 전달 중 오류 발생:', error);
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
      await notifyMembers(newSessionId, selectedMeeting.applies);
      setIsModalOpen(false);
      //여기서는 실시간알람 보내

      // navigate('/video-chat', {
      //   state: { sessionId, token, userName: meetingDetails.userName },
      // });
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
      const tokenResponse = await axios.post(
        `${APPLICATION_SERVER_URL}/meeting/sessions/${sessionId}/connections`,
        {},
        { headers: { 'Content-Type': 'application/json' } }
      );
      return tokenResponse.data;
    } catch (error) {
      console.error('Error creating token:', error);
      throw error;
    }
  };

  const handleCreateSession = async (sessionId: string) => {
    try {
      await axios.post(
        `${APPLICATION_SERVER_URL}/meeting/sessions`,
        { customSessionId: sessionId },
        { headers: { 'Content-Type': 'application/json' } }
      );

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
            className="bg-blue-500 text-white px-4 py-2 rounded"
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
