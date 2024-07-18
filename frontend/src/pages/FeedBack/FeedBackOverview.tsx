import { Outlet } from 'react-router-dom';

const FeedBackOverview = () => {
  return (
    <div className="w-screen h-screen relative box-border font-notoKR">
      <div className="w-full min-w-[1280px] relative min-h-[1024px] h-full mx-auto my-0">
        <Outlet />
      </div>
    </div>
  );
};

export default FeedBackOverview;
