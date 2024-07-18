import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Video = styled.video`
  width: 100%;
  /* width: ${(props) => (props.main ? `100%` : '360px')}; */
  position: relative;
`;

export default function OpenViduVideoComponent(props) {
  const videoRef = useRef();
  const [main, setMain] = useState(false);
  const [screenMode, setScreenMode] = useState(960);
  console.log(props.fullScreenLayoutMode);
  useEffect(() => {
    if (props && !!videoRef) {
      props.streamManager.addVideoElement(videoRef.current);
    }
    if (props.main === 'main') {
      setMain(true);
    }
    if (props.fullScreenLayoutMode === true) {
      console.log(props.fullScreenLayoutMode);
      setScreenMode(1920);
    } else {
      setScreenMode(960);
    }
  }, [props]);
  return <Video autoPlay={true} ref={videoRef} main={main} screenMode={screenMode} />;
}

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import UserVideoComponent from './UserVideoComponent';
import AttendeesList from './AttendeesList';
import ChattingWrapper from './ChattingWrapper';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import FaceIcon from '@mui/icons-material/Face';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Modal from '../Modal';
import { api } from '../../utils/api';
import {
  LayoutButton,
  PeopleBox,
  OpenviduBox,
  VideoBox,
  MeetingRoom,
  SubStream,
  ChattingBox,
  ChattingInput,
  ChattingInputBox,
  MeetingButtons,
  MeetingButton,
  ScreenText,
  MeetingButtonWrapper,
  MeetingAttendAndChattingButton,
  MeetingAttendAndChattingWrapper,
  ChattinBoxgWrapper,
  ChattingName,
  ChattingSendButton,
  MeetingButtonControl,
  FullscreenButton,
  NotFullScreenButton,
  AllMicAndCamOff,
  ChattingAndCancleButtonWrapper,
  ChattingAndQnASelect,
  ChattingAndQnAWrapper,
  QnAWrapper,
  QnABox,
  QnATitle,
  QnAMessage,
  QnAButton,
  QnAButtonWrapper,
  SmallPeopleBoxWrapper,
  SmallMeetingAttendAndChattingWrapper,
  SmallMeetingAttendAndChattingButton,
  QestionAnswerCommentInput,
} from './OpenViduTestStyled';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
import StudentAnonymouse from './StudentAnonymous';
import { useSelector } from 'react-redux';

// const OPENVIDU_SERVER_URL = "https://" + window.location.hostname + ":4443";
// const OPENVIDU_SERVER_SECRET = "MY_SECRET";
const OPENVIDU_SERVER_URL = 'https://i7b107.p.ssafy.io:8443';
const OPENVIDU_SERVER_SECRET = 'atti';

// 도메인: https://i7b107.p.ssafy.io

const STUDENT = 'student';
const PROFESSOR = 'professor';

export const CHATTING = 'chatting';
export const QnA = 'QnA';
export const PRIVATE = 'private';

