import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import VideoModal from './VideoModal';
import useMeetingStore from '@store/meeting';
import useNotificationStore from '@/store/notificationParticipant';
import apiClient from '../../../utils/util';
import useParticipantsStore from '@/store/paticipant';

interface UserProfile {
  email: string | null;
  name: string;
  profileImg: string | null;
}

const SessionCreatePage: React.FC = () => {
  const { addParticipant, removeParticipant, updateParticipant, participants } =
    useParticipantsStore();
  const { meetingDetails, setMeetingDetails, startMeeting } = useMeetingStore();
  const { setNotification, checkNotification } = useNotificationStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [newEmail, setNewEmail] = useState<string>('');
  const [memberEmail, setMemberEmail] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [memberId, setMemberId] = useState<string | null>(null);

  const generateSessionId = () => `Session_${Math.floor(Math.random() * 10000)}`;

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!memberEmail) return;
      try {
        const memberResponse = await apiClient.get('/members/search', {
          params: { email: memberEmail },
        });

        const memberData = memberResponse.data;
        const memberIdFromResponse = memberData.id;
        setMemberId(memberIdFromResponse);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };
    fetchMemberData();
  });

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

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const memberResponse = await apiClient.get('/members');
        const members: UserProfile = memberResponse.data;
        if (members) {
          setProfileData(members);
          setMemberEmail(members.email ?? '');
          setNewEmail(members.email ?? '');
          setNewName(members.name ?? '');
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyData();
  }, [memberEmail]);

  const handleConfirm = async (selectedMeeting: any) => {
    const newSessionId = generateSessionId();

    startMeeting(newSessionId);

    try {
      const token = await handleCreateSession(newSessionId);
      await saveMeeting();
      await startMeetingOnServer(newSessionId);
      // addParticipant(id:newId)
      await notifyMembers(newSessionId, selectedMeeting.respondents);
      setIsModalOpen(false);

      addParticipant({
        id: memberId,
        token,
        userName: newName,
        isHost: true,
        isMicroOn: false,
        isCameraOn: false,
      });

      navigate('/video-chat');

      // navigate('/video-chat', {
      //   state: {
      //     id: memberId,
      //     token,
      //     userName: newName,
      //     isHost: true,
      //     isMicroOn: false,
      //     isCameraOn: false,
      //   },
      // });
    } catch (error) {
      console.error('세션 생성 중 오류 발생:', error);
    }
  };

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
