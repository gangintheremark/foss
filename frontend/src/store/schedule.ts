import { IMentorCalender, MypageMentorData } from '@/constants/testData';
import dayjs from 'dayjs';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TScheduleStore = {
  states: {
    TotalMentorData: Array<IMentorCalender>;
    EachMentorData: IMentorCalender | undefined;
  };
  actions: {
    setMentorData: (time: string) => void;
  };
};

export const useScheduleStore = create<TScheduleStore>()(
  devtools((set) => ({
    states: {
      TotalMentorData: MypageMentorData,
      EachMentorData: undefined,
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
    },
  }))
);