const OpenViduTest = () => {
  const userInfo = useSelector((store) => store.userInfo);
  const studentList = useSelector((store) => store.studentList);
  console.log(userInfo);
  console.log(studentList);
  let myRole = undefined;
  if (userInfo.admin === false) {
    myRole = STUDENT;
  } else {
    myRole = PROFESSOR;
  }
  const { categoryList } = useSelector((state) => state.category);
  console.log(categoryList);
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('courseId'));
  const navigate = useNavigate();
  const [state, setState] = useState({
    mySessionId: searchParams.get('courseId'),
    myUserName: userInfo.userName + '(' + userInfo.id + ')',
    myRole: myRole,
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: [],
  });
  const departId = useSelector((store) => store.depart.departId);
  const [reqeustPresent, setReqeustPresent] = useState(false);
  const [receivePresent, setReceivePresent] = useState(false);
  const [saveSubscriber, setSaveSubscriber] = useState(undefined);
  const [sendToUser, setSendToUser] = useState('');
  // const [disconnectUser, setDisconnectUser] = useState([]);
  const [sendToClientId, setSendToClientId] = useState('');
  const [peopleList, setPeopleList] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [turnOnCamera, setTurnOnCamera] = useState(true);
  const [turnOnAudio, setTurnOnAudio] = useState(true);
  const [anonymousMode, setAnonymousMode] = useState(false);
  const [openAttentList, setOpenAttentList] = useState(true);
  const [openChattingList, setOpenChattingList] = useState(true);
  const [fullScreenLayoutMode, setFullScreenLayoutMode] = useState(false);
  const [layout, setLayout] = useState(false);
  const messageRef = useRef();
  const [onClickToggleModal, setOnClickToggleModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  // QnA인지 채팅인지 선택
  const [chattingSelect, setChattingSelect] = useState(CHATTING);
  const [QnAState, setQnAState] = useState(undefined);
  const answerRef = useRef(null);
  const [receiveReaction, setReceiveReaction] = useState(null);
  const [allOff, setAllOff] = useState(false);
  const [answerPostNum, setAnswerPostNum] = useState('');
  const [questionAnswer, setQuestionAnswer] = useState(false);
  const [notConnectionList, setConnectionList] = useState([]);
  const [leaveSessionCheck, setLeaveSessionCheck] = useState(true);
  const [anonymouseModeRequestUserName, setAnonymouseModeRequestUserName] = useState('');

  function handlerAnswer() {
    setQuestionAnswer(true);
  }

  function QnAComment() {
    const answer = answerRef.current.value;
    api
      .post('/post/comment/write', {
        commentAnoInfo: 0,
        commentContent: answer,
        commentDeleteInfo: 0,
        commentGroup: 1,
        commentLevel: 0,
        seq: 1,
        userId: userInfo.id,
        postId: answerPostNum,
      })
      .then((res) => {
        setQuestionAnswer(false);
        state.session
          .signal({
            data: QnAState.from + ')' + answer,
            to: [],
            type: 'QnAResult',
          })
          .then(() => {
            console.log('답변이 정상적으로 저장되었으며 결과를 메시지로 던집니다.');
            setChatList({
              message: '답변이 정상적으로 전달 되었으며 질문 게시글의 댓글로 달렸습니다.',
              from: '운영',
              type: 'QnAResult',
            });
          })
          .catch((error) => {
            console.log(error);
          });
        setQnAState(undefined);
        answerRef.current.value = '';
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    if (!openAttentList && !openChattingList) {
      setAllOff(true);
    } else {
      setAllOff(false);
    }
  }, [openAttentList, openChattingList]);

  useEffect(() => {
    if (state.session !== undefined) {
      state.session.on('signal:sendToReaction', (event) => {
        setReceiveReaction({ data: event.data, from: event.from });
      });
    }
  }, [state.publisher, state.session]);

  function setChattingInfo({ data, connectionId }) {
    setSendToUser(data);
    setSendToClientId(connectionId);
  }

  function handleChangeSessionId(e) {
    setState((prev) => ({
      ...prev,
      mySessionId: e.target.value,
    }));
  }

  function handleChangeUserName(e) {
    this.setState((prev) => ({
      ...prev,
      myUserName: e.target.value,
    }));
  }

  function handleMainVideoStream(stream) {
    if (state.mainStreamManager !== stream) {
      setState((prevState) => ({
        ...prevState,
        mainStreamManager: stream,
      }));
    }
    if (
      state.publisher.stream.connection.data !== stream.stream.connection.data &&
      state.myRole === PROFESSOR
    ) {
      setSaveSubscriber(stream.stream.connection);
      setReqeustPresent(true);
      console.log(stream.stream.connection);
    }
  }

  function deleteSubScriber(streamManager) {
    let subscribers = state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    console.log(index);
    if (index > -1) {
      subscribers.splice(index, 1);

      setState((prevState) => ({
        ...prevState,
        subscribers: subscribers,
      }));
    }
  }
  var OV = new OpenVidu();
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      const mySession = state.session;
      mySession.disconnect();
      OV = null;

      setState({
        mySessionId: 'SessionA',
        myUserName: 'Participant' + Math.floor(Math.random() * 100),
        session: undefined,
        mainStreamManager: undefined,
        publisher: undefined,
        subscribers: [],
      });
    });
    return () => {
      window.addEventListener('beforeunload', () => {
        const mySession = state.session;
        mySession.disconnect();
        OV = null;

        setState({
          mySessionId: 'SessionA',
          myUserName: 'Participant' + Math.floor(Math.random() * 100),
          session: undefined,
          mainStreamManager: undefined,
          publisher: undefined,
          subscribers: [],
        });
      });
    };
  }, []);
  useEffect(() => {
    if (anonymousMode) {
      window.speechSynthesis.cancel();
      const speechMsg = new SpeechSynthesisUtterance();
      speechMsg.rate = 1.8;
      speechMsg.pitch = 1;
      speechMsg.lang = 'ko-KR';

      speechMsg.text = chatList.message;

      window.speechSynthesis.speak(speechMsg);
    }
  }, [anonymousMode, chatList.message]);
  useEffect(() => {
    if (state.session !== undefined && state.publisher !== undefined) {
      state.session.on('signal:requestAllCamOff', (event) => {
        state.publisher.publishVideo(false);
        setTurnOnCamera(false);
      });
      state.session.on('signal:requestAllMicOff', (event) => {
        state.publisher.publishAudio(false);
        setTurnOnAudio(false);
      });
    }
  }, [peopleList, state.publisher, state.session]);
  useEffect(() => {
    if (state.session !== undefined) {
      console.log(peopleList);
      state.session.on('signal:QnAResult', (event) => {
        console.log(event);
        let temp = event.data.lastIndexOf(')');
        let question = event.data.slice(temp + 1);
        let targetName = event.data.slice(0, temp);
        if (targetName === state.myUserName) {
          setChatList({
            type: 'QnAResult',
            from: JSON.parse(event.from.data).clientData,
            message: '질문의 답변: ' + question,
          });
        }
      });
      state.session.on('signal:audioAndVideo', (event) => {
        console.log(event);
        let subscribers = state.subscribers;
        subscribers.forEach((e) => {
          if (e.stream.connection.connectionId === event.from.connectionId) {
            e.stream.connection = event.from;
          }
        });
        setState((prev) => ({
          ...prev,
          subscribers: subscribers,
        }));
      });
      state.session.on('signal:reqeustPresent', (event) => {
        setReceivePresent(true);
        setSaveSubscriber(event.from);
      });
      state.session.on('signal:QnA', (event) => {
        let temp = event.data.indexOf(')');
        let question = event.data.slice(temp + 1);
        console.log('질문 빳다죠', question);
        console.log('글번호 빳다죠', event.data.slice(0, temp));
        setAnswerPostNum(event.data.slice(0, temp));
        setQnAState({
          message: question,
          from: JSON.parse(event.from.data).clientData,
        });
      });
      state.session.on('signal:my-chat', (event) => {
        console.log(JSON.parse(event.from.data).clientData);
        if (anonymousMode) {
          setChatList({
            type: 'public',
            message: event.data,
            from: '익명',
          });
        } else {
          setChatList({
            type: 'public',
            message: event.data,
            from: JSON.parse(event.from.data).clientData,
          });
        }
        console.log(anonymousMode);
      });
      state.session.on('signal', (event) => {
        console.log(state.session.connection);
      });
      state.session.on('signal:secret-chat', (event) => {
        console.log(JSON.parse(event.from.data).clientData);
        setChatList({
          type: 'private',
          message: event.data,
          from: JSON.parse(event.from.data).clientData,
        });
      });
      state.session.on('signal:screenShareDead', (event) => {
        console.log(event.data);
        setState((prevState) => ({
          ...prevState,
          mainStreamManager: undefined,
        }));
      });
      state.session.on('signal:screenShareStart', (event) => {
        console.log(event.from);
      });
      state.session.on('signal:anonymous', (event) => {
        if (!anonymousMode) {
          setChatList({
            type: 'public',
            message: '익명모드가 활성화 되었습니다.',
            from: '안내',
          });
        } else {
          setChatList({
            type: 'public',
            message: '익명모드가 비활성화 되었습니다.',
            from: '안내',
          });
        }
        setAnonymousMode((prev) => {
          return !anonymousMode;
        });
      });
      state.session.on('signal:requestAnonymous', (event) => {
        if (state.myRole === PROFESSOR) {
          setAnonymouseModeRequestUserName(JSON.parse(event.from.data).clientData);
          setOpenModal(true);
        }
      });
      // state.session.on("signal:disconnectUser", (event) => {
      //   let disconnect = disconnectUser;
      //   disconnect.push(event.from.connectionId);
      //   setDisconnectUser(disconnect);
      // });
    }
  }, [
    anonymousMode,
    peopleList,
    state,
    state.myRole,
    state.publisher,
    state.session,
    state.subscribers,
    turnOnAudio,
    turnOnCamera,
  ]);
  useEffect(() => {
    if (state.session !== undefined) {
      state.session
        .signal({
          data: 'test',
          to: [],
          type: 'audioAndVideo',
        })
        .then(() => {
          console.log('메시지 전송 성공');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [turnOnCamera, turnOnAudio, state.session]);
  useEffect(() => {
    if (state.publisher !== undefined) {
      let people = state.publisher.stream.connection;
      let peoples = [];

      state.subscribers.forEach((e) => {
        peoples.push(e.stream.connection);
      });

      console.log('배열 합치기', [people, ...peoples]);
      if (peoples.length === 0) {
        setPeopleList([people]);
      } else {
        setPeopleList([people, ...peoples]);
      }
    }
  }, [state.publisher, state.subscribers, state.subscribers.length]);
  useEffect(() => {
    if (peopleList !== null && peopleList !== undefined && peopleList.length > 0) {
      let temp = studentList.userList.map((e) => {
        return e.userName + '(' + e.userId + ')';
      });
      console.log('빼기전', temp);
      peopleList.forEach((e) => {
        let studentName = JSON.parse(e.data).clientData;
        console.log(studentName);
        temp = temp.filter((element) => {
          return element !== studentName;
        });
      });
      console.log('이거다:', temp);
      setConnectionList(temp);
    }
  }, [studentList, peopleList]);
  useEffect(() => {
    if (state.session !== undefined && anonymousMode) {
      setTurnOnCamera(false);
      setTurnOnAudio(false);
      console.log(state.publisher);
      state.publisher.publishVideo(false);
      state.publisher.publishAudio(false);
    } else if (state.session !== undefined && state.publisher !== undefined && !anonymousMode) {
      state.publisher.publishVideo(true);
      state.publisher.publishAudio(true);
      setTurnOnCamera(true);
      setTurnOnAudio(true);
      console.log(state.publisher);
    }
  }, [anonymousMode, state.publisher, state.session]);

  async function getToken() {
    const sessionId_1 = await createSession(state.mySessionId);
    return createToken(sessionId_1);
  }
  async function joinSession() {
    // e.preventDefault();
    OV = new OpenVidu();
    setChatList({
      type: 'public',
      from: '안내',
      message: '수업실에 입장하셨습니다.',
    });
    const mySession = OV.initSession();
    setState((prevState) => ({
      ...prevState,
      session: mySession,
    }));
    // mySession.on("connectionCreated", (event) => {
    //   let peoples = peopleList;
    //   peoples.push(event.connection);
    //   setPeopleList(peoples);
    // });
    mySession.on('streamCreated', (event) => {
      let subscriber = mySession.subscribe(event.stream, 'subscriber');
      let subscribers = state.subscribers;

      subscribers.push(subscriber);
      if (subscriber.stream.typeOfVideo === 'SCREEN') {
        setState((prevState) => ({
          ...prevState,
          subscribers: subscribers,
          mainStreamManager: subscriber,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          subscribers: subscribers,
        }));
      }
    });

    mySession.on('streamDestroyed', (event) => {
      deleteSubScriber(event.stream.streamManager);
    });
    getToken().then((token) => {
      mySession
        .connect(token, { clientData: state.myUserName })
        .then(async () => {
          let devices = await OV.getDevices();
          let videoDevices = devices.filter((device) => device.kind === 'videoinput');
          let publisher = OV.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: '640x480', // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          });

          // --- 6) Publish your stream ---

          mySession.publish(publisher);
          setState((prevState) => ({
            ...prevState,
            currentVideoDevice: videoDevices[0],
            // mainStreamManager: publisher,
            publisher: publisher,
          }));
        })
        .catch((error) => {
          console.log('세션에 연결할 수 없습니다.:', error.code, error.message);
        });
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });
  }
  function screenShare() {
    const sessionScreen = state.session;
    getToken()
      .then((token) => {
        let publisher = OV.initPublisher(undefined, {
          videoSource: 'screen',
        });
        console.log(publisher);
        publisher.once('accessAllowed', (event) => {
          publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .addEventListener('ended', async () => {
              console.log('User press the Stop sharing button');
              state.session
                .signal({
                  data: '화면 공유 종료',
                  to: [],
                  type: 'screenShareDead',
                })
                .then(() => {
                  console.log('메시지 전송 성공');
                })
                .catch((error) => {
                  console.log(error);
                });
              sessionScreen.unpublish(publisher);
              let devices = await OV.getDevices();
              let videoDevices = devices.filter((device) => device.kind === 'videoinput');
              let cameraPublisher = OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: '640x480', // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              state.session.publish(cameraPublisher);

              // Set the main video in the page to display our webcam and store our Publisher

              setState((prevState) => ({
                ...prevState,
                currentVideoDevice: videoDevices[0],
                mainStreamManager: undefined,
                publisher: cameraPublisher,
              }));
            });
          sessionScreen.unpublish(state.publisher);
          const save = publisher;
          console.log(save);

          sessionScreen.publish(publisher);
          state.session
            .signal({
              data: 'test',
              to: [],
              type: 'screenShareStart',
            })
            .then(() => {
              console.log('메시지 전송 성공');
            })
            .catch((error) => {
              console.log(error);
            });
          setState((prevState) => ({
            ...prevState,
            publisher: publisher,
            mainStreamManager: publisher,
          }));
        });

        publisher.once('accessDenied', (event) => {
          console.warn('ScreenShare: Access Denied');
        });
      })
      .catch((error) => {
        console.warn('there was an error connecting to the session', error.code.error.message``);
      });
  }
  function leaveSession() {
    const mySession = state.session;
    mySession.disconnect();
    OV = null;

    setState({
      mySessionId: 'SessionA',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      leave: true,
    });
    setLeaveSessionCheck(false);
  }

  useEffect(() => {
    if (!leaveSessionCheck && state.leave !== undefined && state.leave) {
      navigate('/community/' + departId + '/' + categoryList[0].categoryId);
    }
  }, [leaveSessionCheck]);

  async function switchCamera() {
    try {
      const devices = await OV.getDevices();
      let videoDevices = devices.filter((device) => device.kind === 'videoinput');

      if (videoDevices && videoDevices.length > 1) {
        let newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          let newPublisher = OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await state.session.unpublish(state.publisher);

          await state.session.publish(newPublisher);
          setState((prevState) => ({
            ...prevState,
            currentVideoDevice: newVideoDevice,
            // mainStreamManager: newPublisher,
            publisher: newPublisher,
          }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
  async function sendMessage() {
    const mySession = state.session;
    if (messageRef.current.value.length > 0 && messageRef.current.value.trim() !== '') {
      if (sendToUser !== '') {
        console.log('test', sendToClientId);
        let people = peopleList;
        const sendTo = people.filter((e) => {
          return e.connectionId === sendToClientId;
        });
        console.log(sendTo);
        const message = messageRef.current.value;
        mySession
          .signal({
            data: messageRef.current.value,
            to: [sendTo[0]],
            type: 'secret-chat',
          })
          .then(() => {
            console.log('secret Message send success');
            setChatList({
              message,
              from: state.myUserName,
              type: 'private',
            });
          })
          .catch((error) => {
            console.log(error);
          });
        setChattingSelect(CHATTING);
      } else {
        if (chattingSelect === CHATTING) {
          mySession
            .signal({
              data: messageRef.current.value,
              to: [],
              type: 'my-chat',
            })
            .then(() => {
              console.log('Message send success');
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          let today = new Date();
          const year = today.getFullYear();
          const month = ('0' + (today.getMonth() + 1)).slice(-2);
          const day = ('0' + today.getDate()).slice(-2);

          const dateString = year + '년' + month + '월' + day + '일';

          const hours = ('0' + today.getHours()).slice(-2);
          const minutes = ('0' + today.getMinutes()).slice(-2);
          const seconds = ('0' + today.getSeconds()).slice(-2);

          const timeString = hours + '시' + minutes + '분' + seconds + '초';
          const message = messageRef.current.value;
          console.log(categoryList[1].categoryId);
          const res = await api.post('/post/write', {
            postTitle: message,
            postContent: dateString + ' ' + timeString + ' 에 작성된 게시물입니다.',
            postAnoInfo: 0,
            postComBanInfo: 1,
            departId: departId,
            categoryId: categoryList[1].categoryId,
            userId: userInfo.id,
          });
          console.log(res);
          mySession
            .signal({
              data: res.data + ')' + message,
              to: [],
              type: 'QnA',
            })
            .then(() => {
              console.log('QnA 질문 끝!');
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }

    messageRef.current.value = '';
    setSendToUser('');
  }
  function requestAnonymous() {
    if (state.myRole === STUDENT) {
      setOnClickToggleModal(true);
    } else {
      turnOnAnonymous();
    }
  }
  function sendToAnonymouseMode() {
    state.session
      .signal({
        data: state.myUserName,
        to: [],
        type: 'requestAnonymous',
      })
      .then(() => {
        console.log('메시지 전송 성공');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function allMicOff() {
    state.session
      .signal({
        data: state.myUserName,
        to: [],
        type: 'requestAllMicOff',
      })
      .then(() => {
        console.log('메시지 전송 성공');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function allCamOff() {
    state.session
      .signal({
        data: state.myUserName,
        to: [],
        type: 'requestAllCamOff',
      })
      .then(() => {
        console.log('메시지 전송 성공');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function anonymousOK() {
    if (onClickToggleModal) {
      sendToAnonymouseMode();
      setOnClickToggleModal(false);
    } else {
      turnOnAnonymous();
      setOpenModal(false);
    }
  }
  function turnOnModal() {
    if (state.myRole === PROFESSOR) {
      setOpenModal(false);
    } else {
      setOnClickToggleModal(false);
    }
  }
  function turnOnAnonymous() {
    state.session
      .signal({
        data: '익명모드활성화',
        to: [],
        type: 'anonymous',
      })
      .then(() => {
        console.log('메시지 전송 성공');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function layoutButton() {
    setLayout((prev) => {
      return !prev;
    });
  }
  function fullScreenMode() {
    setFullScreenLayoutMode((prev) => {
      return !prev;
    });
    setLayout((prev) => {
      return false;
    });
  }
  function sendReqeustPresent() {
    sendToPresent(saveSubscriber);
    setReqeustPresent(false);
  }
  const sendToPresent = (sub) => {
    state.session
      .signal({
        data: '발표 요청하기',
        to: [sub],
        type: 'reqeustPresent',
      })
      .then(() => {
        console.log('secret Message send success');
      })
      .catch((error) => {
        console.log(error);
      });
    setSaveSubscriber(undefined);
  };
  const handlerChange = (e) => {
    console.log(e.target.value);
    setState((prev) => ({
      ...prev,
      myRole: e.target.value,
    }));
  };
  function handleChangeChatting(e) {
    setChattingSelect((prev) => {
      return e.target.value;
    });
  }
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  useEffect(() => {
    OV = new OpenVidu();
    setChatList({
      type: 'public',
      from: '안내',
      message: '수업실에 입장하셨습니다.',
    });
    const mySession = OV.initSession();
    setState((prevState) => ({
      ...prevState,
      session: mySession,
    }));
    // mySession.on("connectionCreated", (event) => {
    //   let peoples = peopleList;
    //   peoples.push(event.connection);
    //   setPeopleList(peoples);
    // });
    mySession.on('streamCreated', (event) => {
      let subscriber = mySession.subscribe(event.stream, 'subscriber');
      let subscribers = state.subscribers;

      subscribers.push(subscriber);
      if (subscriber.stream.typeOfVideo === 'SCREEN') {
        setState((prevState) => ({
          ...prevState,
          subscribers: subscribers,
          mainStreamManager: subscriber,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          subscribers: subscribers,
        }));
      }
    });

    mySession.on('streamDestroyed', (event) => {
      deleteSubScriber(event.stream.streamManager);
    });
    getToken().then((token) => {
      mySession
        .connect(token, { clientData: state.myUserName })
        .then(async () => {
          let devices = await OV.getDevices();
          let videoDevices = devices.filter((device) => device.kind === 'videoinput');
          let publisher = OV.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: '640x480', // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          });

          // --- 6) Publish your stream ---

          mySession.publish(publisher);
          setState((prevState) => ({
            ...prevState,
            currentVideoDevice: videoDevices[0],
            // mainStreamManager: publisher,
            publisher: publisher,
          }));
        })
        .catch((error) => {
          console.log('세션에 연결할 수 없습니다.:', error.code, error.message);
        });
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });
  }, []);

  function nameButtonChangeChatting(value) {
    setChattingSelect(value);
  }

  return (
    <MeetingRoom id="test">
      {state.session === undefined ? (
        <div>
          테스트입니다
          <input
            id="userName"
            type="text"
            value={state.myUserName}
            onChange={handleChangeUserName}
          />
          <input
            type="text"
            id="sessionId"
            value={state.mySessionId}
            onChange={handleChangeSessionId}
          />
          <select onChange={handlerChange}>
            <option key={STUDENT} value={STUDENT} defaultChecked>
              학생
            </option>
            <option key={PROFESSOR} value={PROFESSOR}>
              교수
            </option>
          </select>
          <button onClick={joinSession}>입장하기</button>
        </div>
      ) : null}
      {state.session !== undefined ? (
        <>
          <div>
            {receivePresent && (
              <Modal
                onClickToggleModal={() => {
                  setReceivePresent(false);
                }}
              >
                <StudentAnonymouse
                  detail={`교수님께서 발표를 요청하셨습니다.`}
                  detail2="(확인 버튼을 누르면 카메라와 마이크가 자동으로 켜지게 됩니다.)"
                  anonymousOK={() => {
                    state.publisher.publishAudio(true);
                    setTurnOnAudio(true);
                    state.publisher.publishVideo(true);
                    setTurnOnCamera(true);
                    setReceivePresent(false);
                  }}
                  setOnClickToggleModal={() => {
                    setReceivePresent(false);
                  }}
                ></StudentAnonymouse>
              </Modal>
            )}
            {reqeustPresent && (
              <Modal
                onClickToggleModal={() => {
                  setReqeustPresent(false);
                }}
              >
                <StudentAnonymouse
                  detail={`${JSON.parse(saveSubscriber.data).clientData}발표를 요청하시겠습니까?`}
                  detail2=""
                  setOnClickToggleModal={() => {
                    setReqeustPresent(false);
                  }}
                  anonymousOK={sendReqeustPresent}
                />
              </Modal>
            )}
            {onClickToggleModal && (
              <Modal
                onClickToggleModal={() => {
                  setOnClickToggleModal(false);
                }}
              >
                <StudentAnonymouse
                  detail="교수님에게 익명 발표를 요청하시겠습니까?"
                  detail2="(익명 발표는 카메라와 오디오가 전부 꺼지게 되며 채팅을 치면 TTS가
        읽어주는 기능입니다.)"
                  anonymousOK={anonymousOK}
                  setOnClickToggleModal={turnOnModal}
                />
              </Modal>
            )}
            {openModal && (
              <Modal
                onClickToggleModal={() => {
                  setOpenModal(false);
                }}
              >
                <StudentAnonymouse
                  detail={`${anonymouseModeRequestUserName}님이 익명 모드로 발표를 요청했습니다. 수락하시겠습니까?`}
                  detail2=""
                  anonymousOK={anonymousOK}
                  setOnClickToggleModal={turnOnModal}
                />
              </Modal>
            )}
          </div>
          <div>
            <OpenviduBox id="OpenViduBox">
              {state.mainStreamManager !== undefined ? (
                <span>
                  <LayoutButton onClick={layoutButton}>
                    <MeetingButtonControl>
                      <DashboardIcon />
                      레이아웃
                    </MeetingButtonControl>
                  </LayoutButton>
                  {layout ? (
                    <div>
                      <NotFullScreenButton
                        onClick={fullScreenMode}
                        fullScreenLayoutMode={fullScreenLayoutMode}
                      >
                        <MeetingButtonControl>
                          <BorderAllIcon />
                          참여자 영상 함께 보기
                        </MeetingButtonControl>
                      </NotFullScreenButton>
                      <FullscreenButton
                        onClick={fullScreenMode}
                        fullScreenLayoutMode={fullScreenLayoutMode}
                      >
                        <MeetingButtonControl>
                          <FullscreenIcon />
                          전체보기
                        </MeetingButtonControl>
                      </FullscreenButton>
                    </div>
                  ) : null}
                </span>
              ) : null}
              <VideoBox id="VideoBox">
                {state.mainStreamManager !== undefined && fullScreenLayoutMode ? null : (
                  <SubStream mainStream={state.mainStreamManager !== undefined ? true : false}>
                    {state.publisher !== undefined ? (
                      <div onClick={() => handleMainVideoStream(state.publisher)}>
                        <UserVideoComponent streamManager={state.publisher} main="sub" />
                      </div>
                    ) : null}
                    {state.subscribers &&
                      !fullScreenLayoutMode &&
                      state.subscribers.map((sub, i) => (
                        <div
                          className="col-md-6"
                          key={i}
                          onClick={() => handleMainVideoStream(sub)}
                        >
                          <UserVideoComponent
                            streamManager={sub}
                            main="sub"
                            receiveReaction={
                              receiveReaction !== null &&
                              receiveReaction.connectionId === sub.stream.connection.data
                                ? receiveReaction
                                : null
                            }
                          />
                        </div>
                      ))}
                  </SubStream>
                )}

                <div>
                  {state.mainStreamManager !== undefined ? (
                    <div
                      onClick={() => {
                        setState((prev) => ({
                          ...prev,
                          mainStreamManager: undefined,
                        }));
                      }}
                    >
                      <UserVideoComponent
                        streamManager={state.mainStreamManager}
                        main="main"
                        fullScreenLayoutMode={fullScreenLayoutMode}
                      />
                      <ScreenText>
                        {JSON.parse(state.mainStreamManager.stream.connection.data).clientData}
                        님의 화면을 보고 있습니다.
                      </ScreenText>
                      {/* <button onClick={switchCamera}> 카메라 변경 </button> */}
                    </div>
                  ) : null}
                  <div>
                    {anonymousMode ? (
                      <ScreenText>
                        익명 모드가 활성화 되었습니다. 마이크와 오디오를 제어할 수 없습니다.
                      </ScreenText>
                    ) : null}
                  </div>
                </div>

                <MeetingButtonWrapper>
                  <MeetingButtons>
                    <MeetingButton
                      disabled={anonymousMode}
                      onClick={() => {
                        state.publisher.publishAudio(!turnOnAudio);
                        setTurnOnAudio(!turnOnAudio);
                      }}
                    >
                      {turnOnAudio ? (
                        <MeetingButtonControl>
                          <MicIcon />
                          마이크 종료하기
                        </MeetingButtonControl>
                      ) : (
                        <MeetingButtonControl>
                          <MicOffIcon />
                          마이크 켜기
                        </MeetingButtonControl>
                      )}
                    </MeetingButton>
                    <MeetingButton
                      onClick={() => {
                        state.publisher.publishVideo(!turnOnCamera);
                        setTurnOnCamera(!turnOnCamera);
                      }}
                      disabled={anonymousMode}
                    >
                      {turnOnCamera ? (
                        <MeetingButtonControl>
                          <VideocamIcon /> 카메라 종료하기
                        </MeetingButtonControl>
                      ) : (
                        <MeetingButtonControl>
                          <VideocamOffIcon /> 카메라 켜기
                        </MeetingButtonControl>
                      )}
                    </MeetingButton>
                    <MeetingButton onClick={screenShare}>
                      <MeetingButtonControl>
                        <ScreenShareIcon />
                        화면 공유 하기
                      </MeetingButtonControl>
                    </MeetingButton>
                    {/* <div>{state.mySessionId}</div> */}
                    <MeetingButton
                      onClick={requestAnonymous}
                      disabled={anonymousMode && state.myRole === STUDENT ? true : false}
                    >
                      {anonymousMode ? (
                        <MeetingButtonControl>
                          <FaceIcon />
                          익명 모드 비활성화
                        </MeetingButtonControl>
                      ) : (
                        <MeetingButtonControl>
                          <FaceRetouchingOffIcon />
                          익명 모드 활성화
                        </MeetingButtonControl>
                      )}
                    </MeetingButton>

                    <MeetingButton onClick={leaveSession}>
                      <MeetingButtonControl>
                        <MeetingRoomIcon />
                        세션 나가기
                      </MeetingButtonControl>
                    </MeetingButton>
                  </MeetingButtons>
                </MeetingButtonWrapper>
              </VideoBox>
              {allOff ? (
                <SmallPeopleBoxWrapper>
                  <SmallMeetingAttendAndChattingWrapper>
                    <SmallMeetingAttendAndChattingButton
                      onClick={() => {
                        setOpenAttentList((prev) => {
                          return !prev;
                        });
                      }}
                      isClick={openAttentList}
                    >
                      회원목록({peopleList.length})
                    </SmallMeetingAttendAndChattingButton>

                    <SmallMeetingAttendAndChattingButton
                      onClick={() => {
                        setOpenChattingList((prev) => {
                          return !prev;
                        });
                      }}
                      isClick={openChattingList}
                    >
                      채팅
                    </SmallMeetingAttendAndChattingButton>
                  </SmallMeetingAttendAndChattingWrapper>
                </SmallPeopleBoxWrapper>
              ) : (
                <PeopleBox>
                  <MeetingAttendAndChattingWrapper>
                    <MeetingAttendAndChattingButton
                      onClick={() => {
                        setOpenAttentList((prev) => {
                          return !prev;
                        });
                      }}
                      isClick={openAttentList}
                    >
                      회원목록({peopleList.length})
                    </MeetingAttendAndChattingButton>

                    <MeetingAttendAndChattingButton
                      onClick={() => {
                        setOpenChattingList((prev) => {
                          return !prev;
                        });
                      }}
                      isClick={openChattingList}
                    >
                      채팅
                    </MeetingAttendAndChattingButton>
                  </MeetingAttendAndChattingWrapper>
                  {openAttentList ? (
                    <AttendeesList
                      peopleList={peopleList}
                      setChattingInfo={setChattingInfo}
                      openChattingList={openChattingList}
                      notConnectionList={notConnectionList}
                      nameButtonChangeChatting={nameButtonChangeChatting}
                    />
                  ) : null}
                  {state.myRole === PROFESSOR ? (
                    <MeetingAttendAndChattingWrapper>
                      <AllMicAndCamOff onClick={allMicOff}>전체 마이크 끄기</AllMicAndCamOff>
                      <AllMicAndCamOff onClick={allCamOff}>전체 카메라 끄기</AllMicAndCamOff>
                    </MeetingAttendAndChattingWrapper>
                  ) : null}

                  {openChattingList ? (
                    <ChattingBox id="ChattingBox" openAttentList={openAttentList}>
                      <ChattinBoxgWrapper>
                        <ChattingName>
                          <ChatIcon />
                          채팅
                        </ChattingName>
                        {QnAState !== undefined && (
                          <QnAWrapper>
                            <QnABox>
                              <QnATitle>{`Q&A - ${QnAState.from}님`}</QnATitle>
                              {questionAnswer ? (
                                <QnAMessage>
                                  <div style={{ textAlign: 'center' }}>
                                    <QestionAnswerCommentInput
                                      ref={answerRef}
                                    ></QestionAnswerCommentInput>
                                  </div>
                                </QnAMessage>
                              ) : (
                                <QnAMessage>{QnAState.message}</QnAMessage>
                              )}

                              {state.myRole === PROFESSOR ? (
                                <QnAButtonWrapper>
                                  {questionAnswer ? (
                                    <QnAButton onClick={QnAComment}>답변(댓글이 달림)</QnAButton>
                                  ) : (
                                    <QnAButton onClick={handlerAnswer}>답변</QnAButton>
                                  )}
                                  <QnAButton
                                    onClick={() => {
                                      setQnAState(undefined);
                                      setQuestionAnswer(false);
                                    }}
                                  >
                                    닫기
                                  </QnAButton>
                                </QnAButtonWrapper>
                              ) : (
                                <QnAButtonWrapper>
                                  <QnAButton
                                    onClick={() => {
                                      setQnAState(undefined);
                                      setQuestionAnswer(false);
                                    }}
                                  >
                                    닫기
                                  </QnAButton>
                                </QnAButtonWrapper>
                              )}
                            </QnABox>
                          </QnAWrapper>
                        )}
                        <ChattingWrapper
                          chatList={chatList}
                          anonymousMode={anonymousMode}
                          QnAState={QnAState}
                        />
                      </ChattinBoxgWrapper>
                      <ChattingInputBox chattingSelect={chattingSelect}>
                        <ChattingAndQnAWrapper>
                          {sendToUser !== '' ? (
                            <span>{sendToUser}님에게 1대1 메시지 전송</span>
                          ) : (
                            <ChattingAndQnASelect
                              onChange={handleChangeChatting}
                              chattingSelect={chattingSelect}
                            >
                              <option key={CHATTING} value={CHATTING}>
                                #채팅
                              </option>
                              <option key={QnA} value={QnA}>
                                #QnA
                              </option>
                            </ChattingAndQnASelect>
                          )}
                        </ChattingAndQnAWrapper>
                        <ChattingInput
                          type="text"
                          id="message"
                          ref={messageRef}
                          onKeyPress={onKeyPress}
                          chattingSelect={chattingSelect}
                        />

                        {sendToUser !== '' ? (
                          <ChattingAndCancleButtonWrapper>
                            <ChattingSendButton
                              onClick={() => {
                                setSendToUser('');
                                setChattingSelect(CHATTING);
                              }}
                            >
                              취소
                            </ChattingSendButton>
                            <ChattingSendButton onClick={sendMessage}>전송</ChattingSendButton>
                          </ChattingAndCancleButtonWrapper>
                        ) : (
                          <ChattingSendButton onClick={sendMessage}>전송</ChattingSendButton>
                        )}

                        {/* <button onClick={testSpeech}>메시지 읽어주기</button> */}
                      </ChattingInputBox>
                    </ChattingBox>
                  ) : null}
                </PeopleBox>
              )}
            </OpenviduBox>
          </div>
        </>
      ) : null}
    </MeetingRoom>
  );

//   /*


//   서버사이드!!!!!


//   */
//   // 서버에서 해야 할꺼임!

//   function createSession(sessionId) {
//     return new Promise((resolve, reject) => {
//       let data = JSON.stringify({ customSessionId: sessionId });
//       axios
//         .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
//           headers: {
//             'Authorization': 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
//             'Content-Type': 'application/json',
//           },
//         })
//         .then((response) => {
//           console.log('CREATE SESION', response);
//           resolve(response.data.id);
//         })
//         .catch((response) => {
//           var error = Object.assign({}, response);
//           if (error?.response?.status === 409) {
//             resolve(sessionId);
//           } else {
//             console.log(error);
//             console.warn(
//               'No connection to OpenVidu Server. This may be a certificate error at ' +
//                 OPENVIDU_SERVER_URL
//             );
//             if (
//               window.confirm(
//                 'No connection to OpenVidu Server. This may be a certificate error at "' +
//                   OPENVIDU_SERVER_URL +
//                   '"\n\nClick OK to navigate and accept it. ' +
//                   'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
//                   OPENVIDU_SERVER_URL +
//                   '"'
//               )
//             ) {
//               window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
//             }
//           }
//         });
//     });
//   }

//   function createToken(sessionId) {
//     return new Promise((resolve, reject) => {
//       var data = {};
//       axios
//         .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection', data, {
//           headers: {
//             'Authorization': 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
//             'Content-Type': 'application/json',
//           },
//         })
//         .then((response) => {
//           console.log('TOKEN', response);
//           resolve(response.data.token);
//         })
//         .catch((error) => reject(error));
//     });
//   }
// };

// export default OpenViduTest;

// import React, { useEffect, useState, useRef } from 'react';
// import Chatting from './chatting';
// import styled from 'styled-components';
// import { ChatBox } from './OpenViduTestStyled';

// const ChattingWrapper = ({ chatList, anonymouseMode, QnAState }) => {
//   const [chatting, setChatting] = useState([]);
//   // console.log(chatList);
//   const chattingScroll = useRef(null);
//   useEffect(() => {
//     setChatting((prev) => {
//       return [...prev, chatList];
//     });
//   }, [chatList]);
//   useEffect(() => {
//     chattingScroll.current.scrollTop = chattingScroll.current.scrollHeight;
//     console.log(chattingScroll.current.scrollTop);
//   }, [chatting]);
//   console.log(chatting);
//   return (
//     <ChatBox ref={chattingScroll} QnAState={QnAState}>
//       {chatting.map((e, i) => (
//         <div key={i}>
//           <Chatting
//             type={e.type}
//             nickname={e.from}
//             data={e.message}
//             anonymouseMode={anonymouseMode}
//           />
//         </div>
//       ))}
//     </ChatBox>
//   );
// };

// export default ChattingWrapper;

// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import MicIcon from '@mui/icons-material/Mic';
// import MicOffIcon from '@mui/icons-material/MicOff';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import VideocamOffIcon from '@mui/icons-material/VideocamOff';
// import {
//   AttendsListConnection,
//   AttendsListConnectionDiv,
//   AttendsListNotConnection,
// } from './OpenViduTestStyled';
// import MessageIcon from '@mui/icons-material/Message';
// import { PRIVATE } from './OpenViduTest';

// interface peopleListInterface {
//   data: string;
//   connectionId: string;
//   creationTime: number;
//   dispose: boolean;
//   remoteOptions: any;
//   session: any;
//   stream: any;
// }
// type peopleProps = {
//   peopleList: [peopleListInterface];
//   setChattingInfo: ({ data, connectionId }: { data: string; connectionId: string }) => void;
//   openChattingList: boolean;
//   notConnectionList: any;
//   nameButtonChangeChatting: (value: string) => void;
//   // children: React.ReactNode;
// };
// interface styledProps {
//   openChattingList: boolean;
// }
// const AttendeesWrapper = styled.div<styledProps>`
//   overflow-y: scroll;
//   overflow-x: hidden;
//   &::-webkit-scrollbar {
//     padding-right: 15px;
//     width: 8px;
//     height: 8px;
//     border-radius: 6px;
//     background: rgba(255, 255, 255, 0.4);
//   }
//   &::-webkit-scrollbar-thumb {
//     background: rgba(0, 0, 0, 0.3);
//     border-radius: 6px;
//   }
//   width: 95%;
//   height: ${(props) => (props.openChattingList ? '35%' : '85%')};
//   border-radius: 5px;
// `;
// const AttendeesListDiv = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: #ffffff;
//   color: black;
// `;
// const AttendWrapper = styled.div`
//   height: 25px;
//   display: flex;
//   width: 100%;
//   align-items: center;
//   /* justify-content: space-between; */
// `;
// const NickNameWrapper = styled.div`
//   margin-left: 5px;
// `;
// const AudioAndVideoButton = styled.button`
//   background: none;
//   border: none;
// `;
// const NameButton = styled.button`
//   background: none;
//   border: none;
// `;
// const AudioAndVideoWrapper = styled.div`
//   margin-left: auto;
//   margin-right: 30px;
// `;
// const AttendeesList = ({
//   peopleList,
//   setChattingInfo,
//   openChattingList,
//   notConnectionList,
//   nameButtonChangeChatting,
// }: peopleProps) => {
//   console.log(peopleList);
//   const onClick = (event: any) => {
//     console.log(event.target);

//     setChattingInfo({
//       data: event.target.value,
//       connectionId: event.target.id,
//     });
//     nameButtonChangeChatting(PRIVATE);
//   };

//   return (
//     <AttendeesWrapper openChattingList={openChattingList}>
//       {peopleList !== undefined && peopleList.length > 0 ? (
//         <AttendeesListDiv>
//           <AttendsListConnection>접속자</AttendsListConnection>
//           {peopleList.map((e, i) => (
//             <AttendWrapper key={i}>
//               <NickNameWrapper>
//                 <NameButton
//                   id={e.connectionId}
//                   value={JSON.parse(e.data).clientData}
//                   onClick={onClick}
//                 >
//                   {JSON.parse(e.data).clientData}
//                 </NameButton>
//               </NickNameWrapper>
//               {e.stream !== undefined ? (
//                 <AudioAndVideoWrapper>
//                   <AudioAndVideoButton>
//                     <MessageIcon />
//                   </AudioAndVideoButton>
//                   <AudioAndVideoButton>
//                     {e.stream.videoActive ? <VideocamIcon></VideocamIcon> : <VideocamOffIcon />}
//                   </AudioAndVideoButton>
//                   <AudioAndVideoButton>
//                     {e.stream.audioActive ? <MicIcon /> : <MicOffIcon />}
//                   </AudioAndVideoButton>
//                 </AudioAndVideoWrapper>
//               ) : null}
//             </AttendWrapper>
//           ))}
//           <AttendsListNotConnection>미접속자</AttendsListNotConnection>
//           {/* <div>
//             {Object.keys(notConnectionList.userList).map(
//               (e: string, i: number) => (
//                 <AttendsListConnectionDiv key={i}>
//                   {notConnectionList.userList[Number(e)].userName}
//                 </AttendsListConnectionDiv>
//               )
//             )}
//           </div> */}
//           <div>
//             {Object.keys(notConnectionList).map((e: string, i: number) => (
//               <AttendsListConnectionDiv key={i}>{notConnectionList[e]}</AttendsListConnectionDiv>
//             ))}
//           </div>
//         </AttendeesListDiv>
//       ) : null}
//     </AttendeesWrapper>
//   );
// };

// export default AttendeesList;
