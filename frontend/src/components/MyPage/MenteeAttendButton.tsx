import apiClient from './../../utils/util';
import { Participant } from '@/types/openvidu';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useNotificationStore from '@/store/notificationParticipant';
import Button from './Button';

interface MeetingDetails {
  id: number;
  interviewId: string;
}

interface UserProfile {
  email: string | null;
  name: string;
  profileImg: string | null;
  role: string | null;
}

const MenteeAttendButton = () => {
  const navigate = useNavigate();
  const [memberEmail, setMemberEmail] = useState<string>('');
  const [memberId, setMemberId] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [sessionId, setSessionId] = useState<string>();
  const [canCreateRoom, setCanCreateRoom] = useState(false);
  const { checkNotification } = useNotificationStore();
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const getToken = async (sessionId: string) => {
    try {
      const tokenResponse = await apiClient.post(`/meeting/sessions/${sessionId}/connections`);
      console.log(tokenResponse.data);
      return tokenResponse.data;
    } catch (error) {
      console.error('Error creating token:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const memberResponse = await apiClient.get('/mypage');
        console.log(memberResponse.data);
        const members: UserProfile = memberResponse.data;
        if (members) {
          setProfileData(members);
          setMemberEmail(members.email ?? '');
          setNewName(members.name ?? '');
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyData();
  }, []);

  async function fetchMeetingBySessionId(sessionId: string): Promise<MeetingDetails | undefined> {
    try {
      const response = await apiClient.get(`/meeting/sessions/${sessionId}`);
      const meetingDto = response.data;

      console.log('Meeting details:', meetingDto.id);
      console.log(meetingDto.interviewId);

      return {
        id: meetingDto.id,
        interviewId: meetingDto.interviewId,
      };
    } catch (error) {
      console.error('Error fetching meeting details:', error);
      return undefined;
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

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!memberEmail) return;
      try {
        const memberResponse = await apiClient.get('/members/search', {
          params: { email: memberEmail },
        });

        const memberData = memberResponse.data;
        const memberIdFromResponse = memberData.id;
        console.log(memberIdFromResponse);

        setMemberId(memberIdFromResponse);

        if (memberIdFromResponse) {
          const sessionResponse = await apiClient.get(
            `/meeting-notifications/sessions/member/${memberIdFromResponse}`
          );
          const sessionIdFromResponse = sessionResponse.data;
          console.log(sessionIdFromResponse);
          setSessionId(sessionIdFromResponse);

          if (sessionIdFromResponse && memberIdFromResponse) {
            const notificationStatus = await checkNotification(
              sessionIdFromResponse,
              memberIdFromResponse
            );
            setCanCreateRoom(notificationStatus);
          }
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchMemberData();
  }, [memberEmail]);

  const handleCreateSession = async (sessionId: string | undefined) => {
    if (sessionId === undefined) {
      console.error('세션 ID가 정의되지 않았습니다.');
      return;
    }

    if (isButtonDisabled) return;
    setIsButtonDisabled(true);
    try {
      const token = await getToken(sessionId);
      if (token === undefined || null) {
        alert(' 방에 이미 입장했습니다 .들어갈 수 없습니다.');
        navigate('/my-page');
        return;
      }

      const meetingDetails = await fetchMeetingBySessionId(sessionId);

      if (meetingDetails) {
        const { id: roomId, interviewId } = meetingDetails;
        const participant: Participant = {
          memberId: memberId,
          name: newName,
          role: 'mentee',
          isMuted: false,
          isCameraOn: false,
        };
        console.log(participant);

        await EnterParticipant(roomId, participant);

        navigate('/video-chat', {
          state: {
            id: memberId,
            sessionId,
            meetingId: roomId,
            interviewId: interviewId,
            token,
            userName: newName,
            isHost: false,
            isMicroOn: false,
            isCameraOn: false,
          },
        });
      } else {
        console.error('Failed to fetch meeting details.');
      }
    } catch (error) {
      console.error('세션 생성 중 오류 발생:', error);
      throw error;
    } finally {
      setIsButtonDisabled(false);
    }
  };
  return (
    <div>
      {canCreateRoom && (
        <button
          className="bg-[#88b4f5] text-white px-4 py-2 rounded w-[210px] h-[50px]"
          type="button"
          onClick={() => handleCreateSession(sessionId)}
          disabled={isButtonDisabled}
        >
          방 참여하기
        </button>
      )}
    </div>
  );
};

export default MenteeAttendButton;
