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

export type TMenteeInfo = {
  name: string;
  fileUrl: string;
};

export type TCalendarMentorInfo = {
  time: string;
  applicantCount: number;
  scheduleId: number;
  mentorInfo: {
    mentorId: number;
  } & TMentorInfo;
};

export type TFeedBackCard = {
  mentorId: number;
} & TMentorInfo;
// 피드백 전체 조회 타입
export type TFeedBack = {
  respondentId: number;
  date: string;
  mentorInfo: {
    mentorId: number;
    logoImg?: string;
  } & TMentorInfo;
};
// 피드백 카드에 필요한 변수들
export interface ICard extends TMentorInfo {
  children: ReactNode;
  onClick: () => void;
  mentorId: number;
  logoImg?: string;
}

export type TMenteeFeedBack = {
  memberId: number;
  content: string;
  isEvaluated: boolean;
};

export interface IFeedBackDetail {
  respondentId: number;
  isEvaluated: boolean;
  mentorFeedback: Array<string>;
  menteeFeedbacks: Array<TMenteeFeedBack>;
}
