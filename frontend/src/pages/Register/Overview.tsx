import { Outlet } from 'react-router-dom';

const Overview = () => {
  return (
    <div className="w-screen h-screen relative box-border">
      <div className="w-full max-w-[1240px]  mx-auto my-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Overview;
