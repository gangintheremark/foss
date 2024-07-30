import { create } from 'zustand';

interface Participant {
  id: string;
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
}

const useParticipantsStore = create<ParticipantsState>((set) => ({
  participants: [],
  addParticipant: (participant) =>
    set((state) => ({
      participants: [...state.participants, participant],
    })),
  removeParticipant: (id) =>
    set((state) => ({
      participants: state.participants.filter((p) => p.id !== id),
    })),
  updateParticipant: (id, updates) =>
    set((state) => ({
      participants: state.participants.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
}));

export default useParticipantsStore;
