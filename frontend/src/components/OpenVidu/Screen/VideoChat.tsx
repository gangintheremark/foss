import { OpenVidu, Session, Publisher, StreamEvent, StreamManager, Device } from 'openvidu-browser';
import axios from 'axios';
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import UserVideoComponent from '@components/OpenVidu/Screen/UserVideoComponent';

const APPLICATION_SERVER_URL = 'http://localhost:8080';
// process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';

const VideoChatApp: React.FC = () => {
  const [mySessionId, setMySessionId] = useState<string>('SessionA');
  const [myUserName, setMyUserName] = useState<string>(
    'Participant' + Math.floor(Math.random() * 100)
  );
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<StreamManager | undefined>(undefined);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscribers, setSubscribers] = useState<StreamManager[]>([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState<Device | undefined>(undefined);
  const OV = useRef<OpenVidu | null>(null);

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);

  const onBeforeUnload = (event: BeforeUnloadEvent) => {
    leaveSession();
  };

  const handleChangeSessionId = (e: ChangeEvent<HTMLInputElement>) => {
    setMySessionId(e.target.value);
  };

  const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setMyUserName(e.target.value);
  };

  const handleMainVideoStream = (pub: Publisher) => {
    if (mainStreamManager !== pub) {
      setMainStreamManager(pub);
    }
  };

  const deleteSubscriber = (streamManager: StreamManager) => {
    setSubscribers((prevSubscribers) =>
      prevSubscribers.filter((sub) => sub.stream !== streamManager.stream)
    );
  };

  const joinSession = async () => {
    console.log('joinSession called');
    if (!OV.current) {
      OV.current = new OpenVidu();
      console.log('OpenVidu instance created');
    }

    const mySession = OV.current.initSession();
    console.log('Session initialized');
    console.log(mySession);

    mySession.on('streamCreated', (event: StreamEvent) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    mySession.on('streamDestroyed', (event: StreamEvent) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    try {
      const token = await getToken(mySessionId);
      console.log('Token received:', token);
      await mySession.connect(token, { clientData: myUserName });
      console.log('Session connected');

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
      console.log('Publisher initialized');

      await mySession.publish(pub);
      console.log('Stream published');

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

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }

    if (OV.current) {
      OV.current = null;
    }

    setSession(undefined);
    setSubscribers([]);
    setMySessionId('SessionA');
    setMyUserName('Participant' + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(null);
  };

  const switchCamera = async () => {
    try {
      if (publisher) {
        const devices = await OV.current!.getDevices();
        const videoDevices = devices.filter((device) => device.kind === 'videoinput');

        if (videoDevices.length > 1) {
          const newVideoDevice = videoDevices.find(
            (device) => device.deviceId !== currentVideoDevice?.deviceId
          );

          if (newVideoDevice) {
            const newPublisher = OV.current!.initPublisher(undefined, {
              videoSource: newVideoDevice.deviceId,
              publishAudio: true,
              publishVideo: true,
              mirror: true,
            });

            if (session && mainStreamManager && publisher) {
              await session.unpublish(publisher);
              await session.publish(newPublisher);

              setCurrentVideoDevice(newVideoDevice);
              setMainStreamManager(newPublisher);
              setPublisher(newPublisher);
            } else {
              console.error('세션이나 메인 스트림 매니저, 퍼블리셔가 정의되지 않았습니다');
            }
          }
        }
      }
    } catch (error) {
      console.error('카메라 전환 중 오류 발생:', error);
    }
  };

  const getToken = async (sessionId: string) => {
    return createSession(sessionId).then((sessionId: any) => createToken(sessionId));
  };

  const createSession = async (sessionId: string) => {
    try {
      console.log(APPLICATION_SERVER_URL + '/meeting/sessions');
      console.log(sessionId);
      const response = await axios.post(
        `${APPLICATION_SERVER_URL}/meeting/sessions`,
        { customSessionId: sessionId },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  };

  const createToken = async (sessionId: string) => {
    try {
      const response = await axios.post(
        APPLICATION_SERVER_URL + '/meeting/sessions/' + sessionId + '/connections',
        {},
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating token:', error);
      throw error;
    }
  };

  return (
    <div className="container">
      {session === undefined ? (
        <div id="join">
          <div id="join-dialog" className="jumbotron vertical-center">
            <h1> Join a video session </h1>
            <form
              className="form-group"
              onSubmit={(e) => {
                e.preventDefault();
                joinSession();
              }}
            >
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
              <p>
                <label> Session: </label>
                <input
                  className="form-control"
                  type="text"
                  id="sessionId"
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <p className="text-center">
                <input
                  className="btn btn-lg btn-success"
                  name="commit"
                  type="submit"
                  value="JOIN"
                />
              </p>
            </form>
          </div>
        </div>
      ) : null}

      {session !== undefined ? (
        <div className="absolute w-[1440px] h-[900px] relative  bg-[#353535]">
          {/* <div>
            <h1>{mySessionId}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
            <input
              className="btn btn-large btn-success"
              type="button"
              id="buttonSwitchCamera"
              onClick={switchCamera}
              value="Switch camera"
            />
          </div> */}
          <div className="w-[830px] h-[750px] left-[23px] top-[50px] absolute">
            <div className="flex flex-col items-center">
              <div className="w-[800px] h-[480px]">
                {mainStreamManager !== undefined ? (
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
      ) : null}
    </div>
  );
};

export default VideoChatApp;
