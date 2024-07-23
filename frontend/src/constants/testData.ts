export interface IMentorCalender {
  day: string;
  schedules: Array<Tschedules>;
}

export type Tschedules = {
  time: string;
  scheduleId: number;
  applies: Array<Tappliers>;
  isConfirmed: boolean;
};

type Tappliers = {
  memberId: number;
  name: string;
  fileUrl: string;
};

export const MypageMentorData: Array<IMentorCalender> = [
  {
    day: '2024-07-24',
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
        isConfirmed: true,
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
        isConfirmed: false,
      },
    ],
  },
  {
    day: '2024-07-28',
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
        isConfirmed: false,
      },
    ],
  },
];
