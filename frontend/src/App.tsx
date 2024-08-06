import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@store/useAuthStore';
import useUserStore from '@store/useUserStore'; 
import Nav from '@components/Header/NavComponent';
import CompanyIntro from '@components/Main/CompanyIntro.tsx';
import MainIntro from '@components/Main/MainIntro.tsx';
import ReviewIntro from '@components/Main/ReviewIntro.tsx';
import BestMentos from '@components/Main/BestMentoIntro';
import Footer from '@components/Footer/Footer';
import useInitializeAuth from '@hooks/useInitializeAuth';

const App = () => {
   useInitializeAuth();

  return (
    <>
      <Nav />
      <MainIntro />
      <CompanyIntro />
      <ReviewIntro />
      <BestMentos />
      <Footer />
    </>
  );
};

export default App;
