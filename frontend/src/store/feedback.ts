import { TFeedBack } from 'types/type';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TFeedBackStore = {
  data: Array<TFeedBack>;
};

const useFeedBackStore = create<TFeedBackStore>()(
  devtools((set) => ({
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
  }))
);

export default useFeedBackStore;
