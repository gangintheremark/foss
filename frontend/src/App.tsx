import Nav from '@components/Header/NavComponent';
import CompanyIntro from '@components/Main/CompanyIntro.tsx';
import MainIntro from '@components/Main/MainIntro.tsx';
import ReviewIntro from '@components/Main/ReviewIntro.tsx';
import MeetingIntro from '@components/Main/MeetingIntro.tsx';
import Footer from '@components/Footer/Footer';
import useAuthStore from '@store/useAuthStore';
import useUserStore from '@store/useUserStore';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const App = () => {
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
      fetch(`https://i11a705.p.ssafy.io/api/tokens`, {
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

          fetch('https://i11a705.p.ssafy.io/api/mypage', {
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

  return (
    <>
      <Nav />
      {/* <MyPageView /> */}
      <MainIntro />
      <CompanyIntro />
      <ReviewIntro />
      <MeetingIntro />
      <Footer />
      {/* <Login /> */}
    </>
  );
};

export default App;
