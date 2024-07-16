import dayjs from 'dayjs';
import { ReactNode, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import '../styles/smallCalendarStyle.css';
import TimeBtn from '@components/Register/TimeBtn';
import { TdayList } from 'types/calendar';
import 'dayjs/locale/ko';
import { maxDate, minDate } from '@constants/todayRange';

dayjs.locale('ko');

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const SmallCalendar = () => {
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
  const [result, setResult] = useState<TdayList>();
  useEffect(() => {
    if (startDate instanceof Date) {
      const dateString = startDate.toISOString();
      setResult(dayList.find((el) => el.day === dayjs(dateString).format('YYYY-MM-DD')));
    }
  }, [startDate]);

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    // 월(month) 뷰에서만 적용
    if (view === 'month') {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      // 이거는 멘티가 해당 멘토 날짜만 확인 할 때 할 수 있게끔 !isInDayList만 하면 된다.
      const isInDayList = dayList.some((item) => item.day === formattedDate);
      return dayjs(date).isBefore(dayjs(), 'day');
    }
    return false;
  };

  // 각 날짜 타일에 컨텐츠 추가
  const addContent = ({ date }: { date: Date }): ReactNode => {
    // 해당 날짜(하루)에 추가할 컨텐츠의 배열
    const contents: ReactNode[] = [];

    // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가
    if (dayList.find((el) => el.day === dayjs(date).format('YYYY-MM-DD'))) {
      contents.push(
        <div className="absolute top-0 left-0 w-full h-full bg-transparent">
          <div
            key={dayjs(date).format('YYYY-MM-DD')}
            className=" absolute top-[75%] left-[44%] bg-main-color w-2 h-2 rounded-full"
          ></div>
        </div>
      );
    }
    return (
      <>
        <div className="flex justify-center">{contents}</div>
      </>
    ); // 각 날짜마다 해당 요소가 들어감
  };
  return (
    <>
      <Calendar
        locale="ko"
        onChange={onChange}
        value={startDate}
        formatMonthYear={(locale, date) => dayjs(date).format('YYYY.MMM')}
        formatDay={(locale, date) => dayjs(date).format('D')}
        tileContent={addContent}
        tileDisabled={tileDisabled}
        minDate={minDate}
        maxDate={maxDate}
        next2Label={null}
        prev2Label={null}
      />
      <>
        <div>열리지롱</div>
        <div>
          <TimeBtn props={result} />
        </div>
      </>
    </>
  );
};

export default SmallCalendar;
