import { TFeedBack } from 'types/type';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TFeedBackStore = {
  states: {
    data: Array<TFeedBack>;
    mentorInfo: TFeedBack;
    ratingMenteeId: number;
    // 모달용... 디자인 때문에 이렇게 해야할듯..
    open: boolean;
  };
  actions: {
    setData: (data: TFeedBack) => void;
    setMenteeId: (id: number) => void;
    resetMenteeId: () => void;
    setOpen: () => void;
  };
};

const useFeedBackStore = create<TFeedBackStore>()(
  devtools((set) => ({
    states: {
      data: [],
      mentorInfo: {
        respondentId: 1,
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
      ratingMenteeId: 0,
      open: false,
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
      setMenteeId: (id: number) => {
        set((state) => ({
          states: {
            ...state.states,
            ratingMenteeId: id,
          },
        }));
      },
      resetMenteeId: () => {
        set((state) => ({
          states: {
            ...state.states,
            ratingMenteeId: 0,
          },
        }));
      },
      setOpen: () => {
        set((state) => ({
          states: {
            ...state.states,
            open: !state.states.open,
          },
        }));
      },
    },
  }))
);

export default useFeedBackStore;
