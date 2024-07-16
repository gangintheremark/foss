import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from 'types/calendar';
import events from 'types/events';

const localizer = dayjsLocalizer(dayjs);

const BigCalendar = () => {
  const [loading, setLoading] = useState(false);
  // 테스트 용
  const [testevents, setEvents] = useState([
    {
      id: '',
      start: '',
      end: '',
      title: '',
      calenderType: 0,
    },
  ] as unknown as CalendarEvent[]);
  useEffect(() => {
    setEvents(events);
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, []);
  return (
    <div>
      {loading ? (
        <Calendar
          localizer={localizer}
          events={testevents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      ) : (
        <div>loading중</div>
      )}
    </div>
  );
};

export default BigCalendar;
