import { Outlet } from 'react-router-dom';
import '../../styles/smallCalendarStyle.css';
import Nav from '@/components/Header/NavComponent';

const RegisterOverview = () => {
  return (
    <div className="w-screen h-screen relative box-border">
      <div className="h-24">
        <Nav />
      </div>
      <div className="w-full max-w-[1240px]  mx-auto my-0">
        <Outlet />
      </div>
    </div>
  );
};

export default RegisterOverview;
