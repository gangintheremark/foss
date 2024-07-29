import {
  IMenteeCalendar,
  IMentorCalender,
  TMenteeCalendar,
  TMypageMenteeCalendar,
} from '@/types/calendar';

export const MenTeeRegisterData: TMenteeCalendar = {
  mentorInfo: {
    name: '남경민',
    companyName: '네이버',
    department: '백엔드 엔지니어',
    profileImg: 'http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640',
    selfProduce:
      '안녕하세요. 4년차 백엔드 엔지니어 에드워드입니다. 현재 삼성전자 DX 산업부에서 갤럭시북 개발 업무를 맡고 있습니다.',
    fileUrl: 'http://amazons3.ddd',
  },
  scheduleInfos: [
    {
      day: '2024-08-20',
      schedules: [
        {
          scheduleId: 4,
          time: '20:00',
        },
        {
          scheduleId: 8,
          time: '22:00',
        },
      ],
    },
    {
      day: '2024-08-21',
      schedules: [
        {
          scheduleId: 2,
          time: '23:00',
        },
      ],
    },
  ],
};

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
    day: '2024-08-28',
    schedules: [
      {
        scheduleId: 4,
        time: '20:00',
        mentorInfo: {
          name: '남경민',
          companyName: '네이버',
          department: '백엔드 엔지니어',
          profileImg:
            'http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640',
        },
      },
    ],
  },
];
