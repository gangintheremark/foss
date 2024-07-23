import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const APPLICATION_SERVER_URL = 'http://localhost:8080';

const SessionCreatePage: React.FC = () => {
  const [mySessionId, setMySessionId] = useState<string>('');
  const [myUserName, setMyUserName] = useState<string>(
    'Participant' + Math.floor(Math.random() * 100)
  );
  const navigate = useNavigate();

  const handleChangeSessionId = (e: ChangeEvent<HTMLInputElement>) => {
    setMySessionId(e.target.value);
  };

  const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setMyUserName(e.target.value);
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

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 세션 생성
      await axios.post(
        `${APPLICATION_SERVER_URL}/meeting/sessions`,
        { customSessionId: mySessionId },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // 토큰 생성
      const token = await getToken(mySessionId);

      // 페이지 이동
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
        <form className="form-group" onSubmit={handleCreateSession}>
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
            <button className="btn btn-lg btn-primary" type="submit">
              방 만들기
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SessionCreatePage;
