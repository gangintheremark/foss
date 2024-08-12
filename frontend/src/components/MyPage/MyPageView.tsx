import { useState } from 'react';

// import { tmpUserData } from '@constants/tmpUserData';

// import Header from '@components/MyPage/Header';
// import NavComponent from '@components/Header/NavComponent';
// import Profile from '@components/MyPage/Profile';
import NavBar from '@components/MyPage/NavBar';
import ProfileSetting from '@components/MyPage/ProfileSetting';
import ApplicationStatus from '@components/MyPage/ApplicationStatus';
import InterviewStatus from '@components/MyPage/InterviewStatus';
import MentorInterviewStatus from '@components/MyPage/MentorInterviewStatus';
import MyFeedbackList from '@components/MyPage/MyFeedbackList';
import MyReviewList from '@components/MyPage/MyReviewList';
import Calendar from '@components/MyPage/Calendar';
import Nav from '@components/Header/NavComponent';
import ReviewModal from '../Review/ReviewModal';
import useFeedBackStore from '@/store/feedback';

const navBarData = {
  profileSetting: '프로필',
  calendar: '캘린더',
  applicationStatus: '신청 목록',
  interviewStatus: '모의면접 일정',
  mentorInterviewStatus: '[멘토]모의면접 일정',
  myFeedbackList: '피드백 목록',
  myReviewList: '리뷰 목록',
};

const MyPageView = () => {
  const { open } = useFeedBackStore((state) => state.states);
  // 유저 정보를 담은 useState

  // const [userData, setUserData] = useState(tmpUserData);
  const [curNavBar, setCurNavBar] = useState(navBarData.profileSetting);

  // const onUpdateUserData = (updatedData) => {
  //   setUserData((prevUserData) => ({ ...prevUserData, ...updatedData }));
  // };

  // 선택한 네비게이션 바의 변경을 담당하는 함수
  const onUpdateCurNavBar = (text: string) => {
    setCurNavBar(text);
  };

  return (
    <>
      <div>
        <Nav />
      </div>
      <div className="absolute w-[1440px] top-[90px] left-0 overflow-hidden relative">
        <div className="flex justify-center">
          <div className="w-96 ml-36">
            <div className="p-8">
              <NavBar {...navBarData} onUpdateCurNavBar={onUpdateCurNavBar} />
            </div>
          </div>

          <div className="w-full p-3 mr-20">
            <div>
              {curNavBar === navBarData.profileSetting ? (
                <ProfileSetting
                // title={curNavBar}
                // {...userData}
                // onUpdateUserData={onUpdateUserData}
                />
              ) : null}
            </div>

            <div>{curNavBar === navBarData.calendar ? <Calendar /> : null}</div>

            <div>
              {curNavBar === navBarData.applicationStatus ? (
                <ApplicationStatus title={curNavBar} />
              ) : null}
            </div>

            <div>
              {curNavBar === navBarData.interviewStatus ? (
                <InterviewStatus title={curNavBar} />
              ) : null}
            </div>

            <div>
              {curNavBar === navBarData.mentorInterviewStatus ? (
                <MentorInterviewStatus title={curNavBar} />
              ) : null}
            </div>

            <div>
              {curNavBar === navBarData.myFeedbackList ? (
                <MyFeedbackList title={curNavBar} />
              ) : null}
            </div>

            <div>
              {curNavBar === navBarData.myReviewList ? <MyReviewList title={curNavBar} /> : null}
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div className="absolute w-screen h-screen top-0 left-0 bg-[rgba(221,221,221,0.4)] z-10">
          <ReviewModal />
        </div>
      )}
    </>
  );
};

export default MyPageView;
