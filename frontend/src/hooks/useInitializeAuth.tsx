// useInitializeAuth.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@store/useAuthStore';
import useUserStore from '@store/useUserStore';

const useInitializeAuth = () => {
  const nav = useNavigate();
  const { setTokens, clearTokens } = useAuthStore((state) => ({
    setTokens: state.setTokens,
    clearTokens: state.clearTokens,
  }));
  const { setUser, clearUser } = useUserStore((state) => ({
    setUser: state.setUser,
    clearUser: state.clearUser,
  }));

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('tempToken');

    console.log(queryParams);
    console.log(code);

    if (code) {
      fetch(`http://localhost:8080/tokens`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${code}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          const { 'Authorization': accessToken, 'Authorization-Refresh': refreshToken } = data;
          setTokens(accessToken, refreshToken);

          fetch('http://localhost:8080/mypage', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
          })
            .then((response) => response.json())
            .then((userData) => {
              console.log(userData);
              setUser(userData); 
              nav('/');
            })
            .catch((error) => {
              console.error('Failed to fetch user data:', error);
              clearTokens();
              clearUser();
            });
        })
        .catch((error) => {
          console.error('Failed to fetch token:', error);
          clearTokens();
          clearUser();
        });
    }
  }, [nav, setTokens, clearTokens, setUser, clearUser]);
};

export default useInitializeAuth;
