import { IFeedBackDetail, TFeedBack } from 'types/type';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TFeedBackStore = {
  states: {
    data: Array<TFeedBack>;
    mentorInfo: TFeedBack;
    detail: IFeedBackDetail;
  };
  actions: {
    setData: (data: TFeedBack) => void;
  };
};

const useFeedBackStore = create<TFeedBackStore>()(
  devtools((set) => ({
    states: {
      data: [],
      mentorInfo: {
        respondentId: 3,
        date: '2024-07-20 17:00',
        mentorInfo: {
          mentorId: 2,
          name: '이동기',
          companyName: '정승네트워크',
          department: 'UX/UI',
          profileImg: 'http://profileImageLink2',
          logoImg: 'http://ddd',
        },
      },
      // menteeId로 바꿀 것
      detail: {
        respondentId: 1,
        isEvaluated: false,
        mentorFeedback: [
          '말씀을 정말 잘하시네교 굿입니다....', // 좋은점
          '말씀을 하실 때, 자꾸 움직이십니다...', // 보완할 점
          '종합적으로 잘하시네요...',
        ],
        menteeFeedbacks: [
          {
            memberId: 10,
            content: '잘하시네요',
            isEvaluated: false,
          },
          {
            memberId: 11,
            content: '흐음.. 그 정돈가?',
            isEvaluated: true,
          },
        ],
      },
    },
    actions: {
      setData: (data: TFeedBack) => {
        set((state) => ({
          states: {
            ...state.states,
            mentorInfo: data as TFeedBack,
          },
        }));
      },
    },
  }))
);

export default useFeedBackStore;
