import {create} from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
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
  login: () => set({ isLoggedIn: true }),
  logout: () => {
    localStorage.removeItem('accessToken');  
    localStorage.removeItem('refreshToken'); 
    set({ accessToken: '', refreshToken: '', isLoggedIn: false }); 
  },
}));

export default useAuthStore;
