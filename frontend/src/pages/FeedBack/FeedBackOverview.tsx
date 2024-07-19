import FeedbackLayout from '@components/Feedback/FeedbackLayout';
import { Outlet } from 'react-router-dom';

const FeedBackOverview = () => {
  return (
    <div className="w-screen h-screen relative box-border font-notoKR">
      <FeedbackLayout>
        <Outlet />
      </FeedbackLayout>
    </div>
  );
};

export default FeedBackOverview;
