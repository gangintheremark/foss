import { TFeedBack, TFeedBackDetail } from 'types/type';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TFeedBackStore = {
  states: {
    data: Array<TFeedBack>;
    detail: Array<TFeedBackDetail>;
  };
};

const useFeedBackStore = create<TFeedBackStore>()(
  devtools((set) => ({
    states: {
      data: [
        {
          scheduleId: 1,
          date: '2024-07-25 17:00',
          mentorInfo: {
            mentorId: 1,
            mentorName: '김형민',
            companyName: '삼성',
            department: 'UX/UI',
            years: 1,
          },
        },
        {
          scheduleId: 2,
          date: '2024-07-25 17:00',
          mentorInfo: {
            mentorId: 2,
            mentorName: '이동기',
            companyName: '카카오',
            department: 'Developer',
            years: 5,
          },
        },
        {
          scheduleId: 3,
          date: '2024-07-25 17:00',
          mentorInfo: {
            mentorId: 1,
            mentorName: '김형민',
            companyName: '삼성',
            department: 'UX/UI',
            years: 1,
          },
        },
        {
          scheduleId: 4,
          date: '2024-07-25 17:00',
          mentorInfo: {
            mentorId: 2,
            mentorName: '이동기',
            companyName: '카카오',
            department: 'Developer',
            years: 5,
          },
        },
        {
          scheduleId: 5,
          date: '2024-07-25 17:00',
          mentorInfo: {
            mentorId: 1,
            mentorName: '김형민',
            companyName: '삼성',
            department: 'UX/UI',
            years: 1,
          },
        },
        {
          scheduleId: 6,
          date: '2024-07-25 17:00',
          mentorInfo: {
            mentorId: 2,
            mentorName: '이동기',
            companyName: '카카오',
            department: 'Developer',
            years: 5,
          },
        },
      ],
      detail: [
        {
          time: '00:20',
          isTitle: true,
          content: '면접 시작하겠습니다. 먼저 자기소개 부탁드려요',
        },
        {
          time: '00:25',
          isTitle: false,
          content:
            '안녕하세요. 저는 ㅇㅇㅇ입니다. 삼성전자 AI 엔지니어 직무에 지원하게 된 이유는 저의 깊은 관심과 열정때문입니다. 저는 컴퓨터 공학 학위를 가지고 있습니다.\n\n 저는 데이터 분석과 모델링을 통해',
        },
        {
          time: '01:30',
          isTitle: true,
          content: '왜 삼성전자에서 일하고 싶은가요?',
        },
        {
          time: '01:35',
          isTitle: false,
          content:
            '일단 이거 제대로 쓰기 이전에 이미지라 일일이 적어야 되는데 너무나도 귀찮습니다. 살려주세요 진짜 귀찮아요 세상에 어떻게 이럴수가',
        },
        {
          time: '03:00',
          isTitle: true,
          content: '스크롤이 잘 되나 테스트해볼까요?',
        },
        {
          time: '03:10',
          isTitle: false,
          content:
            '일단 이거 제대로 쓰기 이전에 이미지라 일일이 적어야 되는데 너무나도 귀찮습니다. 살려주세요 진짜 귀찮아요 세상에 어떻게 이럴수가',
        },
      ],
    },
  }))
);

export default useFeedBackStore;
