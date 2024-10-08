import { useScheduleStore } from '@/store/schedule';
import { IMenteeCalendar, IMentorCalender, TMypageMenteeCalendar } from '@/types/calendar';
import { maxDate, minDate } from '@constants/todayRange';
import dayjs from 'dayjs';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import Loading from '../common/Loading'; // 로딩 상태를 표시할 컴포넌트

// React.lazy를 사용하여 Calendar 컴포넌트 지연 로딩
const Calendar = lazy(() => import('react-calendar'));

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

dayjs.locale('ko');

interface ISmallCalendar {
  isMentor: boolean;
  result?: IMentorCalender | undefined;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  menteeResult?: IMenteeCalendar<TMypageMenteeCalendar> | undefined;
  data: Array<IMentorCalender>;
}

const SmallCalendar = React.memo((props: ISmallCalendar) => {
  const { setData } = useScheduleStore((state) => state.actions);
  // 달력 날짜 설정(zustand로 데려올 것)
  let dayList = props.data;
  const [startDate, onChange] = useState<Value | null>(new Date());
  useEffect(() => {
    if (startDate instanceof Date) {
      const dateString = startDate.toISOString();
      if (props.isMentor) {
        setData(dateString, 'Mentor');
      }
      props.setTime('');
    }
  }, [startDate]);

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    // 월(month) 뷰에서만 적용
    if (view === 'month' && dayList) {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      // 이거는 멘티가 해당 멘토 날짜만 확인 할 때 할 수 있게끔 !isInDayList만 하면 된다.
      const isInDayList = dayList.some((item) => item.day === formattedDate);
      const beforeCheck = dayjs(date).isBefore(dayjs(), 'day');
      return !isInDayList || beforeCheck;
    }
    return true;
  };

  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
});

export default SmallCalendar;
