import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Participant } from '@/types/openvidu';
import VideoModal from './VideoModal';
import useMeetingStore from '@store/meeting';
import useNotificationStore from '@/store/notificationParticipant';
import apiClient from '../../../utils/util';
import useUserStore from '@store/useUserStore';

interface UserProfile {
  email: string;
  name: string;
  profileImg: string;
}

const SessionCreatePage: React.FC = () => {
  const { startMeeting } = useMeetingStore();
  const { setNotification } = useNotificationStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [newName, setNewName] = useState<string>('');
  const [memberId, setMemberId] = useState<string>('');
  const [pendingMeeting, setPendingMeeting] = useState<any>(null);
  const role = useUserStore((state) => state.role);

  const generateSessionId = () => `Session_${Math.floor(Math.random() * 10000)}`;

  const fetchMyData = async () => {
    try {
      const memberResponse = await apiClient.get('/mypage');
      const members: UserProfile = memberResponse.data;

      console.log(members.email);
      if (members) {
        setNewName(members.name);
      }

      await fetchMemberData(members.email);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
  };

  const fetchMemberData = async (memberEmail: string) => {
    console.log(memberEmail);
    if (!memberEmail) return;
    try {
      const memberResponse = await apiClient.get('/members/search', {
        params: { email: memberEmail },
      });

      const memberData = memberResponse.data;
      const memberIdFromResponse = memberData.id;
      console.log(memberIdFromResponse);
      setMemberId(memberIdFromResponse);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
  };

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

  const notifyMembers = async (sessionId: string, members: string[]) => {
    try {
      console.log(sessionId, members);
      await Promise.all(
        members.map(async (memberId) => {
          try {
            await apiClient.post(
              `/meeting-notifications/participants/meetings/${sessionId}/notify`,
              { memberId }
            );

            setNotification(sessionId, memberId, true);
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
    setPendingMeeting({ selectedMeeting, newSessionId });
    await fetchMyData();
  };

  const processMeeting = useCallback(async () => {
    if (!pendingMeeting || !memberId) return;

    const { selectedMeeting, newSessionId } = pendingMeeting;

    console.log('Member ID in handleConfirm after fetchMyData:', memberId);

    startMeeting(newSessionId);

    try {
      const result = await handleCreateSession(newSessionId, selectedMeeting.interviewId);

      if (result === 'SESSION_CREATION_FAILED') {
        alert('방 생성이 너무 이릅니다.');
        navigate('/my-page');
        return;
      }

      if (result === 'TOKEN_CREATION_FAILED') {
        alert(' 방에 이미 입장했습니다 .들어갈 수 없습니다.');
        navigate('/my-page');
        return;
      }

      if (result === 'GENERAL_ERROR') {
        alert('방 생성에 실패했습니다.');
        navigate('/my-page');
        return;
      }
      const token = result;
      console.log(token);
      await startMeetingOnServer(newSessionId);
      const roomId = await fetchMeetingBySessionId(newSessionId);
      const participant: Participant = {
        memberId: memberId,
        name: newName,
        role: 'mentor',
        isMuted: false,
        isCameraOn: false,
      };
      console.log(participant);

      await EnterParticipant(roomId, participant);
      await notifyMembers(newSessionId, selectedMeeting.respondents);
      setIsModalOpen(false);

      navigate('/video-chat', {
        state: {
          id: memberId,
          sessionId: newSessionId,
          meetingId: roomId,
          interviewId: selectedMeeting.interviewId,
          token,
          userName: newName,
          enter: true,
          isHost: true,
          isMicroOn: false,
          isCameraOn: false,
        },
      });
    } catch (error) {
      console.error('세션 생성 중 오류 발생:', error);
    }
  }, [pendingMeeting, memberId]);

  useEffect(() => {
    if (pendingMeeting) {
      processMeeting();
    }
  }, [pendingMeeting, memberId, processMeeting]);

  const getToken = async (sessionId: string) => {
    try {
      const tokenResponse = await apiClient.post(`/meeting/sessions/${sessionId}/connections`);
      return tokenResponse.data;
    } catch (error) {
      console.error('Error creating token:', error);
      throw error;
    }
  };

  async function fetchMeetingBySessionId(sessionId: string) {
    try {
      const meetingDto = await apiClient.get(`/meeting/sessions/${sessionId}`);
      console.log('Meeting details:', meetingDto.data.id);
      return meetingDto.data.id;
    } catch (error) {
      console.error('Error fetching meeting details:', error);
    }
  }

  const EnterParticipant = async (
    meetingId: number,
    participant: Participant
  ): Promise<Participant> => {
    try {
      const response = await apiClient.post<Participant>(
        `/participants/meetings/${meetingId}`,
        participant
      );
      return response.data;
    } catch (error) {
      console.error('Error adding participant:', error);
      throw error;
    }
  };

  const handleCreateSession = async (sessionId: string, interviewId: number) => {
    try {
      const response = await apiClient.post(`/meeting/sessions/${interviewId}`, {
        customSessionId: sessionId,
      });

      const timeCheck = response.data;
      console.log(timeCheck);

      if (timeCheck === null || undefined) {
        console.error('방 생성이 이릅니다.');
        return 'SESSION_CREATION_FAILED';
      }

      const token = await getToken(sessionId);

      if (token === undefined) {
        console.error('토큰 생성 실패');
        return 'TOKEN_CREATION_FAILED';
      }

      return token;
    } catch (error) {
      console.error('방 생성에 실패했습니다.', error);
      return 'GENERAL_ERROR';
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
