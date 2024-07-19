import { maxDate, minDate } from '@constants/todayRange';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { TdayList } from 'types/calendar';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

dayjs.locale('ko');

interface ISmallCalendar {
  isMentor: boolean;
  result: TdayList;
  setResult: React.Dispatch<React.SetStateAction<TdayList>>;
  setTime: React.Dispatch<React.SetStateAction<string>>;
}

const SmallCalendar = (props: ISmallCalendar) => {
  // 달력 날짜 설정(zustand로 데려올 것)
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
  const [startDate, onChange] = useState<Value | null>(new Date());
  useEffect(() => {
    if (startDate instanceof Date) {
      const dateString = startDate.toISOString();
      if (!props.isMentor) {
        const list = dayList.find((el) => el.day === dayjs(dateString).format('YYYY-MM-DD'));
        if (list) {
          props.setResult(list);
        }
      } else {
        props.setResult((prevResult) => ({
          ...prevResult,
          day: dayjs(dateString).format('YYYY-MM-DD'),
        }));
      }
      props.setTime('');
    }
  }, [startDate]);

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    // 월(month) 뷰에서만 적용
    if (view === 'month') {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      // 이거는 멘티가 해당 멘토 날짜만 확인 할 때 할 수 있게끔 !isInDayList만 하면 된다.
      const isInDayList = dayList.some((item) => item.day === formattedDate);
      const beforeCheck = dayjs(date).isBefore(dayjs(), 'day');
      if (props.isMentor) {
        return beforeCheck || dayjs(date).isSame(dayjs(), 'day');
      } else {
        return !isInDayList || beforeCheck;
      }
    }
    return false;
  };

  return (
    <>
      {' '}
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
    </>
  );
};

export default SmallCalendar;
