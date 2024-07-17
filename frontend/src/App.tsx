import Root from '@pages/Root/Root';
import Nav from '@/components/Header/NavComponent';
import CompanyIntro from '@components/Main/CompanyIntro.tsx';
import MainIntro from '@components/Main/MainIntro.tsx';
import ReviewIntro from '@components/Main/ReviewIntro.tsx';
import BestMentos from '@components/Main/BestMentoIntro';
import Footer from '@components/Footer/Footer';
import Login from '@components/Login/Login';

const App = () => {
  return (
    <>
      <Login />
      {/* <Nav />
      <MainIntro />
      <CompanyIntro />
      <ReviewIntro />
      <BestMentos />
      <Footer /> */}
    </>
  );
};

export default App;
