import { useState } from 'react';
import {
  FaUser,
  FaClipboardList,
  FaClipboardCheck,
  FaComments,
  FaStar,
  FaCalendar,
} from 'react-icons/fa';
import Button from './Button';
import SessionCreatePage from '../OpenVidu/Screen/SessionCreatePage';
import MenteeAttendButton from './MenteeAttendButton';

interface NavBarProps {
  profileSetting: string;
  calendar: string;
  applicationStatus: string;
  interviewStatus: string;
  mentorInterviewStatus: string;
  myFeedbackList: string;
  myReviewList: string;
  onUpdateCurNavBar: (buttonText: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({
  profileSetting,
  calendar,
  applicationStatus,
  interviewStatus,
  mentorInterviewStatus,
  myFeedbackList,
  myReviewList,
  onUpdateCurNavBar,
}) => {
  const [activeButton, setActiveButton] = useState(profileSetting); // 초기 활성화 버튼 설정

  const handleClick = (buttonText: string) => {
    setActiveButton(buttonText);
    onUpdateCurNavBar(buttonText);
  };

  return (
    <>
      <div className="flex flex-col">
        <div
          className={`border-b ${
            activeButton === profileSetting ? 'active' : ''
          } hover:text-[#4CCDC6] flex items-center`}
        >
          <FaUser className="mr-2" />
          <Button text={profileSetting} onClick={() => handleClick(profileSetting)} />
        </div>
        <div
          className={`border-b ${
            activeButton === calendar ? 'active' : ''
          } hover:text-[#4CCDC6] flex items-center`}
        >
          <FaCalendar className="mr-2" />
          <Button text={calendar} onClick={() => handleClick(calendar)} />
        </div>
        <div
          className={`border-b ${
            activeButton === applicationStatus ? 'active' : ''
          } hover:text-[#4CCDC6] flex items-center`}
        >
          <FaClipboardList className="mr-2" />
          <Button text={applicationStatus} onClick={() => handleClick(applicationStatus)} />
        </div>
        <div
          className={`border-b ${
            activeButton === interviewStatus ? 'active' : ''
          } hover:text-[#4CCDC6] flex items-center`}
        >
          <FaClipboardCheck className="mr-2" />
          <Button text={interviewStatus} onClick={() => handleClick(interviewStatus)} />
        </div>
        <div
          className={`border-b ${
            activeButton === mentorInterviewStatus ? 'active' : ''
          } hover:text-[#4CCDC6] flex items-center`}
        >
          <FaClipboardCheck className="mr-2" />
          <Button text={mentorInterviewStatus} onClick={() => handleClick(mentorInterviewStatus)} />
        </div>
        <div
          className={`border-b ${
            activeButton === myFeedbackList ? 'active' : ''
          } hover:text-[#4CCDC6] flex items-center`}
        >
          <FaComments className="mr-2" />
          <Button text={myFeedbackList} onClick={() => handleClick(myFeedbackList)} />
        </div>
        <div
          className={`border-b ${
            activeButton === myReviewList ? 'active' : ''
          } hover:text-[#4CCDC6] flex items-center`}
        >
          <FaStar className="mr-2" />
          <Button text={myReviewList} onClick={() => handleClick(myReviewList)} />
        </div>
        <div className="border-b mt-10">
          <SessionCreatePage />
        </div>
        <div className="border-b mt-10">
          <MenteeAttendButton />
        </div>
      </div>
      <style>{`
        .border-b {
          border-bottom: 1px solid #d3d3d3;
        }
        .hover:text-main-color:hover {
          color: #4CCDC6;
        }
        .active {
          color: #4CCDC6;
        }
      `}</style>
    </>
  );
};

export default NavBar;
