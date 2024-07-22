import FeedbackCard from '@components/Feedback/FeedbackCard';
import FeedBackDetail from '@components/Feedback/FeedBackDetail';
import FeedbackLayout from '@components/Feedback/FeedbackLayout';
import FeedBackView from '@components/Feedback/FeedBackView';

const MyFeedbackList = ({ title }) => {
  return (
    <>
      <div>{title}</div>
      <div>
        <FeedBackDetail />
        {/* <FeedbackCard /> */}
        {/* <FeedbackLayout /> */}
        {/* <FeedBackView /> */}
      </div>
    </>
  );
};

export default MyFeedbackList;
