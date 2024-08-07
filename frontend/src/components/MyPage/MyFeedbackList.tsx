import { reducer } from '@/config/config';
import FeedBackDetail from '@components/Feedback/FeedBackDetail';
import FeedBackView from '@components/Feedback/FeedBackView';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useReducer } from 'react';

const MyFeedbackList = ({ title }: { title: string }) => {
  const [step, dispatch] = useReducer(reducer, 1);
  const getFeedBackPage = (num: number) => {
    if (num === 1) return <FeedBackView state={step} dispatch={dispatch} />;
    if (num === 2)
      return (
        <>
          <div onClick={() => dispatch({ type: 'MINUS' })}>
            <IoMdArrowRoundBack className=" text-main-color cursor-pointer" size={'2.3rem'} />
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
