import { create } from 'zustand';
import { useUserStore, UserState } from './useUserStore';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  login: (userData: Partial<UserState>) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => {
  const accessToken = localStorage.getItem('accessToken') || '';
  const refreshToken = localStorage.getItem('refreshToken') || '';
  const { setUser, clearUser } = useUserStore.getState();

  return {
    isLoggedIn: !!accessToken,
    accessToken,
    refreshToken,
    setTokens: (accessToken, refreshToken) => {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      set({ accessToken, refreshToken, isLoggedIn: true });
    },
    clearTokens: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      set({ accessToken: '', refreshToken: '', isLoggedIn: false });
    },
    login: (userData: Partial<UserState>) => {
      setUser(userData);
      set({ isLoggedIn: true });
    },
    logout: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      clearUser();
      set({ accessToken: '', refreshToken: '', isLoggedIn: false });
    },
  };
});

export default useAuthStore;
