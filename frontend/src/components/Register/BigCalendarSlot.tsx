import { CalendarEvent } from '@/types/calendar';

const BigCalendarSlot = ({ event }: { event: CalendarEvent }) => {
  return (
    <div className="flex gap-1 items-center">
      <div className="w-2 h-2 bg-main-color rounded-full"></div>
      <div>{event.title}</div>
    </div>
  );
};

export default BigCalendarSlot;
