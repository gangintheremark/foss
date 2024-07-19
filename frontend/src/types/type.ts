import { ReactNode } from 'react';

// 타입 관련 모아놓는 곳
export interface BtnStyleProp {
  width: string;
  height: string;
  fontSize: string;
}

export type TCard = {
  mentorName: string;
  mentorPart: string;
  mentorInfo: string;
};

export interface IFeedBack extends TCard {
  time: string;
  companyImg?: string;
  profile?: string;
}

export interface ICard extends TCard {
  children: ReactNode;
  onClick: () => void;
}

export type TFeedBackDetail = {
  time: string;
  isTitle: boolean;
  content: string;
};
