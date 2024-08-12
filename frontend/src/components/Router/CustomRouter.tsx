import MyPage from '@/pages/MyPage/MyPage';
import MenteeRegister from '@pages/Register/MenteeRegister';
import MenteeView from '@pages/Register/MenteeView';
import MentorRegister from '@pages/Register/MentorRegister';
import RegisterOverview from '@pages/Register/RegisterOverview';
import VideoChatPage from '@components/OpenVidu/Screen/VideoChatPage';
import CompanyIntroductionPage from '@/pages/CompanyIntroductionPage';
import InterviewSchedulePage from '@/pages/InterviewSchedulePage';
import CommunityPage from '@/pages/Community/CommunityPage';
import CompanyPage from '@/pages/CompanyPage/CompanyPage';
import CompanyDetailPage from '@/pages/CompanyPage/CompanyDetailPage';
import ReviewPage from '@/pages/Review/ReviewPage';
import ReviewForm from '@/components/Review/ReviewForm';
import App from 'App';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../Login/Login';
import ReadPost from '../Community/ReadPost';
import CreatePost from '../Community/CreatePost';
import UpdatePost from '../Community/UpdatePost';
// import ErrorCompo from '../common/ErrorCompo';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import VideoChatGuard from '../OpenVidu/Screen/VideoChatGuard';
import VideoNotFoundPage from '../OpenVidu/Screen/VideoNotFoundPage';

const customRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/*',
    element: <NotFoundPage />,
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
    path: '/review',
    element: <ReviewPage />,
  },
  {
    path: '/review/write',
    element: <ReviewForm />,
  },
  {
    path: '/video-chat',
    element: <VideoChatGuard />,
  },
  {
    path: '/not-found',
    element: <VideoNotFoundPage />,
  },
]);

export default customRouter;
