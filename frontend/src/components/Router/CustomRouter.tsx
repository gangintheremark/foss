import MenteeRegister from '@pages/Register/MenteeRegister';
import MentorRegister from '@pages/Register/MentorRegister';
import Overview from '@pages/Register/Overview';
import App from 'App';
import { createBrowserRouter } from 'react-router-dom';

const customRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/register',
    element: <Overview />,
    children: [
      {
        path: '',
        element: <MenteeRegister />,
      },
      {
        path: 'mentor',
        element: <MentorRegister />,
      },
    ],
  },
]);

export default customRouter;
