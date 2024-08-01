import { myPageMenTeeData, MypageMentorData } from '@/constants/testData';
import { IMenteeCalendar, IMentorCalender, TMypageMenteeCalendar } from '@/types/calendar';
import dayjs from 'dayjs';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TScheduleStore = {
  states: {
    TotalMentorData: Array<IMentorCalender>;
    TotalMenteeData: Array<IMenteeCalendar<TMypageMenteeCalendar>>;
    EachMentorData: IMentorCalender | undefined;
    EachMenteeData: IMenteeCalendar<TMypageMenteeCalendar> | undefined;
    MenteeList: Array<number>;
  };
  actions: {
    setData: (time: string, dataType: 'Mentor' | 'Mentee') => void;
    setTotalData: (data: Array<IMentorCalender>) => void;
    setMenteeList: (id: number) => void;
    resetMentorData: () => void;
    resetMenteeList: () => void;
  };
};

export const useScheduleStore = create<TScheduleStore>()(
  devtools((set) => ({
    states: {
      TotalMentorData: MypageMentorData,
      TotalMenteeData: myPageMenTeeData,
      EachMentorData: undefined,
      EachMenteeData: undefined,
      MenteeList: [],
    },
    actions: {
      setTotalData: (data: Array<IMentorCalender>) => {
        set((state) => ({
          states: {
            ...state.states,
            TotalMentorData: data,
          },
        }));
      },
      // setData 하고 싶은데... 이거 쉽게 하고 싶은데... 흐음...
      setData: (time: string, dataType: 'Mentor' | 'Mentee') => {
        set((state) => ({
          states: {
            ...state.states,
            [`Each${dataType}Data`]:
              state.states[`Total${dataType}Data`].find(
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
