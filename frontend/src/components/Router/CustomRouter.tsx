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
import InterviewSchedulePage from '@/pages/InterviewSchedulePage';
import CommunityPage from '@/pages/Community/CommunityPage';
import CompanyPage from '@/pages/CompanyPage/CompanyPage';
import CompanyDetailPage from '@/pages/CompanyPage/CompanyDetailPage';
import TmpFeedBackPage from '@/pages/TmpFeedBack/TmpFeedBackPage';
import TmpFeedBackDetailPage from '@/pages/TmpFeedBack/TmpFeedBackDetailPage';

import App from 'App';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../Login/Login';
import ReadPost from '../Community/ReadPost';
import CreatePost from '../Community/CreatePost';
import UpdatePost from '../Community/UpdatePost';

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
    path: '/interview-schedule',
    element: <InterviewSchedulePage />,
  },
  {
    path: '/company',
    element: <CompanyPage />,
  },
  {
    path: '/company/:name',
    element: <CompanyDetailPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  //////////////////////////////////////////////////
  {
    path: '/community',
    element: <CommunityPage />,
  },
  {
    path: '/community/:id',
    element: <ReadPost />,
  },
  {
    path: '/community/create',
    element: <CreatePost />,
  },
  {
    path: '/community/:id/update',
    element: <UpdatePost />,
  },
  {
    path: '/tmp-feedback',
    element: <TmpFeedBackPage />,
  },
  {
    path: '/tmp-feedback/:id',
    element: <TmpFeedBackDetailPage />,
  },
]);

export default customRouter;
