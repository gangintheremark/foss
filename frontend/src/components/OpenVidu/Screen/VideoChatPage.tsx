import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserVideoComponent from '@components/OpenVidu/Screen/UserVideoComponent';
import { OpenVidu, Session, Publisher, StreamManager, StreamEvent, Device } from 'openvidu-browser';
import Toolbar from '@components/OpenVidu/Screen/ToolBar';
// import useParticipantsStore from '@/store/paticipant';
import apiClient from '../../../utils/util';
import { Participant } from '@/types/openvidu';
import useNotificationStore from '@/store/notificationParticipant';
import Loading from '@/components/common/Loading';

// import FeedBack from '@/types/notepad';
const VideoChatPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    id,
    sessionId,
    enter,
    interviewId,
    meetingId,
    token,
    userName,
    isHost,
    isMicroOn,
    isCameraOn,
  } = location.state as {
    id: string;
    interviewId: string;
    enter: boolean;
    sessionId: string;
    meetingId: string;
    token: string;
    userName: string;
    isHost: boolean;
    isMicroOn: boolean;
    isCameraOn: boolean;
  };

  const [feedbacks, setFeedbacks] = useState<{ [memberId: string]: Feedback }>({});
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<StreamManager | undefined>(undefined);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscribers, setSubscribers] = useState<StreamManager[]>([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState<Device | undefined>(undefined);
  const [attendants, setAttendants] = useState<Participant[]>([]);
  const [initialAttendants, setInitialAttendants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const { clearNotifications } = useNotificationStore();
  const [goodMemo, setGoodMemo] = useState('');
  const [badMemo, setBadMemo] = useState('');
  const [generalMemo, setGeneralMemo] = useState('');
  const [contentMemo, setContentMemo] = useState('');
  const [error, setError] = useState<string | null>(null);

  const OV = useRef<OpenVidu>(new OpenVidu());
  console.log(interviewId);
  const handleClick = (attendant: Participant) => {
    setSelectedParticipant(attendant);

    const feedbackData = feedbacks[attendant.memberId] || {};
    setGoodMemo(feedbackData.goodPoint || '');
    setBadMemo(feedbackData.badPoint || '');
    setGeneralMemo(feedbackData.summary || '');
    setContentMemo(feedbackData.content || '');
  };

  const handleMemoChange = (
    memoType: 'goodPoint' | 'badPoint' | 'summary' | 'content',
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (selectedParticipant?.memberId) {
      const updatedFeedback = {
        ...feedbacks[selectedParticipant.memberId],
        [memoType]: e.target.value,
      };

      setFeedbacks((prevFeedbacks) => ({
        ...prevFeedbacks,
        [selectedParticipant.memberId]: updatedFeedback,
      }));

      if (memoType === 'goodPoint') setGoodMemo(e.target.value);
      if (memoType === 'badPoint') setBadMemo(e.target.value);
      if (memoType === 'summary') setGeneralMemo(e.target.value);
      if (memoType === 'content') setContentMemo(e.target.value);
    }
  };
  useEffect(() => {
    if (!loading) {
      handleSubmitFeedback();
    }
  }, [feedbacks, initialAttendants, loading]);

  const handleSubmitFeedback = async () => {
    let filteredAttendants = initialAttendants;

    if (isHost) {
      filteredAttendants = initialAttendants.filter((attendant) => attendant.memberId !== id);
    } else {
      filteredAttendants = initialAttendants.filter(
        (attendant) => attendant.role !== 'mentor' && attendant.memberId !== id
      );
    }

    const feedback = isHost
      ? {
          interviewId: interviewId,
          feedbacks: filteredAttendants.map((attendant) => ({
            menteeId: attendant.memberId,
            goodPoint: feedbacks[attendant.memberId]?.goodPoint || '',
            badPoint: feedbacks[attendant.memberId]?.badPoint || '',
            summary: feedbacks[attendant.memberId]?.summary || '',
          })),
        }
      : {
          interviewId: interviewId,
          menteeFeedbacks: filteredAttendants.map((attendant) => ({
            menteeId: attendant.memberId,
            content: feedbacks[attendant.memberId]?.content || '',
          })),
        };

    try {
      const endpoint = isHost ? '/feedback/mentor' : '/feedback/mentee';
      await apiClient.post(endpoint, feedback);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [meetingId]);

  const fetchParticipants = async () => {
    try {
      const response = await apiClient.get(`/participants/meetings/${meetingId}`);
      const newAttendants = response.data;

      setInitialAttendants((prevInitialAttendants) => {
        const newInitialAttendants = newAttendants.filter(
          (attendant: Participant) =>
            !prevInitialAttendants.some((init) => init.memberId === attendant.memberId)
        );

        if (newInitialAttendants.length > 0) {
          return [...prevInitialAttendants, ...newInitialAttendants];
        }

        return prevInitialAttendants;
      });

      setAttendants(newAttendants);
    } catch (err) {
      console.error('Failed to fetch participants:', err);
    }
  };

  const joinSession = async () => {
    const mySession = OV.current.initSession();

    mySession.on('streamCreated', (event: StreamEvent) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
      fetchParticipants();
    });

    mySession.on('streamDestroyed', (event: StreamEvent) => {
      deleteSubscriber(event.stream.streamManager);
      fetchParticipants();
    });

    mySession.on('exception', (exception: any) => {
      console.warn(exception);
    });

    try {
      await mySession.connect(token, { clientData: userName });

      const pub = await OV.current.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: isMicroOn,
        publishVideo: isCameraOn,
        resolution: '640x480',
        frameRate: 30,
        insertMode: 'APPEND',
        mirror: true,
      });

      await mySession.publish(pub);

      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      const currentVideoDeviceId = pub.stream
        .getMediaStream()
        .getVideoTracks()[0]
        .getSettings().deviceId;
      const currentDevice = videoDevices.find((device) => device.deviceId === currentVideoDeviceId);
      console.log(currentVideoDevice);
      setCurrentVideoDevice(currentDevice);
      setMainStreamManager(pub);
      setPublisher(pub);
      setSession(mySession);
    } catch (error) {
      console.error('There was an error connecting to the session:', error);
    }
  };

  const handleVideoChange = async () => {
    if (publisher) {
      const currentVideoState = !publisher.stream.getMediaStream().getVideoTracks()[0].enabled;
      publisher.publishVideo(currentVideoState);
    }
  };

  const deleteParticipant = async (memberId: string) => {
    try {
      await apiClient.delete(`/participants/${memberId}`);
    } catch (error) {
      console.error('Error deleting participant:', error);
      throw error;
    }
  };

  const deleteAllParticipantsByMeeting = async (meetingId: string) => {
    try {
      await apiClient.delete(`/participants/meetings/${meetingId}`);
    } catch (error) {
      console.error('Error deleting all participants:', error);
      throw error;
    }
  };

  const handleAudioChange = async () => {
    if (publisher) {
      const currentAudioState = !publisher.stream.getMediaStream().getAudioTracks()[0].enabled;
      publisher.publishAudio(currentAudioState);
    }
  };

  const deleteSubscriber = (streamManager: StreamManager) => {
    setSubscribers((prevSubscribers) => prevSubscribers.filter((sub) => sub !== streamManager));
  };

  const updateInterviewStatusToEnd = async (interviewId: string) => {
    try {
      await apiClient.put(`/interviews/end/${interviewId}`);
      console.log('Interview status updated to END.');
    } catch (error) {
      console.error('Failed to update interview status:', error);
    }
  };

  const terminateSessionOnServer = async (sessionId: string) => {
    try {
      await apiClient.post(`/meeting/sessions/${sessionId}/terminate`);
      console.log('Session terminated successfully.');
    } catch (error) {
      console.error('Failed to terminate session:', error);
      throw error;
    }
  };

  useEffect(() => {
    const handleSessionEnd = () => {
      setError('세션이 종료되었습니다. 잠시 후 페이지가 이동합니다.');

      setTimeout(() => {
        window.location.href = '/my-page';
      }, 1000);
    };

    if (session) {
      session.on('signal:SESSION_END', (event) => {
        if (event.data === 'SESSION_END') {
          handleSessionEnd();
        }
      });

      return () => {
        session.off('signal:SESSION_END');
      };
    }
  }, [session]);

  const leaveSession = async () => {
    if (session) {
      if (isHost) {
        try {
          await session.signal({
            data: 'SESSION_END',
            to: [],
            type: 'SESSION_END',
          });
          console.log('Session end signal sent.');
        } catch (error) {
          console.error('Error sending session end signal:', error);
        }
        await handleSubmitFeedback();
        await updateInterviewStatusToEnd(interviewId);
        await clearNotifications(sessionId);
        await deleteAllParticipantsByMeeting(meetingId);
        await setInitialAttendants([]);

        await deleteMeetingOnServer(sessionId);
        await terminateSessionOnServer(sessionId);
        session.disconnect();
      } else {
        await deleteParticipant(id);
        session.disconnect();
      }
      if (OV.current) {
        OV.current = new OpenVidu();
      }

      setSession(undefined);

      setSubscribers([]);
      setMainStreamManager(undefined);

      setPublisher(null);
      setCurrentVideoDevice(undefined);
      navigate('/my-page');
    }
    // window.location.href = '/my-page';
  };

  const deleteMeetingOnServer = async (sessionId: string) => {
    try {
      await apiClient.delete(`/meeting/sessions/${sessionId}`);
      console.log('미팅이 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('미팅 삭제 중 오류 발생:', error);

      throw error;
    }
  };

  useEffect(() => {
    joinSession();
    console.log(initialAttendants);
    return () => {
      leaveSession();
    };
  }, []);

  // useEffect(() => {
  //   joinSession();
  //   const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
  //     event.preventDefault();
  //     event.returnValue = '';
  //     await leaveSession();
  //   };

  //   const handlePopState = async () => {
  //     await leaveSession();
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   window.addEventListener('popstate', handlePopState);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //     window.removeEventListener('popstate', handlePopState);
  //   };
  // }, []);

  useEffect(() => {
    console.log('initialAttendants:', initialAttendants);
  }, [initialAttendants]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      leaveSession();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    const handlePopState = () => {
      leaveSession();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [session]);

  return (
    <div>
      {session ? (
        <div className="w-full h-screen overflow-hidden relative bg-[#353535] flex">
          <div className="w-3/4 h-full flex flex-col items-center p-4">
            <div className="flex-grow flex flex-col w-full h-full">
              <div className="w-full h-2/3">
                {mainStreamManager ? (
                  <div className="relative w-full h-full overflow-hidden">
                    <UserVideoComponent
                      streamManager={mainStreamManager}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}
              </div>
              <div id="subscribers" className="w-full h-1/3 grid grid-cols-3 gap-2 p-2 mt-4">
                {subscribers.map((sub, index) => (
                  <div key={index} className="relative w-full h-full">
                    <UserVideoComponent
                      streamManager={sub}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <Toolbar
              handleAudioChange={handleAudioChange}
              handleVideoChange={handleVideoChange}
              leaveSession={leaveSession}
            />
          </div>

          <div className="w-1/4 h-full flex flex-col p-4">
            <div
              className="flex-grow overflow-y-auto bg-[#ffffff] p-2 mb-4 rounded-md"
              style={{ maxHeight: '200px', flexShrink: 0 }}
            >
              <h2 className="text-lg font-bold mb-2">참가자 목록</h2>

              <div className="participant-list">
                {/* 자기자신 안나오게 하는것도포함시키기 현재 아이디가 중복되서 클릭하면 다클릭이됨  */}
                {initialAttendants
                  .filter((attendant) => attendant.role !== 'mentor' && attendant.memberId !== id)
                  .map((attendant) => {
                    const isPresent = attendants.some((att) => att.memberId === attendant.memberId);

                    return (
                      <div
                        key={attendant.memberId}
                        className={`cursor-pointer p-2 mb-1 rounded ${
                          selectedParticipant?.memberId === attendant.memberId ? 'bg-blue-200' : ''
                        }`}
                        onClick={() => handleClick(attendant)}
                      >
                        {/* 참석 여부를 나타내는 동그라미 */}
                        <span
                          className={`inline-block w-3 h-3 rounded-full mr-2 ${
                            isPresent ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        ></span>
                        {attendant.name}
                      </div>
                    );
                  })}
              </div>
              {/* <ul>
                {attendants.map((attendant) => (
                  <li
                    key={attendant.memberId}
                    onClick={() => handleClick(attendant)}
                    className={`cursor-pointer p-2 mb-1 rounded ${
                      selectedParticipant?.memberId === attendant.memberId ? 'bg-blue-200' : ''
                    }`}
                  >
                    {attendant.name} {attendant.role}
                  </li>
                ))}
              </ul> */}
            </div>
            {attendants.length > 1 && (
              <div
                className="flex-grow overflow-y-auto bg-[#ffffff] p-2 rounded-md"
                style={{ flexGrow: 4 }}
              >
                <h2 className="text-lg font-bold mb-2">피드백</h2>
                {isHost ? (
                  <>
                    {selectedParticipant ? (
                      <>
                        <h4 className="text-sm font-bold mb-2">좋은점</h4>
                        <textarea
                          className="w-full h-1/3 p-2 border border-gray-300 mb-2"
                          placeholder="좋은점"
                          value={goodMemo}
                          onChange={(e) => handleMemoChange('goodPoint', e)}
                        ></textarea>
                        <h4 className="text-sm font-bold mb-2">나쁜점</h4>
                        <textarea
                          className="w-full h-1/3 p-2 border border-gray-300 mb-2"
                          placeholder="나쁜점"
                          value={badMemo}
                          onChange={(e) => handleMemoChange('badPoint', e)}
                        ></textarea>
                        <h4 className="text-sm font-bold mb-2">총평</h4>
                        <textarea
                          className="w-full h-1/3 p-2 border border-gray-300"
                          placeholder="총평"
                          value={generalMemo}
                          onChange={(e) => handleMemoChange('summary', e)}
                        ></textarea>
                      </>
                    ) : (
                      <p>참가자를 선택하세요.</p>
                    )}
                  </>
                ) : (
                  <>
                    <textarea
                      className="w-full h-full p-2 border border-gray-300"
                      placeholder="여기에 멘티간 피드백을 입력하세요..."
                      value={contentMemo}
                      onChange={(e) => handleMemoChange('content', e)}
                    ></textarea>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default VideoChatPage;
