import { ReactNode } from 'react';

// 타입 관련 모아놓는 곳
export interface BtnStyleProp {
  width: string;
  height: string;
  fontSize: string;
}

export type TMentorInfo = {
  name: string;
  companyName: string;
  department: string;
  profileImg?: string;
};

export type TCalendarMentorInfo = {
  time: string;
  applyCount: number;
  mentorInfo: {
    mentorId: number;
  } & TMentorInfo;
};

export type TFeedBackCard = {
  mentorId: number;
} & TMentorInfo;

export type TFeedBack = {
  scheduleId: number;
  date: string;
  mentorInfo: TFeedBackCard;
  // 이거 선택자가 아니라 필수로 할거지만 지금 당장은 이렇게..!
  companyLogoUrl?: string;
};

export interface ICard extends TMentorInfo {
  children: ReactNode;
  onClick: () => void;
}

export type TMenteeFeedBack = {
  memberId: number;
  content: string;
  isEvaluated: boolean;
};

export interface IFeedBackDetail {
  scheduleId: number;
  mentorId: number;
  mentorFeedback: Array<string>;
  menteeFeedback: Array<TMenteeFeedBack>;
  ai: Array<string>;
}
