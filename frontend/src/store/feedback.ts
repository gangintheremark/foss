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
          time: '2024.07.25 17:00',
          mentorName: '이동기',
          mentorPart: '삼성물산',
          mentorInfo: 'UX/UI | 시니어 (5년차)',
        },
        {
          time: '2024.07.25 17:00',
          mentorName: '이동기2',
          mentorPart: '삼성물산',
          mentorInfo: 'UX/UI | 시니어 (5년차)',
        },
        {
          time: '2024.07.25 17:00',
          mentorName: '이동기3',
          mentorPart: '삼성물산',
          mentorInfo: 'UX/UI | 시니어 (5년차)',
        },
        {
          time: '2024.07.25 17:00',
          mentorName: '이동기4',
          mentorPart: '삼성물산',
          mentorInfo: 'UX/UI | 시니어 (5년차)',
        },
        {
          time: '2024.07.25 17:00',
          mentorName: '이동기5',
          mentorPart: '삼성물산',
          mentorInfo: 'UX/UI | 시니어 (5년차)',
        },
        {
          time: '2024.07.25 17:00',
          mentorName: '이동기6',
          mentorPart: '삼성물산',
          mentorInfo: 'UX/UI | 시니어 (5년차)',
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
            '이미지라 일일이 적어야 되는데 너무나도 귀찮습니다. 살려주세요 진짜 귀찮아요 세상에 어떻게 이럴수가',
        },
      ],
    },
  }))
);

export default useFeedBackStore;
