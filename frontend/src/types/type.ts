import { ReactNode } from 'react';

// 타입 관련 모아놓는 곳
export interface BtnStyleProp {
  width: string;
  height: string;
  fontSize: string;
}

export type TCard = {
  mentorId: number;
  mentorName: string;
  companyName: string;
  department: string;
  years: number;
  profileImg?: string;
};

export type TCalendarMentorInfo = {
  time: string;
  applyCount: number;
} & TCard;

export type TFeedBack = {
  scheduleId: number;
  date: string;
  mentorInfo: TCard;
  // 이거 선택자가 아니라 필수로 할거지만 지금 당장은 이렇게..!
  companyLogoUrl?: string;
};

export interface ICard extends TCard {
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
