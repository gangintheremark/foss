import { useState } from 'react';
import { FaUser, FaClipboardList, FaComments, FaStar } from 'react-icons/fa';
import Button from './Button';
import SessionCreatePage from '../OpenVidu/Screen/SessionCreatePage';

const NavBar = ({
  profileSetting,
  applicationStatus,
  myFeedbackList,
  myReviewList,
  onUpdateCurNavBar,
}) => {
  const [activeButton, setActiveButton] = useState(profileSetting); // 초기 활성화 버튼 설정

  const handleClick = (buttonText) => {
    setActiveButton(buttonText);
    onUpdateCurNavBar(buttonText);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className={`border-b ${activeButton === profileSetting ? 'active' : ''} hover:text-[#4CCDC6] flex items-center`}>
          <FaUser className="mr-2" />
          <Button text={profileSetting} onClick={() => handleClick(profileSetting)} />
        </div>
        <div className={`border-b ${activeButton === applicationStatus ? 'active' : ''} hover:text-[#4CCDC6] flex items-center`}>
          <FaClipboardList className="mr-2" />
          <Button text={applicationStatus} onClick={() => handleClick(applicationStatus)} />
        </div>
        <div className={`border-b ${activeButton === myFeedbackList ? 'active' : ''} hover:text-[#4CCDC6] flex items-center`}>
          <FaComments className="mr-2" />
          <Button text={myFeedbackList} onClick={() => handleClick(myFeedbackList)} />
        </div>
        <div className={`border-b ${activeButton === myReviewList ? 'active' : ''} hover:text-[#4CCDC6] flex items-center`}>
          <FaStar className="mr-2" />
          <Button text={myReviewList} onClick={() => handleClick(myReviewList)} />
        </div>
        <div className="border-b mt-10">
          <SessionCreatePage />
        </div>
      </div>
      <style jsx>{`
        .border-b {
          border-bottom: 1px solid #d3d3d3;
        }
        .hover\:text-\[\#4CCDC6\]:hover {
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
