import Button from './Button';
import SessionCreatePage from '../OpenVidu/Screen/SessionCreatePage';

const NavBar = ({
  profileSetting,
  applicationStatus,
  myFeedbackList,
  myReviewList,
  onUpdateCurNavBar,
}) => {
  return (
    <>
      <div className="flex flex-col border">
        <div className="border hover:bg-blue-600">
          <Button text={profileSetting} onClick={() => onUpdateCurNavBar(profileSetting)} />
        </div>
        <div className="border hover:bg-blue-600">
          <Button text={applicationStatus} onClick={() => onUpdateCurNavBar(applicationStatus)} />
        </div>
        <div className="border hover:bg-blue-600">
          <Button text={myFeedbackList} onClick={() => onUpdateCurNavBar(myFeedbackList)} />
        </div>
        <div className="border hover:bg-blue-600">
          <Button text={myReviewList} onClick={() => onUpdateCurNavBar(myReviewList)} />
        </div>
        <div className="border hover:bg-blue-600">
          <SessionCreatePage />
        </div>
      </div>
    </>
  );
};

export default NavBar;
