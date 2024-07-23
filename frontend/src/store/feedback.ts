import { IFeedBackDetail, TFeedBack } from 'types/type';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TFeedBackStore = {
  states: {
    data: Array<TFeedBack>;
    detail: IFeedBackDetail;
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
      // menteeId로 바꿀 것
      detail: {
        scheduleId: 1,
        mentorId: 1,
        mentorFeedback: [
          '말씀을 정말 잘하시네교 굿입니다....', // 좋은점
          '말씀을 하실 때, 자꾸 움직이십니다...', // 보완할 점
          '종합적으로 잘하시네요...',
        ],
        menteeFeedback: [
          {
            memberId: 10,
            content: '잘하시네요',
            isEvaluated: false,
          },
          {
            memberId: 11,
            content: '흐음.. 그 정돈가?',
            isEvaluated: false,
          },
        ],
        ai: [
          '시선처리에는 이상이 없습니다.',
          '자세가 뒤틀리는 경우가 많습니다.',
          '이 외에도 목소리에 떨림이 많습니다. 이러한 부분은 이런식으로 고치는 건 어떨까요?',
        ],
      },
    },
  }))
);

export default useFeedBackStore;
