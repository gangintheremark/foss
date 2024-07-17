import { Outlet } from 'react-router-dom';

const Overview = () => {
  return (
    <div className="w-screen h-screen relative box-border">
      <Outlet />
    </div>
  );
};

export default Overview;
