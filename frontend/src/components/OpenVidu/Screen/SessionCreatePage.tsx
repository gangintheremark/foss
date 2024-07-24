import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VideoModal from './VideoModal';
import useMeetingStore from '@store/meeting';

const APPLICATION_SERVER_URL = 'http://localhost:8080';

const SessionCreatePage: React.FC = () => {
  // const [mySessionId, setMySessionId] = useState<string>('');
  // const [myUserName, setMyUserName] = useState<string>(
  //   'Participant' + Math.floor(Math.random() * 100)
  // );
  const { meetingDetails, setMeetingDetails, initializeMeeting, startMeeting } = useMeetingStore();
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

  const handleConfirm = async () => {
    const newSessionId = generateSessionId();

    initializeMeeting(newSessionId);

    try {
      await handleCreateSession(newSessionId);

      startMeeting();
      await startMeetingOnServer(newSessionId);

      setIsModalOpen(false);
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

      // navigate('/video-chat', {
      //   state: { sessionId, token, userName: meetingDetails.userName },
      // });이건 로그인되면 움직이기로하자
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
