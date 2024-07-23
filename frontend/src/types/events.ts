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
  date: string;
  mentors: Array<TCalendarMentorInfo>;
};

export const testTotalCalendarData: Array<TTotalCalendarList> = [
  {
    date: '2024-08-01',
    mentors: [
      {
        mentorId: 1,
        time: '16:00',
        mentorName: '김형민',
        companyName: '삼성물산',
        department: 'UX/UI',
        years: 1,
        profileImg: 'http://profileImageLink1',
        applyCount: 3,
      },
      {
        mentorId: 2,
        time: '20:00',
        mentorName: '구승석',
        companyName: 'LG전자',
        department: 'AI 엔지니어',
        years: 3,
        profileImg: 'http://profileImageLink1',
        applyCount: 5,
      },
    ],
  },
  {
    date: '2024-08-02',
    mentors: [
      {
        mentorId: 1,
        time: '16:00',
        mentorName: '김형민',
        companyName: '삼성물산',
        department: 'UX/UI',
        years: 1,
        profileImg: 'http://profileImageLink1',
        applyCount: 3,
      },
    ],
  },
];
