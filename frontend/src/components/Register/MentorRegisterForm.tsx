import dayjs from 'dayjs';
import { useState } from 'react';
import MentorTimeBtn from '@components/Register/MentorTimeBtn';
import { IMenteeCalendar } from 'types/calendar';
import 'dayjs/locale/ko';
import { timeArray } from '@constants/todayRange';
import Intro from '@components/common/Intro';
import SmallCalendar from './SmallCalendar';
import RegisterBtn from '@components/common/RegisterBtn';
import { postMentorSchedules } from '@/apis/register';
import { MySwal } from '@/config/config';
import { useNavigate } from 'react-router-dom';
import Loading from '../common/Loading';

const MentorRegisterForm = ({ isMentor }: { isMentor: boolean }) => {
  // 이거 추후에 zustand로 바꿀 것
  const [result, setResult] = useState<IMenteeCalendar<string>>({
    day: dayjs(Date()).format('YYYY-MM-DD'),
    schedules: timeArray,
  });
  const [time, setTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useNavigate();
  const onRegister = async () => {
    setIsLoading(true);
    const data = await postMentorSchedules(`${result.day} ${time}`);
    setIsLoading(false);
    if (!data) {
      MySwal.fire({
        icon: 'error',
        title: '해당 날짜에 이미 일정이 존재합니다',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      MySwal.fire({
        icon: 'success',
        title: '등록이 완료되었습니다',
        showConfirmButton: false,
        timer: 1500,
      });
      router('/');
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Intro title="일정 등록하기" sub="면접 날짜와 시간을 선택해주세요." />
          <div className="flex gap-28">
            <SmallCalendar
              timeArray={result}
              changeTime={setResult}
              setTime={setTime}
              isMentor={isMentor}
              isRegister={false}
            />
            <>
              <div className="flex flex-col gap-6 w-[480px] h-[438px] px-10">
                <div>{dayjs(result.day).format('YYYY년 MM월 DD일')}</div>
                {isMentor && result.day === dayjs(Date()).format('YYYY-MM-DD') ? (
                  <>
                    <div>날짜를 선택해주세요</div>
                  </>
                ) : (
                  <>
                    <div>
                      <MentorTimeBtn props={result} setStateValue={setTime} value={time} />
                    </div>
                    <RegisterBtn
                      width="w-3/4"
                      height="h-[50px]"
                      fontSize="text-lg"
                      onClick={
                        time !== ''
                          ? onRegister
                          : () => {
                              MySwal.fire('시간을 선택해주세요');
                            }
                      }
                    />
                  </>
                )}
              </div>
            </>
          </div>
        </>
      )}
    </>
  );
};

export default MentorRegisterForm;
