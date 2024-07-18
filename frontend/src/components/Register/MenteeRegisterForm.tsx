import Intro from '@components/common/Intro';
import { timeArray } from '@constants/todayRange';
import dayjs from 'dayjs';
import { useState } from 'react';
import { TdayList } from 'types/calendar';
import SmallCalendar from './SmallCalendar';
import Timebtn from '@components/common/Timebtn';

const MenteeRegisterForm = ({ isMentor }: { isMentor: boolean }) => {
  // 이거 추후에 zustand로 바꿀 것
  const [result, setResult] = useState<TdayList>({
    day: dayjs(Date()).format('YYYY-MM-DD'),
    time: timeArray,
  });
  const [time, setTime] = useState('');
  return (
    <>
      <Intro title="면접 신청하기" sub="나에게 필요한 멘토를 찾아 미팅을 신청해보세요." />
      <div className="flex gap-28">
        <div>여기에 소개 채울 예정</div>
        <div className="flex flex-col ">
          <SmallCalendar
            result={result}
            setResult={setResult}
            setTime={setTime}
            isMentor={isMentor}
          />
          <div>그리고 여기에 파일 업로드 될 예정</div>
        </div>
        <div>
          {result.time.map((el) => {
            return (
              <div className="mb-4">
                <Timebtn
                  fontSize="xl"
                  width="w-32"
                  height="h-11"
                  text={el}
                  value={time}
                  onClick={() => setTime(el)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MenteeRegisterForm;
