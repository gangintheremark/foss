import FeedBackDetailPage from '@pages/FeedBack/FeedBackDetailPage';
import FeedBackOverview from '@pages/FeedBack/FeedBackOverview';
import FeedBackViewPage from '@pages/FeedBack/FeedBackViewPage';
import MenteeRegister from '@pages/Register/MenteeRegister';
import MenteeView from '@pages/Register/MenteeView';
import MentorRegister from '@pages/Register/MentorRegister';
import RegisterOverview from '@pages/Register/RegisterOverview';
import App from 'App';
import { createBrowserRouter } from 'react-router-dom';

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
]);

export default customRouter;
