import { getCheckRole } from '@/apis/register';
import Loading from '@/components/common/Loading';
import { MySwal } from '@/config/config';
import { useScheduleStore } from '@/store/schedule';
import MentorRegisterForm from '@components/Register/MentorRegisterForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MentorRegister = () => {
  const [load, setLoad] = useState(false);
  const router = useNavigate();
  useEffect(() => {
    getCheckRole().then((data) => {
      if (!data || data.data === false) {
        MySwal.fire({
          icon: 'warning',
          text: '접근할 수 없습니다.',
          showConfirmButton: true,
        });
        router('/', { replace: true });
      }
    });
    setLoad(true);
  });
  return (
    <>
      {load ? (
        <MentorRegisterForm isMentor={true} />
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
};

export default MentorRegister;
