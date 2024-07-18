import dayjs from 'dayjs';
import { useState } from 'react';
import MentorTimeBtn from '@components/Register/MentorTimeBtn';
import { TdayList } from 'types/calendar';
import 'dayjs/locale/ko';
import { timeArray } from '@constants/todayRange';
import Intro from '@components/common/Intro';
import SmallCalendar from './SmallCalendar';

const MentorRegisterForm = ({ isMentor }: { isMentor: boolean }) => {
  // 이거 추후에 zustand로 바꿀 것
  const [result, setResult] = useState<TdayList>({
    day: dayjs(Date()).format('YYYY-MM-DD'),
    time: timeArray,
  });
  const [time, setTime] = useState('');

  return (
    <>
      <Intro title="일정 등록하기" sub="면접 날짜와 시간을 선택해주세요." />
      <div className="flex gap-28">
        <SmallCalendar
          result={result}
          setResult={setResult}
          setTime={setTime}
          isMentor={isMentor}
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
                <button className=" bg-main-color text-white rounded w-3/4 h-[50px] mx-auto mt-3">
                  등록하기
                </button>
              </>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default MentorRegisterForm;
