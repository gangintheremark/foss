import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserVideoComponent from '@components/OpenVidu/Screen/UserVideoComponent';
import { OpenVidu, Session, Publisher, StreamManager, StreamEvent, Device } from 'openvidu-browser';
import Toolbar from '@components/OpenVidu/Screen/ToolBar';
import useParticipantsStore from '@/store/paticipant';
import apiClient from '../../../utils/util';
import { Participant } from '@/types/openvidu';
import useNotificationStore from '@/store/notificationParticipant';
import FeedBack from '@/types/openvidu';
const VideoChatPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract state from location
  const { id, sessionId, meetingId, token, userName, isHost, isMicroOn, isCameraOn } =
    location.state as {
      id: string;
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
  const [loading, setLoading] = useState(true);
  const { clearNotifications } = useNotificationStore();
  const [goodMemo, setGoodMemo] = useState('');
  const [badMemo, setBadMemo] = useState('');
  const [generalMemo, setGeneralMemo] = useState('');

  const OV = useRef<OpenVidu>(new OpenVidu());

  const handleClick = (attendant: Participant) => {
    console.log(attendant);

    // 참가자 선택
    setSelectedParticipant(attendant);

    // if (!feedbacks[attendant.memberId]) {
    //   setFeedbacks((prevFeedbacks) => ({
    //     ...prevFeedbacks,
    //     [attendant.memberId]: {
    //       goodMemo: '',
    //       badMemo: '',
    //       generalMemo: ''
    //     }
    //   }));
    // }
  };

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await apiClient.get(`/participants/meetings/${meetingId}`);
        setAttendants(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchParticipants();
  }, [meetingId]);

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
        mirror: false,
      });

      await mySession.publish(pub);

      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      const currentVideoDeviceId = pub.stream
        .getMediaStream()
        .getVideoTracks()[0]
        .getSettings().deviceId;
      const currentDevice = videoDevices.find((device) => device.deviceId === currentVideoDeviceId);

      setCurrentVideoDevice(currentDevice);
      setMainStreamManager(pub);
      setPublisher(pub);
      setSession(mySession);
    } catch (error) {
      console.error('There was an error connecting to the session:', error.code, error.message);
    }
  };

  const handleVideoChange = async () => {
    if (publisher) {
      const currentVideoState = !publisher.stream.getMediaStream().getVideoTracks()[0].enabled;
      publisher.publishVideo(currentVideoState);
    }
  };

  const fetchParticipants = async () => {
    try {
      const response = await apiClient.get(`/participants/meetings/${meetingId}`);
      setAttendants(response.data);
    } catch (err) {
      console.error('Failed to fetch participants:', err);
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

  const leaveSession = async () => {
    if (session) {
      if (isHost) {
        await clearNotifications(sessionId);
        await deleteAllParticipantsByMeeting(meetingId);
        await deleteMeetingOnServer(sessionId);
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
    return () => {
      leaveSession();
    };
  }, []);

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
      leaveSession();
    };
  }, [session]);

  return (
    <div className="container">
      {session ? (
        <div className="absolute w-[1440px] h-[900px] relative bg-[#353535] flex">
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
              <ul>
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
              </ul>
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
                          onChange={(e) => setGoodMemo(e.target.value)}
                        ></textarea>
                        <h4 className="text-sm font-bold mb-2">나쁜점</h4>
                        <textarea
                          className="w-full h-1/3 p-2 border border-gray-300 mb-2"
                          placeholder="나쁜점"
                          value={badMemo}
                          onChange={(e) => setBadMemo(e.target.value)}
                        ></textarea>
                        <h4 className="text-sm font-bold mb-2">총평</h4>
                        <textarea
                          className="w-full h-1/3 p-2 border border-gray-300"
                          placeholder="총평"
                          value={generalMemo}
                          onChange={(e) => setGeneralMemo(e.target.value)}
                        ></textarea>
                      </>
                    ) : (
                      <p>참가자를 선택하세요.</p>
                    )}
                  </>
                ) : (
                  <textarea
                    className="w-full h-full p-2 border border-gray-300"
                    placeholder="여기에 메모를 입력하세요..."
                    value={generalMemo}
                    onChange={(e) => setGeneralMemo(e.target.value)}
                  ></textarea>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default VideoChatPage;
