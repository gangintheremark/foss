import { getCheckRole } from '@/apis/register';
import { MySwal } from '@/config/config';
import MentorRegisterForm from '@components/Register/MentorRegisterForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MentorRegister = () => {
  const router = useNavigate();
  useEffect(() => {
    getCheckRole().then((data) => {
      if (!data || data.data === false) {
        MySwal.fire('접근할 수 없는 페이지입니다');
        router('/', { replace: true });
      }
    });
  });
  return (
    <>
      <MentorRegisterForm isMentor={true} />
    </>
  );
};

export default MentorRegister;
