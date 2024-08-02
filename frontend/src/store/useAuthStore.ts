import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => {
  const accessToken = localStorage.getItem('accessToken') || '';
  const refreshToken = localStorage.getItem('refreshToken') || '';

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
    login: () => set({ isLoggedIn: true }),
    logout: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      set({ accessToken: '', refreshToken: '', isLoggedIn: false });
    },
  };
});

// 기존 코드(게시글 상세 페이지에서 새로고침 시 엑세스 토큰이 헤더에 안 담기는 이슈)
// const useAuthStore = create<AuthState>((set) => ({
//   isLoggedIn: false,
//   accessToken: '',
//   refreshToken: '',
//   setTokens: (accessToken, refreshToken) => {
//     localStorage.setItem('accessToken', accessToken);
//     localStorage.setItem('refreshToken', refreshToken);
//     set({ accessToken, refreshToken, isLoggedIn: true });
//   },
//   clearTokens: () => {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     set({ accessToken: '', refreshToken: '', isLoggedIn: false });
//   },
//   login: () => set({ isLoggedIn: true }),
//   logout: () => {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     set({ accessToken: '', refreshToken: '', isLoggedIn: false });
//   },
// }));

export default useAuthStore;
