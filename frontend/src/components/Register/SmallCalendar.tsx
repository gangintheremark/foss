import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import '../../styles/smallCalendarStyle.css';
import TimeBtn from '@components/Register/TimeBtn';
import { TdayList } from 'types/calendar';
import 'dayjs/locale/ko';
import { maxDate, minDate, timeArray } from '@constants/todayRange';

dayjs.locale('ko');

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const SmallCalendar = ({ isMentor }: { isMentor: boolean }) => {
  // 달력 날짜 설정
  const dayList = [
    {
      day: '2024-07-17',
      time: ['15:00', '17:00', '22:00'],
    },
    {
      day: '2024-07-18',
      time: ['15:00', '17:00', '22:00'],
    },
    {
      day: '2024-07-20',
      time: ['15:00', '17:00', '21:00'],
    },
    {
      day: '2024-07-23',
      time: ['15:00', '17:00', '22:00'],
    },
    {
      day: '2024-07-25',
      time: ['15:00', '17:00', '23:00'],
    },
  ];
  // 이거 추후에 바꿀 것
  const [startDate, onChange] = useState<Value | null>(new Date());
  const [result, setResult] = useState<TdayList>({
    day: dayjs(Date()).format('YYYY-MM-DD'),
    time: timeArray,
  });
  const [time, setTime] = useState('');
  useEffect(() => {
    if (startDate instanceof Date) {
      const dateString = startDate.toISOString();
      if (!isMentor) {
        const list = dayList.find((el) => el.day === dayjs(dateString).format('YYYY-MM-DD'));
        if (list) {
          setResult(list);
        }
      } else {
        setResult((prevResult) => ({
          ...prevResult,
          day: dayjs(dateString).format('YYYY-MM-DD'),
        }));
      }
      setTime('');
    }
  }, [startDate]);

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    // 월(month) 뷰에서만 적용
    if (view === 'month') {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      // 이거는 멘티가 해당 멘토 날짜만 확인 할 때 할 수 있게끔 !isInDayList만 하면 된다.
      const isInDayList = dayList.some((item) => item.day === formattedDate);
      const beforeCheck = dayjs(date).isBefore(dayjs(), 'day');
      if (isMentor) {
        return beforeCheck || dayjs(date).isSame(dayjs(), 'day');
      } else {
        return !isInDayList || beforeCheck;
      }
    }
    return false;
  };

  return (
    <>
      <div className="flex gap-28 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Calendar
          locale="ko"
          onChange={onChange}
          value={startDate}
          formatMonthYear={(locale, date) => dayjs(date).format('YYYY.MMM')}
          formatDay={(locale, date) => dayjs(date).format('D')}
          tileDisabled={tileDisabled}
          minDate={minDate}
          maxDate={maxDate}
          next2Label={null}
          prev2Label={null}
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
                  <TimeBtn props={result} setStateValue={setTime} value={time} />
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

export default SmallCalendar;
