import { reducer } from '@/config/config';
import FeedbackCard from '@components/Feedback/FeedbackCard';
import FeedBackDetail from '@components/Feedback/FeedBackDetail';
import FeedbackLayout from '@components/Feedback/FeedbackLayout';
import FeedBackView from '@components/Feedback/FeedBackView';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useReducer } from 'react';

const MyFeedbackList = ({ title }) => {
  const [step, dispatch] = useReducer(reducer, 1);
  const getFeedBackPage = (num: number) => {
    if (num === 1) return <FeedBackView state={step} dispatch={dispatch} />;
    if (num === 2)
      return (
        <>
          <div onClick={() => dispatch({ type: 'MINUS' })}>
            <IoMdArrowRoundBack className=" text-main-color" />
          </div>
          <FeedBackDetail />
        </>
      );
  };
  return (
    <>
      <div>{getFeedBackPage(step)}</div>
    </>
  );
};

export default MyFeedbackList;
