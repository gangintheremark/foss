import { MenTeeRegisterData } from '@/constants/testData';
import { IMenteeCalendar, TMenteeCalendar } from '@/types/calendar';
import { maxDate, minDate } from '@constants/todayRange';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

dayjs.locale('ko');

interface ISmallCalendar {
  isMentor: boolean;
  result?: IMenteeCalendar<TMenteeCalendar> | undefined;
  setResult?: React.Dispatch<React.SetStateAction<IMenteeCalendar<TMenteeCalendar> | undefined>>;
  timeArray?: IMenteeCalendar<string>;
  changeTime?: React.Dispatch<React.SetStateAction<IMenteeCalendar<string>>>;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  isRegister: boolean;
}

const SmallCalendar = (props: ISmallCalendar) => {
  // 달력 날짜 설정(zustand로 데려올 것)
  // 값을 데려오는 것
  const dayList = MenTeeRegisterData;
  const [startDate, onChange] = useState<Value | null>(new Date());
  useEffect(() => {
    if (startDate instanceof Date) {
      const dateString = startDate.toISOString();
      if (props.setResult && props.isRegister) {
        props.setResult(dayList.find((e) => e.day === dayjs(dateString).format('YYYY-MM-DD')));
      } else if (props.changeTime && props.timeArray && !props.isRegister) {
        props.changeTime((prevResult) => ({
          ...prevResult,
          day: dayjs(dateString).format('YYYY-MM-DD'),
        }));
      }
    }
    props.setTime('');
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
