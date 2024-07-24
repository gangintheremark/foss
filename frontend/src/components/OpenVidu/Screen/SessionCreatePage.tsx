import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VideoModal from './VideoModal';

const APPLICATION_SERVER_URL = 'http://localhost:8080';

const SessionCreatePage: React.FC = () => {
  const [mySessionId, setMySessionId] = useState<string>('');
  const [myUserName, setMyUserName] = useState<string>(
    'Participant' + Math.floor(Math.random() * 100)
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChangeSessionId = (e: ChangeEvent<HTMLInputElement>) => {
    setMySessionId(e.target.value);
  };

  const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setMyUserName(e.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    handleCreateSession();
    setIsModalOpen(false);
  };

  const saveMeeting = async (sessionId: string, userName: string, token: string) => {
    try {
      const meetingDto = {
        sessionId,
        userName,
        token,
      };
      const response = await axios.post(`${APPLICATION_SERVER_URL}/meeting/save`, meetingDto, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error saving meeting:', error);
      throw error;
    }
  };

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

  const handleCreateSession = async () => {
    try {
      await axios.post(
        `${APPLICATION_SERVER_URL}/meeting/sessions`,
        { customSessionId: mySessionId },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const token = await getToken(mySessionId);

      const savedMeeting = await saveMeeting(mySessionId, myUserName, token);

      console.log(savedMeeting);

      navigate('/video-chat', {
        state: { sessionId: mySessionId, token, userName: myUserName },
      });
    } catch (error) {
      console.error('세션 생성 중 오류 발생:', error);
    }
  };

  return (
    <div className="container">
      <div className="jumbotron vertical-center">
        <p>
          <label>Session ID: </label>
          <input
            className="form-control"
            type="text"
            id="sessionId"
            value={mySessionId}
            onChange={handleChangeSessionId}
            required
          />
        </p>
        <p>
          <label>Participant: </label>
          <input
            className="form-control"
            type="text"
            id="userName"
            value={myUserName}
            onChange={handleChangeUserName}
            required
          />
        </p>

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
