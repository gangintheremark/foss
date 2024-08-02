import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface Participant {
  id: string | null;
  sessionId: string;
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
  removeLastParticipant: () => void;
  setParticipants: (participants: Participant[]) => void;
  loadParticipants: () => void;
}

const LOCAL_STORAGE_KEY = 'participants';

const useParticipantsStore = create<ParticipantsState>()(
  devtools(
    persist(
      (set) => ({
        participants: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'), // 로컬 스토리지에서 상태 복원
        addParticipant: (participant) => {
          set((state) => {
            const updatedParticipants = [...state.participants, participant];
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedParticipants)); // 로컬 스토리지에 저장
            return { participants: updatedParticipants };
          });
        },
        removeParticipant: (id) => {
          set((state) => {
            const updatedParticipants = state.participants.filter((p) => p.id !== id);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedParticipants)); // 로컬 스토리지에 저장
            return { participants: updatedParticipants };
          });
        },
        updateParticipant: (id, updates) => {
          set((state) => {
            const updatedParticipants = state.participants.map((p) =>
              p.id === id ? { ...p, ...updates } : p
            );
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedParticipants)); // 로컬 스토리지에 저장
            return { participants: updatedParticipants };
          });
        },
        removeLastParticipant: () => {
          set((state) => {
            const updatedParticipants = state.participants.slice(0, -1);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedParticipants)); // 로컬 스토리지에 저장
            return { participants: updatedParticipants };
          });
        },
        setParticipants: (participants) => {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(participants)); // 로컬 스토리지에 저장
          set({ participants });
        },
        loadParticipants: () => {
          const storedParticipants = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
          set({ participants: storedParticipants });
        },
      }),
      {
        name: 'participants-store', // 이름 설정 (devtools 사용 시 유용)
      }
    )
  )
);

export default useParticipantsStore;
