import MyPage from '@/pages/MyPage/MyPage';
import FeedBackDetailPage from '@pages/FeedBack/FeedBackDetailPage';
import FeedBackOverview from '@pages/FeedBack/FeedBackOverview';
import FeedBackViewPage from '@pages/FeedBack/FeedBackViewPage';
import MenteeRegister from '@pages/Register/MenteeRegister';
import MenteeView from '@pages/Register/MenteeView';
import MentorRegister from '@pages/Register/MentorRegister';
import RegisterOverview from '@pages/Register/RegisterOverview';
import VideoChatPage from '@components/OpenVidu/Screen/VideoChatPage';
import CompanyIntroductionPage from '@/pages/CompanyIntroductionPage';
import CustomerSupportPage from '@/pages/CustomerSupportPage';
import FAQPage from '@/pages/FAQPage';
import InterviewSchedulePage from '@/pages/InterviewSchedulePage';
import CommunityPage from '@/pages/CommunityPage';
import CompanyPage from '@/pages//CompanyPage/CompanyPage';

import App from 'App';
import { createBrowserRouter } from 'react-router-dom';
import MentorSchedule from '../Schedule/MentorSchedule';

const customRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/register',
    element: <RegisterOverview />,
    children: [
      {
        index: true,
        element: <MenteeView />,
      },
      {
        path: 'mentor',
        element: <MentorRegister />,
      },
      {
        path: 'mentee',
        element: <MenteeRegister />,
      },
    ],
  },
  {
    path: '/feedback',
    element: <FeedBackOverview />,
    children: [
      {
        index: true,
        element: <FeedBackViewPage />,
      },
      {
        path: 'detail',
        element: <FeedBackDetailPage />,
      },
    ],
  },
  {
    path: '/my-page',
    element: <MyPage />,
  },
  {
    path: '/schedule',
    element: <MentorSchedule />,
  },
  {
    path: '/video-chat',
    element: <VideoChatPage />,
  },
  {
    path: '/about-us',
    element: <CompanyIntroductionPage />,
  },
  {
    path: '/support',
    element: <CustomerSupportPage />,
  },
  {
    path: '/faq',
    element: <FAQPage />,
  },
  {
    path: '/interview-schedule',
    element: <InterviewSchedulePage />,
  },
  {
    path: '/community',
    element: <CommunityPage />,
  },
  {
    path: '/company/:name',
    element: <CompanyPage />,
  },
]);

export default customRouter;
