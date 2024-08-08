import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserState {
  name: string;
  // profileImg: string;
  profileImg: string | undefined;
  email: string;
  // role: string;
  role: string | null;
  setUser: (userData: Partial<UserState>) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: '',
      profileImg: '',
      email: '',
      role: '',
      setUser: (userData: Partial<UserState>) => set((state) => ({ ...state, ...userData })),
      clearUser: () => set({ name: '', profileImg: '', email: '', role: '' }),
    }),
    {
      name: 'user-storage',
    }
  )
);

export { useUserStore };
export default useUserStore;
