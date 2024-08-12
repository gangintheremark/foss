import dayjs from 'dayjs';
import { startTransition, useCallback, useEffect, useState } from 'react';
import { Calendar, dayjsLocalizer, View, SlotInfo } from 'react-big-calendar';
import '../../styles/BigCalendarStyle.css';
import { CalendarEvent } from 'types/calendar';
import 'dayjs/locale/ko';
import { maxDate, minDate } from '@constants/todayRange';
import BigCalendarToolbar from './BigCalendarToolbar';
import { EventList } from './Eventlist';
import Intro from '@components/common/Intro';
import BigCalendarSlot from './BigCalendarSlot';
import apiClient from '@/utils/util';
import { TTotalCalendarList } from '@/types/events';
import Loading from '../common/Loading';

dayjs.locale('ko');

const localizer = dayjsLocalizer(dayjs);

const BigCalendar = () => {
  const min = minDate;
  const max = maxDate;
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(dayjs().toDate());
  const [events, setEvents] = useState([] as unknown as CalendarEvent[]);
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);
  // 이건 옮길 필요 없을 듯
  const [value, setValue] = useState(-1);
  const [mentorId, setMentorId] = useState(0);
  // 달력 이동 제한
  const onNavigate = useCallback(
    (newDate: Date) => {
      const dayjsDate = dayjs(newDate);
      if (
        (dayjsDate.isAfter(min) || dayjsDate.isSame(min)) &&
        (dayjsDate.isBefore(max) || dayjsDate.isSame(max))
      ) {
        setDate(newDate);
      }
    },
    [min, max]
  );
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await apiClient.get(`/schedules?month=${dayjs().format('M')}`);

        const data = response.data as Array<TTotalCalendarList>;
        if (data) {
          startTransition(() => {
            const dataArray: CalendarEvent[] = [];
            data.map((e) => {
              const day = e.day;
              e.schedules.map((e, i) => {
                const time = `${day} ${e.time}`;
                const title = `${e.mentorInfo.companyName} ${e.mentorInfo.name}`;
                const desc = `${e.mentorInfo.department}`;
                dataArray.push({
                  title: title,
                  allDay: true,
                  start: new Date(time),
                  end: new Date(time),
                  desc: desc,
                  mentorId: e.mentorInfo.mentorId,
                  applicantCount: e.applicantCount,
                  profileImg: e.mentorInfo.profileImg ? e.mentorInfo.profileImg : '',
                  scheduleId: e.scheduleId,
                });
              });
            });
            setEvents(dataArray);
            setTimeout(() => {
              setLoading(true);
            }, 1000);
          });
        }
      } catch (error) {
        console.error('Error fetching schedules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);
  const dayPropGetter = useCallback((date: Date) => {
    const isPastDate = dayjs(date).isBefore(dayjs(), 'day');
    if (isPastDate) {
      return {
        style: {
          backgroundColor: '#f0f0f0',
          color: '#aaa',
          cursor: 'not-allowed',
        },
      };
    }
    return {};
  }, []);
  // 처리하는 로직
  const handleSelectDate = useCallback(
    (selectedDate: Date) => {
      setSelectedEvents([]);
      if (
        dayjs(selectedDate).isSame(dayjs(), 'day') ||
        dayjs(selectedDate).isAfter(dayjs(), 'day')
      ) {
        const eventsOnSelectedDate = events.filter((event) =>
          dayjs(event.start).isSame(selectedDate, 'day')
        );
        setSelectedEvents(eventsOnSelectedDate);
      }
    },
    [events, setSelectedEvents]
  );

  const onSelectSlot = useCallback(
    (slotInfo: SlotInfo) => {
      handleSelectDate(slotInfo.start);
      setValue(-1);
    },
    [handleSelectDate]
  );
  const onSelectEvent = useCallback(
    (event: CalendarEvent) => {
      handleSelectDate(event.start);
      setValue(-1);
    },
    [handleSelectDate]
  );

  return (
    <>
      <Intro title="면접 신청하기" sub="나에게 필요한 멘토를 찾아 면접을 신청해보세요." />
      <div className="flex gap-10">
        <>
          {loading ? (
            <>
              <>
                <Calendar
                  localizer={localizer}
                  date={date}
                  onNavigate={onNavigate}
                  views={['month'] as View[]}
                  min={min}
                  max={max}
                  events={events}
                  dayPropGetter={dayPropGetter}
                  onSelectEvent={onSelectEvent}
                  onSelectSlot={onSelectSlot}
                  selectable={true}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 680, width: 800 }}
                  components={{
                    toolbar: BigCalendarToolbar,
                    event: BigCalendarSlot,
                  }}
                />
              </>
              <div className="w-[400px] min-w-[200px]">
                <EventList
                  events={Array.from(new Set(selectedEvents))}
                  value={value}
                  setValue={setValue}
                  mentorId={mentorId}
                  setMentorId={setMentorId}
                />
              </div>
            </>
          ) : (
            <Loading />
          )}
        </>
      </div>
    </>
  );
};

export default BigCalendar;
