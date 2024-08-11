import { Outlet } from 'react-router-dom';
import '../../styles/smallCalendarStyle.css';
import Nav from '@/components/Header/NavComponent';

const RegisterOverview = () => {
  return (
    <>
      <div>
        <Nav />
      </div>
      <div className="w-screen h-screen relative box-border mt-32">
        <div className="w-full max-w-[1080px]  mx-auto my-0 relative">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RegisterOverview;
