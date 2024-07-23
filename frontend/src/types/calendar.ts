export interface CalendarEvent {
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
  desc: string;
  applyCount: number;
  resourceId?: string;
  tooltip?: string;
  mentorId: number;
  calenderType?: number;
  profileImg?: string;
}

export type TdayList = {
  day: string;
  time: string[];
};
