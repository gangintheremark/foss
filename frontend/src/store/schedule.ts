import { IMentorCalender, MypageMentorData } from '@/constants/testData';
import dayjs from 'dayjs';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TScheduleStore = {
  states: {
    TotalMentorData: Array<IMentorCalender>;
    EachMentorData: IMentorCalender | undefined;
    MenteeList: Array<number>;
  };
  actions: {
    setMentorData: (time: string) => void;
    setMenteeList: (id: number) => void;
    resetMentorData: () => void;
    resetMenteeList: () => void;
  };
};

export const useScheduleStore = create<TScheduleStore>()(
  devtools((set) => ({
    states: {
      TotalMentorData: MypageMentorData,
      EachMentorData: undefined,
      MenteeList: [],
    },
    actions: {
      setMentorData: (time: string) => {
        set((state) => ({
          states: {
            ...state.states,
            EachMentorData:
              state.states.TotalMentorData.find(
                (el) => el.day === dayjs(time).format('YYYY-MM-DD')
              ) || state.states.EachMentorData, // 만약 find 결과가 undefined일 경우 기존 상태 유지
          },
        }));
      },
      // 멘티리스트 추가
      setMenteeList: (id: number) => {
        set((state) => ({
          states: {
            ...state.states,
            MenteeList: state.states.MenteeList.includes(id)
              ? state.states.MenteeList.filter((e) => e !== id)
              : [...state.states.MenteeList, id],
          },
        }));
      },
      resetMenteeList: () => {
        set((state) => ({
          states: {
            ...state.states,
            MenteeList: [],
          },
        }));
      },
      resetMentorData: () => {
        set((state) => ({
          states: {
            ...state.states,
            EachMentorData: undefined,
          },
        }));
      },
    },
  }))
);
