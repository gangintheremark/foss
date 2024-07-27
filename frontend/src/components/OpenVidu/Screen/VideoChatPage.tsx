import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserVideoComponent from '@components/OpenVidu/Screen/UserVideoComponent';
import { OpenVidu, Session, Publisher, StreamManager, StreamEvent, Device } from 'openvidu-browser';
import axios from 'axios';
import useParticipantsStore from '@/store/paticipant';

const APPLICATION_SERVER_URL = 'http://localhost:8080';

const VideoChatPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isHost, setIsHost] = useState<boolean>(false);
  const { addParticipant, removeParticipant, updateParticipant } = useParticipantsStore();
  const { sessionId, token, userName } = location.state as {
    sessionId: string;
    token: string;
    userName: string;
  };

  const [session, setSession] = useState<Session | undefined>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<StreamManager | undefined>(undefined);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscribers, setSubscribers] = useState<StreamManager[]>([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState<Device | undefined>(undefined);

  const OV = useRef<OpenVidu>(new OpenVidu());
  const joinSession = async () => {
    const mySession = OV.current.initSession();

    mySession.on('streamCreated', (event: StreamEvent) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    mySession.on('streamDestroyed', (event: StreamEvent) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception: any) => {
      console.warn(exception);
    });

    try {
      await mySession.connect(token, { clientData: userName });

      // const isFirstParticipant = mySession.connections.length === 1;

      // setIsHost(isFirstParticipant);

      // const role = isFirstParticipant ? 'host' : 'participant';
      // addParticipant({
      //   id: mySession.connection.connectionId,
      //   name: userName,
      //   role: role,
      //   isMuted: false,
      //   isCameraOn: true,
      // });

      const pub = await OV.current.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
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
    } catch (error: any) {
      console.error('There was an error connecting to the session:', error.code, error.message);
    }
  };

  const deleteSubscriber = (streamManager: StreamManager) => {
    setSubscribers((prevSubscribers) => prevSubscribers.filter((sub) => sub !== streamManager));
  };

  const leaveSession = async () => {
    if (session) {
      try {
        const myRole = session.connection.data.role;

        if (myRole === 'host') {
          await session.signal({
            type: 'admin_left',
            data: '방 관리자가 세션을 떠났습니다.',
          });

          session.disconnect();
        } else {
          if (publisher) {
            session.unpublish(publisher);
          }
          session.disconnect();
        }

        removeParticipant({ id: session.connection.connectionId });
      } catch (error) {
        console.error('Error sending signal or disconnecting:', error);
      }

      // Clean up OpenVidu instance
      if (OV.current) {
        OV.current = null;
      }

      // Clear state
      setSession(undefined);
      setSubscribers([]);
      setMainStreamManager(undefined);
      setPublisher(null);
      setCurrentVideoDevice(undefined);
    }
  };
  useEffect(() => {
    joinSession();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      leaveSession();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    const handlePopState = () => {
      leaveSession();

      navigate('/my-page');
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
        <div className="absolute w-[1440px] h-[900px] relative bg-[#353535]">
          <div className="w-[830px] h-[750px] left-[23px] top-[50px] absolute">
            <div className="flex flex-col items-center">
              <div className="w-[800px] h-[480px]">
                {mainStreamManager ? (
                  <div className="relative w-full h-full overflow-hidden">
                    <UserVideoComponent
                      streamManager={mainStreamManager}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}
              </div>
              <div id="subscribers" className="w-[800px] h-[250px] grid grid-cols-3 gap-2 p-2 mt-4">
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
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default VideoChatPage;
