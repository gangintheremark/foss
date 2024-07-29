import { CalendarEvent } from './calendar';
import { TCalendarMentorInfo } from './type';

export const eventDatas: Array<CalendarEvent> = [
  {
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date('2024-07-21 10:00'),
    end: new Date('2024-07-21 12:00'),
    desc: '아아아아아아아ㅡㅇ아아아아',
    mentorId: 1,
    applyCount: 8,
  },
];

type TTotalCalendarList = {
  day: string;
  schedules: Array<TCalendarMentorInfo>;
};

export const testTotalCalendarData: Array<TTotalCalendarList> = [
  {
    day: '2024-08-01',
    schedules: [
      {
        time: '16:00',
        applyCount: 3,
        mentorInfo: {
          mentorId: 1,
          name: '김형민',
          companyName: '삼성물산',
          department: 'UX/UI',
          profileImg: 'http://profileImageLink1',
        },
      },
      {
        time: '20:00',
        applyCount: 5,
        mentorInfo: {
          mentorId: 2,
          name: '구승석',
          companyName: 'LG전자',
          department: 'AI 엔지니어',
          profileImg: 'http://profileImageLink1',
        },
      },
    ],
  },
  {
    day: '2024-08-02',
    schedules: [
      {
        time: '16:00',
        applyCount: 10,
        mentorInfo: {
          mentorId: 1,
          name: '김형민',
          companyName: '삼성물산',
          department: 'UX/UI',
          profileImg: 'http://profileImageLink1',
        },
      },
    ],
  },
];
