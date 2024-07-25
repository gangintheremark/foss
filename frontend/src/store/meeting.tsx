import { create } from 'zustand';

interface MeetingState {
  meetingDetails: {
    id: number | null;
    sessionId: string;
    startTime: Date | null;
    endTime: Date | null;
    status: 'ongoing' | 'completed';
  };
  setMeetingDetails: (details: Partial<MeetingState['meetingDetails']>) => void;
  startMeeting: (sessionId: string) => void;
  endMeeting: () => void;
}

const useMeetingStore = create<MeetingState>((set) => ({
  meetingDetails: {
    id: null,
    sessionId: '',
    startTime: null,
    endTime: null,
    status: 'ongoing',
  },
  setMeetingDetails: (details) =>
    set((state) => ({
      meetingDetails: { ...state.meetingDetails, ...details },
    })),
  startMeeting: (sessionId: string) =>
    set((state) => ({
      meetingDetails: {
        ...state.meetingDetails,
        startTime: new Date(),
        sessionId,
        status: 'ongoing',
      },
    })),
  endMeeting: () =>
    set((state) => ({
      meetingDetails: {
        ...state.meetingDetails,
        endTime: new Date(),
        status: 'completed',
      },
    })),
}));

export default useMeetingStore;
