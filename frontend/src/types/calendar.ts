export interface CalendarEvent {
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
  desc: string;
  limit: number;
  resourceId?: string;
  tooltip?: string;
  userId?: string;
  calenderType?: number;
  picture?: string;
}

export type TdayList = {
  day: string;
  time: string[];
};
