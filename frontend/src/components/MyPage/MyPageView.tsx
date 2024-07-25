import { useState, useEffect } from 'react';
import axios from 'axios';
import { tmpUserData } from '@constants/tmpUserData';

import Header from '@components/MyPage/Header';
import NavComponent from '@components/Header/NavComponent';
import Profile from '@components/MyPage/Profile';
import NavBar from '@components/MyPage/NavBar';
import ProfileSetting from '@components/MyPage/ProfileSetting';
import ApplicationStatus from '@components/MyPage/ApplicationStatus';
import MyFeedbackList from '@components/MyPage/MyFeedbackList';
import MyReviewList from '@components/MyPage/MyReviewList';
import Nav from '@components/Header/NavComponent';
import useNotificationStore from '@/store/notificationParticipant';
import SessionCreatePage from '../OpenVidu/Screen/SessionCreatePage';

const navBarData = {
  profileSetting: '회원 정보 수정',
  applicationStatus: '신청 현황',
  myFeedbackList: '피드백 목록',
  myReviewList: '작성한 리뷰 목록',
};
const APPLICATION_SERVER_URL = 'http://localhost:8080';

const MyPageView = () => {
  // 유저 정보를 담은 useState
  const { notifications, checkNotification } = useNotificationStore();
  const [memberId, setMemberId] = useState<number | null>(null);
  const [userData, setUserData] = useState(tmpUserData);
  const [curNavBar, setCurNavBar] = useState(navBarData.profileSetting);

  const [sessionId, setSessionId] = useState<string | null>(null);
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        // 로그인된 사용자의 memberId를 가져옵니다.
        const memberResponse = await axios.get(`${APPLICATION_SERVER_URL}/members`);
        const memberIdFromResponse = memberResponse.data.id; // number 타입으로 가져옵니다.
        setMemberId(memberIdFromResponse);

        // 해당 memberId를 사용하여 세션 ID를 조회합니다.
        const sessionResponse = await axios.get(
          `${APPLICATION_SERVER_URL}/meeting-notifications/sessions/member/${memberIdFromResponse}`
        );
        const sessionIdFromResponse = sessionResponse.data.sessionId;
        setSessionId(sessionIdFromResponse);

        // 세션 ID를 기반으로 알림 상태를 확인합니다.
        if (sessionIdFromResponse && memberIdFromResponse) {
          await checkNotification(sessionIdFromResponse, memberIdFromResponse.toString());
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchMemberData();
  }, [checkNotification]);

  const onUpdateUserData = (updatedData) => {
    setUserData((prevUserData) => ({ ...prevUserData, ...updatedData }));
  };

  // 선택한 네비게이션 바의 변경을 담당하는 함수
  const onUpdateCurNavBar = (text) => {
    setCurNavBar(text);
  };

  return (
    <>
      <div>
        <Nav />
      </div>
      <div className="absoulute w-[1440px] top-[90px] left-0 overflow-hidden relative">
        <div className="flex justify-center">
          <div className="w-96 ml-16 border">
            <div className="p-8">
              <Profile {...userData} />
            </div>

            <div className="p-8">
              <NavBar {...navBarData} onUpdateCurNavBar={onUpdateCurNavBar} />
            </div>
          </div>

          <div className="w-full p-16 mr-16 border">
            <div>
              {curNavBar === navBarData.profileSetting ? (
                <ProfileSetting
                  title={curNavBar}
                  {...userData}
                  onUpdateUserData={onUpdateUserData}
                />
              ) : null}
            </div>

            <div>
              {curNavBar === navBarData.applicationStatus ? (
                <ApplicationStatus title={curNavBar} />
              ) : null}
            </div>

            <div>
              {curNavBar === navBarData.myFeedbackList ? (
                <MyFeedbackList title={curNavBar} />
              ) : null}
            </div>

            <div>
              {curNavBar === navBarData.myReviewList ? <MyReviewList title={curNavBar} /> : null}

              <SessionCreatePage />
              <button
                className={`btn ${
                  notifications[`${sessionId}_${memberId}`] ? 'btn-active' : 'btn-inactive'
                }`}
              ></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPageView;
