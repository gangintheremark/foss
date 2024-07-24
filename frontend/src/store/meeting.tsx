import { create } from 'zustand';

interface MeetingState {
  meetingDetails: {
    id: number | null;
    sessionId: string;
    startTime: Date | null;
    endTime: Date | null;
    status: 'pending' | 'ongoing' | 'completed';
  };
  setMeetingDetails: (details: Partial<MeetingState['meetingDetails']>) => void;
  startMeeting: () => void;
  endMeeting: () => void;
  initializeMeeting: (sessionId: string) => void;
}

const useMeetingStore = create<MeetingState>((set) => ({
  meetingDetails: {
    id: null,
    sessionId: '',
    startTime: null,
    endTime: null,
    status: 'pending',
  },
  setMeetingDetails: (details) =>
    set((state) => ({
      meetingDetails: { ...state.meetingDetails, ...details },
    })),
  startMeeting: () =>
    set((state) => ({
      meetingDetails: {
        ...state.meetingDetails,
        startTime: new Date(),
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
  initializeMeeting: (sessionId: string) =>
    set((state) => ({
      meetingDetails: {
        ...state.meetingDetails,
        sessionId,
        status: 'pending',
      },
    })),
}));

export default useMeetingStore;
