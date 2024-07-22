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

export type TFeedBack = {
  scheduleId: number;
  date: string;
  mentorInfo: TCard;
  // 이거 추석처리 없앨 것
  companyLogoUrl?: string;
};

export interface ICard extends TCard {
  children: ReactNode;
  onClick: () => void;
}

export type TFeedBackDetail = {
  time: string;
  isTitle: boolean;
  content: string;
};
