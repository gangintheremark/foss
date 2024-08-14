import { useState, useEffect, lazy, Suspense } from 'react';
import Button from './Button';
import SessionCreatePage from '../OpenVidu/Screen/SessionCreatePage';
import MenteeAttendButton from './MenteeAttendButton';
import useUserStore from '@/store/useUserStore';
import Loading from '../common/Loading';
import StarIcon from '../common/Star';

const FaUser = lazy(() => import('react-icons/fa').then((module) => ({ default: module.FaUser })));
const FaClipboardList = lazy(() =>
  import('react-icons/fa').then((module) => ({ default: module.FaClipboardList }))
);
const FaClipboardCheck = lazy(() =>
  import('react-icons/fa').then((module) => ({ default: module.FaClipboardCheck }))
);
const FaComments = lazy(() =>
  import('react-icons/fa').then((module) => ({ default: module.FaComments }))
);
const FaCalendar = lazy(() =>
  import('react-icons/fa').then((module) => ({ default: module.FaCalendar }))
);

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
  const [activeButton, setActiveButton] = useState(profileSetting);
  const role = useUserStore((state) => state.role);

  useEffect(() => {
    const savedActiveButton = localStorage.getItem('activeButton');
    if (savedActiveButton) {
      setActiveButton(savedActiveButton);
      onUpdateCurNavBar(savedActiveButton);
    }
  }, []);

  const handleClick = (buttonText: string) => {
    setActiveButton(buttonText);
    onUpdateCurNavBar(buttonText);
    localStorage.setItem('activeButton', buttonText);
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col">
          <div
            className={`border-b ${
              activeButton === profileSetting ? 'active' : ''
            } hover:text-[#4CCDC6] flex items-center`}
          >
            <FaUser className="mr-2" />
            <Button text={profileSetting} onClick={() => handleClick(profileSetting)} />
          </div>

          {role === 'MENTOR' && (
            <>
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
                  activeButton === mentorInterviewStatus ? 'active' : ''
                } hover:text-[#4CCDC6] flex items-center`}
              >
                <FaClipboardCheck className="mr-2" />
                <Button
                  text={mentorInterviewStatus}
                  onClick={() => handleClick(mentorInterviewStatus)}
                />
              </div>
              <div
                className={`border-b ${
                  activeButton === myReviewList ? 'active' : ''
                } hover:text-[#4CCDC6] flex items-center`}
              >
                <StarIcon
                  color={activeButton === myReviewList ? '#20ACA7' : '#000000'}
                  strokeColor={activeButton === myReviewList ? '#20ACA7' : '#000000'}
                  className="mr-2 hover:stroke-[#4CCDC6] hover:fill-[#4CCDC6]"
                />
                <Button text={myReviewList} onClick={() => handleClick(myReviewList)} />
              </div>
            </>
          )}

          {role === 'MENTEE' && (
            <>
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
                  activeButton === myFeedbackList ? 'active' : ''
                } hover:text-[#4CCDC6] flex items-center`}
              >
                <FaComments className="mr-2" />
                <Button text={myFeedbackList} onClick={() => handleClick(myFeedbackList)} />
              </div>
            </>
          )}

          {role === 'MENTOR' && (
            <div className="border-b mt-10">
              <SessionCreatePage />
            </div>
          )}
          {role === 'MENTEE' && (
            <div className="border-b mt-10">
              <MenteeAttendButton />
            </div>
          )}
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
      </Suspense>
    </>
  );
};

export default NavBar;
