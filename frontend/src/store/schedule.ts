import { IMenteeCalendar, IMentorCalender, TMypageMenteeCalendar } from '@/types/calendar';
import dayjs from 'dayjs';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TRegisterDayTime = {
  isCheck: boolean;
  isFirst: boolean;
  day: string;
  scheduleId: number;
  time: string;
};

type TScheduleStore = {
  states: {
    // 일정 등록 1단계에서 넘어갈 때 담는 변수들
    RegisterDayTime: TRegisterDayTime;
    TotalMentorData: Array<IMentorCalender>;
    TotalMenteeData: Array<IMenteeCalendar<TMypageMenteeCalendar>>;
    EachMentorData: IMentorCalender | undefined;
    EachMenteeData: IMenteeCalendar<TMypageMenteeCalendar> | undefined;
    MenteeList: Array<number>;
  };
  actions: {
    setRegister: (
      isCheck: boolean,
      isFirst: boolean,
      scheduleId: number,
      day: string,
      time: string
    ) => void;
    setData: (time: string, dataType: 'Mentor' | 'Mentee') => void;
    setTotalData: (data: Array<IMentorCalender>) => void;
    setMenteeList: (id: number) => void;
    resetMentorData: () => void;
    resetMenteeList: () => void;
    resetRegister: () => void;
  };
};

export const useScheduleStore = create<TScheduleStore>()(
  devtools((set) => ({
    states: {
      RegisterDayTime: {
        isCheck: false,
        isFirst: true,
        scheduleId: 0,
        day: '',
        time: '',
      },
      TotalMentorData: [],
      TotalMenteeData: [],
      EachMentorData: undefined,
      EachMenteeData: undefined,
      MenteeList: [],
    },
    actions: {
      setRegister: (
        isCheck: boolean,
        isFirst: boolean,
        scheduleId: number,
        day: string,
        time: string
      ) => {
        set((state) => ({
          states: {
            ...state.states,
            RegisterDayTime: {
              isCheck: isCheck,
              isFirst: isFirst,
              scheduleId: scheduleId,
              day: day,
              time: time,
            },
          },
        }));
      },
      // 멘토 일정 현황 전체 데이터 가져오는 함수
      setTotalData: (data: Array<IMentorCalender>) => {
        set((state) => ({
          states: {
            ...state.states,
            TotalMentorData: data,
          },
        }));
      },
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
      resetRegister: () => {
        set((state) => ({
          states: {
            ...state.states,
            RegisterDayTime: {
              isCheck: false,
              isFirst: true,
              scheduleId: 0,
              day: '',
              time: '',
            },
          },
        }));
      },
    },
  }))
);
