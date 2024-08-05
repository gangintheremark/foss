export interface Participant {
  memberId: string;

  name: string;
  role: string;
  isMuted: boolean;
  isCameraOn: boolean;
}
export interface MeetingDto {
  sessionId: string;
  status: string;
  startTime?: Date;
  endTime?: Date;
}
