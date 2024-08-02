export interface Participant {
  id: number;
  profileImg: string;
}

export interface MeetingDto {
  sessionId: string;
  status: string;
  startTime?: Date;
  endTime?: Date;
}
