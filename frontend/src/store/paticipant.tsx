import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Participant {
  id: string;
  sessionId: string;
  meetingId: string;
  token: string;
  userName: string;
  isHost: boolean;
  isMicroOn: boolean;
  isCameraOn: boolean;
}

interface ParticipantsState {
  participants: Participant[];
  addParticipant: (participant: Participant) => void;
  removeParticipant: (id: string) => void;
  updateParticipant: (id: string, updates: Partial<Participant>) => void;

  setParticipants: (participants: Participant[]) => void;
  loadParticipants: () => void;
}

const useParticipantsStore = create<ParticipantsState>()(
  devtools((set) => ({
    participants: [],
    addParticipant: (participant) => {
      set((state) => ({
        participants: [...state.participants, participant],
      }));
    },
    removeParticipant: (id) => {
      set((state) => ({
        participants: state.participants.filter((p) => p.id !== id),
      }));
    },
    updateParticipant: (id, updates) => {
      set((state) => ({
        participants: state.participants.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      }));
    },

    setParticipants: (participants) => {
      set({ participants });
    },
    loadParticipants: () => {
      set({ participants: [] });
    },
  }))
);

export default useParticipantsStore;
