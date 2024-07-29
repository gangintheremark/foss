import {
  IMenteeCalendar,
  IMentorCalender,
  TMenteeCalendar,
  TMypageMenteeCalendar,
} from '@/types/calendar';

export const MenTeeRegisterData: Array<IMenteeCalendar<TMenteeCalendar>> = [
  {
    day: '2024-08-01',
    schedules: [
      {
        scheduleId: 1,
        time: '10:00',
        isConfirmed: true,
      },
      {
        scheduleId: 2,
        time: '12:00',
        isConfirmed: true,
      },
    ],
  },
  {
    day: '2024-08-02',
    schedules: [
      {
        scheduleId: 3,
        time: '12:00',
        isConfirmed: true,
      },
    ],
  },
];

export const MypageMentorData: Array<IMentorCalender> = [
  {
    day: '2024-08-01',
    schedules: [
      {
        time: '10:00',
        scheduleId: 1,
        applies: [
          {
            memberId: 201,
            name: '김형민',
            fileUrl: 'http://example.com/file3.pdf',
          },
          {
            memberId: 202,
            name: '김형민',
            fileUrl: 'http://example.com/file3.pdf',
          },
          {
            memberId: 203,
            name: '김형민',
            fileUrl: 'http://example.com/file3.pdf',
          },
        ],
      },
      {
        time: '16:00',
        scheduleId: 2,
        applies: [
          {
            memberId: 201,
            name: '김형민',
            fileUrl: 'http://example.com/file1.pdf',
          },
        ],
      },
    ],
  },
  {
    day: '2024-08-02',
    schedules: [
      {
        time: '14:00',
        scheduleId: 3,
        applies: [
          {
            memberId: 204,
            name: '김형민',
            fileUrl: 'http://example.com/file4.pdf',
          },
        ],
      },
    ],
  },
];

export const myPageMenTeeData: Array<IMenteeCalendar<TMypageMenteeCalendar>> = [
  {
    day: '2024-08-01',
    schedules: [
      {
        scheduleId: 1,
        time: '16:00',
        mentorName: '김형민',
        companyName: '삼성물산',
        department: 'UX/UI',
        years: 1,
        profileImg: 'http://profileImageLink1',
        isConfirmed: false,
      },
      {
        scheduleId: 2,
        time: '20:00',
        mentorName: '김형민',
        companyName: '삼성물산',
        department: 'UX/UI',
        years: 1,
        profileImg: 'http://profileImageLink1',
        isConfirmed: true,
      },
    ],
  },
  {
    day: '2024-08-02',
    schedules: [
      {
        scheduleId: 3,
        time: '12:00',
        mentorName: '김형민',
        companyName: '삼성물산',
        department: 'UX/UI',
        years: 1,
        profileImg: 'http://profileImageLink1',
        isConfirmed: false,
      },
    ],
  },
];
